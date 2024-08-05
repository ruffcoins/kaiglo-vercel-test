import { SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Link from "next/link";

const WithdrawBonus = ({
  open,
  setOpen,
  amount,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  amount: number;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>Reward Credited</DialogTitle>
        </DialogHeader>

        <p className="my-4">
          Your referral earnings ₦{amount} has been credited to Kaiglo Rewards
          Balance
        </p>
        <DialogFooter>
          <Link href="/app/rewards" className="w-full">
            <Button variant="outline" className="rounded-full w-full h-12">
              View Rewards Balance
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default WithdrawBonus;
