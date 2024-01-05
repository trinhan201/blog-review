import AllPosts from '@/components/pageComp/allPosts';

export const metadata = {
    title: 'Nơi dành cho phái đẹp - Thích viết blog',
    description:
        'Thích viết blog - Nơi mang đến những chia sẻ về cách chăm sóc sắc đẹp cũng như sức khỏe cho phái đẹp.',
    alternates: {
        canonical: '/lam-dep',
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: 'Nơi dành cho phái đẹp - Thích viết blog',
        description:
            'Thích viết blog - Nơi mang đến những chia sẻ về cách chăm sóc sắc đẹp cũng như sức khỏe cho phái đẹp.',
        url: '/lam-dep',
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
