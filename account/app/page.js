'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Auth from '@/utils/auth';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const isAuth = Auth(typeof window !== 'undefined' && localStorage.getItem('accessToken'));

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password)
            return toast('Hãy điền đầy đủ thông tin', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
            });

        if (
            !email?.match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            )
        )
            return toast('Email không hợp lệ', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
            });

        const data = {
            email,
            password,
        };
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, data);
        if (res?.data?.code === 200) {
            localStorage.setItem('accessToken', res?.data?.accessToken);
            router.push('/quan-ly-bai-viet');
            toast('Đăng nhập thành công', {
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

    useEffect(() => {
        if (isAuth) return router.push('/quan-ly-bai-viet');
    }, [isAuth]);

    return (
        <div className="flex w-full h-screen items-center justify-center">
            <div className="min-w-[360px] shadow-lg border rounded-lg">
                <div className="px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-[31rem]">
                        <img className="mx-auto h-24 w-auto" src="/logo_header.png" alt="Your Company" />
                        <h2 className="mt-10 text-center text-[2.4rem] font-bold leading-9 tracking-tight text-gray-900">
                            Đăng nhập
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[31rem]">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-[1.4rem] font-medium leading-6 text-gray-900">Email</label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        autoComplete="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-[1.4rem]"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-[1.4rem] font-medium leading-6 text-gray-900">
                                        Mật khẩu
                                    </label>
                                    <div className="text-[1.3rem]">
                                        <a
                                            href="#"
                                            className="font-semibold text-[var(--primary-color)] hover:underline"
                                        >
                                            Quên mật khẩu?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="block w-full rounded-md border-0 px-4 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-[1.4rem]"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={handleSubmit}
                                    className="flex w-full justify-center rounded-md bg-[var(--primary-color)] px-5 py-3 text-[1.4rem] font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-center text-[1.3rem] text-gray-500">
                            Chưa có tài khoản?
                            <a
                                href="#"
                                className="font-semibold leading-6 text-[var(--primary-color)] ml-2 hover:underline"
                            >
                                Đăng ký ngay
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
