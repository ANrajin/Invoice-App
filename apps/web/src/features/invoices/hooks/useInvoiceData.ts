import { useState, useEffect } from 'react';
import { Invoice } from '../types';
import api from '../../../shared/services/api';

export const useInvoiceData = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInvoices = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/invoices');
            setInvoices(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch invoices:', err);
            setError('Failed to fetch invoices');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    return {
        invoices,
        isLoading,
        error,
        refetch: fetchInvoices,
    };
};
