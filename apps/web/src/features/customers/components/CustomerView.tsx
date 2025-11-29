'use client';

import { Customer } from '../types';
import { HiPencil, HiTrash } from 'react-icons/hi';

interface CustomerViewProps {
    customers: Customer[];
    isLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const CustomerView = ({ customers, isLoading, onEdit, onDelete }: CustomerViewProps) => {
    if (isLoading) {
        return <div className="text-center p-4">Loading customers...</div>;
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">Phone</th>
                        <th scope="col" className="px-6 py-3">Address</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {customer.name}
                            </td>
                            <td className="px-6 py-4">{customer.email}</td>
                            <td className="px-6 py-4">{customer.phone}</td>
                            <td className="px-6 py-4">{customer.address}</td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(customer.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"
                                    >
                                        <HiPencil className="mr-1 h-4 w-4" /> Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(customer.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline flex items-center"
                                    >
                                        <HiTrash className="mr-1 h-4 w-4" /> Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
