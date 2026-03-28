"use client";

import { useEffect, useState } from "react";
import { getMyOrders } from "@/services/order";

interface OrderProduct {
  productId: {
    _id: string;
    title: string;
    price: number;
    image?: string | string[]; // support multiple images
  };
  quantity: number;
}

interface Shipping {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
}

interface Order {
  _id: string;
  products: OrderProduct[];
  totalPrice: number;
  shipping?: Shipping;
  paymentMethod: string;
  orderStatus: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0)
    return <p className="text-center mt-10">No orders found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-xl p-6 mb-6 shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
        >
          {/* Order Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Order ID: {order._id}</h2>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.orderStatus === "Delivered"
                  ? "bg-green-100 text-green-800"
                  : order.orderStatus === "Pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {order.orderStatus}
            </span>
          </div>

          {/* Shipping Info */}
          <div className="mb-4 text-gray-700">
            <strong>Shipping:</strong>{" "}
            {order.shipping?.name || "N/A"} | {order.shipping?.phone || "N/A"} |{" "}
            {order.shipping?.address || "N/A"}, {order.shipping?.city || "N/A"}
          </div>

          {/* Payment & Total */}
          <div className="flex justify-between mb-4 text-gray-700">
            <span>
              <strong>Payment:</strong> {order.paymentMethod}
            </span>
            <span>
              <strong>Total:</strong> Rs {order.totalPrice.toFixed(2)}
            </span>
          </div>

          {/* Products */}
          <div>
            <strong>Products:</strong>
            <ul className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
              {order.products?.map((p) => {
                const imageFile =
                  Array.isArray(p.productId.image)
                    ? p.productId.image[0] // first image if multiple
                    : p.productId.image;

                return (
                  <li
                    key={p.productId._id}
                    className="flex items-center gap-3 border p-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <img
                      src={
                        imageFile
                          ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${imageFile}`
                          : "/default.jpg"
                      }
                      alt={p.productId?.title || "Product"}
                      className="w-16 h-16 object-cover rounded-md border"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {p.productId?.title || "Unknown"}
                      </span>
                      <span className="text-sm text-gray-600">
                        Qty: {p.quantity} | Rs{p.productId?.price?.toFixed(2) || 0}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}