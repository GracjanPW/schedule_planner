import { CalendarEvent } from "@/db/calendar_events";
import { create } from "zustand";

type CalendarDayModalStore = {
  day: Date | undefined;
  events: CalendarEvent[];
  open: boolean;
  setOpen: (day: Date, events: CalendarEvent[]) => void;
  setClose: () => void;
};

const useCalendarDayModal = create<CalendarDayModalStore>((set) => ({
  day: undefined,
  events: [],
  open: false,
  setOpen: (day, events) => set(() => ({ open: true, day, events })),
  setClose: () => set(() => ({ day: undefined, events: [], open: false })),
}));

export default useCalendarDayModal;
