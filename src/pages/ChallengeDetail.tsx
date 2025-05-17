import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchChallengeById, fetchChallengeSubmissions, Challenge, Submission } from "@/services/challengeService";

export default function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(true);
  const [errorSubmissions, setErrorSubmissions] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      setError(null);
      try {
        const challengeData = await fetchChallengeById(id);
        setChallenge(challengeData);
      } catch (err: any) {
        setError("Failed to load challenge details");
      } finally {
        setIsLoading(false);
      }
    };

    const loadSubmissions = async () => {
      if (!id) return;
      
      setIsLoadingSubmissions(true);
      setErrorSubmissions(null);
      try {
        const fetchedSubmissions = await fetchChallengeSubmissions(id);
        setSubmissions(fetchedSubmissions);
      } catch (err) {
        setErrorSubmissions("Failed to load submissions.");
      } finally {
        setIsLoadingSubmissions(false);
      }
    };

    fetchData();
    loadSubmissions();
  }, [id]);

  if (isLoading) {
    return <div className="container py-8 text-center">Loading challenge details...</div>;
  }

  if (error || !challenge) {
    return <div className="container py-8 text-center text-red-500">{error || "Challenge not found."}</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link to="/challenges" className="text-sm text-muted-foreground hover:text-primary">
              Challenges
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm">{challenge.title}</span>
          </div>
          <h1 className="text-3xl font-bold">{challenge.title}</h1>
        </div>
        <Button asChild>
          <Link to={`/submit/${challenge.id}`}>Submit Solution</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  {/* You can add sponsor logo if available */}
                  <AvatarFallback>S</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Sponsored by</p>
                  <p className="font-medium">Sponsor</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <Badge variant="outline">
                  {challenge.difficulty ? challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1) : ""}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prize</p>
                <p className="font-bold text-lg">{challenge.prize_amount ? `$${challenge.prize_amount}` : ""}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="font-medium">{challenge.deadline ? new Date(challenge.deadline).toLocaleDateString() : ""}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-medium">{challenge.category}</p>
              </div>
              <Separator />
              <div>
                <p className="text-sm text-muted-foreground">Description</p>
                <p>{challenge.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Requirements</p>
                <p>{challenge.requirements}</p>
              </div>
            </CardContent>
          </Card>
          {/* Leaderboard */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top submissions for this challenge</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingSubmissions ? (
                <div className="text-center py-4">Loading leaderboard...</div>
              ) : errorSubmissions ? (
                <div className="text-center text-red-500 py-4">{errorSubmissions}</div>
              ) : submissions.length === 0 ? (
                <div className="text-center py-4">No submissions yet. Be the first to submit!</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Rank</th>
                        <th className="text-left py-3 px-4">Participant</th>
                        <th className="text-left py-3 px-4">Submission</th>
                        <th className="text-left py-3 px-4">Score</th>
                        <th className="text-left py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((submission, index) => (
                        <tr key={submission.id} className="border-b last:border-b-0 hover:bg-muted/50">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4 flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarImage src={submission.user_avatar || "/placeholder-avatar.jpg"} />
                              <AvatarFallback>{submission.user_name?.charAt(0) || 'U'}</AvatarFallback>
                            </Avatar>
                            <span>{submission.user_name || 'Unknown User'}</span>
                          </td>
                          <td className="py-3 px-4">
                            <a href={submission.repository_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              {submission.title || 'Submission'}
                            </a>
                          </td>
                          <td className="py-3 px-4">{submission.score ?? 'N/A'}</td>
                          <td className="py-3 px-4">{new Date(submission.submission_date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Sidebar or extra info can go here */}
      </div>
    </div>
  );
}
