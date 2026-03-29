"use client";

import { useEffect, useState } from "react";
import { getMyOrders } from "@/services/order";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getMyOrders();
        setOrders(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (orders.length === 0) return <p>No orders found</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="border rounded p-4 mb-4 shadow-md">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
          <p><strong>Order Status:</strong> {order.orderStatus}</p>
          {order.paymentScreenshot && (
            <img
              src={`http://localhost:5000/${order.paymentScreenshot}`}
              alt="Payment Screenshot"
              className="w-40 h-40 object-cover mt-2"
            />
          )}

          <div className="mt-2">
            <strong>Shipping Info:</strong>
            <p>{order.shipping?.name}</p>
            <p>{order.shipping?.phone}</p>
            <p>{order.shipping?.address}</p>
            <p>{order.shipping?.city}</p>
          </div>

          <div className="mt-4">
            <strong>Products:</strong>
            <div className="mt-2">
              {order.products.map((p: any) => (
                <div key={p.productId._id} className="flex items-center border-b py-2">
                  {p.productId.image && (
                    <img src={`http://localhost:5000/${p.productId.image}`} alt={p.productId.title} className="w-16 h-16 object-cover mr-4" />
                  )}
                  <div>
                    <p className="font-semibold">{p.productId.title}</p>
                    <p>Price: ${p.productId.price}</p>
                    <p>Quantity: {p.quantity}</p>
                    <p>Total: ${p.productId.price * p.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      ))}
    </div>
  );
}