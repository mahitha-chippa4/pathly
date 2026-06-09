"use client";

import { useTransition, useOptimistic, startTransition } from "react";
import { toggleProjectTask } from "@/app/actions/progress";
import { Check } from "lucide-react";

export function TaskCheckbox({ 
  projectId, 
  task, 
  isCompletedInitial 
}: { 
  projectId: string, 
  task: string, 
  isCompletedInitial: boolean 
}) {
  const [isCompleted, addOptimisticCompleted] = useOptimistic(
    isCompletedInitial,
    (state, newState: boolean) => newState
  );
  
  const [isPending, startTransitionHook] = useTransition();

  const handleToggle = () => {
    startTransition(() => {
      addOptimisticCompleted(!isCompleted);
    });
    startTransitionHook(async () => {
      await toggleProjectTask(projectId, task, !isCompleted);
    });
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isPending}
      className={`text-sm font-medium flex items-start gap-3 w-full text-left transition-opacity hover:opacity-80 disabled:opacity-50 group`}
    >
      <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 transition-colors shrink-0 ${
        isCompleted 
          ? 'bg-green-500 border-green-500' 
          : 'bg-white border-pathly-primary/30 group-hover:border-pathly-primary/60'
      }`}>
        {isCompleted && <Check className="w-3.5 h-3.5 text-white" />}
      </div>
      <span className={`transition-all ${isCompleted ? 'line-through opacity-50' : 'text-pathly-primary/90'}`}>
        {task}
      </span>
    </button>
  );
}
