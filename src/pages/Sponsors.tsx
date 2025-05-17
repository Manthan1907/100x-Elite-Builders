
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BadgeCheck, Building2, Globe } from "lucide-react";

export default function Sponsors() {
  const sponsorsList = [
    {
      id: 1,
      name: "Acme Corporation",
      logo: "/placeholder.svg",
      description: "Leading AI research and development",
      challenges: 3,
      website: "https://example.com",
    },
    {
      id: 2,
      name: "TechVentures",
      logo: "/placeholder.svg",
      description: "Pioneering machine learning solutions",
      challenges: 2,
      website: "https://example.com",
    },
    {
      id: 3,
      name: "Future Systems",
      logo: "/placeholder.svg",
      description: "Next-generation computer vision technologies",
      challenges: 1,
      website: "https://example.com",
    },
  ];

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Sponsors</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Meet the organizations that make AIBuilders challenges possible. Our sponsors are industry leaders committed to finding exceptional AI talent.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {sponsorsList.map((sponsor) => (
          <Card key={sponsor.id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={sponsor.logo} alt={sponsor.name} />
                  <AvatarFallback>{sponsor.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {sponsor.name}
                    <BadgeCheck className="h-5 w-5 text-blue-500" />
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {sponsor.challenges} Active Challenge{sponsor.challenges !== 1 ? 's' : ''}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{sponsor.description}</p>
              <div className="flex items-center gap-4 mt-4">
                <Button variant="outline" size="sm" className="gap-1" asChild>
                  <a href={sponsor.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                    <span>Website</span>
                  </a>
                </Button>
                <Button size="sm" className="gap-1" asChild>
                  <Link to={`/sponsor/${sponsor.id}`}>
                    <Building2 className="h-4 w-4" />
                    <span>View Profile</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Become a Sponsor</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-4">
          Join our community of leading organizations and connect with top AI talent. Create custom challenges and find your next star employee.
        </p>
        <Button size="lg" asChild>
          <Link to="/signup?type=sponsor">Become a Sponsor</Link>
        </Button>
      </div>
    </div>
  );
}
