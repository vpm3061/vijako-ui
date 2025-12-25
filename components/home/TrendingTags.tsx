export default function QuickSearch() {
  const items = ["AC Repair", "Electrician", "Doctor", "Grocery", "Tiffin"];

  return (
    <div className="flex gap-2 overflow-x-auto px-4">
      {items.map((i) => (
        <span
          key={i}
          className="px-4 py-2 bg-gray-100 rounded-full text-sm whitespace-nowrap"
        >
          {i}
        </span>
      ))}
    </div>
  );
}
