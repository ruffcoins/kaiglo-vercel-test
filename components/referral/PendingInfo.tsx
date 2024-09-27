import { SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const PendingInfo = ({
  open,
  setOpen,
  name,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  name: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[400px]">
        <DialogHeader>
          <DialogTitle>Info</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <p className="my-4">
          {name} is yet to make their first purchase thus the pending status
        </p>
        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-full w-full h-12"
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default PendingInfo;
