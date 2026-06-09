import { checkOnboardingState } from "@/lib/onboarding"
import { SelectRoleClient } from "./SelectRoleClient"

export default async function SelectRolePage() {
  await checkOnboardingState("/onboarding/select-role")
  return <SelectRoleClient />
}
