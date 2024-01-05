'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { RiLockPasswordFill, RiLogoutBoxLine, RiArrowDropDownFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {
    const [user, setUser] = useState({});
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const router = useRouter();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (!oldPass || !newPass || !confirmPass)
            return toast('Hãy điền đầy đủ thông tin', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
            });
        if (newPass !== confirmPass)
            return toast('Xác nhận mật khẩu không trùng khớp', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
            });
        const data = {
            oldPassword: oldPass,
            newPassword: newPass,
        };
        const res = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/user/change-password`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            setShowChangePassword(false);
            setNewPass('');
            setOldPass('');
            setConfirmPass('');
            toast('Thay đổi mật khẩu thành công', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
            });
        } else {
            toast(res?.data?.message, {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'error',
            });
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        router.push('/');
        toast('Đã đăng xuất thành công', {
            hideProgressBar: true,
            autoClose: 2000,
            type: 'success',
        });
    };

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/current-user`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
            if (res?.data?.code === 200) {
                setUser(res?.data?.data);
                localStorage?.setItem('userId', res?.data?.data?._id);
            } else {
                return;
            }
        };
        fetchApi();
    }, []);

    return (
        <>
            <header className="w-full h-full flex bg-white shadow shadow-current select-none">
                <div className="w-full h-full flex items-center justify-end m-auto">
                    <div className="group relative flex items-center px-5 mr-5 cursor-pointer">
                        <img
                            src={
                                user?.avatar ||
                                'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199562894-stock-illustration-creative-vector-illustration-default-avatar.jpg'
                            }
                            alt="user avatar"
                            className="w-[42px] h-[42px] border border-black object-cover rounded-full"
                        />
                        <div className="text-[2.4rem]">
                            <RiArrowDropDownFill />
                        </div>
                        <div className="group-hover:block hidden absolute top-[100%] right-0 w-[300px] rounded-lg transition-all cursor-default">
                            <ul className="bg-white shadow-md border border-[#cccccc]/30 rounded-lg pb-3">
                                <li className="px-6 py-4 rounded-lg pointer-events-none opacity-30">
                                    <div className="px-5 border border-[#cccccc]/30 shadow-md rounded-lg">
                                        <div className="flex items-center gap-3 w-full py-3">
                                            <img
                                                src={
                                                    user?.avatar ||
                                                    'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199562894-stock-illustration-creative-vector-illustration-default-avatar.jpg'
                                                }
                                                alt="user avatar"
                                                className="w-[36px] h-[36px] border border-black object-cover rounded-full"
                                            />
                                            <span className="text-[1.3rem] font-semibold max-w-[156px] truncate">
                                                {user?.userName}
                                            </span>
                                        </div>
                                        <div className="border-t text-[1.3rem] font-semibold py-3">
                                            Xem thông tin cá nhân
                                        </div>
                                    </div>
                                </li>
                                <li
                                    onClick={() => setShowChangePassword(true)}
                                    className="flex items-center gap-3 px-6 py-4 hover:bg-[#cccccc]/50 rounded-lg mx-3 cursor-pointer"
                                >
                                    <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                        <RiLockPasswordFill className="m-auto" />
                                    </div>
                                    <span className="whitespace-nowrap">Thay đối mật khẩu</span>
                                </li>
                                <li
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 px-6 py-4 hover:bg-[#cccccc]/50 rounded-lg mx-3 cursor-pointer"
                                >
                                    <div className="flex w-[30px] h-[30px] bg-[#cccccc]/50 rounded-full">
                                        <RiLogoutBoxLine className="m-auto" />
                                    </div>
                                    <span className="whitespace-nowrap">Đăng xuất</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            {showChangePassword && (
                <div
                    onClick={() => setShowChangePassword(false)}
                    className="fixed top-0 left-0 bottom-0 right-0 z-50 bg-black/30 flex w-full h-screen items-center justify-center"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="min-w-[360px] shadow-lg border rounded-lg bg-white animate-fadeIn"
                    >
                        <div className="px-6 py-12 lg:px-8">
                            <div className="sm:mx-auto sm:w-full sm:max-w-[31rem]">
                                <img
                                    className="mx-auto h-10 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="Your Company"
                                />
                                <h2 className="mt-10 text-center text-[2.4rem] font-bold leading-9 tracking-tight text-gray-900">
                                    Thay đổi mật khẩu
                                </h2>
                            </div>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[31rem]">
                                <form className="space-y-6">
                                    <div>
                                        <label className="block text-[1.4rem] font-medium leading-6 text-gray-900">
                                            Mật khẩu cũ
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="password"
                                                value={oldPass}
                                                onChange={(e) => setOldPass(e.target.value)}
                                                required
                                                className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-[1.4rem]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[1.4rem] font-medium leading-6 text-gray-900">
                                            Mật khẩu mới
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="password"
                                                value={newPass}
                                                onChange={(e) => setNewPass(e.target.value)}
                                                required
                                                className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-[1.4rem]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[1.4rem] font-medium leading-6 text-gray-900">
                                            Xác nhận mật khẩu
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="password"
                                                value={confirmPass}
                                                onChange={(e) => setConfirmPass(e.target.value)}
                                                required
                                                className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-[1.4rem]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleChangePassword}
                                            className="flex w-full justify-center rounded-md bg-[var(--primary-color)] px-5 py-3 text-[1.4rem] font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
