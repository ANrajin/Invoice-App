'use client';

import { HiCurrencyDollar, HiDocumentText, HiUserGroup, HiClock } from 'react-icons/hi';

const StatsCard = ({ title, value, icon: Icon, color }: any) => (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <div className={`p-3 mr-4 text-white rounded-full ${color}`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">{value}</p>
        </div>
    </div>
);

const RecentActivity = () => (
    <div className="p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800 sm:p-6">
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h3>
        <ol className="relative border-l border-gray-200 dark:border-gray-700">
            <li className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Just now</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Invoice Created</h3>
                <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">Invoice #1234 for Acme Corp created.</p>
            </li>
            <li className="mb-10 ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2 hours ago</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Customer Added</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">New customer "John Doe" registered.</p>
            </li>
            <li className="ml-4">
                <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">1 day ago</time>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Invoice Paid</h3>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">Invoice #1230 marked as paid.</p>
            </li>
        </ol>
    </div>
);

export const DashboardWidgets = () => {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard title="Total Revenue" value="$45,231.89" icon={HiCurrencyDollar} color="bg-green-500" />
                <StatsCard title="Outstanding Invoices" value="12" icon={HiDocumentText} color="bg-red-500" />
                <StatsCard title="Total Customers" value="2,340" icon={HiUserGroup} color="bg-blue-500" />
                <StatsCard title="Recent Activity" value="24 New" icon={HiClock} color="bg-purple-500" />
            </div>
            <RecentActivity />
        </div>
    );
};
