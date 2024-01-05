'use client';

import { CiSearch } from 'react-icons/ci';
import { MdOutlineArticle } from 'react-icons/md';
import PostCard from '@/components/cards/postCard';
import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/pagination';
import Auth from '@/utils/auth';

const page = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [isDraft, setIsDraft] = useState('');
    const [rerender, setRerender] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    const router = useRouter();
    const isAuth = Auth(typeof window !== 'undefined' && localStorage.getItem('accessToken'));

    const removeFilter = () => {
        setSearch('');
        setCategory('');
    };

    const handleDelete = async (id) => {
        const confirmMsg = `Bạn có chắc muốn xóa vĩnh viễn bài viết không?`;
        if (!window.confirm(confirmMsg)) return;
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/post/delete/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            toast('Xóa bài viết thành công', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
            });
            setRerender(!rerender);
        } else {
            toast('Đã có lỗi xảy ra', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'error',
            });
        }
    };

    useEffect(() => {
        if (!isAuth) return;
        const fetchApi = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/post/get-all-by-blogger?page=${page}&limit=8&search=${search}&category=${category}&isDraft=${isDraft}`,
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
                },
            );
            if (res.data.code === 200) {
                setAllPosts(res.data.posts);
                setPages(res?.data?.totalPages);
            } else {
                return;
            }
        };
        fetchApi();
    }, [page, search, category, isDraft, rerender]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/public-info`);
            if (res?.data?.code === 200) {
                setAllUsers(res?.data?.data);
            } else {
                return;
            }
        };
        fetchApi();
    }, []);

    useLayoutEffect(() => {
        if (!isAuth) {
            toast('Đã hết phiên đăng nhập', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
            });
            return router.push('/');
        } else {
            return;
        }
    }, [isAuth]);

    return (
        <>
            {isAuth ? (
                <div className="w-full p-[36px]">
                    <h1 className="flex items-center gap-3 text-[2.4rem] font-semibold">
                        <span>
                            <MdOutlineArticle />
                        </span>
                        <span>Danh sách bài viết</span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-5 mt-[36px]">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Tìm kiếm..."
                                className="w-full text-[1.4rem] pl-[36px] pr-5 py-2.5 rounded-md outline-none border"
                            />
                            <div className="absolute top-[50%] translate-y-[-50%] left-0 w-[36px] h-[36px] text-[#888888] text-[1.8rem] flex items-center justify-center">
                                <CiSearch />
                            </div>
                        </div>
                        <select
                            defaultValue={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="flex-1 bg-gray-50 outline-none border border-gray-300 text-gray-900 text-[1.4rem] font-semibold rounded-lg block p-2.5"
                        >
                            <option value="">--Thể loại--</option>
                            <option value="Phim ảnh">Phim ảnh</option>
                            <option value="Làm đẹp">Làm đẹp</option>
                            <option value="Đời sống">Đời sống</option>
                            <option value="Ẩm thực">Ẩm thực</option>
                            <option value="Công nghệ">Công nghệ</option>
                            <option value="Trò chơi">Trò chơi</option>
                        </select>
                        <div
                            onClick={removeFilter}
                            className="text-[1.3rem] font-semibold hover:underline cursor-pointer"
                        >
                            Xóa bộ lọc
                        </div>
                    </div>
                    <div className="mt-[36px]">
                        <ul className="flex items-center gap-10 font-semibold text-[1.4rem]">
                            <li
                                onClick={() => setIsDraft('')}
                                className={
                                    isDraft === ''
                                        ? 'text-blue-600 hover:text-blue-600 cursor-pointer'
                                        : 'hover:text-blue-600 cursor-pointer'
                                }
                            >
                                Tất cả
                            </li>
                            <li
                                onClick={() => setIsDraft(false)}
                                className={
                                    isDraft === false
                                        ? 'text-blue-600 hover:text-blue-600 cursor-pointer'
                                        : 'hover:text-blue-600 cursor-pointer'
                                }
                            >
                                Đã đăng
                            </li>
                            <li
                                onClick={() => setIsDraft(true)}
                                className={
                                    isDraft === true
                                        ? 'text-blue-600 hover:text-blue-600 cursor-pointer'
                                        : 'hover:text-blue-600 cursor-pointer'
                                }
                            >
                                Nháp
                            </li>
                        </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-[24px]">
                        {allPosts?.map((aps, index) => {
                            const user = allUsers?.find((aus) => aus?._id === aps?.author);
                            return (
                                <PostCard
                                    key={index}
                                    id={aps?._id}
                                    thumbnailImg={aps?.thumbnailImg}
                                    title={aps?.title}
                                    author={user?.userName}
                                    status={aps?.isDraft}
                                    category={aps?.category}
                                    createdAt={aps?.createdAt}
                                    upadatedAt={aps?.updatedAt}
                                    handleDelete={() => handleDelete(aps?._id)}
                                />
                            );
                        })}
                    </div>
                    <Pagination page={page} pages={pages} changePage={setPage} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default page;
