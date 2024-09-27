"use client";

import { SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ClipboardCopyIcon } from "@radix-ui/react-icons";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

const ShareDialog = ({
  open,
  setOpen,
  title,
  link,
}: {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
  link: string;
}) => {
  const { copied, copyAndPaste } = useCopyToClipboard();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="lg:w-[360px] h-40 flex flex-col justify-between">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <Button
          variant="primary"
          className="rounded-full font-medium space-x-4"
          onClick={() => copyAndPaste(link)}
        >
          <ClipboardCopyIcon />
          <span>{copied ? "Link Copied" : "Copy Link"}</span>
        </Button>
      </DialogContent>
    </Dialog>
  );
};
export default ShareDialog;
