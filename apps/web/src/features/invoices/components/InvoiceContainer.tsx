'use client';

import { HiPlus } from 'react-icons/hi';
import { useInvoiceData } from '../hooks/useInvoiceData';
import { useInvoiceState } from '../hooks/useInvoiceState';
import { InvoiceView } from './InvoiceView';
import { InvoiceEditor } from './InvoiceEditor';

export const InvoiceContainer = () => {
    const { invoices, isLoading } = useInvoiceData();
    const { isModalOpen, selectedInvoiceId, openCreateModal, openEditModal, closeModal } = useInvoiceState();

    const handleCreate = (data: any) => {
        console.log('Create invoice:', data);
        // Here we would call the mutation hook
        closeModal();
    };

    const handleUpdate = (data: any) => {
        console.log('Update invoice:', selectedInvoiceId, data);
        // Here we would call the mutation hook
        closeModal();
    };

    const handleDelete = (id: string) => {
        console.log('Delete invoice:', id);
        // Here we would call the mutation hook
    };

    const selectedInvoice = invoices.find((i) => i.id === selectedInvoiceId);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Invoices</h1>
                <button
                    onClick={openCreateModal}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center"
                >
                    <HiPlus className="mr-2 h-5 w-5" />
                    Create Invoice
                </button>
            </div>

            <InvoiceView
                invoices={invoices}
                isLoading={isLoading}
                onEdit={openEditModal}
                onDelete={handleDelete}
            />

            <InvoiceEditor
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={selectedInvoiceId ? handleUpdate : handleCreate}
                invoice={selectedInvoice}
            />
        </div>
    );
};
