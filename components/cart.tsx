"use client";

import { CartItem as ItemType } from "@/services/cart";

interface Props {
  item: ItemType;
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdate, onRemove }: Props) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow mb-2">
      <div>
        <h3 className="font-semibold">{item.product.title}</h3>
        <p>Rs. {item.product.price}</p>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={1}
          max={item.product.stock}
          value={item.quantity}
          onChange={(e) => onUpdate(item._id, Number(e.target.value))}
          className="w-16 border rounded px-2 py-1"
        />
        <button
          onClick={() => onRemove(item._id)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Remove
        </button>
      </div>
    </div>
  );
}