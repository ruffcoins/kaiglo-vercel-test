import { categoryMenuTab } from "../enums/menu";
import { ICategoryDropdownTab } from "../interfaces/categoriesDropdown.interface";
import ActiveHome from "../public/images/home-active.svg";
import InactiveHome from "../public/images/home-inactive.svg";
import ActiveCategory from "../public/images/category-active.svg";
import InactiveCategory from "../public/images/category-inactive.svg";
import ActiveCart from "../public/images/cart-active.svg";
import InactiveCart from "../public/images/cart-inactive.svg";
import ActiveAccount from "../public/images/user-active.svg";
import InactiveAccount from "../public/images/user-inactive.svg";
import { PageLinks } from "./links";
import Wishlist from "@/public/images/empty-heart.svg";
import Balance from "@/public/images/dollar-circle.svg";
import Rewards from "@/public/images/rewards.svg";
import Notification from "@/public/images/notification-bell.svg";
import Shipping from "@/public/images/shipping.svg";
import Settings from "@/public/images/cog.svg";
import Logout from "@/public/images/logout-red.svg";
import Auth from "@/utils/auth";

const isLoggedIn = Auth.isAuthenticated();

// Landing page categories menu
export const landingCategoriesMenu = [
  {
    id: "men_fashion",
    name: "Men",
    href: "/category/MEN'S FASHION",
  },
  {
    id: "women_fashion",
    name: "Women",
    href: "/category/WOMEN'S FASHION",
  },
  {
    id: "phones_and_tablets",
    name: "Phones & Tablets",
    href: "/category/PHONES & TABLETS",
  },
  {
    id: "electronics",
    name: "Electronics",
    href: "/category/CONSUMER ELECTRONICS",
  },
  {
    id: "office_and_school",
    name: "Office & School",
  },
  {
    id: "kids_and_toys",
    name: "Kids & Toys",
    href: "/category/KIDS AND TOYS",
  },
  {
    id: "beauty_and_health",
    name: "Beauty & Health",
  },
];

export const categoryDropdownMenu = {
  OFFICE_AND_SCHOOL: "Office & School",
  MEN_FASHION: "Men's Fashion",
  WOMEN_FASHION: "Women’s Fashion",
  PHONES_AND_TABLETS: "Phones & Tablets",
  ELECTRONICS: "Electronics",
  KIDS_AND_TOYS: "Kids & Toys",
  BEAUTY_AND_HEALTH: "Beauty & Health",
};

