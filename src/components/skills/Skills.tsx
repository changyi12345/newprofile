import { getSkills } from "@/app/actions"
import { SkillsClient } from "./SkillsClient"

export async function Skills() {
  const data = await getSkills()
  return <SkillsClient data={data} />
}
