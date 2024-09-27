import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

interface Shipping {
  id: number;
  name: string;
}

interface ShippingFilterProps {
  shippings: Shipping[];
  shipping: string;
  setShipping: Dispatch<SetStateAction<string[]>>;
}

const ShippingFilter: React.FC<ShippingFilterProps> = ({
  shippings,
  shipping,
  setShipping,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleShippingSelect = (shipping: Shipping) => {
    setShipping([shipping.name.toUpperCase()]);
  };

  return (
    <div className="relative inline-block text-left w-full transition duration-500 ease-in-out py-6 space-y-4">
      <div>
        <div className="flex justify-between items-center w-full">
          <span className="font-medium">Shipping</span>
          <span
            className="bg-kaiglo_grey-100 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <svg
              className={isOpen ? "rotate-180" : ""}
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
            >
              <path
                d="M5.99706 6.20039C5.5304 6.20039 5.06373 6.02039 4.7104 5.66706L0.36375 1.32042C0.170417 1.12708 0.170417 0.807083 0.36375 0.61375C0.557083 0.420417 0.877083 0.420417 1.07042 0.61375L5.41706 4.96039C5.73706 5.28039 6.25706 5.28039 6.57706 4.96039L10.9237 0.61375C11.1171 0.420417 11.4371 0.420417 11.6304 0.61375C11.8237 0.807083 11.8237 1.12708 11.6304 1.32042L7.28373 5.66706C6.9304 6.02039 6.46373 6.20039 5.99706 6.20039Z"
                fill="#151716"
              />
            </svg>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="w-full text-sm text-kaiglo_grey-base transition duration-500 ease-in-out">
          <div
            className="space-y-2"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {shippings.slice(0, 5).map((item) => (
              <p
                key={item.id}
                className={cn(
                  item.name.toLocaleUpperCase() == shipping && "font-semibold",
                  "block py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer",
                )}
                role="menuitem"
                onClick={() => {
                  handleShippingSelect(item);
                }}
              >
                {item.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingFilter;
