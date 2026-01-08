import { getAbout } from "@/app/actions"
import { AboutClient } from "./AboutClient"

export async function About() {
  const data = await getAbout()
  return <AboutClient data={data} />
}
