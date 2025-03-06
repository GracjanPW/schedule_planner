import db from "@/db";
import { Auth } from "@/features/auth";
import { addMonths, eachDayOfInterval } from "date-fns";

export type CalendarEvent = {
  id: number;
  user_id: number;
  event_date: Date;
  start_time: string | null;
  end_time: string | null;
  all_day: boolean;
  title: string;
  description: string | null;
};

export async function CreateCalendarEvent({
  user_id,
  event_date,
  start_time = null,
  end_time = null,
  all_day = true,
  title,
  description = "",
}: Omit<CalendarEvent, "id">): Promise<CalendarEvent | null | undefined> {
  if (all_day) {
    start_time = null;
    end_time = null;
  }
  if (!all_day && (!end_time || !start_time)) {
    all_day = true;
    end_time = null;
    start_time = null;
  }

  return db
    .query(
      `
    INSERT INTO calendar_events (
        user_id, 
        event_date, 
        start_time, 
        end_time, 
        all_day, 
        title, 
        description
    ) VALUES (
     $1, $2, $3, $4, $5, $6, $7
    ) returning id`,
      [user_id, event_date, start_time, end_time, all_day, title, description],
    )
    .then((res) => {
      if (!res.rowCount) return null;
      return res.rows[0];
    })
    .catch((e) => {
      console.log(e);
      return undefined;
    });
}

export async function GetCalendarEvents({
  from_date,
  to_date,
}: {
  from_date?: Date;
  to_date?: Date;
}) {
  if (!from_date) {
    from_date = new Date();
  }
  if (!to_date) {
    to_date = addMonths(from_date, 1);
  }
  const user = await Auth();
  if (!user) return undefined;

  return db
    .query(
      `
      SELECT * FROM calendar_events WHERE event_date >= $1 AND event_date < $2 AND user_id = $3
    `,
      [from_date, to_date, user.id],
    )
    .then((res) => {
      if (!res.rowCount) return [];
      return res.rows;
    })
    .catch((e) => {
      console.log(e);
      return undefined;
    });
}
