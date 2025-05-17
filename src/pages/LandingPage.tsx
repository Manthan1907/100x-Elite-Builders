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
import { ArrowRight, CheckCircle } from "lucide-react";

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
      {/* Hero Section with coral background and wave */}
      <section className="relative py-20 px-4 md:px-6 bg-gradient-to-b from-coral-500 to-coral-600 text-white overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ 
          borderRadius: '100% 100% 0 0 / 100% 100% 0 0',
          transform: 'translateY(50%)'
        }}></div>
        <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 pt-10 pb-20">
          <div className="flex-1 space-y-6">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-['Helvetica'] font-bold tracking-tight">
                <span className="text-white">100x Elite Builders</span>
              </h1>
              <p className="mt-6 text-xl text-white/90">
                Join the platform where AI builders showcase their skills, compete in sponsored challenges, and get discovered by top companies.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Button size="lg" className="bg-white text-coral-500 hover:bg-white/90" asChild>
                <Link to="/challenges">Explore Challenges <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button size="lg" variant="outline" className="border-coral-500 text-coral-500 hover:bg-coral-50" asChild>
                <Link to="/signup">Join the Community</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-white/20 rounded-lg blur-md"></div>
              <div className="relative bg-white bg-opacity-10 p-6 rounded-lg border border-white/20 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-6 text-center">
                  {stats.map((stat, index) => (
                    <div key={index} className="p-4">
                      <div className="text-3xl md:text-4xl font-bold font-display">{stat.value}</div>
                      <div className="text-sm text-white/80 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is 100x Engineers */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Helvetica'] font-bold">What is 100x Elite Builders?</h2>
            <div className="w-20 h-1 bg-coral-500 mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A global community of AI engineers building and competing in challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="challenge-card border-0 shadow-lg">
                <CardHeader>
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <CardTitle className="font-display">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Challenges Preview */}
      <section className="py-20 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold">Featured Challenges</h2>
              <div className="w-20 h-1 bg-coral-500 mt-4"></div>
            </div>
            <Button variant="outline" className="border-coral-500 text-coral-500 hover:bg-coral-50" asChild>
              <Link to="/challenges">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="challenge-card border-0 shadow-lg overflow-hidden">
                <CardHeader className="relative p-0 pb-0">
                  <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
                    <span className="badge badge-sponsor">Sponsored</span>
                    <span className="badge badge-deadline">2 days left</span>
                  </div>
                  <div className="h-48 bg-gradient-to-r from-coral-100 to-coral-200 dark:from-coral-900 dark:to-coral-800 flex items-center justify-center">
                    <div className="text-2xl font-display font-medium text-coral-900 dark:text-coral-100">Challenge {i}</div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardTitle className="font-display">LLM-powered Customer Support Bot</CardTitle>
                  <CardDescription className="mt-3">
                    Build an AI assistant that can handle customer support queries with human-like understanding.
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="badge badge-level">Intermediate</span>
                    <span className="badge bg-gray-100 text-gray-800">NLP</span>
                    <span className="badge bg-gray-100 text-gray-800">LLM</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm font-medium text-gray-700">Prize: $5,000</div>
                  <Button size="sm" className="bg-coral-500 hover:bg-coral-600" asChild>
                    <Link to={`/challenge/${i}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 px-4 md:px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-['Helvetica'] font-bold">Why Join 100x Elite Builders?</h2>
            <div className="w-20 h-1 bg-coral-500 mx-auto mt-4 mb-6"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-coral-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-bold text-lg mb-2">Get Discovered</h3>
                <p className="text-gray-600">Showcase your skills to top AI companies looking for talent</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-coral-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-bold text-lg mb-2">Learn By Doing</h3>
                <p className="text-gray-600">Work on real-world AI challenges that expand your skillset</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-coral-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-bold text-lg mb-2">Win Prizes</h3>
                <p className="text-gray-600">Compete for cash prizes and career opportunities</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-coral-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-bold text-lg mb-2">Build Your Portfolio</h3>
                <p className="text-gray-600">Create impressive projects that stand out to employers</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-coral-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-bold text-lg mb-2">Join a Community</h3>
                <p className="text-gray-600">Connect with fellow AI engineers and sponsors</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CheckCircle className="h-6 w-6 text-coral-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-bold text-lg mb-2">Get Feedback</h3>
                <p className="text-gray-600">Receive expert reviews and improve your skills</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-r from-coral-500 to-coral-600 text-white relative">
        <div className="absolute top-0 left-0 w-full h-16 bg-white" style={{ 
          borderRadius: '0 0 100% 100% / 0 0 100% 100%',
          transform: 'translateY(-50%)'
        }}></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl font-display font-bold mb-4">Ready to showcase your AI skills?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-white/90">
            Join our community of AI builders, compete in exciting challenges, and get discovered by top companies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-coral-500 hover:bg-white/90" asChild>
              <Link to="/signup">Sign Up Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link to="/challenges">Browse Challenges</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
