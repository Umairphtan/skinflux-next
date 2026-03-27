"use client";

import { useEffect, useState } from "react";
import { getMyOrders } from "@/services/order";

export default function OrderPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    getMyOrders().then(setOrders);
  }, []);

  return (
    <div className="p-6">
      <h1>My Orders</h1>

      {orders.map((o) => (
        <div key={o._id} className="border p-3 my-2">
          <p>Total: Rs. {o.totalPrice}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}