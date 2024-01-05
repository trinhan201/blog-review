import SearchResults from '@/components/pageComp/searchResults';
import { Suspense } from 'react';

function SearchFallback() {
    return <>placeholder</>;
}

export async function generateMetadata({ searchParams: { page, q } }) {
    try {
        return {
            title: `Bạn đang tìm kiếm: ${q} - Thích viết blog`,
            description: `Danh sách bài viết với từ khóa ${q}`,
            alternates: {
                canonical: `/tim-kiem?q=${q}`,
            },
            openGraph: {
                title: `Bạn đang tìm kiếm: ${q} - Thích viết blog`,
                description: `Danh sách bài viết với từ khóa ${q}`,
                url: `/tim-kiem?q=${q}`,
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
    } catch (error) {
        console.log(error);
        return {
            title: 'Không tìm thấy trang',
            description: 'Có thể trang bạn đang tìm không tồn tại',
        };
    }
}

const page = () => {
    return (
        <Suspense fallback={<SearchFallback />}>
            <SearchResults />
        </Suspense>
    );
};

export default page;
