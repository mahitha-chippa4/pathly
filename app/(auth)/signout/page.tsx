"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Sparkles, LogOut, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SignoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-pathly-bg text-pathly-primary flex items-center justify-center p-6 selection:bg-pathly-lavender">
      <div className="w-full max-w-xl bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-pathly-primary/10 relative p-12 text-center">
        
        {/* Abstract Illustration Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pathly-peach rounded-full blur-3xl opacity-30 -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pathly-lavender rounded-full blur-3xl opacity-30 -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="w-24 h-24 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-sm">
            <LogOut className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl font-black tracking-tighter mb-4">
            Leaving so soon?
          </h1>
          <p className="text-lg opacity-70 font-medium mb-12">
            Are you sure you want to sign out of pathly? Your progress will be safely saved for when you return.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="outline"
              onClick={() => router.back()}
              className="rounded-2xl h-14 text-lg font-bold border-2 border-pathly-primary/10 hover:bg-pathly-bg flex-1"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-2xl h-14 text-lg font-bold bg-red-600 text-white hover:bg-red-700 shadow-xl flex-1 border-none"
            >
              Yes, Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
