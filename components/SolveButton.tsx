"use client";

import { useState } from "react";
import { markProblemSolved } from "@/app/actions/progress";
import { CheckCircle2 } from "lucide-react";
import { useTransition } from "react";

export function SolveButton({ problemId }: { problemId: string }) {
  const [isPending, startTransition] = useTransition();
  const [solved, setSolved] = useState(false);

  const handleSolve = () => {
    startTransition(async () => {
      const result = await markProblemSolved(problemId);
      if (result.success) {
        setSolved(true);
      }
    });
  };

  if (solved) {
    return (
      <button disabled className="text-green-500 flex items-center gap-2 text-sm font-bold opacity-50">
        <CheckCircle2 className="w-5 h-5" /> Solved
      </button>
    );
  }

  return (
    <button 
      onClick={handleSolve}
      disabled={isPending}
      className={`text-pathly-primary/30 hover:text-green-500 transition-colors flex items-center gap-2 text-sm font-bold ${isPending ? 'opacity-50' : ''}`}
    >
      <CheckCircle2 className="w-5 h-5" /> {isPending ? 'Saving...' : 'Mark Solved'}
    </button>
  );
}
