import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <h1 className="text-4xl font-bold mb-8">Welcome to CollabDraw</h1>
      <p className="text-xl mb-8 text-center max-w-md">
        Create and collaborate on drawings in real-time with your team.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/signin">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
