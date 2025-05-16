
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export default function CandidateDashboard() {
  const userSubmissions = [
    {
      id: 1,
      challengeTitle: "LLM-powered Customer Support Bot",
      challengeId: 1,
      submittedAt: "May 25, 2025",
      status: "under-review",
      score: null,
      feedback: null,
    },
    {
      id: 2,
      challengeTitle: "Multimodal Learning System",
      challengeId: 3,
      submittedAt: "May 10, 2025",
      status: "scored",
      score: 87.5,
      feedback: "Great implementation! The model handles text well but could improve on image processing.",
    },
  ];

  const activeNotifications = [
    {
      id: 1,
      type: "submission-review",
      message: "Your solution for 'Multimodal Learning System' has been reviewed!",
      date: "May 12, 2025",
      read: false,
    },
    {
      id: 2,
      type: "challenge-deadline",
      message: "Reminder: 'LLM-powered Customer Support Bot' deadline is in 3 days.",
      date: "May 22, 2025",
      read: false,
    },
    {
      id: 3,
      type: "badge-unlock",
      message: "You've earned the 'Data Science Pro' badge!",
      date: "May 15, 2025",
      read: true,
    },
  ];

  const recommendedChallenges = [
    {
      id: 4,
      title: "AI-Powered Code Reviewer",
      deadline: "10 days left",
      difficulty: "intermediate",
      tags: ["Code", "Static Analysis"],
    },
    {
      id: 5,
      title: "Conversational AI for Education",
      deadline: "14 days left",
      difficulty: "beginner",
      tags: ["NLP", "Education"],
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Candidate Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, User!</p>
            </div>
            <Button asChild>
              <Link to="/challenges">Find Challenges</Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Participations</p>
                  <p className="text-4xl font-bold">5</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Total Score</p>
                  <p className="text-4xl font-bold">875</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <p className="text-muted-foreground text-sm">Global Rank</p>
                  <p className="text-4xl font-bold">#42</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="all">All</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="space-y-4">
                  {userSubmissions.map((submission) => (
                    <Card key={submission.id} className="hover:bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <Link to={`/challenge/${submission.challengeId}`} className="font-medium hover:text-primary">
                              {submission.challengeTitle}
                            </Link>
                            <div className="text-sm text-muted-foreground">Submitted on {submission.submittedAt}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              submission.status === "under-review" ? "outline" :
                              submission.status === "scored" ? "secondary" : "default"
                            }>
                              {submission.status === "under-review" ? "Under Review" :
                              submission.status === "scored" ? "Scored" : submission.status}
                            </Badge>
                            {submission.score && (
                              <span className="font-mono font-medium">{submission.score.toFixed(1)}</span>
                            )}
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/submission/${submission.id}`}>View</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="completed" className="text-center py-12 text-muted-foreground">
                  No completed submissions yet.
                </TabsContent>
                <TabsContent value="all" className="text-center py-12 text-muted-foreground">
                  All your submissions will appear here.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeNotifications.length > 0 ? (
                activeNotifications.map((notification) => (
                  <div key={notification.id} className={`p-3 rounded-lg ${notification.read ? "bg-muted/30" : "bg-accent"}`}>
                    <p className="font-medium">{notification.message}</p>
                    <div className="text-sm text-muted-foreground mt-1">{notification.date}</div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No new notifications
                </p>
              )}
            </CardContent>
            {activeNotifications.length > 0 && (
              <CardFooter>
                <Button variant="outline" className="w-full">Mark all as read</Button>
              </CardFooter>
            )}
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Challenges</CardTitle>
              <CardDescription>Based on your profile and skills</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedChallenges.map((challenge) => (
                <Card key={challenge.id} className="challenge-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/challenge/${challenge.id}`} className="font-medium hover:text-primary">
                          {challenge.title}
                        </Link>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className={
                            challenge.difficulty === "beginner" ? "bg-green-100 text-green-800" :
                            challenge.difficulty === "intermediate" ? "bg-blue-100 text-blue-800" :
                            "bg-orange-100 text-orange-800"
                          }>
                            {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                          </Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className="badge-deadline">
                        {challenge.deadline}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-2 px-4">
                    <Button size="sm" variant="outline" asChild className="w-full">
                      <Link to={`/challenge/${challenge.id}`}>View Challenge</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <div className="flex flex-col items-center p-2">
                  <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-1">
                    🏆
                  </div>
                  <p className="text-xs">First Win</p>
                </div>
                <div className="flex flex-col items-center p-2">
                  <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center mb-1">
                    🧠
                  </div>
                  <p className="text-xs">NLP Pro</p>
                </div>
                <div className="flex flex-col items-center p-2">
                  <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-1 opacity-30">
                    🔄
                  </div>
                  <p className="text-xs text-muted-foreground">Locked</p>
                </div>
                <div className="flex flex-col items-center p-2">
                  <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-1 opacity-30">
                    🚀
                  </div>
                  <p className="text-xs text-muted-foreground">Locked</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
