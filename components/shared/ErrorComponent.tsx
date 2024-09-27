import React from "react";
import { Button } from "../ui/button";

const ErrorComponent = ({
  message,
  action,
}: {
  message: string;
  action: () => void;
}) => {
  return (
    <div
      className="border text-kaiglo_critical-base bg-kaiglo_critical-50 border-kaiglo_critical-base lg:mx-8 mx-4 py-3 rounded relative h-44 items-center justify-center flex flex-col space-y-4"
      role="alert"
    >
      <p className="font-bold">Something went wrong!</p>
      <p className="block sm:inline"> {message}</p>
      <Button variant="critical_solid" className="" onClick={action}>
        Retry
      </Button>
    </div>
  );
};

export default ErrorComponent;
