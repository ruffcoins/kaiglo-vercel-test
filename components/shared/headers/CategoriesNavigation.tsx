// "use client";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import { categoryDropdownTabs, landingCategoriesMenu } from "@/constants/menu";
// import Image from "next/image";
// import ArrowRightIcon from "@/public/images/arrow-right.svg";
// import { Fragment, SetStateAction, useState } from "react";
// import { categoryMenuTab } from "@/enums/menu";
// import { ICategoryDropdownTab } from "@/interfaces/categoriesDropdown.interface";
// import React from "react";
// import CategoryMenuIcon from "@/public/images/categories/category-menu.svg";
// import Link from "next/link";
// import useGetAllCategories from "@/hooks/queries/category/getAllCategories";

// const CategoriesNavigation = () => {
//   const [currentTab, setCurrentTab] = useState(categoryMenuTab.MEN_FASHION.id);
//   const tabs = categoryDropdownTabs(currentTab);
//   const { allCategories } = useGetAllCategories();

//   // console.log(allCategories);

//   return (
//     <NavigationMenu>
//       <NavigationMenuList>
//         {allCategories?.slice(0, 6).map((item) => (
//           <NavigationMenuItem className="relative" key={item.id}>
//             <NavigationMenuTrigger
//               className="py-2.5 px-2.5 2xl:px-4 cursor-pointer hover:bg-kaiglo_grey-100 transition-colors duration-300 rounded-full text-sm font-normal normal-case"
//               onMouseEnter={() => setCurrentTab(item.id)}
//             >
//               {item.name}
//             </NavigationMenuTrigger>
//             <NavigationMenuContent className="w-screen">
//               <CategoriesNavigationContent
//                 tabs={item.category}
//                 currentTab={currentTab}
//                 setCurrentTab={setCurrentTab}
//               />
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//         ))}
//       </NavigationMenuList>
//     </NavigationMenu>
//   );
// };

// export default CategoriesNavigation;

// const CategoriesNavigationContent = ({
//   tabs,
//   currentTab,
//   setCurrentTab,
// }: {
//   tabs: any[];
//   currentTab: string;
//   setCurrentTab: React.Dispatch<SetStateAction<string>>;
// }) => {
//   const currentCategory = tabs.find((tab) => tab.id === currentTab);
//   const [currentSubCategory, setCurrentSubCategory] = useState(
//     currentCategory?.subCategories?.[0].id,
//   );

//   return (
//     <div className="h-[432px] px-8 xl:px-14 lg:py-6 xl:py-12 w-screen grid lg:grid-cols-4 xl:grid-cols-5 gap-x-8">
//       {/* Column One */}
//       <div className="h-[350px]">
//         {tabs.map((tab) => (
//           <ul className="text-kaiglo_grey-700" key={tab.id}>
//             <li
//               key={tab.id}
//               className={`${currentTab === tab.id ? "bg-kaiglo_grey-100" : ""} flex items-center justify-between p-3 text-base font-medium hover:bg-kaiglo_grey-100 cursor-pointer rounded-lg transition-all duration-200 ease-in-out`}
//               onMouseEnter={() => setCurrentTab(tab.id)}
//             >
//               <span>{tab.name}</span>
//               <span>
//                 <Image
//                   src={ArrowRightIcon}
//                   alt="arrow right"
//                   className="w-5 h-5"
//                   width={20}
//                   height={20}
//                 />
//               </span>
//             </li>
//           </ul>
//         ))}
//       </div>

//       <div className="lg:col-span-3 xl:col-span-4 grid lg:grid-cols-2 xl:grid-cols-3 gap-x-8">
//         {/* Column Two */}
//         <div className="border-x-[1px] space-y-6 overflow-y-auto h-[350px]">
//           <p className="font-medium text-sm px-8 uppercase">Shop by category</p>

//           <div className="grid grid-cols-3 gap-3">
//             {currentCategory?.subCategories?.map((subCategory) => (
//               <div
//                 className="flex flex-col items-center mb-4 cursor-pointer"
//                 key={subCategory?.id}
//                 onClick={() => setCurrentSubCategory(subCategory.id)}
//               >
//                 <Image
//                   src={subCategory.image}
//                   alt={subCategory.name}
//                   width={72}
//                   height={72}
//                   className="rounded-full w-[72px] h-[72px] bg-kaiglo_grey-100"
//                 />
//                 <p className="text-sm text-kaiglo_grey-700 mt-1">
//                   {subCategory.name}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Column Three */}
//         <div className="space-y-6 overflow-y-auto h-[350px]">
//           {currentCategory?.subCategories
//             ?.find((subCategory) => subCategory.id === currentSubCategory)
//             ?.subSubCategories?.map((subSubCategory) => (
//               <Fragment key={subSubCategory?.id}>
//                 <p className="font-medium text-sm uppercase">
//                   {subSubCategory.name}
//                 </p>

//                 <div className="grid grid-cols-4 justify-center gap-3">
//                   <div className="flex flex-col items-center">
//                     <Link
//                       href={subSubCategory.link}
//                       className="w-[72px] h-[72px] bg-kaiglo_grey-100 rounded-full flex justify-center items-center"
//                     >
//                       <Image
//                         src={CategoryMenuIcon}
//                         alt={"Category Menu"}
//                         width={32}
//                         height={32}
//                         className="w-8 h-8"
//                       />
//                     </Link>

//                     <p className="text-sm text-kaiglo_grey-700 mt-1">
//                       View all
//                     </p>
//                   </div>

