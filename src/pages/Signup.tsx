
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Lock, User } from "lucide-react";

export default function Signup() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('type') === 'sponsor' ? 'sponsor' : 'candidate';
  const [userType, setUserType] = useState<"candidate" | "sponsor">(defaultTab as "candidate" | "sponsor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [githubUsername, setGithubUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate(userType === "candidate" ? "/candidate-dashboard" : "/sponsor-dashboard");
      }
    };
    
    checkSession();
  }, [navigate, userType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        title: "Terms agreement required",
        description: "You must agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Additional metadata based on user type
      const metadata = userType === "candidate" 
        ? { 
            name,
            github_username: githubUsername,
            user_type: userType 
          } 
        : { 
            name,
            company_name: companyName,
            user_type: userType 
          };

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        }
      });

      if (error) throw error;

      toast({
        title: "Account created",
        description: `Welcome to AIBuilders! Your ${userType} account has been created.`
      });
      
      navigate(userType === "candidate" ? "/onboarding" : "/sponsor-onboarding");
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "There was an error creating your account",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignup = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/onboarding`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "GitHub signup failed",
        description: error.message,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding`
        }
      });
      
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Google signup failed",
        description: error.message,
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Choose your account type to get started with AIBuilders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue={userType} onValueChange={(value) => setUserType(value as "candidate" | "sponsor")}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="candidate">Candidate</TabsTrigger>
                <TabsTrigger value="sponsor">Sponsor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="candidate" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="name" 
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters and include a number and symbol
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Username (Optional)</Label>
                    <Input 
                      id="github" 
                      placeholder="github-username"
                      value={githubUsername}
                      onChange={(e) => setGithubUsername(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Candidate Account"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="sponsor" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      placeholder="Acme Corporation"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sponsor-name">Contact Person</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="sponsor-name" 
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="sponsor-email" 
                        type="email" 
                        placeholder="j.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="sponsor-password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters and include a number and symbol
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="sponsor-terms" 
                      checked={acceptTerms}
                      onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    />
                    <label
                      htmlFor="sponsor-terms"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link to="/terms" className="text-primary hover:underline">
                        terms and conditions
                      </Link>
                    </label>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Sponsor Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                type="button" 
                disabled={isLoading}
                onClick={handleGithubSignup}
              >
                GitHub
              </Button>
              <Button 
                variant="outline" 
                type="button" 
                disabled={isLoading}
                onClick={handleGoogleSignup}
              >
                Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
