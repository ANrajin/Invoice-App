'use client';

import { HiPlus } from 'react-icons/hi';
import { useInvoiceData } from '../hooks/useInvoiceData';
import { useInvoiceState } from '../hooks/useInvoiceState';
import { InvoiceView } from './InvoiceView';
import { InvoiceEditor } from './InvoiceEditor';

import { useInvoiceMutation } from '../hooks/useInvoiceMutation';

export const InvoiceContainer = () => {
    const { invoices, isLoading, refetch } = useInvoiceData();
    const { isModalOpen, selectedInvoiceId, openCreateModal, openEditModal, closeModal } = useInvoiceState();

    const { createInvoice, updateInvoice, deleteInvoice } = useInvoiceMutation(() => {
        refetch();
        closeModal();
    });

    const handleCreate = async (data: any) => {
        await createInvoice(data);
    };

    const handleUpdate = async (data: any) => {
        if (selectedInvoiceId) {
            await updateInvoice(selectedInvoiceId, data);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this invoice?')) {
            await deleteInvoice(id);
        }
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
