export default function MyOrders() {
  const orders = [
    { id: 1, title: "AC Repair", status: "Completed", date: "Today" },
    { id: 2, title: "Electrician Visit", status: "Pending", date: "Yesterday" },
  ];

  return (
    <div className="pt-24 pb-24 max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((o) => (
          <div key={o.id} className="bg-white p-4 rounded-2xl shadow">
            <h2 className="font-semibold">{o.title}</h2>
            <p className="text-gray-600 text-sm">{o.date}</p>
            <span className="mt-2 inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {o.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
