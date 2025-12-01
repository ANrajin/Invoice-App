import { useState } from 'react';
import { InvoiceInput } from '../types';
import api from '../../../shared/services/api';

export const useInvoiceMutation = (onSuccess?: () => void) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createInvoice = async (data: InvoiceInput) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await api.post('/invoices', data);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Failed to create invoice:', err);
            setError('Failed to create invoice');
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateInvoice = async (id: string, data: InvoiceInput) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await api.put(`/invoices/${id}`, data);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Failed to update invoice:', err);
            setError('Failed to update invoice');
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteInvoice = async (id: string) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await api.delete(`/invoices/${id}`);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Failed to delete invoice:', err);
            setError('Failed to delete invoice');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        createInvoice,
        updateInvoice,
        deleteInvoice,
        isSubmitting,
        error,
    };
};
