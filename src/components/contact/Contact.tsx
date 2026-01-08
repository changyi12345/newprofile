import { getContact } from "@/app/actions"
import { ContactClient } from "./ContactClient"

export async function Contact() {
  const data = await getContact()
  return <ContactClient data={data} />
}
