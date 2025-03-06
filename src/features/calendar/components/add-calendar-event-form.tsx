"use client";

import { InputField } from "@/components/form/input-field";
import type { CalendarEvent } from "@/db/calendar_events";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddCalendarEventSchema } from "../schema/add-calendar-event.schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { formatDate } from "date-fns";
import { useTransition } from "react";
import CreateCalendarEventAction from "../actions/create-calendar-event.action";

interface AddScheduleProps {
  defaultValues: Partial<Omit<CalendarEvent, "id" | "user_id">>;
}

export function AddCalendarEventForm({ defaultValues }: AddScheduleProps) {
  const [pending, startTransition] = useTransition();
  const form = useForm({
    defaultValues: {
      title: "",
      start_time: "00:00",
      end_time: "01:00",
      event_date: new Date(),
      description: "",
      all_day: false,
      ...defaultValues,
    },
    resolver: zodResolver(AddCalendarEventSchema),
  });

  const all_day = form.watch("all_day");
  const event_date = form.watch("event_date");

  const submit = (values: z.infer<typeof AddCalendarEventSchema>) => {
    console.log(values);
    startTransition(async () => {
      CreateCalendarEventAction(values).then((data) => {
        console.log(data);
      });
    });
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
      <InputField
        type={"text"}
        label={"Title"}
        placeholder={"Enter a title"}
        error={form.formState.errors.title?.message}
        {...form.register("title")}
      />
      <InputField
        type={"textarea"}
        label="Description"
        placeholder={"Description... (optional)"}
        error={form.formState.errors.description?.message}
        {...form.register("description")}
      />
      <InputField
        type={"date"}
        label="Date"
        error={form.formState.errors.event_date?.message}
        name={"event_date"}
        value={formatDate(event_date, "yyyy-MM-dd")}
        onChange={(e) => form.setValue("event_date", new Date(e.target.value))}
      />
      <InputField
        type={"time"}
        label="From"
        error={form.formState.errors.start_time?.message}
        {...form.register("start_time")}
        {...{ disabled: all_day }}
      />
      <InputField
        type={"time"}
        label="To"
        error={form.formState.errors.end_time?.message}
        {...form.register("end_time")}
        {...{ disabled: all_day }}
      />
      <InputField
        type="checkbox"
        label="All day?"
        error={form.formState.errors.all_day?.message}
        {...form.register("all_day")}
      />
      <Button type="submit">add</Button>
    </form>
  );
}
