import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AuthCard({
  title,
  description,
  children,
  modal,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  modal: boolean;
  footer: React.ReactNode;
}) {
  return (
    <Dialog open modal={modal}>
      <DialogContent className="">
        <DialogHeader className="text-center">
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="pt-5 pb-3 md:px-10 px-2">{children}</div>
        <DialogFooter className="flex text-center !justify-center">
          {footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
