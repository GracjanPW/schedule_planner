"use server";

import { z } from "zod";
import { AddCalendarEventSchema } from "../schema/add-calendar-event.schema";
import { CreateCalendarEvent } from "@/db/calendar_events";
import { Auth } from "@/features/auth";
import { revalidateTag } from "next/cache";
import { formatDate } from "date-fns";

export default async function CreateCalendarEventAction(
  values: z.infer<typeof AddCalendarEventSchema>,
) {
  const parsed = AddCalendarEventSchema.safeParse(values);
  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors,
      message: "Incorrect input types or missing attributes",
    };
  }
  const { all_day, description, end_time, event_date, start_time, title } =
    parsed.data;

  const user = await Auth();
  if (!user)
    return {
      message: "Unauthorised, please login",
    };

  const event = await CreateCalendarEvent({
    all_day,
    description,
    end_time,
    event_date,
    start_time,
    title,
    user_id: user.id,
  });
  console.log(event);

  if (!event)
    return {
      message: "Something went wrong",
    };
  console.log(event);
  // TODO: this doesnt seem to work to invalidate the cache - look into it
  revalidateTag(formatDate(new Date(event_date), "yyyy-MM"));
  return {
    message: "success",
  };
}
