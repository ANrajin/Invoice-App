import { LoginForm } from '../../features/auth/components/LoginForm';

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                Invoice App
            </a>
            <LoginForm />
        </div>
    );
}
