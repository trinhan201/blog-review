'use client';

import { useEffect, useState } from 'react';
import { FaAngleRight, FaEye, FaComments } from 'react-icons/fa6';
import { IoMdShare } from 'react-icons/io';
import { FacebookProvider, Comments, CommentsCount } from 'react-facebook';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { stringSimilarity } from 'string-similarity-js';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { Card3, Card6 } from '../cards';
import { formatVNDateTime } from '@/utils/formatDateTime';
import setSlug from '@/utils/slugify';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const DetailPost = () => {
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [prevSeriePosts, setPrevSeriePosts] = useState({});
    const [nextSeriePosts, setNextSeriePosts] = useState({});

    const searchParams = useSearchParams();

    const { data: userData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/user/public-info`, fetcher, {
        revalidateOnFocus: false,
    });

    const getAuthor = () => {
        const user = userData?.data?.find((aus) => aus?._id === detailPostData?.data?.author);
        return user;
    };

    const { data: detailPostData, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get/${searchParams.get('requestId')}`,
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    const urlShare = `${process.env.NEXT_PUBLIC_BASE_URL}/${setSlug(detailPostData?.data?.category)}/${setSlug(
        detailPostData?.data?.title,
    )}?requestId=${detailPostData?.data?._id}`;

    useEffect(() => {
        const fetchApi = async () => {
            const data = {
                views: detailPostData?.data?.views + 1,
            };
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/post/update-view/${searchParams.get('requestId')}`,
                data,
            );
        };
        let timer = setTimeout(() => {
            fetchApi();
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, [detailPostData?.data?.views]);

    const { data: seriePostData } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get-detail-posts?category=${
            detailPostData?.data?.category
        }&serieName=${detailPostData?.data?.serieName || ''}`,
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    useEffect(() => {
        if (!seriePostData?.seriePosts) return;
        const pos = seriePostData?.seriePosts?.map((item) => item?._id)?.indexOf(detailPostData?.data?._id);
        seriePostData?.seriePosts?.filter((item, index) => {
            if (index === pos - 1) return setNextSeriePosts(item);
            if (index === pos + 1) return setPrevSeriePosts(item);
        });
    }, [seriePostData?.seriePosts]);

    const { data: detailRelatedPostData } = useSWR(
        `${process.env.NEXT_PUBLIC_API_URL}/post/get-detail-related-posts?category=${detailPostData?.data?.category}`,
        fetcher,
        {
            revalidateOnFocus: false,
        },
    );

    useEffect(() => {
        const result = detailRelatedPostData?.categoryPosts
            ?.filter((item) => item?._id !== detailPostData?.data?._id)
            ?.filter((item) => {
                return stringSimilarity(item?.tags, detailPostData?.data?.tags) > 0;
            });
        const sortedResult = result
            ?.map((item) => {
                return { relatedRatio: stringSimilarity(item?.tags, detailPostData?.data?.tags), ...item };
            })
            .sort((a, b) => (a.relatedRatio < b.relatedRatio ? 1 : b.relatedRatio < a.relatedRatio ? -1 : 0));
        setRelatedPosts(sortedResult);
    }, [detailPostData?.data?._id, detailPostData?.data?.tags, detailRelatedPostData?.categoryPosts]);

    const { data: otherData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/other/get-all-others`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <>
            {!isLoading ? (
                <div className="flex flex-col items-center w-full md:w-[720px] lg:w-[980px] xl:w-[1084px] py-[36px]">
                    <div className="w-[90%] md:w-full">
                        <div className="flex items-center gap-2 text-[1.2rem] text-[#888888] mb-6">
                            <Link prefetch href="/" className="hover:text-black">
                                Trang chủ
                            </Link>
                            <span className="text-[0.8rem] leading-none">
                                <FaAngleRight />
                            </span>
                            <span>{detailPostData?.data?.category}</span>
                        </div>
                    </div>
                    <div className="block w-full md:grid md:grid-cols-3 gap-10 pb-14">
                        {/* Left side */}
                        <div className="flex flex-col items-center md:block col-span-2">
                            <div className="w-[90%] md:w-full">
                                <div className="uppercase font-semibold text-[1.4rem]">
                                    {detailPostData?.data?.category}
                                </div>
                                <h1 className="font-semibold text-[3.2rem] leading-snug mt-3 mb-5">
                                    {detailPostData?.data?.title}
                                </h1>
                                <div className="block md:flex md:items-center justify-between">
                                    <div className="flex items-center text-[1.3rem]">
                                        <img
                                            src={
                                                getAuthor()?.avatar ||
                                                'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199562894-stock-illustration-creative-vector-illustration-default-avatar.jpg'
                                            }
                                            alt="author avatar"
                                            className="w-[25px] h-[25px] object-cover rounded-full"
                                        />
                                        <span className="ml-3 whitespace-nowrap">
                                            bởi{' '}
                                            <Link
                                                prefetch
                                                href={`/tac-gia/${getAuthor()?.idName}`}
                                                className="font-semibold hover:text-[var(--primary-color)] cursor-pointer"
                                            >
                                                {getAuthor()?.userName}
                                            </Link>
                                        </span>
                                        <span className="mx-2">-</span>
                                        <span className="whitespace-nowrap">
                                            {formatVNDateTime(detailPostData?.data?.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6 text-[1.3rem] mt-3 md:mt-0">
                                        <div className="flex items-center gap-3">
                                            <FaEye />
                                            <span>{detailPostData?.data?.views}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <FaComments />
                                            <span>
                                                <FacebookProvider
                                                    key={detailPostData?.data?._id}
                                                    appId="1349000872373220"
                                                >
                                                    <CommentsCount
                                                        href={`${process.env.NEXT_PUBLIC_BASE_URL}/${setSlug(
                                                            detailPostData?.data?.category,
                                                        )}/${setSlug(detailPostData?.data?.title)}?requestId=${
                                                            detailPostData?.data?._id
                                                        }`}
                                                    />
                                                </FacebookProvider>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[90%] md:w-full mt-[30px] mb-[26px]">
                                <ul className="flex items-center gap-3 flex-wrap">
                                    <li>
                                        <FacebookShareButton url={urlShare}>
                                            <div className="flex items-center border border-[#cccccc]/70 py-[10px]">
                                                <img
                                                    src={'/assets/images/facebook-icon.png'}
                                                    alt="Facebook icon"
                                                    className="mx-[12px] w-[16px] h-[16px]"
                                                />
                                                <span className="text-[1.2rem] text-[#516eab] font-semibold px-[12px] border-l">
                                                    Facebook
                                                </span>
                                            </div>
                                        </FacebookShareButton>
                                    </li>
                                    <li>
                                        <TwitterShareButton url={urlShare}>
                                            <div className="flex items-center border border-[#cccccc]/70 py-[10px]">
                                                <img
                                                    src={'/assets/images/twitter-icon.png'}
                                                    alt="Instagram icon"
                                                    className="mx-[12px] w-[16px] h-[16px]"
                                                />
                                                <span className="text-[1.2rem] text-[#29c5f6] font-semibold px-[12px] border-l">
                                                    Twitter
                                                </span>
                                            </div>
                                        </TwitterShareButton>
                                    </li>
                                    <li>
                                        <LinkedinShareButton url={urlShare}>
                                            <div className="flex items-center border border-[#cccccc]/70 py-[10px]">
                                                <img
                                                    src={'/assets/images/linkedin-icon.png'}
                                                    alt="Linkedin icon"
                                                    className="mx-[12px] w-[16px] h-[16px]"
                                                />
                                                <span className="text-[1.2rem] font-semibold px-[12px] border-l">
                                                    Linkedin
                                                </span>
                                            </div>
                                        </LinkedinShareButton>
                                    </li>
                                </ul>
                            </div>
                            {/* Detail */}
                            <div
                                className="w-[90%] md:w-full mb-[36px]"
                                dangerouslySetInnerHTML={{ __html: detailPostData?.data?.content }}
                            ></div>
                            <ul className="w-[90%] md:w-full flex items-center flex-wrap gap-2 mb-[36px]">
                                <li className="bg-black text-white font-semibold text-[1.3rem] px-3 py-1 leading-snug">
                                    <span>TAGS</span>
                                </li>
                                {detailPostData?.data?.tags?.split(', ')?.map((t, index) => {
                                    return (
                                        <li
                                            key={index}
                                            className="border font-semibold text-[1.3rem] px-3 py-1 leading-snug"
                                        >
                                            <span>{t}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="w-[90%] md:w-full">
                                <ul className="flex items-center gap-3 flex-wrap py-[36px] border-t border-b">
                                    <li className="flex items-center mr-3">
                                        <div className="flex items-center bg-[#150f0c] py-[10px] text-white">
                                            <IoMdShare className="mx-[12px]" />
                                            <span className="text-[1.2rem] px-[12px] border-l whitespace-nowrap">
                                                Chia sẻ
                                            </span>
                                        </div>
                                        <div className="arrow-right"></div>
                                    </li>
                                    <li>
                                        <FacebookShareButton url={urlShare}>
                                            <div className="flex items-center border border-[#cccccc]/70 py-[10px]">
                                                <img
                                                    src={'/assets/images/facebook-icon.png'}
                                                    alt="Facebook icon"
                                                    className="mx-[12px] w-[16px] h-[16px]"
                                                />
                                                <span className="text-[1.2rem] text-[#516eab] font-semibold px-[12px] border-l">
                                                    Facebook
                                                </span>
                                            </div>
                                        </FacebookShareButton>
                                    </li>
                                    <li>
                                        <TwitterShareButton url={urlShare}>
                                            <div className="flex items-center border border-[#cccccc]/70 py-[10px]">
                                                <img
                                                    src={'/assets/images/twitter-icon.png'}
                                                    alt="X icon"
                                                    className="mx-[12px] w-[16px] h-[16px]"
                                                />
                                                <span className="text-[1.2rem] text-[#29c5f6] font-semibold px-[12px] border-l">
                                                    Twitter
                                                </span>
                                            </div>
                                        </TwitterShareButton>
                                    </li>
                                    <li>
                                        <LinkedinShareButton url={urlShare}>
                                            <div className="flex items-center border border-[#cccccc]/70 py-[10px]">
                                                <img
                                                    src={'/assets/images/linkedin-icon.png'}
                                                    alt="Linkedin icon"
                                                    className="mx-[12px] w-[16px] h-[16px]"
                                                />
                                                <span className="text-[1.2rem] font-semibold px-[12px] border-l">
                                                    Linkedin
                                                </span>
                                            </div>
                                        </LinkedinShareButton>
                                    </li>
                                </ul>
                                {detailPostData?.data?.isSeries && (
                                    <div className="flex items-center justify-between gap-10 py-[36px]">
                                        <div className="text-left">
                                            <span className="text-[1.3rem] text-[#888888] whitespace-nowrap">
                                                Bài viết trước
                                            </span>
                                            {JSON.stringify(prevSeriePosts) !== '{}' ? (
                                                <Link
                                                    prefetch
                                                    href={`/${setSlug(prevSeriePosts?.category)}/${
                                                        prevSeriePosts?.title
                                                    }?requestId=${prevSeriePosts?._id}`}
                                                    className="block text-[1.2rem] md:text-[1.4rem] font-semibold"
                                                >
                                                    {prevSeriePosts?.title}
                                                </Link>
                                            ) : (
                                                <p className="text-[1.2rem] md:text-[1.4rem] font-semibold whitespace-nowrap">
                                                    Không có bài trước
                                                </p>
                                            )}
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[1.3rem] text-[#888888] whitespace-nowrap">
                                                Bài viết sau
                                            </span>
                                            {JSON.stringify(nextSeriePosts) !== '{}' ? (
                                                <Link
                                                    prefetch
                                                    href={`/${setSlug(nextSeriePosts?.category)}/${
                                                        nextSeriePosts?.title
                                                    }?requestId=${nextSeriePosts?._id}`}
                                                    className="block text-[1.2rem] md:text-[1.4rem] font-semibold"
                                                >
                                                    {nextSeriePosts?.title}
                                                </Link>
                                            ) : (
                                                <p className="text-[1.2rem] md:text-[1.4rem] font-semibold whitespace-nowrap">
                                                    Không có bài sau
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-col md:flex-row items-center gap-7 md:gap-10 lg:gap-14 p-[18px] border">
                                    <img
                                        src={
                                            getAuthor()?.avatar ||
                                            'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199562894-stock-illustration-creative-vector-illustration-default-avatar.jpg'
                                        }
                                        alt="author avatar"
                                        className="w-[100px] h-[100px] object-cover"
                                    />
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="font-semibold text-[1.5rem]">{getAuthor()?.userName}</h2>
                                        <p className="text-[1.3rem] mt-2">{getAuthor()?.briefDesc}</p>
                                    </div>
                                </div>
                                <div className="mt-[36px]">
                                    <div className="flex items-center gap-9">
                                        <h3 className="font-semibold">BÀI VIẾT LIÊN QUAN</h3>
                                        <span className="flex-1 h-[4px] bg-[var(--primary-color)]"></span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 mt-[20px] gap-2 md:gap-[0.3rem] lg:gap-2">
                                        {relatedPosts?.length === 0 ? (
                                            <p>Không có bài viết liên quan</p>
                                        ) : (
                                            relatedPosts?.slice(0, 6)?.map((rps, index) => {
                                                return (
                                                    <Card3
                                                        hoverColor="primary"
                                                        key={index}
                                                        id={rps?._id}
                                                        thumbnailImg={rps?.thumbnailImg}
                                                        title={rps?.title}
                                                        category={rps?.category}
                                                    />
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                                <div className="mt-[36px]">
                                    <div className="font-semibold">Bình luận</div>
                                    <div className="border border-[#cccccc]/40 p-5 mt-4">
                                        <FacebookProvider key={detailPostData?.data?._id} appId="1349000872373220">
                                            <Comments
                                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/${setSlug(
                                                    detailPostData?.data?.category,
                                                )}/${setSlug(detailPostData?.data?.title)}?requestId=${
                                                    detailPostData?.data?._id
                                                }`}
                                                width="100%"
                                            />
                                        </FacebookProvider>
                                    </div>
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
                                    {seriePostData?.popularPosts?.length === 0 ? (
                                        <p>Chưa có bài viết nào</p>
                                    ) : (
                                        seriePostData?.popularPosts?.map((pps, index) => {
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

export default DetailPost;
