import { useState, useEffect } from 'react';
import { Invoice } from '../types';
import { MOCK_INVOICES } from '../utils/mockData';

export const useInvoiceData = () => {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API delay
        const timer = setTimeout(() => {
            setInvoices(MOCK_INVOICES);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return {
        invoices,
        isLoading,
    };
};
