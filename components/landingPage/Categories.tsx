import { categories } from "@/constants/categories";
import Image from "next/image";

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 justify-between gap-y-10 lg:px-8 xl:px-14">
      {categories.slice(0, 6).map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center gap-y-1"
        >
          <div className="relative w-20 h-20 lg:w-[150px] lg:h-[150px]">
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover rounded-full"
            />
          </div>
          <h3 className="text-sm font-bold">{category.name}</h3>
          <p className="text-kaiglo_grey-base text-[10px]">
            {category.products} products
          </p>
        </div>
      ))}
    </div>
  );
};
export default CategoryGrid;
