
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

export default function ChallengeDetail() {
  const { id } = useParams<{ id: string }>();
  
  // Mock data - in a real app this would be fetched based on the id
  const challenge = {
    id: parseInt(id || "1"),
    title: "LLM-powered Customer Support Bot",
    description: "Build an AI assistant that can handle customer support queries with human-like understanding and empathy. The solution should be capable of understanding context, maintaining conversation history, and providing accurate responses to common customer issues.",
    longDescription: `
      <p>In this challenge, you'll build an advanced LLM-powered customer support bot that can handle real customer queries with human-like understanding.</p>
      <p>Your solution will be tested against a dataset of real customer support conversations to evaluate its:</p>
      <ul>
        <li>Ability to understand complex queries</li>
        <li>Accuracy of responses</li>
        <li>Contextual awareness</li>
        <li>Empathy and tone</li>
        <li>Handling of edge cases and escalation scenarios</li>
      </ul>
      <p>The winning solutions will demonstrate optimal performance while maintaining reasonable latency and cost-effectiveness.</p>
    `,
    category: "nlp",
    difficulty: "intermediate",
    sponsor: "OpenAI",
    prize: "$5,000",
    deadline: "May 30, 2025",
    tags: ["NLP", "LLM"],
    sponsorLogo: "/placeholder.svg",
    timeline: [
      { date: "April 15, 2025", event: "Challenge Launch" },
      { date: "May 1, 2025", event: "Q&A Webinar" },
      { date: "May 30, 2025", event: "Submission Deadline" },
      { date: "June 15, 2025", event: "Winners Announced" }
    ],
    requirements: [
      "Solution must be deployable as an API endpoint",
      "Response time should be under 2 seconds",
      "Must handle at least 95% of common customer queries without human intervention",
      "Must include a mechanism to escalate complex issues to human support"
    ],
    prizes: [
      { rank: "1st Place", amount: "$5,000", perks: "Interview opportunity with OpenAI" },
      { rank: "2nd Place", amount: "$2,500", perks: "OpenAI API credits worth $1,000" },
      { rank: "3rd Place", amount: "$1,000", perks: "OpenAI API credits worth $500" }
    ],
    resources: [
      { name: "Challenge Dataset", description: "Sample customer support conversations for testing", downloadUrl: "#" },
      { name: "Evaluation Script", description: "Script to evaluate your solution locally", downloadUrl: "#" },
      { name: "API Documentation", description: "Documentation for submission API", downloadUrl: "#" }
    ],
    leaderboard: [
      { rank: 1, name: "Sarah Chen", score: 95.8, submissionDate: "May 28, 2025" },
      { rank: 2, name: "Alex Johnson", score: 94.3, submissionDate: "May 27, 2025" },
      { rank: 3, name: "Raj Patel", score: 93.1, submissionDate: "May 29, 2025" }
    ]
  };

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
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-6">
              <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: challenge.longDescription }} />
              
              <h3 className="text-xl font-semibold mt-8 mb-4">Requirements</h3>
              <ul className="space-y-2">
                {challenge.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mt-8 mb-4">Prizes</h3>
              <div className="space-y-4">
                {challenge.prizes.map((prize, index) => (
                  <Card key={index} className={index === 0 ? "border-primary" : ""}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="font-semibold">{prize.rank}</div>
                        <div className="text-xl font-bold text-primary">{prize.amount}</div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{prize.perks}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4">Timeline</h3>
              <ol className="relative border-l border-muted">
                {challenge.timeline.map((item, index) => (
                  <li key={index} className="mb-6 ml-6">
                    <span className="absolute flex items-center justify-center w-6 h-6 bg-primary rounded-full -left-3">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </span>
                    <h4 className="font-semibold">{item.event}</h4>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
                  </li>
                ))}
              </ol>
            </TabsContent>

            <TabsContent value="details" className="pt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Detailed challenge specifications will appear here</p>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Download Resources</h3>
              <div className="grid gap-4">
                {challenge.resources.map((resource, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{resource.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription>{resource.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild>
                        <a href={resource.downloadUrl} download>Download</a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="leaderboard" className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Current Leaderboard</h3>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 font-medium bg-muted">
                  <div className="col-span-1">Rank</div>
                  <div className="col-span-5">Participant</div>
                  <div className="col-span-3">Score</div>
                  <div className="col-span-3">Submission Date</div>
                </div>
                <Separator />
                {challenge.leaderboard.map((entry, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 p-4 items-center">
                    <div className="col-span-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center font-medium
                        ${index === 0 ? "bg-yellow-100 text-yellow-800" : 
                          index === 1 ? "bg-gray-100 text-gray-800" : 
                          index === 2 ? "bg-amber-100 text-amber-800" : "bg-muted"}`}>
                        {entry.rank}
                      </div>
                    </div>
                    <div className="col-span-5 flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{entry.name}</span>
                    </div>
                    <div className="col-span-3 font-mono">{entry.score.toFixed(1)}</div>
                    <div className="col-span-3 text-muted-foreground text-sm">{entry.submissionDate}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={challenge.sponsorLogo} alt={challenge.sponsor} />
                  <AvatarFallback>{challenge.sponsor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-muted-foreground">Sponsored by</p>
                  <p className="font-medium">{challenge.sponsor}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Difficulty</p>
                <Badge variant="outline" className={
                  challenge.difficulty === "beginner" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100" :
                  challenge.difficulty === "intermediate" ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100" :
                  challenge.difficulty === "advanced" ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100" :
                  "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100"
                }>
                  {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Prize</p>
                <p className="font-bold text-lg">{challenge.prize}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="font-medium">{challenge.deadline}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Categories</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {challenge.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="pt-2">
                <Button className="w-full" asChild>
                  <Link to={`/submit/${challenge.id}`}>Submit Solution</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
