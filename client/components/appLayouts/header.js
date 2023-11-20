'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressBook,
    faBars,
    faFilm,
    faHouse,
    faMobileScreenButton,
    faPenFancy,
    faSearch,
    faSpa,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
// import useDebounce from '@/hooks/useDebounce';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchMobileOpen, setSearchMobileOpen] = useState(false);
    const [searchPCOpen, setSearchPCOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [scrolled, setScrolled] = useState(false);

    // const debouncedValue = useDebounce(searchValue, 300);

    useEffect(() => {
        const scrollPage = () => {
            const windowHeight = window.scrollY;
            if (windowHeight >= 140) {
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
                <div className="flex items-center justify-between w-full h-[140px] px-[48px]">
                    <div className="cursor-pointer">
                        <Image src="/assets/images/logo-header.webp" alt="logo" width={272} height={90} />
                    </div>
                    <div className="w-[728px] h-[90px] bg-[#cccccc] text-center">Advertiments</div>
                </div>
                <div
                    className={
                        scrolled
                            ? "nav-bar w-full xl:w-[1180px] h-[48px] xl:px-[36px] bg-[url('../public/assets/images/nav.png')] bg-center bg-no-repeat nav-bar-effect animate-fadeInNav"
                            : "nav-bar w-full xl:w-[1180px] h-[48px] xl:px-[36px] bg-[url('../public/assets/images/nav.png')] bg-center bg-no-repeat"
                    }
                >
                    <ul className="flex items-center h-full text-white text-[1.1rem] lg:text-[1.3rem]">
                        <li className="h-full px-[12px] hover:bg-black duration-75 bg-black">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" icon={faHouse} />{' '}
                                Trang chủ
                            </a>
                        </li>
                        <li className="h-full px-[12px] hover:bg-black duration-75">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" icon={faFilm} />{' '}
                                Phim ảnh
                            </a>
                        </li>
                        <li className="h-full px-[12px] hover:bg-black duration-75">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" icon={faSpa} />{' '}
                                Sắc đẹp
                            </a>
                        </li>
                        <li className="h-full px-[12px] hover:bg-black duration-75">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon
                                    className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                                    icon={faMobileScreenButton}
                                />{' '}
                                Công nghệ
                            </a>
                        </li>
                        <li className="h-full px-[12px] hover:bg-black duration-75">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon
                                    className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                                    icon={faPenFancy}
                                />{' '}
                                Giới thiệu
                            </a>
                        </li>
                        <li className="h-full px-[12px] hover:bg-black duration-75">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon
                                    className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                                    icon={faAddressBook}
                                />{' '}
                                Liên hệ quảng cáo
                            </a>
                        </li>
                    </ul>
                    <div
                        onClick={(e) => {
                            setSearchPCOpen(!searchPCOpen), e.stopPropagation();
                        }}
                        className="relative flex w-[48px] h-full"
                    >
                        <FontAwesomeIcon
                            className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-white m-auto cursor-pointer"
                            icon={faSearch}
                        />
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={
                                searchPCOpen
                                    ? 'opacity-100 absolute top-[100%] right-0 shadow-2xl arrow-top border-t-[3px] border-[#dd3333] animate-fadeIn z-50'
                                    : 'opacity-0 absolute top-[100%] right-0 shadow-2xl arrow-top border-t-[3px] border-[#dd3333] animate-fadeOut z-50 pointer-events-none'
                            }
                        >
                            <div className="flex items-center bg-white w-[300px] p-[20px]">
                                <input
                                    className="block outline-none border solid border-[#cccccc] py-[3px] px-[9px]"
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    autoFocus
                                    inputMode="search"
                                />
                                <button className="bg-black text-white px-[15px] py-[4px]">
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile header */}
            <div className="block md:hidden">
                <div className="flex items-center justify-between w-full h-[56px] bg-[url('../public/assets/images/nav.png')] bg-center bg-no-repeat border-b-[3px] border-[#dd3333]">
                    <div onClick={() => setMenuOpen(true)} className="flex w-[56px] h-full text-white cursor-pointer">
                        <FontAwesomeIcon className="w-[20px] h-[20px] m-auto" icon={faBars} />
                    </div>
                    <div className="cursor-pointer">
                        <Image src="/assets/images/logo-footer.png" alt="logo" width={160} height={53} />
                    </div>
                    <div onClick={() => setSearchMobileOpen(true)} className="flex w-[56px] h-full cursor-pointer">
                        <FontAwesomeIcon
                            className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px] text-white m-auto"
                            icon={faSearch}
                        />
                    </div>
                </div>
            </div>
            {/* Mobile nav */}
            <div
                className={
                    menuOpen
                        ? 'fixed top-0 left-0 bottom-0 right-0 duration-[1s]'
                        : 'fixed top-0 left-0 bottom-0 right-0 translate-x-[-100%] duration-[1s]'
                }
            >
                <div className="relative h-full bg-[url('../public/assets/images/nav-mobile-bg.png')] bg-cover bg-center bg-no-repeat">
                    <div className="flex justify-end w-full h-[60px]">
                        <div onClick={() => setMenuOpen(false)} className="flex w-[60px] h-[60px] cursor-pointer">
                            <FontAwesomeIcon className="w-[32px] h-[32px] text-white m-auto" icon={faXmark} />
                        </div>
                    </div>
                    <ul className="text-white text-[2rem] font-semibold p-[20px] whitespace-nowrap">
                        <li className="h-full p-[12px] text-[#00a392] hover:text-[#00a392]">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" icon={faHouse} />{' '}
                                Trang chủ
                            </a>
                        </li>
                        <li className="h-full p-[12px] hover:text-[#00a392]">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" icon={faFilm} />{' '}
                                Phim ảnh
                            </a>
                        </li>
                        <li className="h-full p-[12px] hover:text-[#00a392]">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]" icon={faSpa} />{' '}
                                Sắc đẹp
                            </a>
                        </li>
                        <li className="h-full p-[12px] hover:text-[#00a392]">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon
                                    className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                                    icon={faMobileScreenButton}
                                />{' '}
                                Công nghệ
                            </a>
                        </li>
                        <li className="h-full p-[12px] hover:text-[#00a392]">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon
                                    className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                                    icon={faPenFancy}
                                />{' '}
                                Giới thiệu
                            </a>
                        </li>
                        <li className="h-full p-[12px] hover:text-[#00a392]">
                            <a className="flex items-center gap-2 h-full" href="#">
                                <FontAwesomeIcon
                                    className="w-[16px] h-[16px] lg:w-[20px] lg:h-[20px]"
                                    icon={faAddressBook}
                                />{' '}
                                Liên hệ quảng cáo
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Mobile search */}
            <div
                className={
                    searchMobileOpen
                        ? 'fixed top-0 left-0 bottom-0 right-0 duration-[1s]'
                        : 'fixed top-0 left-0 bottom-0 right-0 translate-x-[100%] duration-[1s]'
                }
            >
                <div className="relative h-full bg-[url('../public/assets/images/nav-mobile-bg.png')] bg-cover bg-center bg-no-repeat">
                    <div className="w-full h-[60px]">
                        <div
                            onClick={() => setSearchMobileOpen(false)}
                            className="flex w-[60px] h-[60px] cursor-pointer"
                        >
                            <FontAwesomeIcon className="w-[32px] h-[32px] text-white m-auto" icon={faXmark} />
                        </div>
                        <div className="relative">
                            <div className="mx-[5%] relative">
                                <h3 className="text-center text-white text-[1.4rem]">Tìm kiếm</h3>
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
