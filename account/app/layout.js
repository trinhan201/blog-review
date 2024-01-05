import { Inter } from 'next/font/google';
import './globals.css';
import DefaultLayout from '@/components/appLayouts/defaultLayout';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Blogger - Thích viết blog',
    description: 'Trang quản lý dành do blogger',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <DefaultLayout children={children} />
                <ToastContainer />
            </body>
        </html>
    );
}
