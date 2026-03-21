import Link from "next/link";

const featureCategories = [
  { title: "Shampoo", image: "/skin1.jpg" },
    { title: "Hair__care", image: "/skin1.jpg" },
  { title: "Serum", image: "/images/categories/serum.jpg" },
  { title: "FaceWash", image: "/images/categories/facewash.jpg" },
  { title: "Oil", image: "/images/categories/oil.jpg" },
  { title: "Supplement", image: "/images/categories/supplement.jpg" },
  { title: "Cream", image: "/images/categories/cream.jpg" },
];

export default function FeatureCategories() {
  return (
    <section className="py-8 px-6">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {featureCategories.map((cat) => (
          <Link key={cat.title} href={`/products/category/${cat.title.toLowerCase()}`}>
            <div className="cursor-pointer border rounded-lg p-4 flex flex-col items-center hover:shadow-lg transition">
              {cat.image && <img src={cat.image} alt={cat.title} className="h-28 w-28 object-cover rounded-full mb-3" />}
              <h3 className="text-lg font-semibold text-center">{cat.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}