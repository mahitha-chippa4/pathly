import { checkOnboardingState } from "@/lib/onboarding"

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  // We cannot easily get currentPath here without headers, but the layout is fine just wrapping
  return (
    <div className="min-h-screen bg-pathly-bg text-pathly-primary flex flex-col items-center justify-center p-6 selection:bg-pathly-peach">
      <div className="w-full max-w-2xl bg-white rounded-[3rem] p-12 shadow-2xl border border-pathly-primary/10 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pathly-lavender rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pathly-mint rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 text-center mb-12">
          <h1 className="text-4xl font-black mb-4">Set up your path</h1>
          <p className="text-lg opacity-80 font-medium">We need a few details to generate your personalized career roadmap.</p>
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  )
}
