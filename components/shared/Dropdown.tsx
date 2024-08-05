import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

interface DropdownProps {
  trigger: React.ReactNode;
  items: { label: string; path?: string; onClick: () => void; icon?: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg p-6 shadow-lg z-20">
          <div className="py-1 space-y-2 text-kaiglo_grey-base">
            {items.map(
              (item, index) =>
                item.path ? (
                  <Link
                    key={index}
                    href={item.path}
                    onClick={(e) => {
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded h-10",
                    )}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div
                    key={index}
                    onClick={() => {
                      item.onClick();
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded h-10",
                      item.icon &&
                        "border rounded-md border-kaiglo_grey-placeholder text-black p-2 w-fit",
                    )}
                  >
                    {item?.icon && (
                      <Image
                        src={item.icon}
                        alt="logout icon"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    )}
                    <span>{item.label}</span>
                  </div>
                ),
              // <div
              //   key={index}
              //   onClick={() => {
              //     item.onClick();
              //     setIsOpen(false);
              //   }}
              //   className={cn(
              //     "flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded h-10",
              //     item.icon &&
              //       "border rounded-md border-kaiglo_grey-placeholder text-black p-2 w-fit",
              //   )}
              // >
              //   {item?.icon && (
              //     <Image
              //       src={item.icon}
              //       alt="logout icon"
              //       width={16}
              //       height={16}
              //       className="w-4 h-4"
              //     />
              //   )}
              //   <span>{item.label}</span>
              // </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
