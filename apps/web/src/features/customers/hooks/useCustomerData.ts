import { useState, useEffect } from 'react';
import { Customer } from '../types';
import { MOCK_CUSTOMERS } from '../utils/mockData';

export const useCustomerData = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API delay
        const timer = setTimeout(() => {
            setCustomers(MOCK_CUSTOMERS);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return {
        customers,
        isLoading,
    };
};
