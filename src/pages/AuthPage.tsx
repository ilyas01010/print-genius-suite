
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmail, signUpWithEmail } from "@/lib/supabase-client";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/context/LanguageContext";

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const { t } = useLanguage();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/");
    return null;
  }

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

    try {
      setIsLoading(true);
      const { error } = await signInWithEmail(email, password);
      
      if (error) {
        throw error;
      }

      // Success is handled by the auth listener in UserContext
      navigate("/");
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

    if (password.length < 6) {
      toast({
        title: t("auth.passwordTooShort"),
        description: t("auth.passwordRequirement"),
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center gap-2 font-heading font-bold text-2xl">
            <div className="bg-primary/10 text-primary p-1.5 rounded-md">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
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
                        <Label htmlFor="password">{t("auth.password")}</Label>
                        <a href="#" className="text-xs text-primary hover:underline underline-offset-4">
                          {t("auth.forgot")}
                        </a>
                      </div>
                      <Input 
                        id="password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col px-6 pb-6">
                    <Button type="submit" className="w-full h-12" disabled={isLoading}>
                      {isLoading ? t("auth.signingIn") : t("auth.signIn")}
                    </Button>
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
                      <Label htmlFor="signup-password">{t("auth.password")}</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-12"
                      />
                      <p className="text-xs text-muted-foreground">
                        {t("auth.passwordRequirement")}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col px-6 pb-6">
                    <Button type="submit" className="w-full h-12" disabled={isLoading}>
                      {isLoading ? t("auth.creating") : t("auth.create")}
                    </Button>
                  </CardFooter>
                </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
