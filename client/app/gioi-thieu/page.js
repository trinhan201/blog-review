import Introduction from '@/components/pageComp/introduction';

export const metadata = {
    title: 'Giới thiệu - Thích viết blog',
    description:
        'Thích viết blog - Thích viết blog là ai, tầm nhìn của chúng mình, các nội dung chính chúng mình sẽ viết về.',
    alternates: {
        canonical: '/gioi-thieu',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Giới thiệu - Thích viết blog',
        description:
            'Thích viết blog - Thích viết blog là ai, tầm nhìn của chúng mình, các nội dung chính chúng mình sẽ viết về.',
        url: '/gioi-thieu',
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
    return <Introduction />;
};

export default page;
