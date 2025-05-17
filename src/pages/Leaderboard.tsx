import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, BadgeVariant } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Trophy, Star } from "lucide-react";
import { fetchAllSubmissions, fetchAllChallenges, fetchChallengeSubmissions, Submission } from "@/services/challengeService";

// Define types for badge objects
type BadgeInfo = {
  name: string;
  description: string;
  variant: BadgeVariant;
}

// Define type for leader objects
type Leader = {
  id: number;
  rank: number;
  name: string;
  username: string;
  avatar: string;
  score: number;
  badges: BadgeInfo[];
  wins: number;
  participations: number;
}

// Define type for participant objects
type Participant = {
  id: number;
  rank: number;
  name: string;
  username: string;
  avatar: string;
  score: number;
  badges?: BadgeInfo[];
}

// Define type for challenge objects
type Challenge = {
  challengeId: number;
  title: string;
  participants: Participant[];
}

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState("all-time");
  const [searchQuery, setSearchQuery] = useState("");
  const [globalSubmissions, setGlobalSubmissions] = useState<Submission[]>([]);
  const [challenges, setChallenges] = useState<{ id: string; title: string }[]>([]);
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(null);
  const [challengeSubmissions, setChallengeSubmissions] = useState<Submission[]>([]);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(true);
  const [errorGlobal, setErrorGlobal] = useState<string | null>(null);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState(true);
  const [errorChallenges, setErrorChallenges] = useState<string | null>(null);
  const [isLoadingChallengeSubmissions, setIsLoadingChallengeSubmissions] = useState(false);
  const [errorChallengeSubmissions, setErrorChallengeSubmissions] = useState<string | null>(null);

  // Fetch global submissions and challenges on mount
  useEffect(() => {
    const loadGlobalData = async () => {
      setIsLoadingGlobal(true);
      setErrorGlobal(null);
      try {
        const submissions = await fetchAllSubmissions();
        // For global leaderboard, we'll display submissions directly, sorted by score
        // If true global ranking across challenges is needed, more complex logic would be required here
        setGlobalSubmissions(submissions);
      } catch (err) {
        console.error("Error fetching global submissions:", err);
        setErrorGlobal("Failed to load global leaderboard.");
      } finally {
        setIsLoadingGlobal(false);
      }
    };

    const loadChallenges = async () => {
      setIsLoadingChallenges(true);
      setErrorChallenges(null);
      try {
        const challengeList = await fetchAllChallenges();
        setChallenges(challengeList);
        // Set the first challenge as selected by default if list is not empty
        if (challengeList.length > 0) {
          setSelectedChallengeId(challengeList[0].id);
        }
      } catch (err) {
        console.error("Error fetching challenges:", err);
        setErrorChallenges("Failed to load challenges.");
      } finally {
        setIsLoadingChallenges(false);
      }
    };

    loadGlobalData();
    loadChallenges();
  }, []);

  // Fetch submissions for selected challenge
  useEffect(() => {
    if (!selectedChallengeId) {
      setChallengeSubmissions([]); // Clear submissions if no challenge is selected
      setIsLoadingChallengeSubmissions(false);
      return;
    }

    const loadChallengeSubmissions = async () => {
      setIsLoadingChallengeSubmissions(true);
      setErrorChallengeSubmissions(null);
      try {
        const submissions = await fetchChallengeSubmissions(selectedChallengeId);
        setChallengeSubmissions(submissions);
      } catch (err) {
        console.error("Error fetching challenge submissions:", err);
        setErrorChallengeSubmissions("Failed to load challenge leaderboard.");
      } finally {
        setIsLoadingChallengeSubmissions(false);
      }
    };

    loadChallengeSubmissions();
  }, [selectedChallengeId]);

  // Filtering logic for global leaderboard (by search query)
  const filteredGlobalLeaders = globalSubmissions.filter(submission =>
    submission.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filtering logic for challenge leaderboard (by search query)
  const filteredChallengeSubmissions = challengeSubmissions.filter(submission =>
    submission.user_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    submission.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBadgeIcon = (badgeName: string) => {
    if (badgeName.includes("Winner") || badgeName.includes("First")) {
      return <Trophy className="h-3 w-3 mr-1" />;
    } else if (badgeName.includes("Top")) {
      return <Star className="h-3 w-3 mr-1" />;
    } else {
      return <Award className="h-3 w-3 mr-1" />;
    }
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
      </div>

      <Tabs defaultValue="global">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="global">Global Rankings</TabsTrigger>
            <TabsTrigger value="challenge">By Challenge</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-4">
            <Input
              placeholder="Search builders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-60"
            />
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="season">Current Season</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="global" className="pt-4">
          <div className="rounded-md border">
            {isLoadingGlobal ? (
              <div className="text-center py-8">Loading global leaderboard...</div>
            ) : errorGlobal ? (
              <div className="text-center text-red-500 py-8">{errorGlobal}</div>
            ) : filteredGlobalLeaders.length === 0 ? (
              <div className="text-center py-8">No global leaders found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted">
                      <th className="text-left py-3 px-4">Rank</th>
                      <th className="text-left py-3 px-4">Builder</th>
                      <th className="text-left py-3 px-4">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGlobalLeaders.map((submission, index) => (
                      <tr key={submission.id} className="border-b last:border-b-0 hover:bg-muted/50">
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4 flex items-center">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={submission.user_avatar || "/placeholder-avatar.jpg"} />
                            <AvatarFallback>{submission.user_name?.charAt(0) || 'U'}</AvatarFallback>
                          </Avatar>
                          <span>{submission.user_name || 'Unknown User'}</span>
                        </td>
                        <td className="py-3 px-4">{submission.score ?? 'N/A'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="challenge" className="pt-4">
          <div className="mb-6 flex items-center space-x-4">
            <div className="flex-1">
              <Input 
                placeholder="Search challenge submissions..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select onValueChange={setSelectedChallengeId} value={selectedChallengeId || ""}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a challenge" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingChallenges ? (
                  <SelectItem value="" disabled>Loading challenges...</SelectItem>
                ) : errorChallenges ? (
                  <SelectItem value="" disabled>Error loading challenges</SelectItem>
                ) : challenges.length === 0 ? (
                  <SelectItem value="" disabled>No challenges available</SelectItem>
                ) : (
                  challenges.map(challenge => (
                    <SelectItem key={challenge.id} value={challenge.id}>{challenge.title}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>

          {isLoadingChallengeSubmissions ? (
            <div className="text-center py-8">Loading challenge leaderboard...</div>
          ) : errorChallengeSubmissions ? (
            <div className="text-center text-red-500 py-8">{errorChallengeSubmissions}</div>
          ) : filteredChallengeSubmissions.length === 0 ? (
            <div className="text-center py-8">No submissions for this challenge yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Rank</th>
                    <th className="text-left py-3 px-4">Participant</th>
                    <th className="text-left py-3 px-4">Submission Title</th>
                    <th className="text-left py-3 px-4">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChallengeSubmissions.map((submission, index) => (
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
                        <Link to={`/submission/${submission.id}`} className="text-blue-600 hover:underline">
                          {submission.title || 'Submission'}
                        </Link>
                      </td>
                      <td className="py-3 px-4">{submission.score ?? 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
