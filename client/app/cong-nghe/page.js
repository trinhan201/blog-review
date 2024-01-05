import AllPosts from '@/components/pageComp/allPosts';

export const metadata = {
    title: 'Tin tức công nghệ - Thích viết blog',
    description:
        'Thích viết blog - Nơi sẽ mang đến cho các bạn những thông tin mới nhất về công nghệ ở Việt Nam cũng như trên thế giới, cập nhật nhanh chóng và chính xác.',
    alternates: {
        canonical: '/cong-nghe',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Tin tức công nghệ - Thích viết blog',
        description:
            'Thích viết blog - Nơi sẽ mang đến cho các bạn những thông tin mới nhất về công nghệ ở Việt Nam cũng như trên thế giới, cập nhật nhanh chóng và chính xác.',
        url: '/cong-nghe',
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
