'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiChartPie, HiUserGroup, HiDocumentText } from 'react-icons/hi';

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', path: '/', icon: HiChartPie },
    { name: 'Customers', path: '/customers', icon: HiUserGroup },
    { name: 'Invoices', path: '/invoices', icon: HiDocumentText },
  ];

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center p-2 rounded-lg group ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-blue-500'
                      : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition duration-75 ${
                    isActive ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`} />
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};
