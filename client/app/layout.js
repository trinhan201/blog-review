import DefaultLayout from '../components/appLayouts/defaultLayout';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import GoogleAnalytics from './GoogleAnalytics';

export const metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
    title: 'Thích viết blog - Nơi chia sẻ đủ thứ chuyện',
    description:
        'Thích viết blog - Nơi mang đến những thông tin hữu ích về phim ảnh, làm đẹp, công nghệ, trò chơi, và nhiều thứ khác nữa cho mọi người.',
    alternates: {
        canonical: '/',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Thích viết blog - Nơi chia sẻ đủ thứ chuyện',
        description:
            'Thích viết blog - Nơi mang đến những thông tin hữu ích về phim ảnh, làm đẹp, công nghệ, trò chơi, và nhiều thứ khác nữa cho mọi người.',
        url: '/',
        siteName: 'Thích viết blog',
        images: {
            url: `../assets/images/logo_header.png`,
            width: 300,
            height: 55,
        },
        locale: 'vi_VN',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="flex justify-center bg-[url('../public/assets/images/what-the-hex.webp')]">
                <GoogleAnalytics />
                <DefaultLayout children={children} />
                <ToastContainer />
            </body>
        </html>
    );
}
