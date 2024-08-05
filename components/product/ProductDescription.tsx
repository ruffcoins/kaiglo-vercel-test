"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { CaretDownIcon, CaretUpIcon } from "@radix-ui/react-icons";

const ProductDescription = () => {
  return (
    <div className="lg:mx-8 xl:mx-14 mx-4 bg-white rounded-2xl p-6 space-y-8">
      <h1 className="font-medium text-3xl">Description</h1>
      <ProductSpecifications />
      <Description />
    </div>
  );
};

export default ProductDescription;

const ProductSpecifications = () => {
  return (
    <div className="border border-kaiglo_grey-placeholder rounded-lg">
      <h2 className="font-bold py-4 px-6 border-b border-kaiglo_grey-placeholder">
        Product Specifications
      </h2>
      <div className="p-6">
        <table className="w-full text-left">
          <tbody>
            <tr>
              <th className="font-semibold">Brand</th>
              <td>Gucci</td>
            </tr>
            <tr>
              <th className="font-semibold">Material</th>
              <td>Cotton</td>
            </tr>
            <tr>
              <th className="font-semibold">Season</th>
              <td>All Season</td>
            </tr>
            <tr>
              <th className="font-semibold">Weight</th>
              <td>1KG</td>
            </tr>
            <tr>
              <th className="font-semibold">Sole Material</th>
              <td>Plastic</td>
            </tr>
            <tr>
              <th className="font-semibold">Colours</th>
              <td>Yellow, Green, Purple, Off-White, Orange</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Description = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="flex flex-col items-center">
      <p className={`text-sm ${isExpanded ? "" : "line-clamp-3"}`}>
        Measuring tools and scales can weigh objects. A small weighing
        instrument consisting of a wooden or metal pole with a star and taper
        and equipped with weights, a weight rope, and a scale pan. According to
        the scope of use and the size of the scale is divided into three kinds:
        shekel, pan scale and crochet scale. Steelyard is a first arm lever. It
        is a simple weighing instrument that uses the principle of lever balance
        to weigh weight. It consists of a wooden beam with a star, a metal
        hammer, and a lifting rope. The load-bearing device is a rectangular
        countertop, a small weighing instrument usually used on the ground.
        According to the structure principle, it can be divided into two
        categories: mechanical scale and electronic scale. Electronic platform
        scale: A small electronic weighing instrument using the principle of
        non-electrical measurement. It is composed of load bearing table,
        weighing body, weighing sensor, weighing display and regulated power
        supply. It has the characteristics of light weight, convenient movement,
        many functions, the display and the scale body are connected by cable,
        and can be placed according to the need when using. In addition to
        weighing, tare weight, cumulative weight and other functions, but also
        can be connected with the actuator, set the upper and lower limits to
        control the speed of feeding, can be used as small package batching
        scale or quantitative scale. The electronic valuation scale has the
        characteristics of high measurement accuracy, convenient and fast
        keyboard operation, and digital memory.
      </p>

      <Button
        variant="secondary"
        onClick={toggleExpanded}
        className="font-medium w-fit rounded-full mt-8"
      >
        {isExpanded ? "See Less" : "See More"}
        <span>{isExpanded ? <CaretUpIcon /> : <CaretDownIcon />}</span>
      </Button>
    </div>
  );
};
