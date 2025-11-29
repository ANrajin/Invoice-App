import { useState } from 'react';

export const useInvoiceState = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

    const openCreateModal = () => {
        setSelectedInvoiceId(null);
        setIsModalOpen(true);
    };

    const openEditModal = (id: string) => {
        setSelectedInvoiceId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedInvoiceId(null);
    };

    return {
        isModalOpen,
        selectedInvoiceId,
        openCreateModal,
        openEditModal,
        closeModal,
    };
};
