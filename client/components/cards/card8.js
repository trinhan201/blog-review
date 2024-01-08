import setSlug from '@/utils/slugify';
import Link from 'next/link';

const Card8 = (props) => {
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
            className="block w-full h-[430px] md:h-[220px] lg:h-[320px] cursor-pointer"
        >
            <div className="flex items-center w-full h-full bg-black/25 drop-shadow-lg hover:bg-[#00a392]/20 ease-in duration-[0.5s]">
                <div className="w-full text-white text-center px-[10px] py-[15px]">
                    <span className="block uppercase text-[1.4rem] md:text-[1.1rem] lg:text-[1.2rem] font-semibold mb-3.5">
                        {props.category}
                    </span>
                    <h2 className="text-[1.9rem] md:text-[1.3rem] lg:text-[1.6rem] font-semibold clear-left leading-tight">
                        {props.title}
                    </h2>
                    <div className="text-[1.4rem] md:text-[1.25rem] mt-8">
                        <span>{props.author}</span> <span className="mx-2">-</span> <span>{props.createdAt}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card8;
