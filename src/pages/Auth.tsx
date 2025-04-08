
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signInWithEmail, signUpWithEmail } from "@/lib/supabase-client";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validatePassword, PASSWORD_MIN_LENGTH } from "@/lib/security/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, AlertTriangle, Lock, Eye, EyeOff, Check } from "lucide-react";

interface AuthState {
  from?: Location;
}

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    feedback: string[];
  }>({ score: 0, feedback: [] });
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useUser();
  const state = location.state as AuthState;
  const from = state?.from?.pathname || "/";
  
  const requirements = [
    { regex: new RegExp(`^.{${PASSWORD_MIN_LENGTH},}$`), text: `At least ${PASSWORD_MIN_LENGTH} characters` },
    { regex: /[A-Z]/, text: "At least one uppercase letter" },
    { regex: /[a-z]/, text: "At least one lowercase letter" },
    { regex: /[0-9]/, text: "At least one number" },
    { regex: /[^A-Za-z0-9]/, text: "At least one special character" },
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated, navigate, from]);

  // Password strength evaluation
  useEffect(() => {
    if (!password) {
      setPasswordStrength({ score: 0, feedback: [] });
      return;
    }
    
    const { valid, errors } = validatePassword(password);
    
    let score = 0;
    const metRequirements = requirements.filter(req => req.regex.test(password)).length;
    score = Math.min(5, metRequirements);
    
    setPasswordStrength({
      score,
      feedback: valid ? [] : errors,
    });
  }, [password]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await signInWithEmail(email, password);
      
      if (error) {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 5) {
          toast({
            title: "Too many attempts",
            description: "Please try again later or reset your password",
            variant: "destructive",
          });
          throw new Error("Too many failed login attempts");
        }
        
        throw error;
      }
      
      // Success - redirect
      setLoginAttempts(0);
      navigate(from);
    } catch (error: any) {
      console.error("Sign in error:", error);
      toast({
        title: "Sign in failed",
        description: error.message || "Please check your credentials and try again",
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
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

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
        title: "Success",
        description: "Registration successful. You can now sign in.",
      });
      
      // Switch to sign-in tab
      document.getElementById("signin-tab")?.click();
    } catch (error: any) {
      console.error("Sign up error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "An error occurred during registration",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
          <p className="text-muted-foreground">Your design platform for print-on-demand success</p>
        </div>

        <Card className="border-none shadow-lg">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger id="signin-tab" value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
                <CardHeader className="px-6">
                  <CardTitle>Welcome back</CardTitle>
                  <CardDescription>
                    Enter your credentials to access your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignIn}>
                  <CardContent className="space-y-4 px-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button variant="link" className="h-auto p-0 text-xs" type="button">
                          Forgot password?
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
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                    
                    {loginAttempts > 0 && (
                      <div className="mt-4 w-full">
                        <Alert variant="destructive" className="bg-destructive/5 text-destructive text-sm">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Login attempt {loginAttempts} of 5</AlertTitle>
                          <AlertDescription>
                            Your account will be temporarily locked after 5 failed attempts.
                          </AlertDescription>
                        </Alert>
                      </div>
                    )}
                  </CardFooter>
                </form>
            </TabsContent>
            
            <TabsContent value="signup">
                <CardHeader className="px-6">
                  <CardTitle>Create an account</CardTitle>
                  <CardDescription>
                    Enter your details to create your account
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSignUp}>
                  <CardContent className="space-y-4 px-6">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        placeholder="name@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
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
                      
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center gap-1">
                          <Lock className="h-3 w-3" />
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
                    <Button 
                      type="submit" 
                      className="w-full h-12" 
                      disabled={isLoading || passwordStrength.score < 4}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
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

export default Auth;
