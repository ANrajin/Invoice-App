import { useState } from 'react';
import { Customer, CustomerInput } from '../types';
import api from '../../../shared/services/api';

export const useCustomerMutation = (onSuccess?: () => void) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createCustomer = async (data: CustomerInput) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await api.post('/customers', data);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Failed to create customer:', err);
            setError('Failed to create customer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const updateCustomer = async (id: string, data: CustomerInput) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await api.put(`/customers/${id}`, data);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Failed to update customer:', err);
            setError('Failed to update customer');
        } finally {
            setIsSubmitting(false);
        }
    };

    const deleteCustomer = async (id: string) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await api.delete(`/customers/${id}`);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error('Failed to delete customer:', err);
            setError('Failed to delete customer');
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        createCustomer,
        updateCustomer,
        deleteCustomer,
        isSubmitting,
        error,
    };
};
