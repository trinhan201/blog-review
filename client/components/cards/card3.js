import setSlug from '@/utils/slugify';
import Link from 'next/link';

const Card3 = (props) => {
    return (
        <Link
            prefetch
            href={`/${setSlug(props.category)}/${setSlug(props.title)}?requestId=${props.id}`}
            style={{
                backgroundImage: `url("${props.thumbnailImg}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
            className="block w-full h-[350px] md:h-[190px] lg:h-[240px] xl:h-[270px] cursor-pointer"
        >
            <div
                className={
                    props.hoverColor === 'primary'
                        ? 'flex items-end w-full h-full bg-gradient-to-b from-black/5 to-black/60 drop-shadow-lg hover:bg-[#00a392]/20 ease-in duration-[0.5s]'
                        : 'flex items-end w-full h-full bg-gradient-to-b from-black/5 to-black/60 drop-shadow-lg hover:bg-[#d44cef]/20 ease-in duration-[0.5s]'
                }
            >
                <div className="text-white text-center px-[10px] py-[15px]">
                    <span className="block uppercase text-[1.2rem] md:text-[1.1rem] font-semibold mb-3.5 cursor-pointer">
                        {props.category}
                    </span>
                    <h3 className="text-[1.6rem] md:text-[1.1rem] lg:text-[1.4rem] font-semibold clear-left leading-tight cursor-pointer">
                        {props.title}
                    </h3>
                </div>
            </div>
        </Link>
    );
};

export default Card3;
