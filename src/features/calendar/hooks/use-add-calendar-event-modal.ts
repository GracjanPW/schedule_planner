import { CalendarEvent } from "@/db/calendar_events";
import { create } from "zustand";

type ScheduleAddModalStore = {
  day: Date | undefined;
  open: boolean;
  setOpen: (day: Date) => void;
  setClose: () => void;
};

const useScheduleAddModal = create<ScheduleAddModalStore>((set) => ({
  day: undefined,
  open: false,
  setOpen: (day) => set(() => ({ open: true, day })),
  setClose: () => set(() => ({ day: undefined, open: false })),
}));

export default useScheduleAddModal;
