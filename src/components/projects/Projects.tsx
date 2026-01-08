import { getProjects } from "@/app/actions"
import { ProjectsClient } from "./ProjectsClient"

export async function Projects() {
  const data = await getProjects()
  return <ProjectsClient data={data} />
}
