import Contact from '@/components/pageComp/contact';

export const metadata = {
    title: 'Liên hệ - Thích viết blog',
    description: 'Thích viết blog - Thông tin liên hệ, các trang mạng xã hội của Thích viết blog.',
    alternates: {
        canonical: '/lien-he',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Liên hệ - Thích viết blog',
        description: 'Thích viết blog - Thông tin liên hệ, các trang mạng xã hội của Thích viết blog.',
        url: '/lien-he',
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

const page = () => {
    return <Contact />;
};

export default page;
