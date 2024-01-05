'use client';

import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import Header from './header';
import Sidebar from './sidebar';
import Auth from '@/utils/auth';

const DefaultLayout = ({ children }) => {
    const [toggleSidebar, setToggleSidebar] = useState(false);

    const pathname = usePathname();
    const isAuth = Auth(typeof window !== 'undefined' && localStorage.getItem('accessToken'));

    const toggle = () => {
        setToggleSidebar(!toggleSidebar);
    };

    return (
        <>
            {pathname === '/' ? (
                <>{children}</>
            ) : (
                <>
                    {isAuth ? (
                        <>
                            <div
                                className={
                                    toggleSidebar
                                        ? 'fixed top-0 left-0 bottom-0 translate-x-0 lg:translate-x-0 w-full md:w-[260px] bg-[#f4f5f7] z-50 transition-all'
                                        : 'fixed top-0 left-0 bottom-0 translate-x-[-100%] lg:translate-x-0 w-full md:w-[260px] bg-[#f4f5f7] z-50 transition-all'
                                }
                            >
                                <Sidebar />
                                <div
                                    onClick={() => setToggleSidebar(false)}
                                    className="absolute top-0 right-0 w-[42px] h-[42px] flex lg:hidden items-center justify-center text-[24px] cursor-pointer"
                                >
                                    <FaXmark />
                                </div>
                            </div>
                            <div className="fixed top-0 left-0 lg:left-[260px] right-0 h-[60px] z-40 lg:z-50">
                                <Header />
                                <div
                                    onClick={toggle}
                                    className="absolute top-[50%] translate-y-[-50%] left-0 w-[42px] h-[42px] flex lg:hidden items-center justify-center text-[18px] cursor-pointer"
                                >
                                    <FaBars />
                                </div>
                            </div>
                            <div className="absolute top-[60px] left-0 pl-0 lg:pl-[260px] overflow-auto w-full">
                                {children}
                            </div>
                        </>
                    ) : (
                        <>{children}</>
                    )}
                </>
            )}
        </>
    );
};

export default DefaultLayout;
