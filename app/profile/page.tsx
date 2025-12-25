"use client";
import Link from "next/link";
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="pt-24 pb-24 max-w-xl mx-auto p-4">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      {/* User Card */}
      <div className="bg-white p-5 rounded-2xl shadow mb-6">
        <div className="flex items-center gap-4">
          <img
            src="https://i.pravatar.cc/150"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-xl font-semibold">Your Name</h2>
            <p className="text-gray-600 text-sm">Bharat, India 🇮🇳</p>
          </div>
        </div>

        <div className="mt-4 space-y-2 text-gray-700">
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4" /> +91 9876543210
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4" /> you@example.com
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Lucknow, UP
          </p>
        </div>

        <Link
          href="/profile/edit"
          className="mt-4 inline-flex items-center justify-center w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"
        >
          Edit Profile <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </div>

      {/* Links */}
      <div className="bg-white rounded-2xl p-5 shadow space-y-4">
        <Link href="/saved" className="flex justify-between font-medium">
          Saved Services <ArrowRight />
        </Link>

        <Link href="/my-orders" className="flex justify-between font-medium">
          My Orders <ArrowRight />
        </Link>

        <Link href="/my-reviews" className="flex justify-between font-medium">
          My Reviews <ArrowRight />
        </Link>

        <Link href="/support" className="flex justify-between font-medium">
          Help & Support <ArrowRight />
        </Link>
      </div>
    </div>
  );
}
