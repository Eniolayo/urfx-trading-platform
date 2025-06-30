const transactions = [
    {
        client: "Name",
        category: "Email",
        date: "Today",
        time: "2m ago",
        amount: "$500",
        method: "QR Code",
        status: "Passed",
        payout: true,
    },
    {
        client: "Claudia Store",
        category: "Accessories",
        date: "Today",
        time: "5m ago",
        amount: "$1,000",
        method: "Transfer",
        status: "Failed",
        payout: false,
    },
    {
        client: "Chidi Barber",
        category: "Barber Shop",
        date: "Today",
        time: "1h ago",
        amount: "$500",
        method: "QR Code",
        status: "New",
        payout: false,
    },
    {
        client: "Cahaya Dewi",
        category: "Bank Account",
        date: "Today",
        time: "2h ago",
        amount: "$1,000",
        method: "Transfer",
        status: "Pending",
        payout: false,
    },
    {
        client: "Yael Amari",
        category: "Bank Account",
        date: "Yesterday",
        time: "09:00 AM",
        amount: "$500",
        method: "Transfer",
        status: "Done",
        payout: true,
    },
    {
        client: "Larana, Inc.",
        category: "Hotel",
        date: "Yesterday",
        time: "08:00 AM",
        amount: "$1,000",
        method: "QR Code",
        status: "Done",
        payout: false,
    },
];

const getStatusStyle = (status:any) => {
    switch (status) {
        case "Passed":
        case "Done":
            return "text-blue-600";
        case "Failed":
            return "text-red-500";
        case "New":
            return "text-gray-500";
        case "Pending":
            return "text-yellow-600";
        default:
            return "";
    }
};

const AdminDashboardView = () => {
    return (
        <div className="w-full p-4 sm:p-8 bg-white dark:bg-black h-full">
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-[#CDCDCD] mb-4">
                Transaction
            </h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left border border-gray-300 dark:border-gray-700">
                    <thead className="bg-gradient-to-r from-[#003049] via-[#004d4d] to-[#006666] text-white">
                        <tr>
                            <th className="p-3">Client</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Payout</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((t, idx) => (
                            <tr
                                key={idx}
                                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-[#1e1e1e]"
                            >
                                <td className="p-3">
                                    <div className="font-semibold text-black dark:text-white">{t.client}</div>
                                    <div className="text-sm text-gray-500">{t.category}</div>
                                </td>
                                <td className="p-3 text-black dark:text-white">
                                    {t.date}
                                    <div className="text-sm text-gray-500">{t.time}</div>
                                </td>
                                <td className="p-3 text-black dark:text-white">
                                    {t.amount}
                                    <div className="text-sm text-gray-500">{t.method}</div>
                                </td>
                                <td className={`p-3 font-medium ${getStatusStyle(t.status)}`}>{t.status}</td>
                                <td className="p-3">
                                    {t.payout ? (
                                        <button className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded">
                                            Request
                                        </button>
                                    ) : (
                                        <span className="text-gray-400 text-sm">-</span>
                                    )}
                                </td>
                                <td className="p-3 flex gap-2">
                                    <button className="px-3 py-1 text-xs font-semibold text-white bg-green-500 rounded">
                                        Pass
                                    </button>
                                    <button className="px-3 py-1 text-xs font-semibold text-white bg-red-500 rounded">
                                        Terminate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboardView;
