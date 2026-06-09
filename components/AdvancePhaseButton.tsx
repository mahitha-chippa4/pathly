"use client";

import { useTransition } from "react";
import { advanceProjectPhase } from "@/app/actions/progress";
import { CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdvancePhaseButton({ projectId, currentPhase, totalPhases }: { projectId: string, currentPhase: number, totalPhases: number }) {
  const [isPending, startTransition] = useTransition();

  const handleAdvance = () => {
    startTransition(async () => {
      await advanceProjectPhase(projectId, currentPhase, totalPhases);
    });
  };

  if (currentPhase > totalPhases) {
    return (
      <Button disabled variant="outline" className="rounded-xl font-bold border-2 border-green-200 text-green-700 bg-green-50 w-full mt-6">
        <CheckCircle2 className="w-4 h-4 mr-2" /> Project Completed
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleAdvance}
      disabled={isPending}
      className="rounded-xl font-bold bg-pathly-primary text-white w-full mt-6"
    >
      {isPending ? "Saving..." : `Complete Phase ${currentPhase} & Continue`}
    </Button>
  );
}
