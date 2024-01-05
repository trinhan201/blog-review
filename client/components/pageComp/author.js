'use client';

import { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Card5, Card6 } from '../cards';
import { Card5Loading } from '../loadings';
import Link from 'next/link';
import { formatVNDateTime } from '@/utils/formatDateTime';
import Pagination from '../pagination';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Author = () => {
    const [page, setPage] = useState(1);

    const { slug } = useParams();

    const { data: userData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user/public-info`, fetcher, {
        revalidateOnFocus: false,
    });

    const { data: otherData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/other/get-all-others`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const getAuthor = () => {
        const user = userData?.data?.find((aus) => aus?.idName === slug);
        return user;
    };

    const { data: allAuthorPostData, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get-author-posts?page=${page}&limit=6&author=${getAuthor()?._id}`,
        fetcher,
        { revalidateOnFocus: false },
    );

    const { data: popularPostData, isLoading: isLoading2 } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get-author-popular-posts?author=${getAuthor()?._id}`,
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

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
                                    <span>Bài viết của {getAuthor()?.userName}</span>
                                </div>
                            </div>
                            <div className="w-[90%] md:w-full">
                                <h1 className="font-semibold text-[2.4rem] mb-5">{getAuthor()?.userName}</h1>
                                <div className="flex flex-col items-center md:items-start md:flex-row gap-7 md:gap-10 lg:gap-14">
                                    <img
                                        src={
                                            getAuthor()?.avatar ||
                                            'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199562894-stock-illustration-creative-vector-illustration-default-avatar.jpg'
                                        }
                                        alt="author avatar"
                                        className="w-[90px] h-[90px] object-cover"
                                    />
                                    <div className="flex flex-col flex-1 text-center md:text-left">
                                        <div className="bg-[#222222] text-white font-semibold text-[1.2rem] px-3 py-1 w-fit m-auto md:m-0">
                                            <span>{allAuthorPostData?.totalPosts}</span> POSTS
                                        </div>
                                        <p className="text-[1.3rem] mt-5">{getAuthor()?.briefDesc}</p>
                                    </div>
                                </div>
                            </div>
                            {/* All post */}
                            <div className="w-[90%] md:w-full mt-[56px]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-6 lg:gap-9 xl:gap-10">
                                    {isLoading ? (
                                        <>
                                            <Card5Loading />
                                            <Card5Loading />
                                            <Card5Loading />
                                            <Card5Loading />
                                        </>
                                    ) : allAuthorPostData?.posts?.length > 0 ? (
                                        allAuthorPostData?.posts?.map((aps, index) => {
                                            const user = userData?.data?.find((aus) => aus?.idName === slug);
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
                                    ) : (
                                        <p>Chưa có bài viết nào</p>
                                    )}
                                </div>
                                <Pagination page={page} pages={allAuthorPostData?.totalPages} changePage={setPage} />
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

export default Author;
