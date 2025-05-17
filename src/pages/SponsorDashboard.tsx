import { useEffect, useState } from "react";
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
import { useToast } from "@/hooks/use-toast";
import { fetchSponsorChallenges, fetchChallengeSubmissions, Challenge, Submission, approveSubmission } from "@/services/challengeService";
import { useQuery } from "@tanstack/react-query";

export default function SponsorDashboard() {
  const { toast } = useToast();
  const [activeChallenge, setActiveChallenge] = useState<string | null>(null);
  
  // Fetch sponsor's challenges
  const { 
    data: challenges = [], 
    isLoading: isLoadingChallenges,
    error: challengesError
  } = useQuery({
    queryKey: ['sponsorChallenges'],
    queryFn: fetchSponsorChallenges,
  });

  // Fetch submissions for the active challenge if one is selected
  const { 
    data: submissions = [],
    isLoading: isLoadingSubmissions
  } = useQuery({
    queryKey: ['challengeSubmissions', activeChallenge],
    queryFn: () => activeChallenge ? fetchChallengeSubmissions(activeChallenge) : Promise.resolve([]),
    enabled: !!activeChallenge,
  });

  useEffect(() => {
    // If challenges are loaded and there's at least one, set the first one as active
    if (challenges.length > 0 && !activeChallenge) {
      setActiveChallenge(challenges[0].id);
    }
  }, [challenges, activeChallenge]);

  useEffect(() => {
    if (challengesError) {
      toast({
        title: "Error loading challenges",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }, [challengesError, toast]);

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };

  // Helper function to calculate days left until deadline
  const calculateDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Expired";
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "1 day left";
    return `${diffDays} days left`;
  };

  // Filter challenges by status
  const activeChallenges = challenges.filter(c => c.status === 'active');
  const plannedChallenges = challenges.filter(c => c.status === 'draft');
  const completedChallenges = challenges.filter(c => c.status === 'completed');

  // Calculate stats
  const totalParticipants = submissions.length;
  const daysUntilAccountExpiry = 120; // This would come from your subscription service

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-['Helvetica']">Sponsor Dashboard</h1>
              <p className="text-muted-foreground font-['Decima_Mono']">Welcome back!</p>
            </div>
            <Button asChild>
              <Link to="/create-challenge">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Challenge
              </Link>
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-['Helvetica']">Sponsorship Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <Trophy className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-muted-foreground text-sm font-['Decima_Mono']">Challenges Sponsored</p>
                  <p className="text-4xl font-bold font-['Decima_Mono']">{challenges.length}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <LineChart className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-muted-foreground text-sm font-['Decima_Mono']">Total Participants</p>
                  <p className="text-4xl font-bold font-['Decima_Mono']">{totalParticipants}</p>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg text-center">
                  <div className="flex justify-center mb-2">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-muted-foreground text-sm font-['Decima_Mono']">Active Until</p>
                  <p className="text-4xl font-bold font-['Decima_Mono']">{daysUntilAccountExpiry}<span className="text-sm font-normal font-['Decima_Mono']">days</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-['Helvetica']">Your Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingChallenges ? (
                <div className="flex justify-center py-8">
                  <p>Loading challenges...</p>
                </div>
              ) : (
                <Tabs defaultValue="active">
                  <TabsList className="mb-4">
                    <TabsTrigger value="active">Active ({activeChallenges.length})</TabsTrigger>
                    <TabsTrigger value="planned">Planned ({plannedChallenges.length})</TabsTrigger>
                    <TabsTrigger value="completed">Completed ({completedChallenges.length})</TabsTrigger>
                    <TabsTrigger value="submissions">Submissions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active" className="space-y-4">
                    {activeChallenges.length > 0 ? (
                      activeChallenges.map((challenge) => (
                        <Card key={challenge.id} className="hover:bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <Link to={`/challenge/${challenge.id}`} className="font-medium hover:text-primary">
                                  {challenge.title}
                                </Link>
                                <div className="text-sm text-muted-foreground">
                                  Deadline: {formatDate(challenge.deadline)}
                                  <span className="ml-2 font-medium text-orange-500">{calculateDaysLeft(challenge.deadline)}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="text-sm text-muted-foreground">Category</div>
                                  <div className="text-sm font-medium">{challenge.category}</div>
                                </div>
                                <Badge variant="sponsor">Active</Badge>
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/challenge/${challenge.id}/manage`}>Manage</Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No active challenges. Create one to get started!</p>
                        <Button variant="link" asChild className="mt-2">
                          <Link to="/create-challenge">Create Challenge</Link>
                        </Button>
                      </div>
                    )}
                    
                    {/* Submissions for the Active Challenge */}
                    {activeChallenge && ( // Only show submissions if a challenge is selected
                      <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4 font-['Helvetica']">Submissions for Selected Challenge</h3>
                         {isLoadingSubmissions ? (
                           <div className="flex justify-center py-8">
                             <p>Loading submissions...</p>
                           </div>
                         ) : submissions.length === 0 ? (
                           <div className="text-center py-8">
                             <p className="text-muted-foreground">No submissions for this challenge yet.</p>
                           </div>
                         ) : (
                           <div className="space-y-4">
                            {submissions.map((submission) => (
                               <Card key={submission.id} className="hover:bg-muted/30">
                                 <CardContent className="p-4">
                                   <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                     <div>
                                       <Link to={`/submission/${submission.id}`} className="font-medium hover:text-primary">
                                         {submission.title || 'Submission'}
                                       </Link>
                                       <div className="text-sm text-muted-foreground">
                                         Submitted by {submission.user_name || 'Unknown User'} on {new Date(submission.created_at).toLocaleDateString()}
                                       </div>
                                     </div>
                                     <div className="flex items-center gap-2">
                                       <Badge variant={
                                         submission.status === "under-review" ? "outline" :
                                         submission.status === "scored" ? "secondary" :
                                         submission.status === "approved" ? "default" : "outline"
                                       }>
                                         {submission.status === "under-review" ? "Under Review" :
                                          submission.status === "scored" ? "Scored" :
                                          submission.status === "approved" ? "Approved" : submission.status}
                                       </Badge>
                                       {submission.status !== 'approved' && (
                                          <Button
                                           variant="outline"
                                            size="sm"
                                            onClick={async () => {
                                              try {
                                                await approveSubmission(submission.id);
                                                toast({
                                                  title: "Submission Approved",
                                                  description: "The submission has been marked as approved.",
                                                });
                                                // TODO: Refetch submissions after approval
                                              } catch (error) {
                                                console.error("Error approving submission:", error);
                                                toast({
                                                  title: "Failed to Approve Submission",
                                                  description: "There was an error approving the submission. Please try again.",
                                                  variant: "destructive",
                                                });
                                              }
                                            }}
                                          >
                                           Approve
                                         </Button>
                                       )}
                                     </div>
                                   </div>
                                 </CardContent>
                               </Card>
                             ))
                           }
                          </div>
                        )}
                      </div>
                     )}
                  </TabsContent>
                  <TabsContent value="planned" className="space-y-4">
                    {plannedChallenges.length > 0 ? (
                      plannedChallenges.map((challenge) => (
                        <Card key={challenge.id} className="hover:bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <Link to={`/challenge/${challenge.id}`} className="font-medium hover:text-primary">
                                  {challenge.title}
                                </Link>
                                <div className="text-sm text-muted-foreground">
                                  Planned launch: {formatDate(challenge.start_date)}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline">Draft</Badge>
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/challenge/${challenge.id}/edit`}>Edit</Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No planned challenges yet.</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="completed" className="space-y-4">
                    {completedChallenges.length > 0 ? (
                      completedChallenges.map((challenge) => (
                        <Card key={challenge.id} className="hover:bg-muted/30">
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div>
                                <Link to={`/challenge/${challenge.id}`} className="font-medium hover:text-primary">
                                  {challenge.title}
                                </Link>
                                <div className="text-sm text-muted-foreground">
                                  Completed: {formatDate(challenge.deadline)}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                  Completed
                                </Badge>
                                <Button variant="outline" size="sm" asChild>
                                  <Link to={`/challenge/${challenge.id}/results`}>View Results</Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No completed challenges yet.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-['Helvetica']">Top Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingSubmissions ? (
                <div className="flex justify-center py-8">
                  <p>Loading submissions...</p>
                </div>
              ) : submissions.length > 0 ? (
                <div className="space-y-4">
                  {submissions.slice(0, 3).map((submission, index) => (
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
                                Submitted: {formatDate(submission.submission_date)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-sm font-medium">Score</div>
                              <div className="text-lg font-mono font-bold">
                                {submission.score ? submission.score.toFixed(1) : "N/A"}
                              </div>
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
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No submissions yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-['Helvetica']">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {challenges.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No recent activity.</p>
                </div>
              ) : (
                <>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <div className="flex items-start gap-2">
                      <Bell className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-500" />
                      <div>
                        <p className="font-medium">
                          {challenges.length > 0 
                            ? `You have ${activeChallenges.length} active challenge${activeChallenges.length !== 1 ? 's' : ''}`
                            : "Welcome to your sponsor dashboard"}
                        </p>
                        <div className="text-sm text-muted-foreground mt-1">Today</div>
                      </div>
                    </div>
                  </div>
                  
                  {activeChallenges.length > 0 && (
                    <div className="p-3 rounded-lg bg-muted/30">
                      <div className="flex items-start gap-2">
                        <Calendar className="h-4 w-4 mt-0.5 flex-shrink-0 text-green-500" />
                        <div>
                          <p className="font-medium">
                            {activeChallenges[0].title} deadline approaching
                          </p>
                          <div className="text-sm text-muted-foreground mt-1">
                            {calculateDaysLeft(activeChallenges[0].deadline)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-['Helvetica']">Sponsorship Status</CardTitle>
              <CardDescription className="font-['Decima_Mono']">Gold Tier Sponsor</CardDescription>
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
              <CardTitle className="font-['Helvetica']">Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground font-['Decima_Mono']">
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
