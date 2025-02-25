import db from "@/db";

export type CalendarEvent = {
  id: number;
  user_id: number;
  event_date: Date;
  start_time?: String | null;
  end_time?: string | null;
  all_day?: boolean | null;
  title: string;
  description?: string | null;
};

export async function CreateCalendarEvent({
  user_id,
  event_date,
  start_time = null,
  end_time = null,
  all_day = true,
  title,
  description = "",
}: Omit<CalendarEvent, "id">): Promise<CalendarEvent|null|undefined> {
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
     $1, 
     $2, 
     $3, 
     $4, 
     $5, 
     $6, 
     $7
     )`,
      [user_id, event_date, start_time, end_time, all_day, title, description],
    )
    .then((res) => {
      return res.rows[0];
    })
    .catch((e) => {
      return undefined;
    });
}
