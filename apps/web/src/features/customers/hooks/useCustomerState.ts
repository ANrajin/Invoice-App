import { useState } from 'react';

export const useCustomerState = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

    const openCreateModal = () => {
        setSelectedCustomerId(null);
        setIsModalOpen(true);
    };

    const openEditModal = (id: string) => {
        setSelectedCustomerId(id);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCustomerId(null);
    };

    return {
        isModalOpen,
        selectedCustomerId,
        openCreateModal,
        openEditModal,
        closeModal,
    };
};
