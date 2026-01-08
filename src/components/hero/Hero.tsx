import { getHero } from "@/app/actions"
import { HeroClient } from "./HeroClient"

export async function Hero() {
  const data = await getHero()
  return <HeroClient data={data} />
}
