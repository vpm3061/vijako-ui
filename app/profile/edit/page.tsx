"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditProfile() {
  return (
    <div className="pt-24 max-w-xl mx-auto p-4 pb-24">
      <Link href="/profile" className="flex items-center mb-4">
        <ArrowLeft className="mr-2" /> Back
      </Link>

      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <div className="bg-white rounded-2xl p-5 shadow space-y-5">
        <div>
          <label className="font-medium">Full Name</label>
          <input className="w-full mt-1 p-3 rounded-xl border" />
        </div>

        <div>
          <label className="font-medium">Phone Number</label>
          <input className="w-full mt-1 p-3 rounded-xl border" />
        </div>

        <div>
          <label className="font-medium">Email</label>
          <input className="w-full mt-1 p-3 rounded-xl border" />
        </div>

        <div>
          <label className="font-medium">Address</label>
          <textarea className="w-full mt-1 p-3 rounded-xl border" rows={3} />
        </div>

        <button className="bg-blue-600 text-white w-full py-3 rounded-xl font-semibold">
          Save Changes
        </button>
      </div>
    </div>
  );
}
