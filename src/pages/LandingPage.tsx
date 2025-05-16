
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [email, setEmail] = useState("");

  const features = [
    {
      title: "Solo Challenges",
      description: "Compete in cutting-edge AI challenges from top sponsors",
      icon: "🏆"
    },
    {
      title: "Smart Scoring",
      description: "Get instant LLM-based feedback on your submissions",
      icon: "🧠"
    },
    {
      title: "Global Leaderboard",
      description: "Climb the ranks and build your reputation",
      icon: "📊"
    },
    {
      title: "Career Growth",
      description: "Get discovered by leading AI companies",
      icon: "🚀"
    }
  ];

  const stats = [
    { value: "50+", label: "AI Challenges" },
    { value: "10k+", label: "Builders" },
    { value: "$250K", label: "Prize Money" },
    { value: "24", label: "Company Partners" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-background">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1 space-y-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Build, Compete, & <span className="text-primary">Get Discovered</span>
              </h1>
              <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                Join the platform where AI builders showcase their skills, compete in sponsored challenges, and get discovered by top companies.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link to="/challenges">Explore Challenges</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/signup">Join the Community</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-50"></div>
              <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                <div className="grid grid-cols-2 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <div key={index} className="p-4">
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Our platform helps you showcase your AI skills and get discovered</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="challenge-card">
                <CardHeader>
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Challenges Preview */}
      <section className="py-16 px-4 md:px-6 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Challenges</h2>
            <Button variant="outline" asChild>
              <Link to="/challenges">View All</Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="challenge-card">
                <CardHeader className="relative pb-0">
                  <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                    <span className="badge badge-sponsor">Sponsored</span>
                    <span className="badge badge-deadline">2 days left</span>
                  </div>
                  <div className="h-48 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900 dark:to-blue-900 rounded-t-lg flex items-center justify-center">
                    <div className="text-2xl font-medium">Challenge {i}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardTitle>LLM-powered Customer Support Bot</CardTitle>
                  <CardDescription className="mt-2">
                    Build an AI assistant that can handle customer support queries with human-like understanding.
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="badge badge-level">Intermediate</span>
                    <span className="badge">NLP</span>
                    <span className="badge">LLM</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Prize: $5,000</div>
                  <Button size="sm" asChild>
                    <Link to={`/challenge/${i}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to showcase your AI skills?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join our community of AI builders, compete in exciting challenges, and get discovered by top companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/challenges">Browse Challenges</Link>
            </Button>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
              <Link to="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