//                   {subSubCategory?.products?.map((product) => (
//                     <div
//                       className="flex flex-col items-center mb-4"
//                       key={product.name}
//                     >
//                       <Image
//                         src={product.image}
//                         alt={product.name}
//                         width={72}
//                         height={72}
//                         className="rounded-full w-[72px] h-[72px] bg-kaiglo_grey-100"
//                       />
//                       <p className="text-sm text-kaiglo_grey-700 mt-1">
//                         {product.name}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </Fragment>
//             ))}
//           <p className="font-medium text-sm px-8 uppercase"></p>
//         </div>

//         <div className="hidden xl:block"></div>
//       </div>
//     </div>
//   );
// };

"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { categoryDropdownTabs, landingCategoriesMenu } from "@/constants/menu";
import Image from "next/image";
import ArrowRightIcon from "@/public/images/arrow-right.svg";
import { Fragment, SetStateAction, useState } from "react";
import { categoryMenuTab } from "@/enums/menu";
import { ICategoryDropdownTab } from "@/interfaces/categoriesDropdown.interface";
import React from "react";
import CategoryMenuIcon from "@/public/images/categories/category-menu.svg";
import Link from "next/link";

const CategoriesNavigation = () => {
  const [currentTab, setCurrentTab] = useState(categoryMenuTab.MEN_FASHION.id);
  const tabs = categoryDropdownTabs(currentTab);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {landingCategoriesMenu.map((item) => (
          <NavigationMenuItem className="relative" key={item.id}>
            <NavigationMenuTrigger
              className="py-2.5 px-2.5 2xl:px-4 cursor-pointer hover:bg-kaiglo_grey-100 transition-colors duration-300 rounded-full text-sm font-normal normal-case"
              onMouseEnter={() => setCurrentTab(item.id)}
            >
              {item.name}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="w-screen">
              <CategoriesNavigationContent
                tabs={tabs}
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CategoriesNavigation;

const CategoriesNavigationContent = ({
  tabs,
  currentTab,
  setCurrentTab,
}: {
  tabs: ICategoryDropdownTab[];
  currentTab: string;
  setCurrentTab: React.Dispatch<SetStateAction<string>>;
}) => {
  const currentCategory = tabs.find((tab) => tab.id === currentTab);
  const [currentSubCategory, setCurrentSubCategory] = useState(
    currentCategory?.subCategories?.[0].id,
  );

  return (
    <div className="h-[432px] px-8 xl:px-14 lg:py-6 xl:py-12 w-screen grid lg:grid-cols-4 xl:grid-cols-5 gap-x-8">
      {/* Column One */}
      <div className="h-[350px]">
        {tabs.map((tab) => (
          <ul className="text-kaiglo_grey-700" key={tab.id}>
            <li
              key={tab.id}
              className={`${currentTab === tab.id ? "bg-kaiglo_grey-100" : ""} flex items-center justify-between p-3 text-base font-medium hover:bg-kaiglo_grey-100 cursor-pointer rounded-lg transition-all duration-200 ease-in-out`}
              onMouseEnter={() => setCurrentTab(tab.id)}
            >
              <span>{tab.name}</span>
              <span>
                <Image
                  src={ArrowRightIcon}
                  alt="arrow right"
                  className="w-5 h-5"
                  width={20}
                  height={20}
                />
              </span>
            </li>
          </ul>
        ))}
      </div>

      <div className="lg:col-span-3 xl:col-span-4 grid lg:grid-cols-2 xl:grid-cols-3 gap-x-8">
        {/* Column Two */}
        <div className="border-x-[1px] space-y-6 overflow-y-auto h-[350px]">
          <p className="font-medium text-sm px-8 uppercase">Shop by category</p>

          <div className="grid grid-cols-3 gap-3">
            {currentCategory?.subCategories?.map((subCategory) => (
              <div
                className="flex flex-col items-center mb-4 cursor-pointer"
                key={subCategory?.id}
                onClick={() => setCurrentSubCategory(subCategory.id)}
              >
                <Image
                  src={subCategory.image}
                  alt={subCategory.name}
                  width={72}
                  height={72}
                  className="rounded-full w-[72px] h-[72px] bg-kaiglo_grey-100"
                />
                <p className="text-sm text-kaiglo_grey-700 mt-1">
                  {subCategory.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Column Three */}
        <div className="space-y-6 overflow-y-auto h-[350px]">
          {currentCategory?.subCategories
            ?.find((subCategory) => subCategory.id === currentSubCategory)
            ?.subSubCategories?.map((subSubCategory) => (
              <Fragment key={subSubCategory?.id}>
                <p className="font-medium text-sm uppercase">
                  {subSubCategory.name}
                </p>

                <div className="grid grid-cols-4 justify-center gap-3">
                  <div className="flex flex-col items-center">
                    <Link
                      href={subSubCategory.link}
                      className="w-[72px] h-[72px] bg-kaiglo_grey-100 rounded-full flex justify-center items-center"
                    >
                      <Image
                        src={CategoryMenuIcon}
                        alt={"Category Menu"}
                        width={32}
                        height={32}
                        className="w-8 h-8"
                      />
                    </Link>

                    <p className="text-sm text-kaiglo_grey-700 mt-1">
                      View all
                    </p>
                  </div>

                  {subSubCategory?.products?.map((product) => (
                    <div
                      className="flex flex-col items-center mb-4"
                      key={product.name}
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={72}
                        height={72}
                        className="rounded-full w-[72px] h-[72px] bg-kaiglo_grey-100"
                      />
                      <p className="text-sm text-kaiglo_grey-700 mt-1">
                        {product.name}
                      </p>
                    </div>
                  ))}
                </div>
              </Fragment>
            ))}
          <p className="font-medium text-sm px-8 uppercase"></p>
        </div>

        <div className="hidden xl:block"></div>
      </div>
    </div>
  );
};
