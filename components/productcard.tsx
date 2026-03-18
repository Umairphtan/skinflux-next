import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/${product._id}`}>
      <div className="border rounded-xl shadow p-4 hover:shadow-lg transition cursor-pointer">
        <Image
          src={`/uploads/${product.image}`}
          alt={product.title}
          width={250}
          height={250}
          className="rounded-xl object-cover"
        />
        <h3 className="mt-3 font-semibold text-lg">{product.title}</h3>
        <p className="text-pink-500 font-bold mt-1">${product.price}</p>
      </div>
    </Link>
  );
}