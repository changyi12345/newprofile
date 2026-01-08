import { getExperiences } from "@/app/actions"
import { ExperienceClient } from "./ExperienceClient"

export async function Experience() {
  const data = await getExperiences()
  return <ExperienceClient data={data} />
}
