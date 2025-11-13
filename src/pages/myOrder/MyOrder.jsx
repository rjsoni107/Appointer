import React from "react";
import { Wrench, Calendar, DollarSign, User, Star } from "lucide-react";
import { PageHeading } from "../../components";

export default function MyOrder() {
    // ✅ Sample booking data
    const bookings = [
        { id: "#BK-1001", date: "10 Nov, 2025", service: "Electrician", provider: "Ravi Sharma", amount: "₹1,200", status: "Completed", rating: 4.8 },
        { id: "#BK-1002", date: "09 Nov, 2025", service: "Plumber", provider: "Amit Yadav", amount: "₹950", status: "In Progress", rating: null },
        { id: "#BK-1003", date: "05 Nov, 2025", service: "AC Repair", provider: "Sunil Mehta", amount: "₹1,800", status: "Pending", rating: null },
        { id: "#BK-1004", date: "01 Nov, 2025", service: "Cleaner", provider: "Kiran Verma", amount: "₹700", status: "Completed", rating: 5 },
        { id: "#BK-1005", date: "01 Nov, 2025", service: "Plumber", provider: "Rahul Verma", amount: "₹700", status: "Completed", rating: 5 },
    ];

    // ✅ Summary Cards
    const summary = [
        { label: "Total Bookings", value: 12, icon: Wrench, color: "text-blue-600", bg: "bg-blue-50", },
        { label: "Completed", value: 8, icon: Calendar, color: "text-green-600", bg: "bg-green-50", },
        { label: "Total Spent", value: "₹8,950", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50", },
    ];

    return (
        <div className="max-w-7xl mx-auto pb-10">
            <PageHeading
                mainHeadng="My Bookings"
                description="Track, manage and review all your service bookings"
            />

            {/* ✅ Summary Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                {summary.map((item, i) => (
                    <div
                        key={i}
                        className="bg-white dark:bg-gray-700 rounded-xl shadow-sm hover:shadow-md transition p-6 flex items-center"
                    >
                        <div
                            className={`w-12 h-12 flex items-center justify-center rounded-full ${item.bg} ${item.color} mr-4`}
                        >
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                {item.label}
                            </p>
                            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                {item.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ✅ Bookings Table */}
            <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Recent Bookings
                    </h3>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                        View All
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                                    Booking ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                                    Service
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                                    Provider
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                                    Rating
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
                            {bookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                >
                                    <td className="px-6 py-4 text-sm font-medium text-blue-600">
                                        {booking.id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {booking.date}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                        {booking.service}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" /> {booking.provider}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-200">
                                        {booking.amount}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2.5 py-1 text-xs font-semibold rounded-full ${booking.status === "Completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : booking.status === "In Progress"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {booking.rating ? (
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star className="w-4 h-4 fill-yellow-400" />{" "}
                                                {booking.rating}
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
