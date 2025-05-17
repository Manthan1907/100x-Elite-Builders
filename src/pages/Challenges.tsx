import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSponsorChallenges, Challenge } from "@/services/challengeService";

export default function ChallengesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const allChallenges = await fetchSponsorChallenges();
        // Only show active challenges
        setChallenges(allChallenges.filter((c: Challenge) => c.status === "active"));
      } catch (err: any) {
        setError("Failed to load challenges");
      } finally {
        setIsLoading(false);
      }
    };
    fetchChallenges();
  }, []);

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(search.toLowerCase()) || 
                         challenge.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold">Challenges</h1>
        <Button asChild>
          <Link to="/submit">Submit Solution</Link>
        </Button>
      </div>
      <Tabs defaultValue="active" className="mb-8">
        <TabsList>
          <TabsTrigger value="active">Active Challenges</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="pt-4">
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input 
                placeholder="Search challenges..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="nlp">NLP</SelectItem>
                  <SelectItem value="computer-vision">Computer Vision</SelectItem>
                  <SelectItem value="multimodal">Multimodal</SelectItem>
                  <SelectItem value="code">Code</SelectItem>
                  <SelectItem value="data-science">Data Science</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Challenge Cards */}
          {isLoading ? (
            <div className="text-center py-12">Loading challenges...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredChallenges.length > 0 ? (
                filteredChallenges.map((challenge) => (
                  <Card key={challenge.id} className="challenge-card">
                    <CardHeader className="relative pb-0">
                      <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                        <span className="badge badge-deadline">{challenge.deadline ? new Date(challenge.deadline).toLocaleDateString() : ""}</span>
                      </div>
                      <div className="h-36 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-t-lg flex items-center justify-center">
                        <div className="h-12 w-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                          {/* You may want to add sponsor logo if available */}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-center mb-2">
                        <span className="text-xs text-muted-foreground">Sponsored by</span>
                        <span className="ml-1 text-sm font-medium">Sponsor</span>
                      </div>
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription className="mt-2 line-clamp-2">
                        {challenge.description}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline">
                          {challenge.difficulty ? challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1) : ""}
                        </Badge>
                        {/* Add tags if available */}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm font-semibold">{challenge.prize_amount ? `$${challenge.prize_amount}` : ""}</div>
                      <Button size="sm" asChild>
                        <Link to={`/challenge/${challenge.id}`}>View Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12">
                  <p className="text-muted-foreground">No challenges match your criteria</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("all");
                      setSelectedDifficulty("all");
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="upcoming" className="pt-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Upcoming challenges will appear here</p>
          </div>
        </TabsContent>
        <TabsContent value="past" className="pt-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Past challenges will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
