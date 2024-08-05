import { IOrderSummary } from "@/interfaces/orders/orderSummary.interface";

// src/data/orders.js
export const orders: IOrderSummary[] = [
  {
    id: "666b0d3c5d7037279210cf79",
    image: "/images/product.jpg", // Replace with actual image URL
    title: "Zend Exceed Man High Quality Comfortable Bre...",
    orderNumber: "KGO-5874454",
    price: "₦7,500",
    status: "Awaiting Shipment",
    link: "/order/1",
  },
  {
    id: "666b0d3c5d7037279210cf79",
    image: "/images/product.jpg", // Replace with actual image URL
    title: "Nike Airmax highs for men 2024",
    orderNumber: "KGO-5874454",
    price: "₦40,890",
    status: "Shipped (Awaiting Confirmation)",
    link: "/order/1",
  },
  {
    id: "666b0d3c5d7037279210cf79",
    image: "/images/product.jpg", // Replace with actual image URL
    title: "Oppo Reno - 256gb/8gb - 20MP Rear Camera +...",
    orderNumber: "KGO-5874454",
    price: "₦125,000",
    link: "/order/1",
    status: "Delivered",
  },
  {
    id: "666b0d3c5d7037279210cf79",
    image: "/images/product.jpg", // Replace with actual image URL
    title: "These Shoes",
    orderNumber: "KGO-5874454",
    price: "₦8,700",
    status: "Cancelled",
    link: "/order/1",
  },
  {
    id: "666b0d3c5d7037279210cf79",
    image: "/images/product.jpg", // Replace with actual image URL
    title: "Red Hoodie for men 2030",
    orderNumber: "KGO-5874454",
    price: "₦25,000",
    status: "Returned",
    link: "/order/1",
  },
];

export const addresses = [
  {
    fullName: "John Doe",
    address: "No 1, John Doe Street",
    phoneNumber: "+234 814 123 4567",
    default: true,
    city: "Ikeja",
    state: "Lagos",
  },
  {
    fullName: "Jane Smith",
    address: "No 2, Jane Smith Street",
    phoneNumber: "+234 814 123 4568",
    default: false,
    city: "Victoria Island",
    state: "Lagos",
  },
];
