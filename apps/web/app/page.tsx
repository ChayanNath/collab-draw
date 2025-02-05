import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-4xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Collaborative Drawing
        </h1>
        <p className="text-lg text-muted-foreground">
          Create, collaborate, and share your drawings in real-time with anyone
          around the world.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signin">
            <Button size="lg" variant="default">
              Get Started
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
