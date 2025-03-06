"use client";

import { CalendarEvent } from "@/db/calendar_events";

const numberToTime = (n: number) => {
  const r = n % 1;
  const hr = Math.floor(n);
  return `${hr > 9 ? hr : "0" + hr}:${60 * r > 9 ? 60 * r : "0" + 60 * r}`;
};
const timeToNumber = (t: string) => {
  const [hh, mm] = t.split(":");
  return Number(hh) + Number(mm) / 60;
};

interface TimeLineProps {
  events: CalendarEvent[];
}

export function TimeLine({ events }: TimeLineProps) {
  // TODO: fix the rendering of events, so they dont cover each other when times overlap
  return (
    <div className="overflow-scroll max-h-[40rem] py-2">
      <div className="flex w-full h-full">
        <div className="h-[calc(24_*_2rem)]">
          <div className="h-[2rem] w-[3rem]"></div>
          {Array.from({ length: 23 }, (_, i) => i + 1).map((i) => (
            <div
              key={`time-${i}`}
              className="relative text-sm text-muted-foreground h-[2rem] w-[3rem]"
            >
              <span className="absolute bottom-[100%] translate-y-1/2">
                {numberToTime(i)}
              </span>
            </div>
          ))}
        </div>
        <div
          id="schedule-day"
          className="relative h-[calc(24_*_2rem_+_0.5rem)] -mt-1 -mb-1  w-full border-l-[1px] border-l-stone-200"
        >
          {Array.from({ length: 25 }, (_, i) => i).map((i) => (
            <div
              key={`line-${i}`}
              className="absolute h-[0.05rem] w-full -ml-2 bg-stone-200"
              style={{ top: `calc(${i} * 2rem + 0.25rem)` }}
            />
          ))}
          {events.map((event, i) => {
            let left = "0px";
            const start = timeToNumber(event.start_time as string);
            const end = timeToNumber(event.end_time as string);
            if (i > 0) {
              const prevEnd = timeToNumber(events[i - 1]!.end_time as string);
              console.log({ prevEnd, start });
              left =
                prevEnd > start
                  ? `calc(${document.getElementById(`noteid-${events[i - 1].id}`)?.style.left || 0} + 2rem)`
                  : "0px";
            }
            const length = end - start;
            return (
              <div
                key={`schedule-${i}`}
                id={`noteid-${event.id}`}
                style={{
                  position: "absolute",
                  top: `calc(${start} * 2rem + 0.25rem)`,
                  left: left,
                  width: `calc(100% - ${left})`,
                  height: `calc(${length} * 2rem)`,
                }}
                className="bg-blue-400 rounded-md text-xs border box-border"
              >
                hello
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
