'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { FaAngleRight } from 'react-icons/fa6';
import axios from 'axios';
import { formatVNDateTime } from '@/utils/formatDateTime';
import { Card5, Card6, Card8 } from '@/components/cards';
import { Card5Loading } from '@/components/loadings';
import Link from 'next/link';
import useSWR from 'swr';
import Pagination from '../pagination';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const AllPosts = () => {
    const [page, setPage] = useState(1);

    const pathname = usePathname();

    const getTitle = () => {
        if (pathname === '/phim-anh') {
            return 'Phim ảnh';
        } else if (pathname === '/lam-dep') {
            return 'Làm đẹp';
        } else if (pathname === '/doi-song') {
            return 'Đời sống';
        } else if (pathname === '/am-thuc') {
            return 'Ẩm thực';
        } else if (pathname === '/cong-nghe') {
            return 'Công nghệ';
        } else {
            return 'Trò chơi';
        }
    };

    const { data: userData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user/public-info`, fetcher, {
        revalidateOnFocus: false,
    });

    const { data: otherPostData, isLoading: isLoading2 } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get-all-others-posts-page?category=${getTitle()}`,
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    const { data: allPostData, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get-all-posts-page?page=${page}&limit=6&category=${getTitle()}`,
        fetcher,
        { revalidateOnFocus: false },
    );

    const { data: otherData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/other/get-all-others`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <>
            {!isLoading2 ? (
                <div className="flex flex-col items-center w-full md:w-[720px] lg:w-[980px] xl:w-[1084px] py-[36px]">
                    <div className="w-[90%] md:w-full">
                        <div className="flex items-center gap-2 text-[1.2rem] text-[#888888] mb-6">
                            <Link prefetch href="/" className="hover:text-black">
                                Trang chủ
                            </Link>
                            <span className="text-[0.8rem] leading-none">
                                <FaAngleRight />
                            </span>
                            <span>{getTitle()}</span>
                        </div>
                        <h1 className="uppercase font-semibold text-[2.4rem]">{getTitle()}</h1>
                        <ul className="flex items-center flex-wrap gap-x-2 gap-y-5 text-[1.2rem] text-white mt-6">
                            <li>
                                <Link
                                    prefetch
                                    href="/phim-anh"
                                    className={
                                        getTitle() === 'Phim ảnh'
                                            ? 'bg-black hover:bg-black px-2.5 py-2'
                                            : 'bg-[var(--primary-color)] hover:bg-black px-2.5 py-2'
                                    }
                                >
                                    Phim ảnh
                                </Link>
                            </li>
                            <li>
                                <Link
                                    prefetch
                                    href="/lam-dep"
                                    className={
                                        getTitle() === 'Làm đẹp'
                                            ? 'bg-black hover:bg-black px-2.5 py-2'
                                            : 'bg-[var(--primary-color)] hover:bg-black px-2.5 py-2'
                                    }
                                >
                                    Làm đẹp
                                </Link>
                            </li>
                            <li>
                                <Link
                                    prefetch
                                    href="/doi-song"
                                    className={
                                        getTitle() === 'Đời sống'
                                            ? 'bg-black hover:bg-black px-2.5 py-2'
                                            : 'bg-[var(--primary-color)] hover:bg-black px-2.5 py-2'
                                    }
                                >
                                    Đời sống
                                </Link>
                            </li>
                            <li>
                                <Link
                                    prefetch
                                    href="/am-thuc"
                                    className={
                                        getTitle() === 'Ẩm thực'
                                            ? 'bg-black hover:bg-black px-2.5 py-2'
                                            : 'bg-[var(--primary-color)] hover:bg-black px-2.5 py-2'
                                    }
                                >
                                    Ẩm thực
                                </Link>
                            </li>
                            <li>
                                <Link
                                    prefetch
                                    href="/cong-nghe"
                                    className={
                                        getTitle() === 'Công nghệ'
                                            ? 'bg-black hover:bg-black px-2.5 py-2'
                                            : 'bg-[var(--primary-color)] hover:bg-black px-2.5 py-2'
                                    }
                                >
                                    Công nghệ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    prefetch
                                    href="/tro-choi"
                                    className={
                                        getTitle() === 'Trò chơi'
                                            ? 'bg-black hover:bg-black px-2.5 py-2'
                                            : 'bg-[var(--primary-color)] hover:bg-black px-2.5 py-2'
                                    }
                                >
                                    Trò chơi
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-[0.3rem] md:gap-1 lg:gap-2 mt-[36px]">
                        {otherPostData?.popularPosts?.map((pps, index) => {
                            const user = userData?.data?.find((aus) => aus?._id === pps?.author);
                            return (
                                <Card8
                                    key={index}
                                    id={pps?._id}
                                    thumbnailImg={pps?.thumbnailImg}
                                    category={pps?.category}
                                    title={pps?.title}
                                    author={user?.userName}
                                    createdAt={formatVNDateTime(pps?.createdAt)}
                                />
                            );
                        })}
                    </div>
                    <div className="w-full block md:grid md:grid-cols-3 mt-[48px] gap-10 pb-14">
                        {/* Left side */}
                        <div className="flex flex-col items-center md:block col-span-2">
                            {/* All post */}
                            <div className="w-[90%] md:w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-9 xl:gap-10">
                                    {isLoading ? (
                                        <>
                                            <Card5Loading />
                                            <Card5Loading />
                                            <Card5Loading />
                                            <Card5Loading />
                                        </>
                                    ) : allPostData?.posts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        allPostData?.posts?.map((aps, index) => {
                                            const user = userData?.data?.find((aus) => aus?._id === aps?.author);
                                            return (
                                                <Card5
                                                    key={index}
                                                    id={aps?._id}
                                                    hoverColor="primary"
                                                    thumbnailImg={aps?.thumbnailImg}
                                                    category={aps?.category}
                                                    title={aps?.title}
                                                    idName={user?.idName}
                                                    author={user?.userName}
                                                    createdAt={formatVNDateTime(aps?.createdAt)}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                                <Pagination page={page} pages={allPostData?.totalPages} changePage={setPage} />
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
                                                alt="Threads icon"
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
                                                alt="X icon"
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
                                    <h3 className="font-semibold">ĐỀ XUẤT</h3>
                                    <span className="flex-1 h-[4px] bg-[var(--primary-color)]"></span>
                                </div>
                                <div className="flex flex-col gap-5 mt-[20px]">
                                    {otherPostData?.suggestPosts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        otherPostData?.suggestPosts?.map((sps, index) => {
                                            return (
                                                <Card6
                                                    hoverColor="primary"
                                                    key={index}
                                                    id={sps?._id}
                                                    thumbnailImg={sps?.thumbnailImg}
                                                    category={sps?.category}
                                                    title={sps?.title}
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
                <div className="flex items-center justify-center h-screen">
                    <div className="relative">
                        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-[var(--primary-color)] animate-spin"></div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllPosts;
