"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCalendarDayModal from "../hooks/use-calendar-day-modal";
import { formatDate } from "date-fns";
import { TimeLine } from "./time-line";
import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import useScheduleAddModal from "../hooks/use-add-calendar-event-modal";

export function CalendarDayModal() {
  const { open, setClose, events, day } = useCalendarDayModal();
  const { setOpen } = useScheduleAddModal();
  return (
    <Dialog open={open} onOpenChange={setClose}>
      <DialogContent className="max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {day ? formatDate(day, "dd MMMM yyy") : ""}
          </DialogTitle>
          <Button
            onClick={() => setOpen(day!)}
            variant={"ghost"}
            size={"inherit"}
            className="absolute right-2 top-2"
          >
            <PlusSquare className="!w-7 !h-7" />
          </Button>
        </DialogHeader>
        <TimeLine events={events} />
      </DialogContent>
    </Dialog>
  );
}
