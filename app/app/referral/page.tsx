"use client";

import { Button } from "@/components/ui/button";
import { useReferral } from "@/hooks/queries/wallet/getReferral";
import ReferArt from "@/public/images/refer-art.png";
import Person from "@/public/images/person.svg";
import Verify from "@/public/images/verify.svg";
import Warning from "@/public/images/warning.svg";
import { CopyIcon, PlusIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import moment from "moment";
import { useState } from "react";
import PendingInfo from "@/components/referral/PendingInfo";
import WithdrawBonus from "@/components/referral/WithdrawBonus";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

const formatDate = (date: string) => {
  const utcMoment = moment(date, "YYYY-MM-DDTHH:mm:ss.SSSZ");
  const formattedDate = utcMoment.format("DD-MMM-YYYY");
  return formattedDate;
};

const Referral = () => {
  const { referral, fetchingReferral } = useReferral();
  const { copied, copyAndPaste } = useCopyToClipboard();
  const [openInfo, setOpenInfo] = useState(false);
  const [openWithdrawBonus, setOpenWithdrawBonus] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const handleOpenInfo = (name: string) => {
    setOpenInfo(true);
    setName(name);
  };

  const handleOpenWithdrawBonus = (amount: number) => {
    setOpenWithdrawBonus(true);
    setAmount(amount);
  };

  return (
    <>
      <div className="space-y-4 overflow-hidden">
        <div className="flex justify-between">
          <p className="text-xl font-medium capitalize">Referrals</p>
        </div>

        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-4">
            <div className="bg-kaiglo_grey-50 p-8 space-y-6 flex items-center flex-col rounded-3xl">
              <Image
                src={ReferArt}
                alt="ReferArt"
                width={200}
                height={200}
                className="w-[190px] h-[122px]"
              />

              <div className="space-y-4">
                <p className="text-lg font-bold text-center">
                  Earn ₦500 on each referral by sharing your link!
                </p>
                <p className="text-sm text-center">
                  Help your friends discover Kaiglo and earn ₦500 cash reward
                  when they sign up with your code.
                </p>

                <div className="flex justify-between p-4 border border-kaiglo_grey-placeholder rounded-lg items-center space-x-4">
                  {fetchingReferral || !referral ? (
                    <p className="h-8 animate-pulse w-full bg-gray-200"></p>
                  ) : (
                    <p>{referral?.referralCode}</p>
                  )}

                  <Button
                    variant="outline"
                    className="gap-x-2 rounded-lg border-kaiglo_grey-placeholder"
                    disabled={fetchingReferral || !referral}
                    onClick={() =>
                      copyAndPaste(referral?.referralCode as string)
                    }
                  >
                    {copied ? (
                      <>
                        <CopyIcon className="w-4 h-4" />{" "}
                        <span className="text-sm font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <PlusIcon className="w-4 h-4" />{" "}
                        <span className="text-sm font-medium">Share Code</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-8 space-y-8">
            <div className="bg-kaiglo_brand-base text-white rounded-2xl p-6 flex justify-between items-center">
              <div className="">
                <p className="font-bold text-sm">Referral Earnings</p>
                {fetchingReferral || !referral ? (
                  <p className="h-10 animate-pulse w-full bg-gray-200"></p>
                ) : (
                  <p className="text-[40px] leading-[48px] font-bold">
                    ₦{referral?.referralBonus}
                  </p>
                )}
                <p className="text-[10px]">
                  {referral?.referredList.length} Users referred
                </p>
              </div>
              <Button
                variant={"outline"}
                className="font-medium"
                onClick={() => {
                  if ((referral?.referralBonus as number) > 0) {
                    handleOpenWithdrawBonus(referral?.referralBonus as number);
                  }
                }}
                disabled={referral?.referralBonus === 0}
              >
                Withdraw
              </Button>
            </div>

            <div className="space-y-4">
              <p className="font-medium text-sm">Referral List</p>

              {fetchingReferral ? (
                <div className="animate-pulse bg-gray-200 w-full h-16"></div>
              ) : referral?.referredList.length === 0 ? (
                <div className="h-40 flex justify-center items-center">
                  <p className="text-sm text-center font-medium">
                    You have not referred anyone yet.
                  </p>
                </div>
              ) : (
                <div className="h-[calc(100vh-28rem)] overflow-y-auto">
                  {referral?.referredList.map((referral, index) => (
                    <div
                      key={index}
                      className="border flex justify-between items-center p-2 rounded-lg mb-3"
                    >
                      <div className="gap-x-2 flex justify-start items-start">
                        <Image
                          src={Person}
                          alt={"referral"}
                          width={100}
                          height={100}
                          className="w-10 h-10"
                        />
                        <div className="space-y-1">
                          <p className="font-medium text-sm">{referral.name}</p>
                          <p className="text-xs uppercase text-kaiglo_grey-placeholder">
                            {formatDate(referral.dateReferred)}
                          </p>
                        </div>
                      </div>

                      <div>
                        {referral.paid ? (
                          <div className="flex items-center space-x-4">
                            <p className="font-bold text-kaiglo_brand-base">
                              ₦{referral.amount.toLocaleString()}
                            </p>
                            <Image
                              src={Verify}
                              alt="Verify"
                              width={100}
                              height={100}
                              className="w-6 h-6"
                            />
                          </div>
                        ) : (
                          <div className="flex items-center space-x-4">
                            <p className="text-kaiglo_accent-base font-bold">
                              Pending
                            </p>
                            <Image
                              src={Warning}
                              alt="Warning"
                              width={100}
                              height={100}
                              className="w-6 h-6 cursor-pointer"
                              onClick={() => handleOpenInfo(referral.name)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {openInfo && (
        <PendingInfo open={openInfo} setOpen={setOpenInfo} name={name} />
      )}

      {openWithdrawBonus && (
        <WithdrawBonus
          open={openWithdrawBonus}
          setOpen={setOpenWithdrawBonus}
          amount={amount}
        />
      )}
    </>
  );
};
export default Referral;
