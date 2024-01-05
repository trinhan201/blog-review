import AllPosts from '@/components/pageComp/allPosts';

export const metadata = {
    title: 'Đời sống hàng ngày- Thích viết blog',
    description:
        'Thích viết blog - Những chia sẻ, những bài học hay về cuộc sống hằng ngày, những câu chuyện ý nghĩa giàu cảm xúc.',
    alternates: {
        canonical: '/doi-song',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Đời sống hàng ngày- Thích viết blog',
        description:
            'Thích viết blog - Những chia sẻ, những bài học hay về cuộc sống hằng ngày, những câu chuyện ý nghĩa giàu cảm xúc.',
        url: '/doi-song',
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
