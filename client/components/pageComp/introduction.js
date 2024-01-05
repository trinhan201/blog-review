import { FaAngleRight, FaCircleCheck } from 'react-icons/fa6';
import Link from 'next/link';

const Introduction = () => {
    return (
        <div className="flex flex-col items-center w-full md:w-[720px] lg:w-[980px] xl:w-[1084px] py-[36px]">
            <div className="w-[90%] md:w-full">
                <div className="flex items-center gap-2 text-[1.2rem] text-[#888888] mb-6">
                    <Link prefetch href="/" className="hover:text-black">
                        Trang chủ
                    </Link>
                    <span className="text-[0.8rem] leading-none">
                        <FaAngleRight />
                    </span>
                    <span>Giới thiệu</span>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-10 border p-[30px] lg:p-[60px] mt-12 bg-[#cccccc]/20">
                    <div className="flex-1 text-[1.4rem]">
                        <h1 className="uppercase font-semibold text-[3rem]">Giới thiệu</h1>
                        <br />
                        <p>
                            Chào các bạn! <b>Thichvietblog.com</b> rất vui khi các bạn đọc những bài viết của chúng
                            mình. Đúng như cái tên, đây không hẳn là một blog chia sẻ kiến thức về lĩnh vực gì cả, nó
                            tập hợp những chủ đề chúng mình thích, có tí hiểu biết và muốn truyền đạt lại một cách rộng
                            rãi.
                        </p>
                        <br />
                        <h4 className="font-semibold text-[1.8rem] mb-2">Các nội dung chính</h4>
                        <ul>
                            <li>
                                <FaCircleCheck className="inline-block w-[10px] h-[10px] text-[1rem] mr-3 mb-[1px]" />
                                <span>
                                    <b>Phim ảnh:</b> niềm đam mê lớn nhất của chúng mình là phim ảnh nên đây sẽ là chủ
                                    đề chính của chúng mình hiện tại. Chúng mình chỉ chia sẻ những cái nhìn mang tính cá
                                    nhân về những bộ phim hay những tin tức liên quan đến nó.
                                </span>
                            </li>
                            <li>
                                <FaCircleCheck className="inline-block w-[10px] h-[10px] text-[1rem] mr-3 mb-[1px]" />
                                <span>
                                    <b>Sắc đẹp:</b> ngoài ra chúng mình còn muốn chia sẻ những kiến thức về sức khỏe và
                                    sắc đẹp đến các bạn, đương nhiên sẽ có 1 tí quảng cáo bán hàng.
                                </span>
                            </li>
                            <li>
                                <FaCircleCheck className="inline-block w-[10px] h-[10px] text-[1rem] mr-3 mb-[1px]" />
                                <span>
                                    <b>Công nghệ:</b> trong thời đại 4.0 như hiện giờ chúng mình cũng muốn mang những
                                    thông tin về công nghệ mới nhất đến với mọi người.
                                </span>
                            </li>
                            <li>
                                <FaCircleCheck className="inline-block w-[10px] h-[10px] text-[1rem] mr-3 mb-[1px]" />
                                <span>
                                    <b>Game:</b> chúng mình cũng thích chơi game nữa, nên chúng mình sẽ viết một chút về
                                    game nữa.
                                </span>
                            </li>
                        </ul>
                        <br />
                        <h4 className="font-semibold text-[1.8rem] mb-2">Lời kết</h4>
                        <p>
                            Chúng mình chỉ là những bạn trẻ thích viết này nọ chia sẻ đến mọi người. Nên những bài viết
                            chỉ mang tính chất tham khảo và theo nhận định cá nhân của tụi mình. Nếu có sai sót mọi
                            người hãy góp ý tụi mình sẽ lắng nghe.
                        </p>
                        <br />
                        <p className="text-[1.8rem]">Cảm ơn mọi người !!</p>
                    </div>
                    <div className="flex-1">
                        <img
                            src={'/assets/images/logo_header.png'}
                            alt="logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
