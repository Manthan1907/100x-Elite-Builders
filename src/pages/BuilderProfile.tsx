
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, Award, Trophy, Star } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function BuilderProfile() {
  const { username } = useParams<{ username: string }>();
  const [builder, setBuilder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch builder data
    const fetchBuilder = async () => {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock data - would come from API
      const mockBuilder = {
        id: 1,
        name: "Sarah Chen",
        username: "schen",
        avatar: "/placeholder.svg",
        bio: "AI researcher and engineer specializing in NLP and multimodal systems. Building the future of intelligent interfaces.",
        github: "https://github.com/sarahchen",
        portfolio: "https://sarahchen.dev",
        rank: 1,
        score: 9850,
        participations: 15,
        wins: 8,
        badges: [
          { id: 1, name: "Top Contributor", description: "Awarded to builders who consistently contribute high-quality submissions", variant: "default" },
          { id: 2, name: "NLP Specialist", description: "Recognized expertise in Natural Language Processing challenges", variant: "success" },
          { id: 3, name: "Category Winner", description: "Won first place in the NLP Challenge (May 2025)", variant: "winner" },
          { id: 4, name: "Top 10%", description: "Ranked in the top 10% of all builders", variant: "top" },
          { id: 5, name: "Sponsor Favorite", description: "Selected as a favorite by OpenAI (April 2025)", variant: "sponsor" }
        ],
        projects: [
          { 
            id: 1, 
            title: "LLM-powered Customer Support Bot", 
            description: "An intelligent support system that handles customer queries using advanced NLP techniques.", 
            score: 95.8, 
            rank: 1, 
            challengeId: 1,
            date: "2025-04-15"
          },
          { 
            id: 2, 
            title: "Real-time Image Generation API", 
            description: "A high-performance API for generating images based on text prompts with low latency.", 
            score: 89.5, 
            rank: 3, 
            challengeId: 2,
            date: "2025-03-10"
          },
          { 
            id: 3, 
            title: "Multi-modal Assistant", 
            description: "A sophisticated AI assistant that can process and respond to text, images, and audio inputs.", 
            score: 92.1, 
            rank: 2, 
            challengeId: 3,
            date: "2025-02-22"
          }
        ]
      };
      
      setBuilder(mockBuilder);
      setLoading(false);
    };
    
    fetchBuilder();
  }, [username]);

  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!builder) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Builder not found</h2>
          <p className="mt-4">We couldn't find a builder with the username {username}</p>
          <Button asChild className="mt-6">
            <Link to="/leaderboard">Back to Leaderboard</Link>
          </Button>
        </div>
      </div>
    );
  }

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Builder info sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="text-center">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={builder.avatar} alt={builder.name} />
                <AvatarFallback>{builder.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="mt-4">{builder.name}</CardTitle>
              <CardDescription>@{builder.username}</CardDescription>
              
              <div className="flex items-center justify-center space-x-2 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{builder.rank}</div>
                  <div className="text-sm text-muted-foreground">Rank</div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <div className="text-2xl font-bold">{builder.wins}</div>
                  <div className="text-sm text-muted-foreground">Wins</div>
                </div>
                <Separator orientation="vertical" className="h-12" />
                <div className="text-center">
                  <div className="text-2xl font-bold">{builder.participations}</div>
                  <div className="text-sm text-muted-foreground">Challenges</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="text-center">
              <p className="text-sm mb-6">{builder.bio}</p>
              
              <div className="flex flex-wrap justify-center gap-2">
                {builder.badges.map((badge: any) => (
                  <TooltipProvider key={badge.id}>
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
            </CardContent>
            
            <CardFooter className="flex justify-center space-x-4">
              {builder.github && (
                <Button variant="outline" size="sm" asChild>
                  <a href={builder.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              )}
              {builder.portfolio && (
                <Button variant="outline" size="sm" asChild>
                  <a href={builder.portfolio} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Portfolio
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
        
        {/* Main content area */}
        <div className="col-span-2">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Submissions</h2>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Project</TableHead>
                      <TableHead>Rank</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {builder.projects.map((project: any) => (
                      <TableRow key={project.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-muted-foreground">{project.description}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={project.rank === 1 ? "winner" : "outline"}>
                            {project.rank === 1 ? "1st" : project.rank === 2 ? "2nd" : project.rank === 3 ? "3rd" : `${project.rank}th`}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono">{project.score.toFixed(1)}</TableCell>
                        <TableCell>{new Date(project.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" asChild>
                            <Link to={`/challenge/${project.challengeId}`}>
                              View Challenge
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="badges">
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Earned Badges</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  {builder.badges.map((badge: any) => (
                    <Card key={badge.id}>
                      <CardHeader className="py-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            {getBadgeIcon(badge.name)}
                            <CardTitle className="text-lg ml-2">{badge.name}</CardTitle>
                          </div>
                          <Badge variant={badge.variant}>{badge.variant}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{badge.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
