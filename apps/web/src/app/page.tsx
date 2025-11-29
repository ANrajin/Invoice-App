import Link from 'next/link';
import { HiUserGroup, HiDocumentText } from 'react-icons/hi';

export default function HomePage() {
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Invoice App Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center pb-4">
                        <HiUserGroup className="h-12 w-12 text-blue-600 mb-2" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Customers</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">Manage your customer base</span>
                        <div className="flex space-x-3 lg:mt-6">
                            <Link href="/customers">
                                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Manage Customers
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center pb-4">
                        <HiDocumentText className="h-12 w-12 text-green-600 mb-2" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">Invoices</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create and track invoices</span>
                        <div className="flex space-x-3 lg:mt-6">
                            <Link href="/invoices">
                                <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                    Manage Invoices
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
