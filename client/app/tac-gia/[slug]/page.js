import axios from 'axios';
import Author from '@/components/pageComp/author';

export async function generateMetadata({ params: { slug } }) {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/public-info`);
        const user = res?.data?.data?.find((u) => u?.idName === slug);
        if (!user) {
            return {
                title: 'Không tìm thấy trang',
                description: 'Có thể trang bạn đang tìm không tồn tại',
            };
        }
        return {
            title: `Tác giả ${user?.userName} - Thích viết blog`,
            description: user?.briefDesc,
            alternates: {
                canonical: `/tac-gia/${slug}`,
            },
            openGraph: {
                title: `Tác giả ${user?.userName} - Thích viết blog`,
                description: user?.briefDesc,
                url: `/tac-gia/${slug}`,
                siteName: 'Thích viết blog',
                images: {
                    url: user?.avatar,
                    width: 300,
                    height: 55,
                },
                locale: 'vi_VN',
                type: 'website',
            },
        };
    } catch (error) {
        console.log(error);
        return {
            title: 'Không tìm thấy trang',
            description: 'Có thể trang bạn đang tìm không tồn tại',
        };
    }
}

const page = () => {
    return <Author />;
};

export default page;
