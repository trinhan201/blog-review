import AllPosts from '@/components/pageComp/allPosts';

export const metadata = {
    title: 'Tin game - Thích viết blog',
    description:
        'Thích viết blog - Nơi mang đến cho các bạn các thông tin về những game hay, game trên nhiều nền tảng và những game sắp ra mắt.',
    alternates: {
        canonical: '/tro-choi',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Tin game - Thích viết blog',
        description:
            'Thích viết blog - Nơi mang đến cho các bạn các thông tin về những game hay, game trên nhiều nền tảng và những game sắp ra mắt.',
        url: '/tro-choi',
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
    return <AllPosts />;
};

export default page;
