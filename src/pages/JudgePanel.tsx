
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function JudgePanel() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [submission, setSubmission] = useState({
    id: id || "1",
    title: "LLM-powered Customer Support Bot",
    description: "An intelligent support system that handles customer queries using advanced NLP techniques.",
    autoScore: 87.5,
    manualScore: 0,
    finalScore: 87.5,
    submittedAt: "2025-05-12T14:30:00Z",
    builder: {
      id: 1,
      name: "Sarah Chen",
      username: "schen",
      avatar: "/placeholder.svg"
    },
    rubricScores: {
      implementation: 0,
      innovation: 0,
      impact: 0,
      presentation: 0
    },
    comments: "",
    scoringLogs: [
      { timestamp: "2025-05-12T14:35:22Z", event: "Auto-scoring completed", score: 87.5, by: "System" }
    ],
    repoUrl: "https://github.com/sarahchen/llm-support-bot",
    demoUrl: "https://youtu.be/abc123",
    badges: []
  });

  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  
  const availableBadges = [
    { id: "top10", name: "Top 10%", variant: "top" },
    { id: "winner", name: "Category Winner", variant: "winner" },
    { id: "sponsor", name: "Sponsor Favorite", variant: "sponsor" },
    { id: "innovation", name: "Most Innovative", variant: "success" }
  ];

  const handleRubricChange = (category: keyof typeof submission.rubricScores, value: number[]) => {
    const updatedScores = { 
      ...submission.rubricScores, 
      [category]: value[0]
    };
    
    // Calculate average score across all rubric categories
    const categories = Object.keys(updatedScores).length;
    const totalScore = Object.values(updatedScores).reduce((sum, score) => sum + score, 0);
    const averageManualScore = categories > 0 ? totalScore / categories : 0;
    
    setSubmission({
      ...submission,
      rubricScores: updatedScores,
      manualScore: averageManualScore,
      finalScore: (averageManualScore * 0.7) + (submission.autoScore * 0.3) // 70% manual, 30% auto weighting
    });
  };

  const handleOverrideScore = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const overrideScore = Number(formData.get("overrideScore"));
    
    if (overrideScore >= 0 && overrideScore <= 100) {
      const newLogs = [...submission.scoringLogs, {
        timestamp: new Date().toISOString(),
        event: "Score manually overridden",
        score: overrideScore,
        by: "Admin Judge" // Would be actual judge name in real app
      }];
      
      setSubmission({
        ...submission,
        finalScore: overrideScore,
        scoringLogs: newLogs
      });
      
      toast({
        title: "Score updated",
        description: `Final score has been overridden to ${overrideScore.toFixed(1)}`
      });
    } else {
      toast({
        title: "Invalid score",
        description: "Score must be between 0 and 100",
        variant: "destructive"
      });
    }
  };

  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubmission({
      ...submission,
      comments: e.target.value
    });
  };

  const toggleBadge = (badgeId: string) => {
    setSelectedBadges(prev => 
      prev.includes(badgeId) 
        ? prev.filter(id => id !== badgeId) 
        : [...prev, badgeId]
    );
  };

  const submitReview = () => {
    // Add a log entry for the review submission
    const newLogs = [...submission.scoringLogs, {
      timestamp: new Date().toISOString(),
      event: "Review submitted",
      score: submission.finalScore,
      by: "Admin Judge" // Would be actual judge name in real app
    }];
    
    // Add badges based on selection
    const awardedBadges = availableBadges.filter(badge => 
      selectedBadges.includes(badge.id)
    );
    
    setSubmission({
      ...submission,
      scoringLogs: newLogs,
      badges: awardedBadges
    });
    
    toast({
      title: "Review submitted",
      description: "The submission has been reviewed and badges awarded"
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Judge Submission</h1>
        <Button asChild variant="outline">
          <Link to="/admin/submissions">Back to Submissions</Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {/* Submission details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{submission.title}</CardTitle>
                  <CardDescription>
                    Submitted on {new Date(submission.submittedAt).toLocaleDateString()} by {submission.builder.name}
                  </CardDescription>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <span className="block font-medium">Current Score</span>
                    <span className="text-2xl font-bold">{submission.finalScore.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium mb-1">Description</h3>
                  <p>{submission.description}</p>
                </div>
                
                <div className="flex space-x-4">
                  <div>
                    <h3 className="text-md font-medium mb-1">Repository</h3>
                    <a href={submission.repoUrl} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                      {submission.repoUrl}
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-md font-medium mb-1">Demo</h3>
                    <a href={submission.demoUrl} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                      View Demo
                    </a>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Evaluation Rubric</h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4 font-medium">Implementation Quality</div>
                      <div className="col-span-6">
                        <Slider 
                          value={[submission.rubricScores.implementation]} 
                          max={100} 
                          step={1}
                          onValueChange={(value) => handleRubricChange('implementation', value)} 
                        />
                      </div>
                      <div className="col-span-2 text-right font-mono">
                        {submission.rubricScores.implementation}/100
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4 font-medium">Innovation</div>
                      <div className="col-span-6">
                        <Slider 
                          value={[submission.rubricScores.innovation]} 
                          max={100} 
                          step={1}
                          onValueChange={(value) => handleRubricChange('innovation', value)} 
                        />
                      </div>
                      <div className="col-span-2 text-right font-mono">
                        {submission.rubricScores.innovation}/100
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4 font-medium">Potential Impact</div>
                      <div className="col-span-6">
                        <Slider 
                          value={[submission.rubricScores.impact]} 
                          max={100} 
                          step={1}
                          onValueChange={(value) => handleRubricChange('impact', value)} 
                        />
                      </div>
                      <div className="col-span-2 text-right font-mono">
                        {submission.rubricScores.impact}/100
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4 font-medium">Presentation</div>
                      <div className="col-span-6">
                        <Slider 
                          value={[submission.rubricScores.presentation]} 
                          max={100} 
                          step={1}
                          onValueChange={(value) => handleRubricChange('presentation', value)} 
                        />
                      </div>
                      <div className="col-span-2 text-right font-mono">
                        {submission.rubricScores.presentation}/100
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                  <h3 className="text-md font-medium mb-2">Judge Comments</h3>
                  <Textarea 
                    placeholder="Add detailed feedback for the builder..."
                    rows={5}
                    value={submission.comments}
                    onChange={handleCommentsChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Scoring history */}
          <Card>
            <CardHeader>
              <CardTitle>Scoring History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submission.scoringLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{log.event}</TableCell>
                      <TableCell>{typeof log.score === 'number' ? log.score.toFixed(1) : '-'}</TableCell>
                      <TableCell>{log.by}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* Builder info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={submission.builder.avatar} alt={submission.builder.name} />
                  <AvatarFallback>{submission.builder.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{submission.builder.name}</p>
                  <p className="text-sm text-muted-foreground">@{submission.builder.username}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to={`/profile/${submission.builder.username}`}>View Builder Profile</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Score override */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Override Score</CardTitle>
              <CardDescription>Manually set the final score</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleOverrideScore} className="flex space-x-2">
                <Input 
                  type="number" 
                  name="overrideScore"
                  placeholder="0-100"
                  min="0"
                  max="100"
                  step="0.1"
                  className="flex-1"
                />
                <Button type="submit">Set</Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Badge assignment */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Award Badges</CardTitle>
              <CardDescription>Recognize achievement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {availableBadges.map(badge => (
                  <div 
                    key={badge.id} 
                    className={`p-2 border rounded-md cursor-pointer flex items-center justify-between ${selectedBadges.includes(badge.id) ? 'bg-muted border-primary' : ''}`}
                    onClick={() => toggleBadge(badge.id)}
                  >
                    <Badge variant={badge.variant}>{badge.name}</Badge>
                    <span className="text-xs font-medium">{selectedBadges.includes(badge.id) ? 'Selected' : 'Click to select'}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Submit review */}
          <Card>
            <CardContent className="pt-6">
              <Button className="w-full" onClick={submitReview}>
                Submit Review & Award Badges
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
