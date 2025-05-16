
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SponsorOnboarding() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [sponsorshipLevel, setSponsorshipLevel] = useState("");
  
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogo(event.target.files[0]);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleComplete = async () => {
    setIsLoading(true);
    
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Onboarding completed",
      description: "Your sponsor profile has been set up successfully!"
    });
    
    setIsLoading(false);
    navigate("/sponsor-dashboard");
  };

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sponsor Onboarding</CardTitle>
            <CardDescription>
              Complete your profile to start sponsoring challenges
            </CardDescription>
            <div className="flex justify-center mt-4">
              <Badge variant={step === 1 ? "sponsor" : "outline"} className="mx-1">1. Basic Info</Badge>
              <Badge variant={step === 2 ? "sponsor" : "outline"} className="mx-1">2. Company Details</Badge>
              <Badge variant={step === 3 ? "sponsor" : "outline"} className="mx-1">3. Preferences</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Company Website</Label>
                  <Input 
                    id="website" 
                    type="url" 
                    placeholder="https://example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="companySize">Company Size</Label>
                  <Select value={companySize} onValueChange={setCompanySize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10 employees</SelectItem>
                      <SelectItem value="11-50">11-50 employees</SelectItem>
                      <SelectItem value="51-200">51-200 employees</SelectItem>
                      <SelectItem value="201-500">201-500 employees</SelectItem>
                      <SelectItem value="501+">501+ employees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Technology</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logo">Company Logo</Label>
                  <Input 
                    id="logo" 
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload a square logo, at least 200x200px
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Tell us about your company..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sponsorshipLevel">Sponsorship Level</Label>
                  <Select value={sponsorshipLevel} onValueChange={setSponsorshipLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sponsorship level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bronze">Bronze - Basic visibility</SelectItem>
                      <SelectItem value="silver">Silver - Medium visibility</SelectItem>
                      <SelectItem value="gold">Gold - Premium visibility</SelectItem>
                      <SelectItem value="platinum">Platinum - Featured sponsor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-base">AI Challenge Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge className="cursor-pointer hover:bg-primary" variant="outline">NLP</Badge>
                    <Badge className="cursor-pointer hover:bg-primary" variant="outline">Computer Vision</Badge>
                    <Badge className="cursor-pointer hover:bg-primary" variant="outline">Reinforcement Learning</Badge>
                    <Badge className="cursor-pointer hover:bg-primary" variant="outline">Generative AI</Badge>
                    <Badge className="cursor-pointer hover:bg-primary" variant="outline">ML Ops</Badge>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={handlePrevStep} disabled={isLoading}>
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <Button onClick={handleNextStep} disabled={isLoading}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleComplete} disabled={isLoading}>
                {isLoading ? "Completing..." : "Complete Setup"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
