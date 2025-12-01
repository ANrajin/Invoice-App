import { useState, useEffect } from 'react';
import { Customer } from '../types';
import api from '../../../shared/services/api';

export const useCustomerData = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCustomers = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/customers');
            setCustomers(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch customers:', err);
            setError('Failed to fetch customers');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return {
        customers,
        isLoading,
        error,
        refetch: fetchCustomers,
    };
};
