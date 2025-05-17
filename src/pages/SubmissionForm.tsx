import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useToast } from "@/hooks/use-toast";
import { createSubmission } from "@/services/challengeService";

export default function SubmissionForm() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    repository_url: "",
    description: "",
    demo_url: "",
    additionalNotes: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setIsSubmitting(true);
    try {
      const submissionData = {
        challenge_id: id,
        repository_url: formData.repository_url,
        description: formData.description,
        demo_url: formData.demo_url || null,
        additionalNotes: formData.additionalNotes || null
      };

      await createSubmission(submissionData);
      
      toast({
        title: "Submission successful!",
        description: "Your solution has been submitted and is now being reviewed.",
      });
      
      navigate("/submission-success");
    } catch (error: any) {
      console.error("Error during createSubmission call:", error);
      toast({
        title: "Error submitting solution",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link to="/">
              <BreadcrumbLink>Home</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to="/challenges">
              <BreadcrumbLink>Challenges</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link to={`/challenge/${id}`}>
              <BreadcrumbLink>Challenge {id}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Submit</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-8">Submit Your Solution</h1>
      
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-white" : "bg-muted"}`}>
              1
            </div>
            <span className={currentStep >= 1 ? "font-medium" : "text-muted-foreground"}>Project Details</span>
          </div>
          <div className="h-1 w-full max-w-[100px] bg-muted mx-4">
            <div className={`h-full bg-primary ${currentStep >= 2 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-white" : "bg-muted"}`}>
              2
            </div>
            <span className={currentStep >= 2 ? "font-medium" : "text-muted-foreground"}>Media & Documentation</span>
          </div>
          <div className="h-1 w-full max-w-[100px] bg-muted mx-4">
            <div className={`h-full bg-primary ${currentStep >= 3 ? "w-full" : "w-0"} transition-all duration-300`}></div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-white" : "bg-muted"}`}>
              3
            </div>
            <span className={currentStep >= 3 ? "font-medium" : "text-muted-foreground"}>Review & Submit</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {currentStep === 1 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Provide links and information about your submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="repository_url">GitHub Repository URL *</Label>
                <Input 
                  id="repository_url" 
                  placeholder="https://github.com/username/repository"
                  value={formData.repository_url}
                  onChange={(e) => handleChange("repository_url", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Make sure your repository is public or we have access to it
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Solution Description *</Label>
                <Textarea 
                  id="description" 
                  placeholder="Briefly describe your solution and approach..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Explain your approach, key technologies used, and any notable innovations
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="button" onClick={nextStep}>Continue</Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 2 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Media & Documentation</CardTitle>
              <CardDescription>
                Add supporting materials to showcase your solution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="demo_url">Demo Video URL</Label>
                <Input 
                  id="demo_url" 
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={formData.demo_url}
                  onChange={(e) => handleChange("demo_url", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Link to a demo video showcasing your solution (YouTube, Vimeo, etc.)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea 
                  id="additionalNotes" 
                  placeholder="Any additional information you'd like to share..."
                  rows={4}
                  value={formData.additionalNotes}
                  onChange={(e) => handleChange("additionalNotes", e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Include any setup instructions, known limitations, or other relevant information
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
              <Button type="button" onClick={nextStep}>Continue</Button>
            </CardFooter>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>
                Review your submission before final submission
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4 space-y-4">
                <div>
                  <h4 className="font-medium">Repository URL</h4>
                  <p className="text-sm">{formData.repository_url}</p>
                </div>
                <div>
                  <h4 className="font-medium">Solution Description</h4>
                  <p className="text-sm whitespace-pre-line">{formData.description}</p>
                </div>
                {formData.demo_url && (
                  <div>
                    <h4 className="font-medium">Demo Video</h4>
                    <p className="text-sm">{formData.demo_url}</p>
                  </div>
                )}
                {formData.additionalNotes && (
                  <div>
                    <h4 className="font-medium">Additional Notes</h4>
                    <p className="text-sm whitespace-pre-line">{formData.additionalNotes}</p>
                  </div>
                )}
              </div>
              
              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm">
                  <strong>Important:</strong> By submitting, you confirm that this is your original work and you have the rights to submit it. Your submission will be evaluated based on the challenge criteria.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>Back</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Solution"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </div>
  );
}
