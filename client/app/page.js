'use client';

import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import axios from 'axios';
import { formatVNDateTime } from '@/utils/formatDateTime';
import setSlug from '@/utils/slugify';
import { Card2, Card3, Card4, Card5, Card6, Card7 } from '@/components/cards';
import Link from 'next/link';
import getContent from '@/utils/getTextFromHtml';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Home() {
    const [page, setPage] = useState(1);
    const totalPage = 2;

    const { data: beautyData } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get-home-beauty-posts?page=${page}`,
        fetcher,
        { revalidateOnFocus: false },
    );

    const { data: homeData1, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/post/get-home1-posts`, fetcher, {
        revalidateOnFocus: false,
    });

    const { data: homeData2 } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/post/get-home2-posts`, fetcher, {
        revalidateOnFocus: false,
    });

    const { data: homeData3 } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/post/get-home3-posts`, fetcher, {
        revalidateOnFocus: false,
    });

    const { data: userData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user/public-info`, fetcher, {
        revalidateOnFocus: false,
    });

    const { data: otherData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/other/get-all-others`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const handlePrevPage = () => {
        setPage(page - 1);
    };

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const getAuthor = (id) => {
        const user = userData?.data?.find((aus) => aus?._id === id);
        return user;
    };

    return (
        <>
            {!isLoading ? (
                <div className="w-full md:w-[720px] lg:w-[980px] xl:w-[1084px]">
                    {/* New post */}
                    <div>
                        <div className="py-[8px]">
                            <div className="flex items-center gap-[1.5rem] px-[18px]">
                                <div className="w-fit whitespace-nowrap bg-[var(--primary-color)] font-semibold text-[1.3rem] text-white px-3 py-1">
                                    Bài viết mới
                                </div>
                                {isLoading ? (
                                    <div className="w-full py-[25px] animate-pulse">
                                        <div className="h-6 w-full bg-slate-200 rounded-xl"></div>
                                    </div>
                                ) : (
                                    <div className="rotating-text-wrapper whitespace-nowrap">
                                        {homeData1?.newPosts?.slice(0, 3)?.map((nps, index) => {
                                            return (
                                                <h3 key={index} className="w-[200px] md:w-full truncate cursor-default">
                                                    {nps?.title}
                                                </h3>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="md:flex w-full h-fit gap-1.5">
                            {homeData1?.newPosts?.length === 0 ? (
                                <p>Chưa có bài viết nào</p>
                            ) : (
                                <Link
                                    prefetch
                                    href={`/${setSlug(homeData1?.newPosts[0]?.category)}/${setSlug(
                                        homeData1?.newPosts[0]?.title,
                                    )}?requestId=${homeData1?.newPosts[0]?._id}`}
                                    style={{
                                        backgroundImage: `url("${homeData1?.newPosts[0]?.thumbnailImg}")`,
                                        backgroundRepeat: 'no-repeat',
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                    }}
                                    className="block flex-1 h-[260px] md:h-[290px] lg:h-[330px] xl:h-[445px] mb-1.5 md:mb-0 cursor-pointer"
                                >
                                    <div className="flex items-end w-full h-full bg-gradient-to-b from-black/5 to-black/60 drop-shadow-lg hover:bg-red-700/20 ease-in duration-[0.5s]">
                                        <div className="w-full text-white p-[24px]">
                                            <span className="uppercase text-[1.2rem]">
                                                {homeData1?.newPosts[0]?.category}
                                            </span>
                                            <h3 className="w-full text-[2rem] md:text-[2.4rem] font-semibold mt-[12px] mb-[8px] custom-truncate">
                                                {homeData1?.newPosts[0]?.title}
                                            </h3>
                                            <span className="text-[1.25rem]">
                                                <span>{getAuthor(homeData1?.newPosts[0]?.author)?.userName}</span>
                                                <span className="mx-2">-</span>
                                                <span>{formatVNDateTime(homeData1?.newPosts[0]?.createdAt)}</span>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )}
                            <div className="hide-scrollbar whitespace-nowrap md:whitespace-normal overflow-x-auto md:overflow-visible md:grid grid-cols-2 gap-1.5 flex-1 space-x-1 md:space-x-0">
                                {homeData1?.newPosts?.slice(1, 5)?.map((nps, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            prefetch
                                            href={`/${setSlug(nps?.category)}/${setSlug(nps?.title)}?requestId=${
                                                nps?._id
                                            }`}
                                            style={{
                                                backgroundImage: `url("${nps?.thumbnailImg}")`,
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                            }}
                                            className="whitespace-normal w-[80%] md:w-full h-[172px] md:h-full inline-block md:block align-top md:align-baseline"
                                        >
                                            <div className="flex items-end w-full h-full bg-gradient-to-b from-black/5 to-black/60 drop-shadow-lg hover:bg-red-700/20 ease-in duration-[0.5s]">
                                                <div className="w-full text-white p-[12px]">
                                                    <span className="hidden xl:block uppercase text-[1.2rem]">
                                                        {nps?.category}
                                                    </span>
                                                    <h3 className="w-full text-[1.5rem] md:text-[1.3rem] lg:text-[1.7rem] font-semibold mt-[6px] custom-truncate">
                                                        {nps?.title}
                                                    </h3>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="block md:grid md:grid-cols-3 mt-[48px] gap-10 pb-14">
                        {/* Left side */}
                        <div className="flex flex-col items-center md:block col-span-2">
                            {/* Film post */}
                            <div className="w-[90%] md:w-full">
                                <div className="flex items-center gap-9">
                                    <h3 className="font-semibold">PHIM ẢNH</h3>
                                    <span className="flex-1 h-[4px] bg-[var(--secondary-color)]"></span>
                                    <Link prefetch href="/phim-anh" className="text-[1.3rem] text-[#888888]">
                                        Tất cả
                                    </Link>
                                </div>
                                <div className="block md:flex mt-[20px] gap-6 lg:gap-8">
                                    {homeData1?.moviePosts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        <Link
                                            prefetch
                                            href={`/${setSlug(homeData1?.moviePosts[0]?.category)}/${setSlug(
                                                homeData1?.moviePosts[0]?.title,
                                            )}?requestId=${homeData1?.moviePosts[0]?._id}`}
                                            className="block group w-full md:w-[226px] lg:w-[341px]"
                                        >
                                            {homeData1?.moviePosts[0] && (
                                                <img
                                                    src={homeData1?.moviePosts[0]?.thumbnailImg}
                                                    alt={homeData1?.moviePosts[0]?.title}
                                                    className="w-full h-[180px] md:h-[140px] lg:h-[222px] object-cover cursor-pointer"
                                                />
                                            )}
                                            <div className="mt-3">
                                                <object>
                                                    <Link
                                                        prefetch
                                                        href="/phim-anh"
                                                        className="uppercase text-[1.2rem] hover:text-[var(--secondary-color)] cursor-pointer"
                                                    >
                                                        {homeData1?.moviePosts[0]?.category}
                                                    </Link>
                                                </object>
                                                <h3 className="w-full font-semibold md:text-[1.6rem] lg:text-[1.8rem] group-hover:text-[var(--secondary-color)] cursor-pointer custom-truncate">
                                                    {homeData1?.moviePosts[0]?.title}
                                                </h3>
                                                <span className="flex items-center gap-2 text-[1.25rem]">
                                                    <object>
                                                        <Link
                                                            prefetch
                                                            href={`/tac-gia/${
                                                                getAuthor(homeData1?.moviePosts[0]?.author)?.idName
                                                            }`}
                                                            className="hover:text-[var(--secondary-color)] cursor-pointer"
                                                        >
                                                            {getAuthor(homeData1?.moviePosts[0]?.author)?.userName}
                                                        </Link>
                                                    </object>
                                                    <span>-</span>
                                                    <span className="text-[#888888]">
                                                        {formatVNDateTime(homeData1?.moviePosts[0]?.createdAt)}
                                                    </span>
                                                </span>
                                                <p className="w-full text-[1.25rem] text-[#888888] mt-3 custom-truncate line-clamp3">
                                                    {getContent(homeData1?.moviePosts[0]?.content)}
                                                </p>
                                            </div>
                                        </Link>
                                    )}
                                    <div className="flex-1 flex flex-col gap-6 lg:gap-8 mt-10 md:mt-0">
                                        {homeData1?.moviePosts?.slice(1, 5)?.map((mps, index) => {
                                            return (
                                                <Card2
                                                    key={index}
                                                    id={mps?._id}
                                                    thumbnailImg={mps?.thumbnailImg}
                                                    category={mps?.category}
                                                    title={mps?.title}
                                                    createdAt={formatVNDateTime(mps?.createdAt)}
                                                />
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                            {/* Beauty post */}
                            <div className="w-[90%] md:w-full mt-[52px]">
                                <div className="flex items-center gap-9">
                                    <h3 className="font-semibold">LÀM ĐẸP</h3>
                                    <span className="flex-1 h-[4px] bg-[var(--third-color)]"></span>
                                    <Link prefetch href="/lam-dep" className="text-[1.3rem] text-[#888888]">
                                        Tất cả
                                    </Link>
                                </div>
                                <div className="w-full flex flex-col md:flex-row mt-[20px] gap-2 md:gap-[0.3rem] lg:gap-2">
                                    {beautyData?.beautyPosts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        beautyData?.beautyPosts?.map((bps, index) => {
                                            return (
                                                <Card3
                                                    key={index}
                                                    id={bps?._id}
                                                    thumbnailImg={bps?.thumbnailImg}
                                                    title={bps?.title}
                                                    category={bps?.category}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                                {beautyData?.beautyPosts?.length > 0 && (
                                    <div className="flex items-center mt-10 gap-3">
                                        <div
                                            onClick={handlePrevPage}
                                            className={
                                                page <= 1
                                                    ? 'border border-[#cccccc]/70 px-4 py-3 leading-none text-[1.1rem] text-[#888888] hover:text-white hover:bg-[var(--third-color)] transition-all cursor-pointer disabled'
                                                    : 'border border-[#cccccc]/70 px-4 py-3 leading-none text-[1.1rem] text-[#888888] hover:text-white hover:bg-[var(--third-color)] transition-all cursor-pointer'
                                            }
                                        >
                                            <FaAngleLeft />
                                        </div>
                                        <div
                                            onClick={handleNextPage}
                                            className={
                                                page >= totalPage && page <= 3
                                                    ? 'border border-[#cccccc]/70 px-4 py-3 leading-none text-[1.1rem] text-[#888888] hover:text-white hover:bg-[var(--third-color)] transition-all cursor-pointer disabled'
                                                    : 'border border-[#cccccc]/70 px-4 py-3 leading-none text-[1.1rem] text-[#888888] hover:text-white hover:bg-[var(--third-color)] transition-all cursor-pointer'
                                            }
                                        >
                                            <FaAngleRight />
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* Lifestyle and food */}
                            <div className="w-[90%] md:w-full mt-[52px]">
                                <div className="w-full block lg:flex md:gap-10">
                                    <div className="md:flex-1">
                                        <div className="flex items-center gap-9">
                                            <h3 className="font-semibold">ĐỜI SỐNG</h3>
                                            <span className="flex-1 h-[4px] bg-[var(--sixth-color)]"></span>
                                            <Link prefetch href="/doi-song" className="text-[1.3rem] text-[#888888]">
                                                Tất cả
                                            </Link>
                                        </div>
                                        <div className="flex flex-col mt-[20px] gap-6 lg:gap-8">
                                            {homeData1?.lifePosts?.length === 0 ? (
                                                <p>Chưa có bài viết nào</p>
                                            ) : (
                                                <Link
                                                    prefetch
                                                    href={`/${setSlug(homeData1?.lifePosts[0]?.category)}/${setSlug(
                                                        homeData1?.lifePosts[0]?.title,
                                                    )}?requestId=${homeData1?.lifePosts[0]?._id}`}
                                                    className="block group w-full"
                                                >
                                                    {homeData1?.lifePosts[0] && (
                                                        <img
                                                            src={homeData1?.lifePosts[0]?.thumbnailImg}
                                                            alt={homeData1?.lifePosts[0]?.title}
                                                            className="w-full h-[180px] md:h-[240px] lg:h-[222px] object-cover cursor-pointer"
                                                        />
                                                    )}
                                                    <div className="mt-3">
                                                        <object>
                                                            <Link
                                                                prefetch
                                                                href="/doi-song"
                                                                className="uppercase text-[1.2rem] hover:text-[var(--secondary-color)] cursor-pointer"
                                                            >
                                                                {homeData1?.lifePosts[0]?.category}
                                                            </Link>
                                                        </object>
                                                        <h3 className="w-full font-semibold md:text-[1.6rem] lg:text-[1.8rem] group-hover:text-[var(--secondary-color)] cursor-pointer custom-truncate">
                                                            {homeData1?.lifePosts[0]?.title}
                                                        </h3>
                                                        <span className="flex items-center gap-2 text-[1.25rem]">
                                                            <object>
                                                                <Link
                                                                    prefetch
                                                                    href={`/tac-gia/${
                                                                        getAuthor(homeData1?.lifePosts[0]?.author)
                                                                            ?.idName
                                                                    }`}
                                                                    className="hover:text-[var(--secondary-color)] cursor-pointer"
                                                                >
                                                                    {
                                                                        getAuthor(homeData1?.lifePosts[0]?.author)
                                                                            ?.userName
                                                                    }
                                                                </Link>
                                                            </object>
                                                            <span>-</span>
                                                            <span className="text-[#888888]">
                                                                {formatVNDateTime(homeData1?.lifePosts[0]?.createdAt)}
                                                            </span>
                                                        </span>
                                                        <p className="w-full text-[1.25rem] text-[#888888] mt-3 custom-truncate line-clamp3">
                                                            {getContent(homeData1?.lifePosts[0]?.content)}
                                                        </p>
                                                    </div>
                                                </Link>
                                            )}
                                            <div className="flex-1 flex flex-col gap-6 lg:gap-8 mt-10 md:mt-0">
                                                {homeData1?.lifePosts?.slice(1, 3)?.map((mps, index) => {
                                                    return (
                                                        <Card2
                                                            key={index}
                                                            id={mps?._id}
                                                            thumbnailImg={mps?.thumbnailImg}
                                                            category={mps?.category}
                                                            title={mps?.title}
                                                            createdAt={formatVNDateTime(mps?.createdAt)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:flex-1 mt-[52px] lg:mt-0">
                                        <div className="flex items-center gap-9">
                                            <h3 className="font-semibold">ẨM THỰC</h3>
                                            <span className="flex-1 h-[4px] bg-[var(--eighth-color)]"></span>
                                            <Link prefetch href="/am-thuc" className="text-[1.3rem] text-[#888888]">
                                                Tất cả
                                            </Link>
                                        </div>
                                        <div className="flex flex-col mt-[20px] gap-6 lg:gap-8">
                                            {homeData2?.foodPosts?.length === 0 ? (
                                                <p>Chưa có bài viết nào</p>
                                            ) : (
                                                <Link
                                                    prefetch
                                                    href={`/${setSlug(homeData2?.foodPosts[0]?.category)}/${setSlug(
                                                        homeData2?.foodPosts[0]?.title,
                                                    )}?requestId=${homeData2?.foodPosts[0]?._id}`}
                                                    className="block group w-full"
                                                >
                                                    {homeData2?.foodPosts[0] && (
                                                        <img
                                                            src={homeData2?.foodPosts[0]?.thumbnailImg}
                                                            alt={homeData2?.foodPosts[0]?.title}
                                                            className="w-full h-[180px] md:h-[240px] lg:h-[222px] object-cover cursor-pointer"
                                                        />
                                                    )}
                                                    <div className="mt-3">
                                                        <object>
                                                            <Link
                                                                prefetch
                                                                href="/am-thuc"
                                                                className="uppercase text-[1.2rem] hover:text-[var(--secondary-color)] cursor-pointer"
                                                            >
                                                                {homeData2?.foodPosts[0]?.category}
                                                            </Link>
                                                        </object>
                                                        <h3 className="w-full font-semibold md:text-[1.6rem] lg:text-[1.8rem] group-hover:text-[var(--secondary-color)] cursor-pointer custom-truncate">
                                                            {homeData2?.foodPosts[0]?.title}
                                                        </h3>
                                                        <span className="flex items-center gap-2 text-[1.25rem]">
                                                            <object>
                                                                <Link
                                                                    prefetch
                                                                    href={`/tac-gia/${
                                                                        getAuthor(homeData2?.foodPosts[0]?.author)
                                                                            ?.idName
                                                                    }`}
                                                                    className="hover:text-[var(--secondary-color)] cursor-pointer"
                                                                >
                                                                    {
                                                                        getAuthor(homeData2?.foodPosts[0]?.author)
                                                                            ?.userName
                                                                    }
                                                                </Link>
                                                            </object>
                                                            <span>-</span>
                                                            <span className="text-[#888888]">
                                                                {formatVNDateTime(homeData2?.foodPosts[0]?.createdAt)}
                                                            </span>
                                                        </span>
                                                        <p className="w-full text-[1.25rem] text-[#888888] mt-3 custom-truncate line-clamp3">
                                                            {getContent(homeData2?.foodPosts[0]?.content)}
                                                        </p>
                                                    </div>
                                                </Link>
                                            )}
                                            <div className="flex-1 flex flex-col gap-6 lg:gap-8 mt-10 md:mt-0">
                                                {homeData2?.foodPosts?.slice(1, 3)?.map((mps, index) => {
                                                    return (
                                                        <Card2
                                                            key={index}
                                                            id={mps?._id}
                                                            thumbnailImg={mps?.thumbnailImg}
                                                            category={mps?.category}
                                                            title={mps?.title}
                                                            createdAt={formatVNDateTime(mps?.createdAt)}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Tech post */}
                            <div className="w-[90%] md:w-full mt-[52px]">
                                <div className="flex items-center gap-9">
                                    <h3 className="font-semibold">CÔNG NGHỆ</h3>
                                    <span className="flex-1 h-[4px] bg-[var(--forth-color)]"></span>
                                    <Link prefetch href="/cong-nghe" className="text-[1.3rem] text-[#888888]">
                                        Tất cả
                                    </Link>
                                </div>
                                <div className="flex flex-col mt-[20px] gap-10 md:gap-9">
                                    {homeData2?.techPosts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        homeData2?.techPosts?.map((tps, index) => {
                                            const user = userData?.data?.find((aus) => aus?._id === tps?.author);
                                            return (
                                                <Card4
                                                    key={index}
                                                    id={tps?._id}
                                                    thumbnailImg={tps?.thumbnailImg}
                                                    title={tps?.title}
                                                    category={tps?.category}
                                                    idName={user?.idName}
                                                    author={user?.userName}
                                                    createdAt={formatVNDateTime(tps?.createdAt)}
                                                    content={getContent(tps?.content)}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                            {/* Video */}
                            <div className="w-[90%] md:w-full mt-[52px]">
                                <span className="block text-[1.1rem] text-[#888888] tracking-wide text-center">
                                    - Advertisement -
                                </span>
                                <div className="w-full relative overflow-hidden pt-[56.25%] mt-1">
                                    <iframe
                                        className="w-full h-full absolute top-0 left-0 bottom-0 right-0"
                                        src={otherData?.video}
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            {/* Game post */}
                            <div className="w-[90%] md:w-full mt-[52px]">
                                <div className="flex items-center gap-9">
                                    <h3 className="font-semibold">TRÒ CHƠI</h3>
                                    <span className="flex-1 h-[4px] bg-[var(--seventh-color)]"></span>
                                    <Link prefetch href="/tro-choi" className="text-[1.3rem] text-[#888888]">
                                        Tất cả
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 mt-[20px] gap-8 md:gap-6 lg:gap-9 xl:gap-10">
                                    {homeData2?.gamePosts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        homeData2?.gamePosts?.map((gps, index) => {
                                            const user = userData?.data?.find((aus) => aus?._id === gps?.author);
                                            return (
                                                <Card5
                                                    key={index}
                                                    id={gps?._id}
                                                    thumbnailImg={gps?.thumbnailImg}
                                                    category={gps?.category}
                                                    title={gps?.title}
                                                    idName={user?.idName}
                                                    author={user?.userName}
                                                    createdAt={formatVNDateTime(gps?.createdAt)}
                                                />
                                            );
                                        })
                                    )}
                                </div>
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
                                    <h3 className="font-semibold">PHỔ BIẾN</h3>
                                    <span className="flex-1 h-[4px] bg-[var(--fifth-color)]"></span>
                                </div>
                                <div className="flex flex-col gap-5 mt-[20px]">
                                    {homeData3?.popularPosts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        homeData3?.popularPosts?.map((pps, index) => {
                                            return (
                                                <Card6
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
                            <div className="w-[90%] md:w-full mt-[52px]">
                                <div className="flex items-center gap-9">
                                    <h3 className="font-semibold">ĐỀ XUẤT</h3>
                                    <span className="flex-1 h-[4px] bg-[var(--sixth-color)]"></span>
                                </div>
                                <div className="flex flex-col gap-5 mt-[20px]">
                                    {homeData3?.suggestPosts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        homeData3?.suggestPosts?.map((sps, index) => {
                                            const user = userData?.data?.find((aus) => aus?._id === sps?.author);
                                            return (
                                                <Card7
                                                    key={index}
                                                    id={sps?._id}
                                                    category={sps?.category}
                                                    title={sps?.title}
                                                    idName={user?.idName}
                                                    author={user?.userName}
                                                    createdAt={formatVNDateTime(sps?.createdAt)}
                                                />
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                            <div className="w-[90%] md:w-full mt-[36px]">
                                <div className="flex items-center gap-9">
                                    <h3 className="font-semibold">CHUYÊN MỤC</h3>
                                    <span className="flex-1 h-[4px] bg-[var(--primary-color)]"></span>
                                </div>
                                <div className="flex flex-col gap-4 mt-[20px]">
                                    <Link
                                        prefetch
                                        href="/phim-anh"
                                        className="flex items-center justify-between font-semibold text-[1.35rem] hover:text-[var(--primary-color)] transition-all"
                                    >
                                        <span>Phim ảnh</span>
                                        <span>{homeData3?.allMoviePosts}</span>
                                    </Link>
                                    <Link
                                        prefetch
                                        href="/lam-dep"
                                        className="flex items-center justify-between font-semibold text-[1.35rem] hover:text-[var(--primary-color)] transition-all"
                                    >
                                        <span>Làm đẹp</span>
                                        <span>{homeData3?.allBeautyPosts}</span>
                                    </Link>
                                    <Link
                                        prefetch
                                        href="/doi-song"
                                        className="flex items-center justify-between font-semibold text-[1.35rem] hover:text-[var(--primary-color)] transition-all"
                                    >
                                        <span>Đời sống</span>
                                        <span>{homeData3?.allLifePosts}</span>
                                    </Link>
                                    <Link
                                        prefetch
                                        href="/am-thuc"
                                        className="flex items-center justify-between font-semibold text-[1.35rem] hover:text-[var(--primary-color)] transition-all"
                                    >
                                        <span>Ẩm thực</span>
                                        <span>{homeData3?.allFoodPosts}</span>
                                    </Link>
                                    <Link
                                        prefetch
                                        href="/cong-nghe"
                                        className="flex items-center justify-between font-semibold text-[1.35rem] hover:text-[var(--primary-color)] transition-all"
                                    >
                                        <span>Công nghệ</span>
                                        <span>{homeData3?.allTechPosts}</span>
                                    </Link>
                                    <Link
                                        prefetch
                                        href="/tro-choi"
                                        className="flex items-center justify-between font-semibold text-[1.35rem] hover:text-[var(--primary-color)] transition-all"
                                    >
                                        <span>Trò chơi</span>
                                        <span>{homeData3?.allGamePosts}</span>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-[90%] md:w-full mt-[36px] mb-5">
                                <span className="block text-[1.1rem] text-[#888888] tracking-wide text-center">
                                    - Advertisement -
                                </span>
                                <div className="w-full flex justify-center">
                                    <a
                                        href={otherData?.advertisements[2]?.link}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="block mt-1 bg-slate-200 w-[300px] h-[520px] md:w-[228px] md:h-[480px] lg:w-[300px] lg:h-[520px]"
                                    >
                                        {otherData?.advertisements[2] && (
                                            <img
                                                src={otherData?.advertisements[2]?.bannerBottom}
                                                alt="ads image"
                                                className="w-full h-full object-fill"
                                            />
                                        )}
                                    </a>
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
}
