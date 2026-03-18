import { getProductById } from "@/services/product";
import Image from "next/image";

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const res = await getProductById(params.id);
  const product = res.data;

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col md:flex-row gap-6">
      <div className="flex-1">
        <Image
          src={`/uploads/${product.image}`}
          alt={product.title}
          width={400}
          height={400}
          className="rounded-xl object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-pink-500 font-bold text-xl">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-gray-500">Category: {product.category}</p>
        <p className="text-gray-500">Stock: {product.stock}</p>
      </div>
    </div>
  );
}