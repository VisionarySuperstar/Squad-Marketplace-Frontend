import { createClient } from "@supabase/supabase-js";
import Person from "../interfaces/person";

const supabase = createClient(
  "https://baqjoycefmpwepunwzph.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcWpveWNlZm1wd2VwdW53enBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI5OTI0MzUsImV4cCI6MjAyODU2ODQzNX0.rTjTC2S7V99aIvxrQaSnFmArEZOTE45aQyC6x_WVicw"
);

export async function addToWaitlist(person: Person) {
  const { data, error } = await supabase.from("WaitList").insert({
    created_at: new Date(),
    name: person.name,
    email: person.email,
    city: person.city,
    instagram: person.instagram,
    from: person.from,
    code: person.code,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
