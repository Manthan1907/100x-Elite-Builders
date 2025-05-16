
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Calendar, LineChart, PlusCircle, Trophy } from "lucide-react";

export default function SponsorDashboard() {
  const sponsoredChallenges = [
    {
      id: 1,
      title: "Multimodal Learning System",
      status: "active",
      participants: 48,
      deadline: "May 30, 2025",
      submissions: 15,
    },
    {
      id: 2,
      title: "Reinforcement Learning Agent",
      status: "planned",
      participants: 0,
      deadline: "June 15, 2025",
      submissions: 0,
    }
  ];

  const topSubmissions = [
    {
      id: 1,
      challengeId: 1,
      title: "Neural Multimodal Processor",
      candidateName: "Alex Johnson",
      candidateId: 1,
      score: 94.5,
    },
    {
      id: 2,
      challengeId: 1,
      title: "AudioVision ML System",
      candidateName: "Taylor Smith",
      candidateId: 2,
      score: 91.2,
    },
    {
      id: 3,
      challengeId: 1,
      title: "Integrated Perception Network",
      candidateName: "Jordan Lee",
      candidateId: 3,
      score: 88.7,
    },
  ];

  const recentEvents = [
    {
      id: 1,
      type: "submission",
      message: "New submission for Multimodal Learning System",
      date: "1 hour ago",
    },
    {
      id: 2,
      type: "score",
      message: "Challenge review completed",
      date: "1 day ago",
    },
    {
      id: 3,
      type: "deadline",
      message: "Multimodal Learning System deadline approaching in 5 days",
      date: "2 days ago",
    },
  ];

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Sponsor Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, Acme Corporation!</p>
            </div>
            <Button asChild>
              <Link to="/create-challenge">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Challenge
              </Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sponsorship Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <Trophy className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-muted-foreground text-sm">Challenges Sponsored</p>
                  <p className="text-4xl font-bold">2</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <LineChart className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-muted-foreground text-sm">Total Participants</p>
                  <p className="text-4xl font-bold">48</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-muted-foreground text-sm">Active Until</p>
                  <p className="text-4xl font-bold">120<span className="text-sm font-normal">days</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Your Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="planned">Planned</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
                <TabsContent value="active" className="space-y-4">
                  {sponsoredChallenges
                    .filter(challenge => challenge.status === "active")
                    .map((challenge) => (
                    <Card key={challenge.id} className="hover:bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <Link to={`/challenge/${challenge.id}`} className="font-medium hover:text-primary">
                              {challenge.title}
                            </Link>
                            <div className="text-sm text-muted-foreground">Deadline: {challenge.deadline}</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">{challenge.participants} Participants</div>
                              <div className="text-sm text-muted-foreground">{challenge.submissions} Submissions</div>
                            </div>
                            <Badge variant="sponsor">Active</Badge>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/challenge/${challenge.id}/manage`}>Manage</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="planned" className="space-y-4">
                  {sponsoredChallenges
                    .filter(challenge => challenge.status === "planned")
                    .map((challenge) => (
                    <Card key={challenge.id} className="hover:bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <Link to={`/challenge/${challenge.id}`} className="font-medium hover:text-primary">
                              {challenge.title}
                            </Link>
                            <div className="text-sm text-muted-foreground">Planned launch: {challenge.deadline}</div>
                          </div>
                          <div className="flex items-center gap-4">
                            <Badge variant="outline">Planned</Badge>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/challenge/${challenge.id}/edit`}>Edit</Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                <TabsContent value="completed" className="text-center py-12 text-muted-foreground">
                  No completed challenges yet.
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSubmissions.map((submission, index) => (
                  <Card key={submission.id} className="hover:bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full w-8 h-8 bg-muted flex items-center justify-center font-medium">
                            {index + 1}
                          </div>
                          <div>
                            <Link to={`/submission/${submission.id}`} className="font-medium hover:text-primary">
                              {submission.title}
                            </Link>
                            <div className="text-sm text-muted-foreground">
                              by <Link to={`/profile/${submission.candidateId}`} className="hover:underline">{submission.candidateName}</Link>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-sm font-medium">Score</div>
                            <div className="text-lg font-mono font-bold">{submission.score.toFixed(1)}</div>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/submission/${submission.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.id} className="p-3 rounded-lg bg-muted/30">
                  <div className="flex items-start gap-2">
                    <Bell className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                    <div>
                      <p className="font-medium">{event.message}</p>
                      <div className="text-sm text-muted-foreground mt-1">{event.date}</div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sponsorship Status</CardTitle>
              <CardDescription>Gold Tier Sponsor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mb-4">
                <div className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">Gold Benefits</div>
                <ul className="text-sm space-y-2 text-yellow-800 dark:text-yellow-300">
                  <li>• Featured logo placement</li>
                  <li>• Up to 3 concurrent challenges</li>
                  <li>• Detailed analytics and reporting</li>
                  <li>• Custom badge for winners</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full">
                Manage Subscription
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Our sponsor success team is here to help you create effective challenges and get the most out of your sponsorship.
              </p>
              <Button variant="outline" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
