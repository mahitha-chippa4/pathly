import { checkOnboardingState } from "@/lib/onboarding"
import { GeneratingAnalysisClient } from "./GeneratingAnalysisClient"

export default async function GeneratingAnalysisPage() {
  await checkOnboardingState("/onboarding/generating-analysis")
  return <GeneratingAnalysisClient />
}
