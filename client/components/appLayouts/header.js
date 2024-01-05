'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { LuPencil } from 'react-icons/lu';
import { GrTechnology } from 'react-icons/gr';
import { IoSparklesOutline, IoHomeOutline } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import { FaBars, FaXmark, FaRegAddressBook } from 'react-icons/fa6';
import { BiMoviePlay } from 'react-icons/bi';
import { BsCpu } from 'react-icons/bs';
import { PiBicycleLight, PiBowlFood } from 'react-icons/pi';
import { MdExpandMore } from 'react-icons/md';
import axios from 'axios';
import { Card1 } from '../cards';
import useDebounce from '@/hooks/useDebounce';
import Link from 'next/link';
import useSWR from 'swr';
import { formatVNDateTime } from '@/utils/formatDateTime';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchMobileOpen, setSearchMobileOpen] = useState(false);
    const [searchPCOpen, setSearchPCOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();
    const debouncedValue = useDebounce(searchValue, 300);

    const { data: searchData } = useSWR(
        searchValue
            ? `${process.env.NEXT_PUBLIC_API_URL}/post/get-search-posts?limit=4&search=${debouncedValue}`
            : null,
        fetcher,
        { revalidateOnFocus: false },
    );

    const { data: otherData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/other/get-all-others`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    useEffect(() => {
        searchMobileOpen && (document.body.style.overflow = 'hidden');
        !searchMobileOpen && (document.body.style.overflow = 'unset');
    }, [searchMobileOpen]);

    useEffect(() => {
        menuOpen && (document.body.style.overflow = 'hidden');
        !menuOpen && (document.body.style.overflow = 'unset');
    }, [menuOpen]);

    useEffect(() => {
        const scrollPage = () => {
            const windowHeight = window.scrollY;
            if (windowHeight > 120) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', scrollPage);

        return () => window.removeEventListener('scroll', scrollPage);
    }, []);

    return (
        <>
            <div onClick={() => setSearchPCOpen(false)} className="hidden md:block">
                <div className="flex items-center justify-between gap-10 xl:gap-0 w-full h-[140px] px-[48px]">
                    <Link prefetch href="/">
                        <img src="/assets/images/logo_header.png" alt="logo" className="w-[272px] h-[90px]" />
                    </Link>
                    <a
                        href={otherData?.advertisements[0]?.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="block w-[728px] h-[90px] bg-slate-200 text-center"
                    >
                        {otherData?.advertisements[0] && (
                            <img
                                src={otherData?.advertisements[0]?.bannerTop}
                                alt="ads banner"
                                className="w-full h-full object-fill"
                            />
                        )}
                    </a>
                </div>
                <div
                    className={
                        scrolled
                            ? "nav-bar w-full xl:w-[1180px] h-[48px] xl:px-[36px] bg-[url('../public/assets/images/nav.png')] bg-center bg-no-repeat z-50 nav-bar-effect animate-fadeInNav"
                            : "nav-bar w-full xl:w-[1180px] h-[48px] xl:px-[36px] bg-[url('../public/assets/images/nav.png')] bg-center bg-no-repeat z-50"
                    }
                >
                    <ul className="flex items-center h-full text-white text-[1.1rem] lg:text-[1.3rem]">
                        <li
                            className={
                                pathname === '/'
                                    ? 'h-full px-[12px] hover:bg-black duration-75 bg-black'
                                    : 'h-full px-[12px] hover:bg-black duration-75'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/">
                                <IoHomeOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" /> Trang chủ
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === '/phim-anh'
                                    ? 'h-full px-[12px] hover:bg-black duration-75 bg-black'
                                    : 'h-full px-[12px] hover:bg-black duration-75'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/phim-anh">
                                <BiMoviePlay className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" /> Phim ảnh
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === '/lam-dep'
                                    ? 'h-full px-[12px] hover:bg-black duration-75 bg-black'
                                    : 'h-full px-[12px] hover:bg-black duration-75'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/lam-dep">
                                <IoSparklesOutline className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" /> Làm đẹp
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === '/doi-song'
                                    ? 'h-full px-[12px] hover:bg-black duration-75 bg-black'
                                    : 'h-full px-[12px] hover:bg-black duration-75'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/doi-song">
                                <PiBicycleLight className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" /> Đời sống
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === '/am-thuc'
                                    ? 'h-full px-[12px] hover:bg-black duration-75 bg-black'
                                    : 'h-full px-[12px] hover:bg-black duration-75'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/am-thuc">
                                <PiBowlFood className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" /> Ẩm thực
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === '/cong-nghe'
                                    ? 'h-full px-[12px] hover:bg-black duration-75 bg-black'
                                    : 'h-full px-[12px] hover:bg-black duration-75'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/cong-nghe">
                                <GrTechnology className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" /> Công nghệ
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === '/tro-choi'
                                    ? 'h-full px-[12px] hover:bg-black duration-75 bg-black'
                                    : 'h-full px-[12px] hover:bg-black duration-75'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/tro-choi">
                                <BsCpu className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" /> Trò chơi
                            </Link>
                        </li>
                        <li
                            className={
                                pathname === '/lien-he' || pathname === '/gioi-thieu'
                                    ? 'group relative h-full px-[12px] hover:bg-black duration-75 bg-black'
                                    : 'group relative h-full px-[12px] hover:bg-black duration-75'
                            }
                        >
                            <div className="flex items-center gap-2 h-full cursor-pointer">
                                Thêm <MdExpandMore className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" />
                            </div>
                            <ul className="hidden group-hover:block absolute top-[100%] left-[-10%] bg-white text-black shadow-lg w-fit h-fit whitespace-nowrap font-semibold z-50">
                                <li
                                    className={
                                        pathname === '/gioi-thieu'
                                            ? 'hover:text-[var(--primary-color)] text-[var(--primary-color)] duration-75'
                                            : 'hover:text-[var(--primary-color)] duration-75'
                                    }
                                >
                                    <Link
                                        prefetch
                                        className="flex items-center gap-2 px-5 pt-5 pb-2.5"
                                        href="/gioi-thieu"
                                    >
                                        <LuPencil className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" /> Giới thiệu
                                    </Link>
                                </li>
                                <li
                                    className={
                                        pathname === '/lien-he'
                                            ? 'hover:text-[var(--primary-color)] text-[var(--primary-color)] duration-75'
                                            : 'hover:text-[var(--primary-color)] duration-75'
                                    }
                                >
                                    <Link prefetch className="flex items-center gap-2 px-5 pb-5 pt-2.5" href="/lien-he">
                                        <FaRegAddressBook className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" /> Liên
                                        hệ quảng cáo
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div
                        onClick={(e) => {
                            setSearchPCOpen(!searchPCOpen), e.stopPropagation();
                        }}
                        className="relative flex w-[48px] h-full cursor-pointer"
                    >
                        <IoIosSearch className="w-[20px] h-[20px] text-white m-auto" />
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={
                                searchPCOpen
                                    ? 'visible absolute top-[100%] right-0 shadow-2xl arrow-top border-t-[3px] border-[#dd3333] animate-fadeIn z-50 ease-linear duration-500'
                                    : 'invisible absolute top-[100%] right-0 shadow-2xl arrow-top border-t-[3px] border-[#dd3333] animate-fadeOut z-50 pointer-events-none ease-linear duration-500'
                            }
                        >
                            <div className="flex flex-row items-stretch bg-white w-[300px] p-[20px]">
                                <input
                                    className="block w-[100%] outline-none border solid border-[#cccccc] py-[3px] px-[9px]"
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    autoFocus
                                    inputMode="search"
                                />
                                <Link
                                    prefetch
                                    href={`/tim-kiem?q=${debouncedValue}`}
                                    onClick={() => setSearchPCOpen(false)}
                                    className="flex bg-black text-white px-[15px] py-[4px] hover:bg-[var(--primary-color)]"
                                >
                                    <IoIosSearch className="text-[2rem] m-auto" />
                                </Link>
                            </div>
                            {debouncedValue && (
                                <>
                                    <div className="bg-white border-t border-[#cccccc]/40 p-[20px]">
                                        <div className="mb-[10px] text-[1.3rem] text-[#888888]">Bài viết</div>
                                        {searchData?.posts?.length > 0 ? (
                                            searchData?.posts?.map((sr, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        onClick={() => setSearchPCOpen(false)}
                                                        className="mb-4"
                                                    >
                                                        <Card1
                                                            id={sr?._id}
                                                            category={sr?.category}
                                                            thumbnailImg={sr?.thumbnailImg}
                                                            title={sr?.title}
                                                            createdAt={formatVNDateTime(sr?.createdAt)}
                                                        />
                                                    </div>
                                                );
                                            })
                                        ) : (
                                            <div className="text-center text-[1.3rem] text-[#888888]">
                                                Không tìm thấy bài viết
                                            </div>
                                        )}
                                    </div>
                                    <Link
                                        prefetch
                                        href={`/tim-kiem?q=${debouncedValue}`}
                                        onClick={() => setSearchPCOpen(false)}
                                        className="block text-[1.3rem] italic text-center bg-white border-t border-[#cccccc]/40 pt-[4px] pb-[6px] hover:text-[var(--primary-color)] cursor-pointer"
                                    >
                                        Xem tất cả
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile header */}
            <div className="block md:hidden">
                <div
                    className={
                        scrolled
                            ? "mobile-nav-bar w-full h-[56px] bg-[url('../public/assets/images/nav.png')] bg-center bg-no-repeat nav-bar-effect animate-fadeInNav z-40"
                            : "mobile-nav-bar w-full h-[56px] bg-[url('../public/assets/images/nav.png')] bg-center bg-no-repeat z-40"
                    }
                >
                    <div onClick={() => setMenuOpen(true)} className="flex w-[56px] h-full text-white cursor-pointer">
                        <FaBars className="w-[20px] h-[20px] m-auto" />
                    </div>
                    <Link prefetch href="/">
                        <img src="/assets/images/logo_footer.png" alt="logo" className="w-full h-[40px]" />
                    </Link>
                    <div onClick={() => setSearchMobileOpen(true)} className="flex w-[56px] h-full cursor-pointer">
                        <IoIosSearch className="w-[20px] h-[20px] text-white m-auto" />
                    </div>
                </div>
            </div>
            {/* Mobile nav */}
            <div
                className={
                    menuOpen
                        ? 'fixed top-0 left-0 bottom-0 right-0 duration-[1s] z-50'
                        : 'fixed top-0 left-0 bottom-0 right-0 translate-x-[-100%] duration-[1s] z-50'
                }
            >
                <div className="relative h-full bg-[url('../public/assets/images/nav-mobile-bg.png')] bg-cover bg-center bg-no-repeat">
                    <div className="flex justify-end w-full h-[60px]">
                        <div onClick={() => setMenuOpen(false)} className="flex w-[60px] h-[60px] cursor-pointer">
                            <FaXmark className="w-[32px] h-[32px] text-white m-auto" />
                        </div>
                    </div>
                    <ul className="text-white text-[2rem] font-semibold p-[20px] whitespace-nowrap">
                        <li
                            onClick={() => setMenuOpen(false)}
                            className={
                                pathname === '/'
                                    ? 'h-full p-[12px] text-[var(--primary-color)] hover:text-[var(--primary-color)]'
                                    : 'h-full p-[12px] hover:text-[var(--primary-color)]'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/">
                                <IoHomeOutline className="w-[18px] h-[18px]" /> Trang chủ
                            </Link>
                        </li>
                        <li
                            onClick={() => setMenuOpen(false)}
                            className={
                                pathname === '/phim-anh'
                                    ? 'h-full p-[12px] text-[var(--primary-color)] hover:text-[var(--primary-color)]'
                                    : 'h-full p-[12px] hover:text-[var(--primary-color)]'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/phim-anh">
                                <BiMoviePlay className="w-[18px] h-[18px]" /> Phim ảnh
                            </Link>
                        </li>
                        <li
                            onClick={() => setMenuOpen(false)}
                            className={
                                pathname === '/lam-dep'
                                    ? 'h-full p-[12px] text-[var(--primary-color)] hover:text-[var(--primary-color)]'
                                    : 'h-full p-[12px] hover:text-[var(--primary-color)]'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/lam-dep">
                                <IoSparklesOutline className="w-[18px] h-[18px]" /> Làm đẹp
                            </Link>
                        </li>
                        <li
                            onClick={() => setMenuOpen(false)}
                            className={
                                pathname === '/doi-song'
                                    ? 'h-full p-[12px] text-[var(--primary-color)] hover:text-[var(--primary-color)]'
                                    : 'h-full p-[12px] hover:text-[var(--primary-color)]'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/doi-song">
                                <PiBicycleLight className="w-[18px] h-[18px]" /> Đời sống
                            </Link>
                        </li>
                        <li
                            onClick={() => setMenuOpen(false)}
                            className={
                                pathname === '/am-thuc'
                                    ? 'h-full p-[12px] text-[var(--primary-color)] hover:text-[var(--primary-color)]'
                                    : 'h-full p-[12px] hover:text-[var(--primary-color)]'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/am-thuc">
                                <PiBowlFood className="w-[18px] h-[18px]" /> Ẩm thực
                            </Link>
                        </li>
                        <li
                            onClick={() => setMenuOpen(false)}
                            className={
                                pathname === '/cong-nghe'
                                    ? 'h-full p-[12px] text-[var(--primary-color)] hover:text-[var(--primary-color)]'
                                    : 'h-full p-[12px] hover:text-[var(--primary-color)]'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/cong-nghe">
                                <GrTechnology className="w-[18px] h-[18px]" /> Công nghệ
                            </Link>
                        </li>
                        <li
                            onClick={() => setMenuOpen(false)}
                            className={
                                pathname === '/tro-choi'
                                    ? 'h-full p-[12px] text-[var(--primary-color)] hover:text-[var(--primary-color)]'
                                    : 'h-full p-[12px] hover:text-[var(--primary-color)]'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/tro-choi">
                                <BsCpu className="w-[18px] h-[18px]" /> Trò chơi
                            </Link>
                        </li>
                        <li
                            onClick={() => setMenuOpen(false)}
                            className={
                                pathname === '/gioi-thieu'
                                    ? 'h-full p-[12px] text-[var(--primary-color)] hover:text-[var(--primary-color)]'
                                    : 'h-full p-[12px] hover:text-[var(--primary-color)]'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/gioi-thieu">
                                <LuPencil className="w-[18px] h-[18px]" /> Giới thiệu
                            </Link>
                        </li>
                        <li
                            onClick={() => setMenuOpen(false)}
                            className={
                                pathname === '/lien-he'
                                    ? 'h-full p-[12px] text-[var(--primary-color)] hover:text-[var(--primary-color)]'
                                    : 'h-full p-[12px] hover:text-[var(--primary-color)]'
                            }
                        >
                            <Link prefetch className="flex items-center gap-2 h-full" href="/lien-he">
                                <FaRegAddressBook className="w-[18px] h-[18px]" /> Liên hệ quảng cáo
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Mobile search */}
            <div
                className={
                    searchMobileOpen
                        ? 'fixed top-0 left-0 bottom-0 right-0 duration-[1s] z-50'
                        : 'fixed top-0 left-0 bottom-0 right-0 translate-x-[100%] duration-[1s] z-50'
                }
            >
                <div className="relative h-full bg-[url('../public/assets/images/nav-mobile-bg.png')] bg-cover bg-center bg-no-repeat">
                    <div className="w-full h-[60px]">
                        <div
                            onClick={() => setSearchMobileOpen(false)}
                            className="flex w-[60px] h-[60px] cursor-pointer"
                        >
                            <FaXmark className="w-[32px] h-[32px] text-white m-auto" />
                        </div>
                        <div className="relative">
                            <div className="mx-[5%] relative">
                                <p className="text-center text-white text-[1.4rem]">Tìm kiếm</p>
                                <input
                                    className="effect-2 w-full outline-none border-none text-[2.6rem] text-center bg-inherit text-white"
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    autoFocus
                                    inputMode="search"
                                />
                                <span className="focus-border"></span>
                            </div>
                            {debouncedValue && (
                                <div className="mx-[5%]">
                                    <div className="py-[20px]">
                                        {searchData?.posts?.map((sr, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    onClick={() => setSearchMobileOpen(false)}
                                                    className="mb-5"
                                                >
                                                    <Card1
                                                        id={sr?._id}
                                                        category={sr?.category}
                                                        thumbnailImg={sr?.thumbnailImg}
                                                        title={sr?.title}
                                                        createdAt={formatVNDateTime(sr?.createdAt)}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <Link
                                        prefetch
                                        href={`/tim-kiem?q=${debouncedValue}`}
                                        onClick={() => setSearchMobileOpen(false)}
                                        className="block w-full bg-[#cccccc] text-center text-[1.6rem] font-semibold py-3.5 leading-none"
                                    >
                                        Xem tất cả
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
