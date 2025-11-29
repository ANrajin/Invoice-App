'use client';

import { Invoice } from '../types';
import { HiPencil, HiTrash } from 'react-icons/hi';

interface InvoiceViewProps {
    invoices: Invoice[];
    isLoading: boolean;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'PAID': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'PENDING': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'DRAFT': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
};

export const InvoiceView = ({ invoices, isLoading, onEdit, onDelete }: InvoiceViewProps) => {
    if (isLoading) {
        return <div className="text-center p-4">Loading invoices...</div>;
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Invoice ID</th>
                        <th scope="col" className="px-6 py-3">Customer</th>
                        <th scope="col" className="px-6 py-3">Date</th>
                        <th scope="col" className="px-6 py-3">Due Date</th>
                        <th scope="col" className="px-6 py-3">Total</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {invoice.id}
                            </td>
                            <td className="px-6 py-4">{invoice.customerName}</td>
                            <td className="px-6 py-4">{new Date(invoice.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4">{new Date(invoice.dueDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4">${invoice.total.toFixed(2)}</td>
                            <td className="px-6 py-4">
                                <span className={`${getStatusColor(invoice.status)} text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>
                                    {invoice.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => onEdit(invoice.id)}
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline flex items-center"
                                    >
                                        <HiPencil className="mr-1 h-4 w-4" /> Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(invoice.id)}
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
