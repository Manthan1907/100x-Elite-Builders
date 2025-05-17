import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [isCompleting, setIsCompleting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleComplete = async () => {
    setIsCompleting(true);
    
    // Mock API call (replace with actual profile update later)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Profile setup complete!",
      description: "Your profile has been set up successfully."
    });
    
    setIsCompleting(false);

    // Fetch user role and redirect to appropriate dashboard
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching user role:", error);
      // Redirect to a default page or show an error
      navigate("/"); // Redirect to home or a generic error page
      return;
    }

    const userRole = user?.user_metadata?.user_type;
    if (userRole === "candidate") {
      navigate("/candidate-dashboard");
    } else if (userRole === "sponsor") {
      navigate("/sponsor-dashboard");
    } else {
      // Handle cases where user role is missing or unexpected
      console.error("User role not found or invalid:", userRole);
      navigate("/"); // Redirect to home or a generic error page
    }
  };

  const recommendedChallenges = [
    {
      id: 1,
      title: "LLM-powered Customer Support Bot",
      difficulty: "intermediate",
      tags: ["NLP", "LLM"],
    },
    {
      id: 2,
      title: "Real-time Image Generation API",
      difficulty: "advanced",
      tags: ["Computer Vision", "Diffusion Models"],
    }
  ];

  return (
    <div className="container max-w-3xl py-12">
      <div className="mb-10">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center">
              <div 
                className={`rounded-full w-10 h-10 flex items-center justify-center text-sm font-medium
                  ${i <= step ? "bg-primary text-white" : "bg-muted text-muted-foreground"}`}
              >
                {i}
              </div>
              {i < 3 && (
                <div className="h-1 w-20 mx-2">
                  <div 
                    className={`h-full rounded ${i < step ? "bg-primary" : "bg-muted"}`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <div className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>Connect Profiles</div>
          <div className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>Your Skills</div>
          <div className={step >= 3 ? "text-foreground" : "text-muted-foreground"}>Get Started</div>
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your Profiles</CardTitle>
            <CardDescription>
              Link your professional profiles to enhance your AIBuilders experience
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>GitHub Profile</Label>
              <div className="flex space-x-2">
                <Input placeholder="GitHub Username" />
                <Button>Connect</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Connect your GitHub to automatically import your repositories and skills
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>LinkedIn Profile</Label>
              <div className="flex space-x-2">
                <Input placeholder="LinkedIn URL" />
                <Button>Connect</Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Personal Website</Label>
              <Input placeholder="https://yourwebsite.com" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button onClick={() => setStep(2)}>Continue</Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Skills & Expertise</CardTitle>
            <CardDescription>
              Tell us about your AI skills and experience so we can recommend relevant challenges
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Your Experience Level</Label>
              <Select defaultValue="intermediate">
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Add a skill (e.g., PyTorch, LLMs, Computer Vision)" 
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddSkill();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddSkill}>Add</Button>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {skills.length === 0 && (
                  <div className="text-sm text-muted-foreground">No skills added yet</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea 
                placeholder="Tell us about your background, interests, and what you're looking to accomplish" 
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
            <Button onClick={() => setStep(3)}>Continue</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Ready to Start Building!</CardTitle>
            <CardDescription>
              Here are some challenges we think you might be interested in
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Recommended Challenges</h3>
              
              {recommendedChallenges.map(challenge => (
                <Card key={challenge.id} className="challenge-card">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className={
                        challenge.difficulty === "beginner" ? "bg-green-100 text-green-800" :
                        challenge.difficulty === "intermediate" ? "bg-blue-100 text-blue-800" :
                        challenge.difficulty === "advanced" ? "bg-orange-100 text-orange-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                      </Badge>
                      {challenge.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline">View Challenge</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
            <Button onClick={handleComplete} disabled={isCompleting}>
              {isCompleting ? "Completing Setup..." : "Complete Setup"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
