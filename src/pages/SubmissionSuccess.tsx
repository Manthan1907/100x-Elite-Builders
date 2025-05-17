import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function SubmissionSuccess() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Submission Successful!</h1>
        <p className="text-muted-foreground mb-8">
          Your solution has been submitted and is now being reviewed by our team. You will be notified once your submission is evaluated.
        </p>
        <Button asChild className="mb-2 w-full">
          <Link to="/challenges">Back to Challenges</Link>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link to="/candidate-dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
} 