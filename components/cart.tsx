"use client";

import { CartItem as Item } from "@/types/cart";

export default function CartItem({
  item,
  onUpdate,
  onRemove,
}: {
  item: Item;
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
      <div>
        <h3 className="font-semibold text-pink-600">
          {item.product.title}
        </h3>
        <p className="text-sm text-gray-500">
          Rs. {item.product.price}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onUpdate(item._id, item.quantity - 1)}
          className="px-2 bg-gray-200 rounded"
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() => onUpdate(item._id, item.quantity + 1)}
          className="px-2 bg-gray-200 rounded"
        >
          +
        </button>

        <button
          onClick={() => onRemove(item._id)}
          className="ml-3 text-red-500"
        >
          Remove
        </button>
      </div>
    </div>
  );
}