"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, ArrowRight, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1. Create account
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // 2. Log in automatically
      const loginRes = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password
      });

      if (loginRes?.error) {
        throw new Error("Failed to auto-login");
      }

      // 3. Redirect to dashboard, the layout will bounce to onboarding if incomplete
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-pathly-bg text-pathly-primary flex items-center justify-center p-6 selection:bg-pathly-peach">
      <div className="w-full max-w-6xl flex flex-col md:flex-row-reverse bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-pathly-primary/10 min-h-[700px]">
        
        {/* Right Side - Story / Illustration */}
        <div className="hidden md:flex flex-1 bg-pathly-peach p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
          <div className="z-10 text-right">
            <Link href="/" className="font-black text-2xl tracking-tighter flex items-center justify-end gap-2 mb-16">
              pathly.
              <Sparkles className="w-6 h-6 text-pathly-primary" />
            </Link>
            <h1 className="text-6xl font-black tracking-tighter leading-none mb-6">
              Start your<br/>journey.
            </h1>
            <p className="text-xl font-medium opacity-80 max-w-md ml-auto">
              Create an account to upload your resume and get a personalized roadmap to your dream career.
            </p>
          </div>
          
          {/* Abstract Illustration Elements */}
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl opacity-50"></div>
          <div className="absolute top-1/4 -right-20 w-64 h-64 bg-pathly-mint rounded-full blur-3xl opacity-60"></div>
        </div>

        {/* Left Side - Form */}
        <div className="flex-1 p-12 md:p-20 flex flex-col justify-center bg-white relative z-10">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-4xl font-black mb-8 md:hidden">Sign Up</h2>
            
            <div className="space-y-4 mb-8">
              <Button 
                variant="outline" 
                onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                className="w-full rounded-2xl h-14 text-lg font-bold border-2 border-pathly-primary/10 hover:bg-pathly-primary/5 flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </Button>
              <Button 
                variant="outline" 
                onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                className="w-full rounded-2xl h-14 text-lg font-bold border-2 border-pathly-primary/10 hover:bg-pathly-primary/5 flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                Sign up with GitHub
              </Button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-pathly-primary/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-pathly-primary/50 font-bold uppercase tracking-wider">Or continue with email</span>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">
                {error}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-bold">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  required
                  placeholder="Jane Smith" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="rounded-xl h-12 bg-pathly-bg border-none focus-visible:ring-2 focus-visible:ring-pathly-primary text-base px-4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-bold">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required
                  placeholder="you@example.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="rounded-xl h-12 bg-pathly-bg border-none focus-visible:ring-2 focus-visible:ring-pathly-primary text-base px-4"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-base font-bold">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    required
                    placeholder="••••••••" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="rounded-xl h-12 bg-pathly-bg border-none focus-visible:ring-2 focus-visible:ring-pathly-primary text-base px-4"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm" className="text-base font-bold">Confirm</Label>
                  <Input 
                    id="confirm" 
                    type="password" 
                    required
                    placeholder="••••••••" 
                    value={formData.confirm}
                    onChange={(e) => setFormData({...formData, confirm: e.target.value})}
                    className="rounded-xl h-12 bg-pathly-bg border-none focus-visible:ring-2 focus-visible:ring-pathly-primary text-base px-4"
                  />
                </div>
              </div>

              <div className="pt-6">
                <Button disabled={loading} type="submit" className="w-full bg-pathly-primary text-white hover:bg-pathly-primary/90 rounded-2xl h-16 text-xl font-black group">
                  {loading ? <Loader2 className="animate-spin w-6 h-6" /> : "Create Account"}
                  {!loading && <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />}
                </Button>
              </div>
            </form>

            <p className="text-center mt-8 font-medium text-pathly-primary/70">
              Already have an account? <Link href="/login" className="font-bold text-pathly-primary underline underline-offset-4">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
