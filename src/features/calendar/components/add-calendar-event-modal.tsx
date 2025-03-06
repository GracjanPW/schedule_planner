"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useScheduleAddModal from "../hooks/use-add-calendar-event-modal";
import { AddCalendarEventForm } from "./add-calendar-event-form";

export function AddCalendarEventModal() {
  const { open, setClose, day } = useScheduleAddModal();
  return (
    <Dialog open={open} onOpenChange={setClose}>
      <DialogContent className="max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center">Add schedule</DialogTitle>
        </DialogHeader>
        <AddCalendarEventForm
          defaultValues={{
            event_date: day,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
