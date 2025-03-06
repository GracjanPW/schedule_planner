import { CalendarEvent, GetCalendarEvents } from "@/db/calendar_events";
import { Auth } from "@/features/auth";
import { eachDayOfInterval, isValid } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await Auth();
  if (!user)
    return NextResponse.json(
      { message: "You are logged out, please log in and try again" },
      {
        status: 401,
      },
    );

  const params = req.nextUrl.searchParams;
  const from_date_string = params.get("from_date");
  const to_date_string = params.get("to_date");

  const from_date = from_date_string ? new Date(from_date_string) : undefined;
  const to_date = to_date_string ? new Date(to_date_string) : undefined;

  if (!isValid(from_date) || !isValid(to_date))
    return NextResponse.json(
      {
        message:
          "Invalid query params passed, make sure from_date and to_date are both proper date strings",
      },
      { status: 400 },
    );

  const events = await GetCalendarEvents({ from_date, to_date });
  const dates = eachDayOfInterval({ start: from_date!, end: to_date! });

  const mapped = new Map<String, CalendarEvent[]>(
    dates.map((date) => [date.toDateString(), []]),
  );

  if (!events)
    return NextResponse.json(Object.fromEntries(mapped), { status: 201 });

  events?.forEach((event) => {
    mapped.set(event.event_date.toDateString(), [
      ...(mapped.get(event.event_date.toDateString()) || []),
      event,
    ]);
  });

  return NextResponse.json(Object.fromEntries(mapped), { status: 201 });
}
