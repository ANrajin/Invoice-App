'use client';

import { useState, useEffect } from 'react';
import { Invoice, InvoiceItem, InvoiceStatus } from '../types';
import { HiPlus, HiTrash } from 'react-icons/hi';
import { useCustomerData } from '../../customers/hooks/useCustomerData';

interface InvoiceEditorProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    invoice?: Invoice;
}

export const InvoiceEditor = ({ isOpen, onClose, onSubmit, invoice }: InvoiceEditorProps) => {
    const { customers } = useCustomerData();
    const [formData, setFormData] = useState({
        customerId: '',
        date: '',
        dueDate: '',
        status: 'DRAFT' as InvoiceStatus,
        items: [] as InvoiceItem[],
    });

    useEffect(() => {
        if (invoice) {
            setFormData({
                customerId: invoice.customerId,
                date: invoice.date,
                dueDate: invoice.dueDate,
                status: invoice.status,
                items: invoice.items,
            });
        } else {
            setFormData({
                customerId: '',
                date: new Date().toISOString().split('T')[0],
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                status: 'DRAFT',
                items: [],
            });
        }
    }, [invoice, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const addItem = () => {
        const newItem: InvoiceItem = {
            id: Math.random().toString(36).substr(2, 9),
            description: '',
            quantity: 1,
            price: 0,
        };
        setFormData({ ...formData, items: [...formData.items, newItem] });
    };

    const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
        const updatedItems = formData.items.map((item) =>
            item.id === id ? { ...item, [field]: value } : item
        );
        setFormData({ ...formData, items: updatedItems });
    };

    const removeItem = (id: string) => {
        setFormData({ ...formData, items: formData.items.filter((item) => item.id !== id) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    const calculateTotal = () => {
        return formData.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-4xl p-4 bg-white rounded-lg shadow dark:bg-gray-700 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {invoice ? 'Edit Invoice' : 'Create New Invoice'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="p-4 space-y-4">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="customerId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customer</label>
                                <select
                                    id="customerId"
                                    name="customerId"
                                    value={formData.customerId}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                >
                                    <option value="">Select Customer</option>
                                    {customers.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                >
                                    <option value="DRAFT">Draft</option>
                                    <option value="PENDING">Pending</option>
                                    <option value="PAID">Paid</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                            <div>
                                <label htmlFor="dueDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Due Date</label>
                                <input
                                    type="date"
                                    id="dueDate"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    required
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Items</h3>
                                <button
                                    type="button"
                                    onClick={addItem}
                                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-2 text-center inline-flex items-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                >
                                    <HiPlus className="mr-1 h-4 w-4" />
                                    Add Item
                                </button>
                            </div>
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Description</th>
                                            <th scope="col" className="px-6 py-3">Qty</th>
                                            <th scope="col" className="px-6 py-3">Price</th>
                                            <th scope="col" className="px-6 py-3">Total</th>
                                            <th scope="col" className="px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formData.items.map((item) => (
                                            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        value={item.description}
                                                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                                                        required
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        value={item.quantity}
                                                        onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                                                        required
                                                        min="1"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="number"
                                                        value={item.price}
                                                        onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                                                        required
                                                        min="0"
                                                        step="0.01"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    ${(item.quantity * item.price).toFixed(2)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                    >
                                                        <HiTrash className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-end mt-4">
                                <div className="text-xl font-bold text-gray-900 dark:text-white">Total: ${calculateTotal().toFixed(2)}</div>
                            </div>
                        </div>

                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                {invoice ? 'Update Invoice' : 'Create Invoice'}
                            </button>
                            <button
                                onClick={onClose}
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
