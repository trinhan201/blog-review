import AllPosts from '@/components/pageComp/allPosts';

export const metadata = {
    title: 'Nơi nói về phim ảnh - Thích viết blog',
    description:
        'Thích viết blog - Nơi mang đến những thông tin về phim ảnh, đủ thể loại, từ phim đã chiếu đến phim đang chiếu tại rạp và các nền tảng trực tuyến.',
    alternates: {
        canonical: '/phim-anh',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Nơi nói về phim ảnh - Thích viết blog',
        description:
            'Thích viết blog - Nơi mang đến những thông tin về phim ảnh, đủ thể loại, từ phim đã chiếu đến phim đang chiếu tại rạp và các nền tảng trực tuyến.',
        url: '/phim-anh',
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
