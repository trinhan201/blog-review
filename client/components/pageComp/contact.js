'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Contact = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');

    const { data: otherData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/other/get-all-others`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    const sendMail = async (e) => {
        e.preventDefault();

        if (!fullName || !email || !subject || !content)
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
            subject: subject,
            html: `<p>Họ và tên: ${fullName}</p>
            <p>Email: ${email}</p>
            <p>Nội dung: ${content}</p>`,
        };
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/other/send-email`, data);
        if (res?.data?.code === 200) {
            setFullName('');
            setEmail('');
            setSubject('');
            setContent('');
            toast('Gửi thông tin thành công. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
            });
        }
    };

    return (
        <div className="flex bg-[url('../public/assets/images/bg-contact.jpg')] bg-cover bg-center bg-no-repeat w-full min-h-screen py-20">
            <div className="flex flex-col md:flex-row items-center gap-20 m-auto">
                <div className="flex-1">
                    <div className="flex flex-col items-center gap-4 text-white px-[30px] py-[10px]">
                        <img
                            src={'/assets/images/location-icon.png'}
                            alt="location icon"
                            className="w-[52px] h-[52px]"
                        />
                        <p className="text-[2.2rem] leading-tight mt-5">Địa chỉ</p>
                        <p>Hồ Chí Minh, Việt Nam</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 text-white px-[30px] py-[10px]">
                        <img src={'/assets/images/phone-icon.png'} alt="location icon" className="w-[52px] h-[52px]" />
                        <p className="text-[2.2rem] leading-tight mt-5">Điện thoại</p>
                        <p>{otherData?.contacts?.phone}</p>
                    </div>
                    <div className="flex flex-col items-center gap-4 text-white px-[30px] py-[10px]">
                        <img src={'/assets/images/email-icon.png'} alt="location icon" className="w-[52px] h-[52px]" />
                        <p className="text-[2.2rem] leading-tight mt-5">Email</p>
                        <p>{otherData?.contacts?.gmail}</p>
                    </div>
                </div>
                <div className="flex-1 bg-white mx-5 p-[30px] md:w-[330px] lg:w-[394px]">
                    <h1 className="text-center text-[2.6rem]">LIÊN HỆ</h1>
                    <form className="mt-[20px] p-[10px]">
                        <input
                            className="block w-full outline-none border border-[#cccccc] mt-3 p-3"
                            type="text"
                            placeholder="Họ và tên"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <input
                            className="block w-full outline-none border border-[#cccccc] mt-3 p-3"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="block w-full outline-none border border-[#cccccc] mt-3 p-3"
                            type="text"
                            placeholder="Tiêu đề"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                        <textarea
                            className="block w-full outline-none border border-[#cccccc] mt-3 p-3"
                            rows="4"
                            cols="35"
                            placeholder="Nội dung"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="w-full flex mt-3">
                            <button onClick={sendMail} className="border-2 border-black p-5 m-auto">
                                Gửi thông tin
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
