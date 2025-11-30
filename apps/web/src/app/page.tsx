'use client';

import { DashboardWidgets } from '../shared/components/layout/DashboardWidgets';

export default function HomePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
            <DashboardWidgets />
        </div>
    );
}
