import React, { useEffect, useState } from "react";
import { Briefcase, CheckCircle, Clock, DollarSign, PieChart } from "lucide-react";
import Chart from "react-apexcharts";
import { PageHeading } from "../../components";
import { useTheme } from "../../contexts/ThemeContext";

const Dashboard = () => {
    const { theme } = useTheme();
    const [bookingTrend, setBookingTrend] = useState(null);
    const [serviceCategoryData, setServiceCategoryData] = useState(null);

    // ✅ Dashboard Summary (example for Provider)
    const summary = [
        { label: "Total Bookings", value: "128", icon: Briefcase, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Completed Jobs", value: "94", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
        { label: "Pending Jobs", value: "14", icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50" },
        { label: "Earnings", value: "₹58,240", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];

    // ✅ Recent Bookings Data
    const recentBookings = [
        { id: "#BK-101", customer: "Ravi Sharma", service: "Electrician", date: "10 Nov 2025", status: "Completed", amount: "₹1,200" },
        { id: "#BK-102", customer: "Aman Gupta", service: "Plumber", date: "08 Nov 2025", status: "In Progress", amount: "₹900" },
        { id: "#BK-103", customer: "Pooja Mehta", service: "AC Repair", date: "07 Nov 2025", status: "Pending", amount: "₹1,500" },
        { id: "#BK-104", customer: "Karan Patel", service: "Carpenter", date: "05 Nov 2025", status: "Completed", amount: "₹2,000" },
        { id: "#BK-105", customer: "Rahul Verma", service: "Plumber", date: "05 Nov 2025", status: "Completed", amount: "₹1,200" },
    ];

    // ✅ Charts Setup
    useEffect(() => {
        // Booking trend data
        setBookingTrend({
            options: {
                chart: { type: "area", toolbar: { show: false } },
                stroke: { curve: "smooth", width: 2 },
                xaxis: {
                    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                },
                colors: ["#3B82F6"],
                fill: {
                    type: "gradient",
                    gradient: { opacityFrom: 0.7, opacityTo: 0.3 },
                },
                dataLabels: { enabled: false },
                tooltip: { theme: "light" },
            },
            series: [{ name: "Bookings", data: [15, 22, 18, 30, 26, 35, 40] }],
        });

        // Service category distribution
        setServiceCategoryData({
            options: {
                chart: { type: "pie" },
                labels: ["Electrician", "Plumber", "AC Repair", "Cleaner", "Carpenter"],
                colors: ["#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"],
                legend: {
                    position: "bottom",
                    labels: {
                        colors: theme === "dark" ? "#E5E7EB" : "#374151",
                    },
                },
                dataLabels: { enabled: false },
            },
            series: [25, 20, 18, 22, 15],
        });
    }, [theme]);

    return (
        <div className="min-h-screen pb-10">
            <PageHeading
                mainHeadng="Dashboard"
                description="Monitor your service performance and bookings overview."
            />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* ✅ Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {summary.map((item, i) => (
                        <div
                            key={i}
                            className="bg-white dark:bg-gray-700 shadow rounded-xl p-5 flex items-center hover:shadow-md transition dark:shadow-gray-700"
                        >
                            <div
                                className={`w-12 h-12 flex items-center justify-center rounded-full ${item.bg} ${item.color} mr-4`}
                            >
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-200">{item.label}</p>
                                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ✅ Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Booking Trend */}
                    <div className="lg:col-span-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                                Booking Trend
                            </h3>
                        </div>
                        {bookingTrend && (
                            <Chart
                                options={bookingTrend.options}
                                series={bookingTrend.series}
                                type="area"
                                height={300}
                            />
                        )}
                    </div>

                    {/* Service Category Distribution */}
                    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                                Service Category Breakdown
                            </h3>
                            <PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        {serviceCategoryData && (
                            <Chart
                                options={serviceCategoryData.options}
                                series={serviceCategoryData.series}
                                type="pie"
                                height={300}
                            />
                        )}
                    </div>
                </div>

                {/* ✅ Recent Bookings */}
                <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                            Recent Bookings
                        </h3>
                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium dark:text-blue-400">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm text-gray-600 dark:text-gray-200">
                            <thead className="bg-gray-100 dark:bg-gray-500 text-gray-700 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="py-3 px-6 dark:text-gray-200">Booking ID</th>
                                    <th className="py-3 px-6 dark:text-gray-200">Customer</th>
                                    <th className="py-3 px-6 dark:text-gray-200">Service</th>
                                    <th className="py-3 px-6 dark:text-gray-200">Date</th>
                                    <th className="py-3 px-6 dark:text-gray-200">Amount</th>
                                    <th className="py-3 px-6 dark:text-gray-200">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map((b) => (
                                    <tr
                                        key={b.id}
                                        className="border-b hover:bg-gray-50 dark:hover:bg-gray-600 transition dark:border-gray-600"
                                    >
                                        <td className="py-3 px-6 dark:text-blue-400 font-medium">
                                            {b.id}
                                        </td>
                                        <td className="py-3 px-6 dark:text-gray-200">{b.customer}</td>
                                        <td className="py-3 px-6 dark:text-gray-200">{b.service}</td>
                                        <td className="py-3 px-6 dark:text-gray-200">{b.date}</td>
                                        <td className="py-3 px-6 dark:text-gray-200">{b.amount}</td>
                                        <td className="py-3 px-6">
                                            <span
                                                className={`px-2 py-1 text-xs font-semibold rounded-full ${b.status === "Completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : b.status === "In Progress"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
