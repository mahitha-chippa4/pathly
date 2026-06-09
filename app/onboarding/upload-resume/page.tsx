import { checkOnboardingState } from "@/lib/onboarding"
import { UploadResumeClient } from "./UploadResumeClient"

export default async function UploadResumePage() {
  await checkOnboardingState("/onboarding/upload-resume")
  return <UploadResumeClient />
}
