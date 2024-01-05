'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MdOutlineArticle } from 'react-icons/md';
import { FaUserGroup } from 'react-icons/fa6';
import { IoCreateOutline } from 'react-icons/io5';

const Sidebar = () => {
    const pathName = usePathname();

    return (
        <div className="flex flex-col w-full h-full shadow-md shadow-current select-none">
            <div className="flex items-center justify-center w-full h-[60px] border-r border-[#f4f5f7]">
                <img src={'/logo_header.png'} alt="logo" className="w-full h-[60px] object-contain" />
            </div>
            <div className="flex-1 shadow-md">
                <ul className="flex flex-col gap-4 p-5 text-[1.4rem] font-semibold text-[#888888]">
                    <li>
                        <Link
                            href={'/quan-ly-bai-viet'}
                            className={
                                pathName === '/quan-ly-bai-viet'
                                    ? 'flex items-center gap-3 bg-[var(--primary-color)] text-white rounded-lg px-5 py-3 hover:bg-[var(--primary-color)] hover:text-white transition-all'
                                    : 'flex items-center gap-3 px-5 py-3 hover:bg-[var(--primary-color)] hover:text-white transition-all'
                            }
                        >
                            <span className="text-[1.8rem]">
                                <MdOutlineArticle />
                            </span>
                            <span>Quản lý bài viết</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={'/them-bai-viet'}
                            className={
                                pathName === '/them-bai-viet'
                                    ? 'flex items-center gap-3 bg-[var(--primary-color)] text-white rounded-lg px-5 py-3 hover:bg-[var(--primary-color)] hover:text-white transition-all'
                                    : 'flex items-center gap-3 rounded-lg px-5 py-3 hover:bg-[var(--primary-color)] hover:text-white transition-all'
                            }
                        >
                            <span className="text-[1.8rem]">
                                <IoCreateOutline />
                            </span>
                            <span>Thêm bài viết</span>
                        </Link>
                    </li>
                    <li className="pointer-events-none opacity-50">
                        <Link
                            href={'/quan-ly-nguoi-dung'}
                            className={
                                pathName === '/quan-ly-nguoi-dung'
                                    ? 'flex items-center gap-3 bg-[var(--primary-color)] text-white rounded-lg px-5 py-3 hover:bg-[var(--primary-color)] hover:text-white transition-all'
                                    : 'flex items-center gap-3 rounded-lg px-5 py-3 hover:bg-[var(--primary-color)] hover:text-white transition-all'
                            }
                        >
                            <span className="text-[1.8rem]">
                                <FaUserGroup />
                            </span>
                            <span>Quản lý người dùng</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
