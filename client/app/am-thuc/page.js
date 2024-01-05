import AllPosts from '@/components/pageComp/allPosts';

export const metadata = {
    title: 'Ẩm thực - Thích viết blog',
    description:
        'Thích viết blog - Nơi chia sẻ những kiến thức về ẩm thực Việt Nam và trên thế giới. Bí quyết nấu ăn ngon đơn giản.',
    alternates: {
        canonical: '/am-thuc',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Ẩm thực - Thích viết blog',
        description:
            'Thích viết blog - Nơi chia sẻ những kiến thức về ẩm thực Việt Nam và trên thế giới. Bí quyết nấu ăn ngon đơn giản.',
        url: '/am-thuc',
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
