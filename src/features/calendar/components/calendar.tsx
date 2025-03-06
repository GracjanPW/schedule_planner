"use client";

import { cn } from "@/lib/utils";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  formatDate,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { MoveLeft, MoveRight } from "lucide-react";
import { useEffect, useState } from "react";
import useCalendarDayModal from "../hooks/use-calendar-day-modal";
import { CalendarEvent } from "@/db/calendar_events";

const DaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function Calendar() {
  const [viewingDate, setViewingDate] = useState(new Date());
  const [dates, setDates] = useState<Record<string,CalendarEvent[]>>({});
  const { setOpen } = useCalendarDayModal();

  useEffect(() => {
    const getEvents = async (from: Date, end: Date) => {
      // TODO: fix caching so that cache gets revalidated when the user creates a new event
      const res = await fetch(
        `/api/calendar/events?from_date=${from}&to_date=${end}`,
        {
          cache: "force-cache",
          next: { tags: [formatDate(viewingDate, "yyyy-MM")] },
        },
      );
      const data = await res.json();
      setDates(data);
    };

    const startOfMonthDate = startOfMonth(viewingDate);
    const start = startOfWeek(startOfMonthDate);
    const endOfMonthDate = endOfMonth(viewingDate);
    const end = endOfWeek(endOfMonthDate);
    const dates = eachDayOfInterval({
      start,
      end,
    });
    getEvents(start, end);
  }, [viewingDate]);

  const incDateByMonth = () => setViewingDate((prev) => addMonths(prev, 1));

  const decDateByMonth = () => setViewingDate((prev) => subMonths(prev, 1));

  return (
    <div className="p-10">
      <div className="flex justify-between">
        <button onClick={decDateByMonth}>
          <MoveLeft />
        </button>
        <h1 className="text-center text-2xl font-bold text-stone-700 mb-4">
          {formatDate(viewingDate, "MMMM yyyy")}
        </h1>
        <button onClick={incDateByMonth}>
          <MoveRight />
        </button>
      </div>
      <div className="grid grid-cols-7 place-items-center p-1">
        {DaysOfWeek.map((day) => (
          <div
            key={day}
            className="bg-slate-300 w-full font-semibold text-center h-12 align-middle leading-[3rem] mb-2"
          >
            {day}
          </div>
        ))}
        {Object.keys(dates).map((date, i) => (
          <div
            key={i}
            className={cn(
              "min-h-12 h-full flex flex-col justify-start align-middle",
            )}
            onClick={() => setOpen(new Date(date), dates[date])}
          >
            <p
              className={cn(
                "text-center size-8 leading-[2rem]",
                isToday(date) && "bg-blue-400 text-white rounded-full",
                !isSameMonth(date, viewingDate) && "opacity-70",
              )}
            >
              {formatDate(date, "d")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
