export default function MyReviews() {
  const reviews = [
    { service: "Plumber", rating: 5, text: "Great experience!" },
    { service: "Doctor Visit", rating: 4, text: "Very helpful." },
  ];

  return (
    <div className="pt-24 pb-24 max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>

      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow">
            <h2 className="font-semibold">{r.service}</h2>
            <p className="text-yellow-500">⭐ {r.rating}/5</p>
            <p className="text-gray-700 mt-2">{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
