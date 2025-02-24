import { UserButton } from "@/features/auth/components/user-button";
import Link from "next/link";

export function DashboardHeader() {
  return (
    <header className="w-full bg-stone-100 border grid grid-cols-[1fr_2fr_1fr] p-4 grid-rows-1 h-fit">
      <div className="h-full flex place-items-center">
        <Link className="text-xl font-semibold " href={"/"}>
          SchedulePlanner
        </Link>
      </div>
      <div className=""></div>
      <div className="flex justify-end align-middle">
        <UserButton />
      </div>
    </header>
  );
}
