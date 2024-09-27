import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useLogout from "@/hooks/useLogout";
import React from "react";
import { SetStateAction } from "react";

const LogoutDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { handleLogout } = useLogout();

  const logoutUser = () => {
    handleLogout();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[400px] focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
        <DialogHeader>
          <DialogTitle>Log out</DialogTitle>
          <DialogDescription />
          <DialogDescription className="py-4">
            Are you sure you want to continue with this action?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-between">
          <Button
            variant="outline"
            className="rounded-full py-3 px-8 min-h-12"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="critical_solid"
            className="rounded-full flex-1 min-h-12 mb-4 lg:mb-0"
            onClick={logoutUser}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default LogoutDialog;
