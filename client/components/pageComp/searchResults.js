'use client';

import { useEffect, useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import { IoIosSearch } from 'react-icons/io';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Card5, Card6 } from '../cards';
import useDebounce from '@/hooks/useDebounce';
import setSlug from '@/utils/slugify';
import { Card5Loading } from '../loadings';
import Link from 'next/link';
import { formatVNDateTime } from '@/utils/formatDateTime';
import Pagination from '../pagination';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const SearchResults = () => {
    const [searchValue, setSearchValue] = useState('');
    const [page, setPage] = useState(1);

    const searchParams = useSearchParams();
    const debouncedValue = useDebounce(searchValue, 300);
    const pathname = usePathname();

    useEffect(() => {
        setSearchValue(searchParams.get('q'));
        setPage(1);
    }, [searchParams.get('q')]);

    const { data: allSearchPostData, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get-search-posts?page=${page}&limit=6&search=${searchParams.get('q')}`,
        fetcher,
        { revalidateOnFocus: false },
    );

    const { data: popularPostData, isLoading: isLoading2 } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get-search-popular-posts`,
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    const { data: userData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user/public-info`, fetcher, {
        revalidateOnFocus: false,
    });

    const { data: otherData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/other/get-all-others`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <>
            {!isLoading2 ? (
                <div className="flex flex-col items-center w-full md:w-[720px] lg:w-[980px] xl:w-[1084px] py-[36px]">
                    <div className="w-full block md:grid md:grid-cols-3 gap-10 pb-14">
                        {/* Left side */}
                        <div className="flex flex-col items-center md:block col-span-2">
                            <div className="w-[90%] md:w-full">
                                <div className="flex items-center gap-2 text-[1.2rem] text-[#888888] mb-6">
                                    <Link prefetch href="/" className="hover:text-black">
                                        Trang chủ
                                    </Link>
                                    <span className="text-[0.8rem] leading-none">
                                        <FaAngleRight />
                                    </span>
                                    <span>Tìm kiếm</span>
                                </div>
                                <h1 className="uppercase font-semibold text-[2.4rem]">
                                    Từ khóa: <span>{searchParams.get('q')}</span>
                                </h1>
                            </div>
                            <div className="w-[90%] md:w-full">
                                <div className="flex flex-row items-stretch bg-white w-full mt-3">
                                    <input
                                        className="block outline-none border solid border-[#cccccc] py-[3px] px-[9px] w-full"
                                        type="text"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        autoFocus
                                        inputMode="search"
                                    />
                                    <Link
                                        prefetch
                                        href={`/tim-kiem?q=${debouncedValue}`}
                                        className="flex bg-black text-white px-[15px] py-[4px] hover:bg-[var(--primary-color)] transition-all"
                                    >
                                        <IoIosSearch className="text-[2rem] m-auto" />
                                    </Link>
                                </div>
                                <p className="text-[1.3rem] mt-2">
                                    Nếu bạn không hài lòng với kết quả, hãy tìm kiếm từ khóa khác.
                                </p>
                            </div>
                            {/* All post */}
                            <div className="w-[90%] md:w-full mt-12">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-9 xl:gap-10">
                                    {isLoading ? (
                                        <>
                                            <Card5Loading />
                                            <Card5Loading />
                                            <Card5Loading />
                                            <Card5Loading />
                                        </>
                                    ) : allSearchPostData?.posts?.length > 0 ? (
                                        allSearchPostData?.posts?.map((sr, index) => {
                                            const user = userData?.data?.find((aus) => aus?._id === sr?.author);
                                            return (
                                                <Card5
                                                    key={index}
                                                    id={sr?._id}
                                                    hoverColor="primary"
                                                    thumbnailImg={sr?.thumbnailImg}
                                                    category={sr?.category}
                                                    title={sr?.title}
                                                    idName={user?.idName}
                                                    author={user?.userName}
                                                    createdAt={formatVNDateTime(sr?.createdAt)}
                                                    categoryLink={pathname?.replace(
                                                        '/tim-kiem',
                                                        `/${setSlug(sr?.category)}`,
                                                    )}
                                                />
                                            );
                                        })
                                    ) : (
                                        <p>Không tìm thấy kết quả nào</p>
                                    )}
                                </div>
                                <Pagination page={page} pages={allSearchPostData?.totalPages} changePage={setPage} />
                            </div>
                        </div>
                        {/* Right side */}
                        <div className="md:sticky md:top-0 md:self-start flex flex-col items-center md:block mt-[45px] md:mt-0">
                            <div className="w-[90%] md:w-full">
                                <span className="block font-semibold mb-3">Liên hệ:</span>
                                <ul className="flex items-center justify-center gap-2 md:gap-4">
                                    <li className="flex-1 group">
                                        <a
                                            href={otherData?.socialLinks?.facebook}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="flex flex-col items-center p-5 border border-[#cccccc]/70"
                                        >
                                            <img
                                                src={'/assets/images/facebook-icon.png'}
                                                alt="Facebook icon"
                                                className="w-[32px] h-[32px]"
                                            />
                                            <span className="block md:hidden lg:block text-[1.4rem] md:text-[1.3rem] lg:text-[1.4rem] font-semibold group-hover:opacity-70">
                                                Facebook
                                            </span>
                                        </a>
                                    </li>
                                    <li className="flex-1 group">
                                        <a
                                            href={otherData?.socialLinks?.threads}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="flex flex-col items-center p-5 border border-[#cccccc]/70"
                                        >
                                            <img
                                                src={'/assets/images/threads-icon.png'}
                                                alt="Facebook icon"
                                                className="w-[32px] h-[32px]"
                                            />
                                            <span className="block md:hidden lg:block text-[1.4rem] md:text-[1.3rem] lg:text-[1.4rem] font-semibold group-hover:opacity-70">
                                                Threads
                                            </span>
                                        </a>
                                    </li>
                                    <li className="flex-1 group">
                                        <a
                                            href={otherData?.socialLinks?.x}
                                            target="_blank"
                                            rel="noreferrer noopener"
                                            className="flex flex-col items-center p-5 border border-[#cccccc]/70"
                                        >
                                            <img
                                                src={'/assets/images/twitter-icon.png'}
                                                alt="Facebook icon"
                                                className="w-[32px] h-[32px]"
                                            />
                                            <span className="block md:hidden lg:block text-[1.4rem] md:text-[1.3rem] lg:text-[1.4rem] font-semibold group-hover:opacity-70">
                                                X
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-[90%] md:w-full mt-[52px]">
                                <span className="block text-[1.1rem] text-[#888888] tracking-wide text-center">
                                    - Advertisement -
                                </span>
                                <div className="w-full flex justify-center">
                                    <a
                                        href={otherData?.advertisements[1]?.link}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="block mt-1 bg-slate-200 w-[300px] h-[250px] md:w-[228px] md:h-[190px] lg:w-[300px] lg:h-[250px]"
                                    >
                                        {otherData?.advertisements[1] && (
                                            <img
                                                src={otherData?.advertisements[1]?.bannerMid}
                                                alt="ads banner"
                                                className="w-full h-full object-fill"
                                            />
                                        )}
                                    </a>
                                </div>
                            </div>
                            <div className="w-[90%] md:w-full mt-[52px]">
                                <div className="flex items-center gap-9">
                                    <h3 className="font-semibold">PHỔ BIẾN</h3>
                                    <span className="flex-1 h-[4px] bg-[var(--primary-color)]"></span>
                                </div>
                                <div className="flex flex-col gap-5 mt-[20px]">
                                    {popularPostData?.popularPosts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        popularPostData?.popularPosts?.map((pps, index) => {
                                            return (
                                                <Card6
                                                    hoverColor="primary"
                                                    key={index}
                                                    id={pps?._id}
                                                    thumbnailImg={pps?.thumbnailImg}
                                                    category={pps?.category}
                                                    title={pps?.title}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-screen"></div>
            )}
        </>
    );
};

export default SearchResults;
