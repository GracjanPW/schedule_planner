import { EVENT_DESCRIPTION_CHAR_LIMIT } from "@/app.config";
import { z } from "zod";
import type { CalendarEvent } from "@/db/calendar_events";

export const AddCalendarEventSchema = z
  .object({
    title: z.string().min(1, {
      message: "Title is required",
    }),
    description: z
      .string()
      .max(EVENT_DESCRIPTION_CHAR_LIMIT, {
        message: "Description is too long",
      })
      .nullable(),
    event_date: z.coerce.date({
      message: "Valid date is required",
    }),
    start_time: z.string().nullable(),
    end_time: z.string().nullable(),
    all_day: z.boolean().default(false),
  })
  .refine(
    (schema) => {
      return !(schema.all_day && !schema.start_time);
    },
    {
      message: "Start time is required",
      path: ["start_time"],
    },
  )
  .refine(
    (schema) => {
      if (schema.all_day) return true;
      if (!schema.end_time) return false;
      const [hh1, mm1] = schema.start_time!.split(":");
      const [hh2, mm2] = schema.end_time.split(":");
      if (Number(hh1) > Number(hh2)) return false;
      if (Number(hh1) === Number(hh2) && Number(mm1 > mm2)) return false;
      return true;
    },
    {
      message: "End time has to be higher then start time",
      path: ["end_time"],
    },
  );
