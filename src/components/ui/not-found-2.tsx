import { Link } from "react-router-dom";
import { HomeIcon, CompassIcon } from "lucide-react";

import { Button } from "./button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "./empty";

export function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background text-foreground">
      <Empty>
        <EmptyHeader>
          <EmptyTitle className="bg-gradient-to-b from-primary to-accent-strong bg-clip-text text-8xl font-extrabold text-transparent md:text-9xl">
            404
          </EmptyTitle>
          <EmptyDescription className="-mt-4 text-nowrap text-foreground/80">
            The page you&apos;re looking for might have been <br />
            moved or doesn&apos;t exist.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/">
                <HomeIcon
                  className="mr-2 size-4"
                  data-icon="inline-start"
                />
                Go home
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link to="/">
                <CompassIcon
                  className="mr-2 size-4"
                  data-icon="inline-start"
                />
                Explore
              </Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
}

