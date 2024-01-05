'use client';

import { FaFacebookF, FaThreads, FaXTwitter } from 'react-icons/fa6';
import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);

const Footer = () => {
    const { data: otherData } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/other/get-all-others`, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    return (
        <div className="flex flex-col w-full h-[453px]">
            <div className="flex flex-col justify-center items-center w-full h-[416px] px-[48px] py-[60px] bg-[url('../public/assets/images/footer.png')] bg-cover bg-center bg-no-repeat">
                <div className="mb-[40px] cursor-pointer">
                    <img src="/assets/images/logo_footer.png" alt="logo" className="w-[272px] h-[90px]" />
                </div>
                <p className="block text-white text-[1.3rem] md:text-[1.1rem] lg:text-[1.3rem] text-center md:w-[82%] xl:w-[72%]">
                    Thichvietblog.com không hẳn là một blog chia sẻ kiến thức về lĩnh vực gì cả, nó tập hợp những chủ đề
                    chúng mình thích, có tí hiểu biết và muốn truyền đạt lại một cách rộng rãi. Cảm ơn các bạn đã dành
                    thời gian để đọc những bài viết của chúng tớ.
                </p>
                <div className="flex items-center justify-center gap-2 text-white text-[1.3rem] md:text-[1.1rem] lg:text-[1.3rem] md:w-[82%] xl:w-[72%]">
                    <span>Nhà tài trợ:</span>
                    <a
                        href="https://phiuphim.online/"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="flex items-center gap-2"
                    >
                        <img src="/assets/images/phiuphim.png" alt="sponsor logo" className="w-[20px] h-[20px]" />
                        <span>PhiuPhim</span>
                    </a>
                </div>
                <p className="text-[1.3rem] text-white my-[20px]">
                    Liên hệ:{' '}
                    <a href={`mailto:${otherData?.contacts?.gmail}`} className="text-[var(--primary-color)]">
                        {otherData?.contacts?.gmail}
                    </a>
                </p>
                <ul className="flex items-center gap-5 text-white">
                    <li>
                        <a
                            href={otherData?.socialLinks?.facebook}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="flex bg-white/5 w-[40px] h-[40px]"
                        >
                            <FaFacebookF className="m-auto" />
                        </a>
                    </li>
                    <li>
                        <a
                            href={otherData?.socialLinks?.threads}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="flex bg-white/5 w-[40px] h-[40px]"
                        >
                            <FaThreads className="m-auto" />
                        </a>
                    </li>
                    <li>
                        <a
                            href={otherData?.socialLinks?.x}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="flex bg-white/5 w-[40px] h-[40px]"
                        >
                            <FaXTwitter className="m-auto" />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-1 bg-[#11171c]">
                <p className="text-[1.3rem] text-white m-auto">Copyright © 2023 - Thichvietblog.com</p>
            </div>
        </div>
    );
};

export default Footer;
