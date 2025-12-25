export default function Saved() {
  const saved = [
    { title: "Doctor Visit at Home", price: "₹399" },
    { title: "Home Cleaning", price: "₹599" },
  ];

  return (
    <div className="pt-24 pb-24 max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Services</h1>

      <div className="space-y-4">
        {saved.map((item, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow">
            <h2 className="font-semibold">{item.title}</h2>
            <p className="text-blue-600 font-medium">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
