import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createChallenge, Challenge } from "@/services/challengeService";

type FormValues = {
  title: string;
  description: string;
  requirements: string;
  prize_amount: string;
  prize_description: string;
  deadline: string;
  difficulty: string;
  category: string;
  start_date: string;
};

export default function CreateChallenge() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      prize_amount: "",
      prize_description: "",
      deadline: "",
      difficulty: "medium",
      category: "",
      start_date: new Date().toISOString().slice(0, 10),
    }
  });

  const onSubmit = async (data: FormValues & { start_date: string }) => {
    setIsSubmitting(true);
    
    try {
      const startDate = new Date(data.start_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const status = startDate > today ? "draft" : "active";
      const challengeData: Omit<Challenge, "id" | "created_at" | "updated_at" | "sponsor_id"> = {
        title: data.title,
        description: data.description,
        requirements: data.requirements,
        prize_amount: data.prize_amount ? parseFloat(data.prize_amount) : null,
        prize_description: data.prize_description,
        deadline: new Date(data.deadline).toISOString(),
        start_date: startDate.toISOString(),
        difficulty: data.difficulty,
        category: data.category,
        status,
      };
      
      const challenge = await createChallenge(challengeData);
      
      toast({
        title: "Challenge created",
        description: "Your challenge has been created successfully.",
      });
      
      // Redirect to sponsor dashboard
      navigate("/sponsor-dashboard");
    } catch (error) {
      console.error("Error creating challenge:", error);
      toast({
        title: "Error creating challenge",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create New Challenge</h1>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Challenge Details</CardTitle>
                <CardDescription>
                  Enter the basic information about your challenge.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. LLM-powered Customer Support Bot" {...field} />
                      </FormControl>
                      <FormDescription>
                        A concise title that describes your challenge.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: "Description is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Challenge Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what participants need to build..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Detailed description of the challenge and what you're looking for.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technical Requirements</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="List the technical requirements..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Specific technical requirements or constraints for submissions.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Category & Difficulty</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="category"
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="nlp">Natural Language Processing</SelectItem>
                          <SelectItem value="computer-vision">Computer Vision</SelectItem>
                          <SelectItem value="multimodal">Multimodal</SelectItem>
                          <SelectItem value="code">Code</SelectItem>
                          <SelectItem value="data-science">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The main technology focus of your challenge.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Difficulty Level</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="beginner" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Beginner
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="medium" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Intermediate
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="advanced" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Advanced
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="expert" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Expert
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Prizes & Deadline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="prize_amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prize Amount ($)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="100" placeholder="e.g. 5000" {...field} />
                        </FormControl>
                        <FormDescription>
                          The monetary value of the prize.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="prize_description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prize Details</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. $5,000 + Interview Opportunity" {...field} />
                        </FormControl>
                        <FormDescription>
                          Brief description of prizes and perks.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="start_date"
                  rules={{ required: "Start date is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        The date when the challenge goes live. If in the future, it will be planned/draft until then.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="deadline"
                  rules={{ required: "Deadline is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Submission Deadline</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>
                        The final date for submissions.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate("/sponsor-dashboard")}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Challenge"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
