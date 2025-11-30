'use client';

import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="antialiased bg-gray-50 dark:bg-gray-900 min-h-screen">
            <TopNav />
            <Sidebar />
            <main className="p-4 sm:ml-64 pt-20 h-auto">
                {children}
            </main>
        </div>
    );
};
