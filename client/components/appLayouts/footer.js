import { faFacebookF, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className="flex flex-col w-full h-[453px]">
            <div className="flex flex-col justify-center items-center w-full h-[416px] px-[48px] py-[60px] bg-[url('../public/assets/images/footer.png')] bg-cover bg-center bg-no-repeat">
                <div className="mb-[40px] cursor-pointer">
                    <Image src="/assets/images/logo-footer.png" alt="logo" width={272} height={90} />
                </div>
                <p className="block text-white text-[1.3rem] md:text-[1.1rem] lg:text-[1.3rem] text-center md:w-[82%] xl:w-[72%]">
                    Newspaper is your news, entertainment, music fashion website. We provide you with the latest
                    breaking news and videos straight from the entertainment industry. Fashion fades, only style remains
                    the same. Fashion never stops. There are always projects, opportunities. Clothes mean nothing until
                    someone lives in them.
                </p>
                <p className="text-[1.3rem] text-white my-[20px]">
                    Liên hệ quảng cáo:{' '}
                    <a href="mailto:admin@gmail.com" className="text-[#00a392]">
                        admin@gmail.com
                    </a>
                </p>
                <ul className="flex items-center gap-5 text-white">
                    <li>
                        <a href="#" className="flex bg-white/5 w-[40px] h-[40px]">
                            <FontAwesomeIcon className="m-auto" icon={faFacebookF} />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex bg-white/5 w-[40px] h-[40px]">
                            <FontAwesomeIcon className="m-auto" icon={faInstagram} />
                        </a>
                    </li>
                    <li>
                        <a href="#" className="flex bg-white/5 w-[40px] h-[40px]">
                            <FontAwesomeIcon className="m-auto" icon={faLinkedinIn} />
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex flex-1 bg-[#11171c] px-[48px]">
                <p className="text-[1.3rem] text-white m-auto">Copyright © 2023 - Thiết kế bởi An Trinh</p>
            </div>
        </div>
    );
};

export default Footer;
