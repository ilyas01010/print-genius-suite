
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmail, signUpWithEmail } from "@/lib/supabase-client";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import InputSanitized from "@/components/security/InputSanitized";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";
import { validatePassword, PASSWORD_MIN_LENGTH } from "@/lib/security/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ValidationType } from "@/lib/security/inputValidation";
import { Shield, AlertTriangle, Lock, Eye, EyeOff } from "lucide-react";
import { detectSuspiciousLogin, MAX_LOGIN_ATTEMPTS } from "@/lib/security/auth";
import TwoFactorAuth from "@/components/security/TwoFactorAuth";

interface AuthState {
  from?: Location;
}

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string[];
  }>({ score: 0, feedback: [] });
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [is2FARequired, setIs2FARequired] = useState<boolean>(false);
  const [blockLoginUntil, setBlockLoginUntil] = useState<number | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useUser();
  const { t } = useLanguage();
  const state = location.state as AuthState;
  const from = state?.from?.pathname || "/";
  
  // Password requirements
  const requirements = [
    { regex: new RegExp(`^.{${PASSWORD_MIN_LENGTH},}$`), text: `At least ${PASSWORD_MIN_LENGTH} characters` },
    { regex: /[A-Z]/, text: "At least one uppercase letter" },
    { regex: /[a-z]/, text: "At least one lowercase letter" },
    { regex: /[0-9]/, text: "At least one number" },
    { regex: /[^A-Za-z0-9]/, text: "At least one special character" },
  ];

  // Check if login is blocked due to too many attempts
  useEffect(() => {
    const loginBlocked = blockLoginUntil && Date.now() < blockLoginUntil;
    
    if (loginBlocked) {
      const remainingTime = Math.ceil((blockLoginUntil - Date.now()) / 1000 / 60);
      
      toast({
        title: "Too many login attempts",
        description: `Account is temporarily locked. Try again in ${remainingTime} minutes.`,
        variant: "destructive",
      });
    }
    
    // Clear the block after it expires
    if (blockLoginUntil && Date.now() >= blockLoginUntil) {
      setBlockLoginUntil(null);
      setLoginAttempts(0);
    }
    
    // Continue checking until block is removed
    const interval = setInterval(() => {
      if (blockLoginUntil && Date.now() >= blockLoginUntil) {
        setBlockLoginUntil(null);
        setLoginAttempts(0);
        clearInterval(interval);
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, [blockLoginUntil, toast]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  // Update password strength when password changes
  useEffect(() => {
    if (!password) {
      setPasswordStrength({ score: 0, feedback: [] });
      return;
    }
    
    // Calculate password score
    const { valid, errors } = validatePassword(password);
    
    let score = 0;
    const metRequirements = requirements.filter(req => req.regex.test(password)).length;
    score = Math.min(5, metRequirements);
    
    setPasswordStrength({
      score,
      feedback: valid ? [] : errors,
    });
  }, [password]);
  
  // Handle 2FA verification
  const handle2FAVerification = async (code: string): Promise<boolean> => {
    // In a real app, you would verify the code with your backend
    // This is a simplified example
    if (code === '123456') { // For demo purposes
      // Reset login attempts on successful verification
      setLoginAttempts(0);
      navigate(from);
      return true;
    }
    return false;
  };
  
  // Handle 2FA code resend
  const handleResend2FACode = async () => {
    // In a real app, you would trigger the backend to send a new code
    // This is a simplified example
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: t("auth.error"),
        description: t("auth.fillAllFields"),
        variant: "destructive",
      });
      return;
    }
    
    // Check if login is blocked
    if (blockLoginUntil && Date.now() < blockLoginUntil) {
      const remainingMinutes = Math.ceil((blockLoginUntil - Date.now()) / 60000);
      toast({
        title: "Account temporarily locked",
        description: `Too many failed attempts. Try again in ${remainingMinutes} minutes.`,
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await signInWithEmail(email, password);
      
      if (error) {
        // Update failed login attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        // Check if attempts are suspicious or exceed max
        const isSuspicious = detectSuspiciousLogin(newAttempts, 300000); // 5 minutes window
        
        if (isSuspicious || newAttempts >= MAX_LOGIN_ATTEMPTS) {
          const lockoutTime = Date.now() + (15 * 60000); // 15 minutes
          setBlockLoginUntil(lockoutTime);
          
          toast({
            title: "Account temporarily locked",
            description: "Too many failed attempts. Try again in 15 minutes.",
            variant: "destructive",
          });
          throw new Error("Account locked due to too many failed attempts");
        }
        
        throw error;
      }
      
      // Success handling - in a real app, 2FA might be required for some users
      // This is a simplified example
      if (email.includes('admin')) {
        setIs2FARequired(true);
      } else {
        // Regular user, no 2FA required
        // Reset login attempts on successful login
        setLoginAttempts(0);
        navigate(from);
      }
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: t("auth.signInFailed"),
        description: error.message || t("auth.checkCredentials"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: t("auth.error"),
        description: t("auth.fillAllFields"),
        variant: "destructive",
      });
      return;
    }

    // Validate password strength
    const { valid, errors } = validatePassword(password);
    if (!valid) {
      toast({
        title: "Password too weak",
        description: errors.join(" "),
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await signUpWithEmail(email, password);
      
      if (error) {
        throw error;
      }

      toast({
        title: t("auth.success"),
        description: t("auth.registrationSuccess"),
      });
      
      // Go to sign in tab
      document.getElementById("signin-tab")?.click();
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: t("auth.registrationFailed"),
        description: error.message || t("auth.errorOccurred"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If 2FA is required, show 2FA component
  if (is2FARequired) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <TwoFactorAuth 
          onVerify={handle2FAVerification}
          onCancel={() => setIs2FARequired(false)}
          onResend={handleResend2FACode}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center gap-2 font-heading font-bold text-2xl">
            <div className="bg-primary/10 text-primary p-1.5 rounded-md">
              <Shield className="w-6 h-6" />
            </div>
            <span>Print Genius</span>
          </div>
          <p className="text-muted-foreground">{t("auth.subtitle")}</p>
        </div>

        <Card className="border-none shadow-soft">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger id="signin-tab" value="signin">{t("auth.signIn")}</TabsTrigger>
              <TabsTrigger value="signup">{t("auth.signUp")}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
                <CardHeader className="px-6">
                  <CardTitle>{t("auth.welcome")}</CardTitle>
                  <CardDescription>
                    {t("auth.enterCredentials")}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignIn}>
                  <CardContent className="space-y-4 px-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("auth.email")}</Label>
                      <InputSanitized 
                        id="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                        validate={ValidationType.EMAIL}
                        errorMessage="Please enter a valid email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">{t("auth.password")}</Label>
                        <Button variant="link" className="h-auto p-0 text-xs" type="button">
                          {t("auth.forgot")}
                        </Button>
                      </div>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-12 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col px-6 pb-6">
                    <Button type="submit" className="w-full h-12" disabled={isLoading}>
                      {isLoading ? t("auth.signingIn") : t("auth.signIn")}
                    </Button>
                    
                    {loginAttempts > 0 && (
                      <div className="mt-4 w-full">
                        <Alert variant="destructive" className="bg-destructive/5 text-destructive text-sm">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Login attempt {loginAttempts} of {MAX_LOGIN_ATTEMPTS}</AlertTitle>
                          <AlertDescription>
                            Your account will be temporarily locked after {MAX_LOGIN_ATTEMPTS} failed attempts.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardFooter>
                </form>
            </TabsContent>
            
            <TabsContent value="signup">
                <CardHeader className="px-6">
                  <CardTitle>{t("auth.createAccount")}</CardTitle>
                  <CardDescription>
                    {t("auth.enterDetails")}
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignUp}>
                  <CardContent className="space-y-4 px-6">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">{t("auth.email")}</Label>
                      <InputSanitized 
                        id="signup-email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                        validate={ValidationType.EMAIL}
                        errorMessage="Please enter a valid email address"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">{t("auth.password")}</Label>
                      <div className="relative">
                        <Input 
                          id="signup-password" 
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="h-12 pr-10"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                      
                      {/* Password strength meter */}
                      <div className="mt-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-xs">Password strength</span>
                          <span className="text-xs">
                            {passwordStrength.score === 0 && "Very weak"}
                            {passwordStrength.score === 1 && "Weak"}
                            {passwordStrength.score === 2 && "Fair"}
                            {passwordStrength.score === 3 && "Good"}
                            {passwordStrength.score === 4 && "Strong"}
                            {passwordStrength.score === 5 && "Very strong"}
                          </span>
                        </div>
                        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              passwordStrength.score === 0 ? 'bg-destructive/30 w-0' :
                              passwordStrength.score === 1 ? 'bg-destructive w-1/5' :
                              passwordStrength.score === 2 ? 'bg-orange-500 w-2/5' :
                              passwordStrength.score === 3 ? 'bg-yellow-500 w-3/5' :
                              passwordStrength.score === 4 ? 'bg-green-500 w-4/5' :
                              'bg-green-600 w-full'
                            }`}
                          />
                        </div>
                      </div>
                      
                      {/* Password requirements */}
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center gap-1">
                          <Lock className="h-3 w-3 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">Password requirements:</p>
                        </div>
                        <ul className="space-y-1">
                          {requirements.map((req, index) => (
                            <li 
                              key={index} 
                              className={`text-xs flex items-center gap-1 ${
                                req.regex.test(password) 
                                  ? 'text-green-500' 
                                  : 'text-muted-foreground'
                              }`}
                            >
                              {req.regex.test(password) ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <div className="h-3 w-3 border rounded-full" />
                              )}
                              {req.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col px-6 pb-6">
                    <Button type="submit" className="w-full h-12" disabled={isLoading || passwordStrength.score < 4}>
                      {isLoading ? t("auth.creating") : t("auth.create")}
                    </Button>
                  </CardFooter>
                </form>
            </TabsContent>
          </Tabs>
        </Card>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Lock className="h-3 w-3" />
            <span>Secured by advanced encryption</span>
          </div>
          <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
