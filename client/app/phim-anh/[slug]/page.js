import axios from 'axios';
import DetailPost from '@/components/pageComp/detailPost';
import getContent from '@/utils/getTextFromHtml';
import setSlug from '@/utils/slugify';

export async function generateMetadata({ searchParams: { requestId } }) {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/get/${requestId}`);
        const post = res?.data?.data;
        if (!post) {
            return {
                title: 'Không tìm thấy trang',
                description: 'Có thể trang bạn đang tìm không tồn tại',
            };
        }
        return {
            title: post?.title,
            description: getContent(post?.content),
            alternates: {
                canonical: `/${setSlug(post?.category)}/${setSlug(post?.title)}?requestId=${requestId}`,
            },
            openGraph: {
                title: post?.title,
                description: getContent(post?.content),
                url: `/${setSlug(post?.category)}/${setSlug(post?.title)}?requestId=${requestId}`,
                siteName: 'Thích viết blog',
                images: {
                    url: post?.thumbnailImg,
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
    return <DetailPost />;
};

export default page;
