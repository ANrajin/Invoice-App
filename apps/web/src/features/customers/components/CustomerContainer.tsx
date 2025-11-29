'use client';

import { HiPlus } from 'react-icons/hi';
import { useCustomerData } from '../hooks/useCustomerData';
import { useCustomerState } from '../hooks/useCustomerState';
import { CustomerView } from './CustomerView';
import { CustomerEditor } from './CustomerEditor';

export const CustomerContainer = () => {
    const { customers, isLoading } = useCustomerData();
    const { isModalOpen, selectedCustomerId, openCreateModal, openEditModal, closeModal } = useCustomerState();

    const handleCreate = (data: any) => {
        console.log('Create customer:', data);
        // Here we would call the mutation hook
        closeModal();
    };

    const handleUpdate = (data: any) => {
        console.log('Update customer:', selectedCustomerId, data);
        // Here we would call the mutation hook
        closeModal();
    };

    const handleDelete = (id: string) => {
        console.log('Delete customer:', id);
        // Here we would call the mutation hook
    };

    const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
                <button
                    onClick={openCreateModal}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center"
                >
                    <HiPlus className="mr-2 h-5 w-5" />
                    Add Customer
                </button>
            </div>

            <CustomerView
                customers={customers}
                isLoading={isLoading}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />

            <CustomerEditor
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={selectedCustomerId ? handleUpdate : handleCreate}
                customer={selectedCustomer}
            />
        </div>
    );
};