export const categoryDropdownTabs = (
  currentTab: string,
): ICategoryDropdownTab[] => [
  {
    name: categoryDropdownMenu.MEN_FASHION,
    id: categoryMenuTab.MEN_FASHION.id,
    current: currentTab === categoryMenuTab.MEN_FASHION.id,
    subCategories: [
      {
        id: "tops",
        name: "Tops",
        link: "/tops",
        image: "/images/categories/tops.png",
        subSubCategories: [
          {
            id: "t-shirts",
            name: "T-Shirts",
            link: "/t-shirts",
            image: "/images/categories/tops.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "polos",
            name: "Polos",
            link: "/polos",
            image: "/images/categories/tops.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "dress-shirts",
            name: "Dress Shirts",
            link: "/dress-shirts",
            image: "/images/categories/tops.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
        ],
      },
      {
        id: "pants",
        name: "Pants",
        link: "/pants",
        image: "/images/categories/pants.png",
        subSubCategories: [
          {
            id: "trousers",
            name: "Trousers",
            link: "/trousers",
            image: "/images/categories/pants.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "joggers",
            name: "Joggers",
            link: "/joggers",
            image: "/images/categories/pants.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "jeans",
            name: "Jeans",
            link: "/jeans",
            image: "/images/categories/pants.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
        ],
      },
      {
        id: "shoes",
        name: "Shoes",
        link: "/shoes",
        image: "/images/categories/shoes.png",
        subSubCategories: [
          {
            id: "sneakers",
            name: "Sneakers",
            link: "/sneakers",
            image: "/images/categories/shoes.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "dress-shoes",
            name: "Dress Shoes",
            link: "/dress-shoes",
            image: "/images/categories/shoes.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "slides",
            name: "Slides",
            link: "/slides",
            image: "/images/categories/shoes.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
        ],
      },
      {
        id: "accessories",
        name: "Accessories",
        link: "/accessories",
        image: "/images/categories/accessories.png",
        subSubCategories: [
          {
            id: "ties",
            name: "Ties",
            link: "/ties",
            image: "/images/categories/accessories.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "belts",
            name: "Belts",
            link: "/belts",
            image: "/images/categories/accessories.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "hats",
            name: "Hats",
            link: "/hats",
            image: "/images/categories/accessories.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
        ],
      },
      {
        id: "underwear",
        name: "Underwear",
        link: "/underwear",
        image: "/images/categories/underwear.png",
        subSubCategories: [
          {
            id: "boxers",
            name: "Boxers",
            link: "/boxers",
            image: "/images/categories/underwear.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "briefs",
            name: "Briefs",
            link: "/briefs",
            image: "/images/categories/underwear.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "thongs",
            name: "Thongs",
            link: "/thongs",
            image: "/images/categories/underwear.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
        ],
      },
      {
        id: "jackets",
        name: "Jackets",
        link: "/jackets",
        image: "/images/categories/jackets.png",
        subSubCategories: [
          {
            id: "jackets-mini",
            name: "Jackets Mini",
            link: "/jackets",
            image: "/images/categories/jackets.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "jackets",
            name: "Jackets",
            link: "/jackets",
            image: "/images/categories/jackets.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
          {
            id: "jackets-pro",
            name: "Jackets Pro",
            link: "/jackets",
            image: "/images/categories/jackets.png",
            products: [
              {
                name: "Product 1",
                link: "/product-1",
                image: "/images/categories/tops.png",
              },
              {
                name: "Product 2",
                link: "/product-2",
                image: "/images/categories/pants.png",
              },
              {
                name: "Product 3",
                link: "/product-3",
                image: "/images/categories/women-bags.png",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: categoryDropdownMenu.WOMEN_FASHION,
    id: categoryMenuTab.WOMEN_FASHION.id,
    current: currentTab === categoryMenuTab.WOMEN_FASHION.id,
    subCategories: [
      {
        name: "Tops",
        link: "/tops",
        image: "/images/categories/women-tops.png",
      },
      {
        name: "Pants",
        link: "/pants",
        image: "/images/categories/women-pants.png",
      },
      {
        name: "Shoes",
        link: "/shoes",
        image: "/images/categories/women-shoes.png",
      },
      {
        name: "Bags",
        link: "/bags",
        image: "/images/categories/women-bags.png",
      },
      {
        name: "Underwear",
        link: "/underwear",
        image: "/images/categories/underwear.png",
      },
      {
        name: "Gym Wear",
        link: "/gym-wear",
        image: "/images/categories/women-gym.png",
      },
    ],
  },
  {
    name: categoryDropdownMenu.PHONES_AND_TABLETS,
    id: categoryMenuTab.PHONES_AND_TABLETS.id,
    current: currentTab === categoryMenuTab.PHONES_AND_TABLETS.id,
    subCategories: [
      {
        name: "Smartphones",
        link: "/smartphones",
        image: "/images/categories/women-tops.png",
      },
      {
        name: "Tablets",
        link: "/tablets",
        image: "/images/categories/women-pants.png",
      },
      {
        name: "Accessories",
        link: "/accessories",
        image: "/images/categories/women-tops.png",
      },
    ],
  },
  {
    name: categoryDropdownMenu.ELECTRONICS,
    id: categoryMenuTab.ELECTRONICS.id,
    current: currentTab === categoryMenuTab.ELECTRONICS.id,
    subCategories: [
      {
        name: "Cameras",
        link: "/cameras",
        image: "/images/categories/women-tops.png",
      },
      {
        name: "Laptops",
        link: "/laptops",
        image: "/images/categories/women-pants.png",
      },
      {
        name: "Headphones",
        link: "/headphones",
        image: "/images/categories/women-gym.png",
      },
      {
        name: "Accessories",
        link: "/accessories",
        image: "/images/categories/women-shoes.png",
      },
      {
        name: "Smartwatches",
        link: "/smartwatches",
        image: "/images/categories/women-bags.png",
      },
      {
        name: "Speakers",
        link: "/speakers",
        image: "/images/categories/underwear.png",
      },
    ],
  },
  {
    name: categoryDropdownMenu.OFFICE_AND_SCHOOL,
    id: categoryMenuTab.OFFICE_AND_SCHOOL.id,
    current: currentTab === categoryMenuTab.OFFICE_AND_SCHOOL.id,
    subCategories: [
      {
        name: "Latest Shoes",
        link: "/latest-shoes",
        image: "/images/categories/women-tops.png",
      },
      {
        name: "New Accessories",
        link: "/new-accessories",
        image: "/images/categories/women-pants.png",
      },
      {
        name: "Fresh Apparel",
        link: "/fresh-apparel",
        image: "/images/categories/women-shoes.png",
      },
      {
        name: "Tech Gadgets",
        link: "/tech-gadgets",
        image: "/images/categories/women-bags.png",
      },
    ],
  },
  {
    name: categoryDropdownMenu.KIDS_AND_TOYS,
    id: categoryMenuTab.KIDS_AND_TOYS.id,
    current: currentTab === categoryMenuTab.KIDS_AND_TOYS.id,
    subCategories: [
      {
        name: "Toys for Boys",
        link: "/toys-for-boys",
        image: "/images/categories/women-tops.png",
      },
      {
        name: "Toys for Girls",
        link: "/toys-for-girls",
        image: "/images/categories/women-pants.png",
      },
      {
        name: "Shoes",
        link: "/shoes",
        image: "/images/categories/women-shoes.png",
      },
      {
        name: "Accessories",
        link: "/accessories",
        image: "/images/categories/accessories.png",
      },
      {
        name: "Underwear",
        link: "/underwear",
        image: "/images/categories/underwear.png",
      },
      {
        name: "Jackets",
        link: "/jackets",
        image: "/images/categories/tops.png",
      },
    ],
  },
  {
    name: categoryDropdownMenu.BEAUTY_AND_HEALTH,
    id: categoryMenuTab.BEAUTY_AND_HEALTH.id,
    current: currentTab === categoryMenuTab.BEAUTY_AND_HEALTH.id,
    subCategories: [
      {
        name: "Skincare",
        link: "/skincare",
        image: "/images/categories/women-tops.png",
      },
      {
        name: "Makeup",
        link: "/makeup",
        image: "/images/categories/tops.png",
      },
      {
        name: "Haircare",
        link: "/haircare",
        image: "/images/categories/women-pants.png",
      },
      {
        name: "Fragrances",
        link: "/fragrances",
        image: "/images/categories/women-shoes.png",
      },
      {
        name: "Personal Care",
        link: "/personal-care",
        image: "/images/categories/women-bags.png",
      },
      {
        name: "Wellness",
        link: "/wellness",
        image: "/images/categories/accessories.png",
      },
    ],
  },
];

// Footer Menu
export const footerMenuColumn1 = [
  { title: "About Us", link: "/about" },
  { title: "Terms & Conditions", link: "/terms-and-conditions" },
  { title: "Privacy Policy", link: "/privacy-policy" },
  { title: "Careers", link: "/careers" },
  { title: "Contact Us", link: "/contact" },
];

export const footerMenuColumn2 = [
  { title: "Shipping & Delivery", link: "/shipping-and-delivery" },
  { title: "Order Tracking", link: "/order-tracking" },
  { title: "Return Policy", link: "/return-policy" },
  { title: "FAQs", link: "/faqs" },
];

export const footerMenuColumn3 = [
  { title: "Sell on Kaiglo", link: "/sell-on-kaiglo" },
  { title: "Become an Affiliate Partner", link: "/affiliate-partner" },
];
// End Footer Menu

// Bottom Nav Menu
export const bottomNavMenu = [
  {
    title: "Home",
    link: "/",
    activeIcon: ActiveHome,
    inactiveIcon: InactiveHome,
  },
  {
    title: "Category",
    link: "/category",
    activeIcon: ActiveCategory,
    inactiveIcon: InactiveCategory,
  },
  {
    title: "Cart",
    link: "/cart",
    activeIcon: ActiveCart,
    inactiveIcon: InactiveCart,
  },
  {
    title: "Account",
    link: isLoggedIn ? "/app/dashboard" : "/auth/authenticate",
    activeIcon: ActiveAccount,
    inactiveIcon: InactiveAccount,
  },
];

export const accountTabsMenu = [
  { id: "dashboard", label: "Dashboard", link: PageLinks.dashboard },
  { id: "orders", label: "My Orders", link: PageLinks.orders },
  { id: "wishlist", label: "Wishlist", link: PageLinks.wishlist },
  { id: "addresses", label: "Shipping Addresses", link: PageLinks.addresses },
  { id: "rewards", label: "Kaiglo Rewards", link: PageLinks.rewards },
  { id: "referral", label: "Referral", link: PageLinks.referrals },
  {
    id: "notifications",
    label: "Notifications",
    link: PageLinks.notifications,
  },
  { id: "settings", label: "Account Settings", link: PageLinks.settings },
];

export const mobileDashboardMenu = [
  {
    title: "Shopping Balance",
    icon: Balance,
    link: PageLinks.rewards,
  },
  {
    title: "Rewards",
    icon: Rewards,
    link: PageLinks.rewards,
  },
  {
    title: "Referrals",
    icon: Wishlist,
    link: PageLinks.referrals,
  },
  {
    title: "Notifications",
    icon: Notification,
    link: PageLinks.notifications,
  },
  {
    title: "Shipping Addresses",
    icon: Shipping,
    link: PageLinks.addresses,
  },
  {
    title: "Account Settings",
    icon: Settings,
    link: PageLinks.settings,
  },
  {
    title: "Log out",
    icon: Logout,
    link: "",
  },
];
