import { useState } from "react";
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

  const globalLeaders: Leader[] = [
    { 
      id: 1, 
      rank: 1, 
      name: "Sarah Chen", 
      username: "schen", 
      avatar: "/placeholder.svg", 
      score: 9850, 
      badges: [
        { name: "Top Contributor", description: "Awarded for consistent high-quality submissions", variant: "default" },
        { name: "NLP Specialist", description: "Recognized expertise in Natural Language Processing", variant: "success" }
      ],
      wins: 8,
      participations: 15
    },
    { 
      id: 2, 
      rank: 2, 
      name: "Michael Rodriguez", 
      username: "mrodriguez", 
      avatar: "/placeholder.svg", 
      score: 9720, 
      badges: [
        { name: "Computer Vision Expert", description: "Recognized expertise in Computer Vision models", variant: "success" },
        { name: "Top 10%", description: "Ranked in the top 10% of all builders", variant: "top" }
      ],
      wins: 7,
      participations: 12
    },
    { 
      id: 3, 
      rank: 3, 
      name: "Aisha Patel", 
      username: "apatel", 
      avatar: "/placeholder.svg", 
      score: 9450, 
      badges: [
        { name: "Rising Star", description: "New builder showing exceptional potential", variant: "default" },
        { name: "Multi-modal Master", description: "Excellence in multi-modal AI systems", variant: "success" },
        { name: "Sponsor Favorite", description: "Selected as a favorite by OpenAI", variant: "sponsor" }
      ],
      wins: 6,
      participations: 10
    },
    { 
      id: 4, 
      rank: 4, 
      name: "David Kim", 
      username: "dkim", 
      avatar: "/placeholder.svg", 
      score: 9320, 
      badges: [
        { name: "Code Specialist", description: "Excellence in code-related tasks and systems", variant: "success" },
        { name: "Category Winner", description: "Won first place in the Coding Challenge", variant: "winner" }
      ],
      wins: 5,
      participations: 14
    },
    { 
      id: 5, 
      rank: 5, 
      name: "Emily Johnson", 
      username: "ejohnson", 
      avatar: "/placeholder.svg", 
      score: 9180, 
      badges: [
        { name: "Data Science Pro", description: "Expertise in data science and analytics", variant: "success" }
      ],
      wins: 5,
      participations: 11
    },
    { 
      id: 6, 
      rank: 6, 
      name: "James Wilson", 
      username: "jwilson", 
      avatar: "/placeholder.svg", 
      score: 8950, 
      badges: [
        { name: "LLM Expert", description: "Specialized knowledge in large language models", variant: "success" }
      ],
      wins: 4,
      participations: 9
    },
    { 
      id: 7, 
      rank: 7, 
      name: "Sophie Martinez", 
      username: "smartinez", 
      avatar: "/placeholder.svg", 
      score: 8820, 
      badges: [
        { name: "3x Winner", description: "Won 3 different challenge categories", variant: "winner" }
      ],
      wins: 3,
      participations: 8
    },
    { 
      id: 8, 
      rank: 8, 
      name: "Omar Hassan", 
      username: "ohassan", 
      avatar: "/placeholder.svg", 
      score: 8700, 
      badges: [
        { name: "Consistent Performer", description: "Consistently scores in the top quartile", variant: "default" }
      ],
      wins: 2,
      participations: 12
    },
    { 
      id: 9, 
      rank: 9, 
      name: "Lina Zhang", 
      username: "lzhang", 
      avatar: "/placeholder.svg", 
      score: 8650, 
      badges: [
        { name: "NLP Specialist", description: "Recognized expertise in Natural Language Processing", variant: "success" }
      ],
      wins: 2,
      participations: 7
    },
    { 
      id: 10, 
      rank: 10, 
      name: "Alex Thompson", 
      username: "athompson", 
      avatar: "/placeholder.svg", 
      score: 8540, 
      badges: [
        { name: "Computer Vision Expert", description: "Specialized knowledge in computer vision systems", variant: "success" }
      ],
      wins: 2,
      participations: 6
    },
  ];

  const challengeLeaderboards: Challenge[] = [
    {
      challengeId: 1,
      title: "LLM-powered Customer Support Bot",
      participants: [
        { 
          id: 1, 
          rank: 1, 
          name: "Sarah Chen", 
          username: "schen", 
          avatar: "/placeholder.svg", 
          score: 95.8,
          badges: [
            { name: "Category Winner", description: "Won first place in the LLM Support Bot Challenge", variant: "winner" }
          ]
        },
        { 
          id: 2, 
          rank: 2, 
          name: "Alex Johnson", 
          username: "ajohnson", 
          avatar: "/placeholder.svg", 
          score: 94.3,
          badges: [
            { name: "Top 10%", description: "Ranked in the top 10% for this challenge", variant: "top" }
          ]
        },
        { 
          id: 3, 
          rank: 3, 
          name: "Raj Patel", 
          username: "rpatel", 
          avatar: "/placeholder.svg", 
          score: 93.1,
          badges: [
            { name: "Sponsor Favorite", description: "Selected as a favorite by the challenge sponsor", variant: "sponsor" }
          ]
        }
      ]
    },
    {
      challengeId: 2,
      title: "Real-time Image Generation API",
      participants: [
        { 
          id: 3, 
          rank: 1, 
          name: "Michael Rodriguez", 
          username: "mrodriguez", 
          avatar: "/placeholder.svg", 
          score: 97.2,
          badges: [
            { name: "Category Winner", description: "Won first place in the Image Generation API Challenge", variant: "winner" }
          ]
        },
        { 
          id: 4, 
          rank: 2, 
          name: "Aisha Patel", 
          username: "apatel", 
          avatar: "/placeholder.svg", 
          score: 96.5,
          badges: [
            { name: "Top 10%", description: "Ranked in the top 10% for this challenge", variant: "top" }
          ]
        },
        { 
          id: 5, 
          rank: 3, 
          name: "David Kim", 
          username: "dkim", 
          avatar: "/placeholder.svg", 
          score: 94.8,
          badges: [
            { name: "Sponsor Favorite", description: "Selected as a favorite by the challenge sponsor", variant: "sponsor" }
          ]
        }
      ]
    }
  ];

  const getBadgeIcon = (badgeName: string) => {
    if (badgeName.includes("Winner") || badgeName.includes("First")) {
      return <Trophy className="h-3 w-3 mr-1" />;
    } else if (badgeName.includes("Top")) {
      return <Star className="h-3 w-3 mr-1" />;
    } else {
      return <Award className="h-3 w-3 mr-1" />;
    }
  };

  const filteredLeaders = globalLeaders.filter(leader => 
    leader.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    leader.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
      </div>

      <Tabs defaultValue="global">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="global">Global Rankings</TabsTrigger>
            <TabsTrigger value="challenges">By Challenge</TabsTrigger>
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
            <div className="grid grid-cols-12 gap-4 p-4 font-medium bg-muted">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Builder</div>
              <div className="col-span-2">Score</div>
              <div className="col-span-2">Wins</div>
              <div className="col-span-2">Participations</div>
            </div>
            <Separator />
            
            {filteredLeaders.length > 0 ? (
              filteredLeaders.map((leader, index) => (
                <div key={leader.id}>
                  <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50">
                    <div className="col-span-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium
                        ${leader.rank === 1 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" : 
                          leader.rank === 2 ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" : 
                          leader.rank === 3 ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100" : 
                          "bg-muted text-muted-foreground"}`}>
                        {leader.rank}
                      </div>
                    </div>
                    
                    <div className="col-span-5">
                      <div className="flex items-center gap-3">
                        <Link to={`/profile/${leader.username}`}>
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={leader.avatar} alt={leader.name} />
                            <AvatarFallback>{leader.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <div>
                          <Link to={`/profile/${leader.username}`} className="font-medium hover:text-primary">
                            {leader.name}
                          </Link>
                          <div className="text-sm text-muted-foreground">@{leader.username}</div>
                          <div className="flex gap-1 mt-1 flex-wrap">
                            {leader.badges.map((badge, i) => (
                              <TooltipProvider key={i}>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Badge variant={badge.variant} className="inline-flex gap-1 cursor-help">
                                      {getBadgeIcon(badge.name)}
                                      {badge.name}
                                    </Badge>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{badge.description}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-span-2 font-mono font-semibold text-lg">{leader.score}</div>
                    <div className="col-span-2">{leader.wins}</div>
                    <div className="col-span-2">{leader.participations}</div>
                  </div>
                  {index < filteredLeaders.length - 1 && <Separator />}
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                No builders match your search
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="pt-4">
          <div className="grid gap-8">
            {challengeLeaderboards.map((challenge) => (
              <div key={challenge.challengeId}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-medium">{challenge.title}</h3>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/challenge/${challenge.challengeId}`}>View Challenge</Link>
                  </Button>
                </div>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 font-medium bg-muted">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-6">Builder</div>
                    <div className="col-span-5">Score</div>
                  </div>
                  <Separator />
                  {challenge.participants.map((participant, index) => (
                    <div key={participant.id}>
                      <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50">
                        <div className="col-span-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium
                            ${participant.rank === 1 ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100" : 
                              participant.rank === 2 ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" : 
                              participant.rank === 3 ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100" : 
                              "bg-muted text-muted-foreground"}`}>
                            {participant.rank}
                          </div>
                        </div>
                        
                        <div className="col-span-6">
                          <div className="flex items-center gap-3">
                            <Link to={`/profile/${participant.username}`}>
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={participant.avatar} alt={participant.name} />
                                <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            </Link>
                            <div>
                              <Link to={`/profile/${participant.username}`} className="font-medium hover:text-primary">
                                {participant.name}
                              </Link>
                              <div className="text-sm text-muted-foreground">@{participant.username}</div>
                              <div className="flex gap-1 mt-1 flex-wrap">
                                {participant.badges?.map((badge, i) => (
                                  <TooltipProvider key={i}>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Badge variant={badge.variant} className="inline-flex gap-1 cursor-help">
                                          {getBadgeIcon(badge.name)}
                                          {badge.name}
                                        </Badge>
                                      </TooltipTrigger>
                                      <TooltipContent>
                                        <p className="max-w-xs">{badge.description}</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-5 font-mono">{participant.score.toFixed(1)}</div>
                      </div>
                      {index < challenge.participants.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
