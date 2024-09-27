import { memo, SetStateAction } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const TopupInfoConfirmation = memo(
  ({
    open,
    setOpen,
  }: {
    open: boolean;
    setOpen: React.Dispatch<SetStateAction<boolean>>;
  }) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[361px]">
          <DialogHeader>
            <DialogTitle>Topup Info</DialogTitle>
            <DialogDescription />
          </DialogHeader>

          <div className="space-y-6">
            <p>Dear user,</p>

            <p>
              Please note that this is a shopping app where referral rewards,
              daily bonuses, coupons, games, and freebies are offered for
              SHOPPING PURPOSES ONLY.
            </p>

            <p>
              Topups and shopping balances can only be used for buying of
              products. No topup, rewards, free bonuses can be withdrawn into
              any account. This app is only for shopping.
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="attention"
              className="rounded-full w-full bg-kaiglo_attention-base text-white h-12"
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
export default TopupInfoConfirmation;
