import setSlug from '@/utils/slugify';
import Link from 'next/link';

const Card2 = (props) => {
    return (
        <Link
            prefetch
            href={`/${setSlug(props.category)}/${setSlug(props.title)}?requestId=${props.id}`}
            className="group flex items-center gap-5 cursor-pointer"
        >
            <div className="w-[93px] h-[67px] md:w-[80px] md:h-[60px] lg:w-[100px] lg:h-[78px]">
                <img src={props.thumbnailImg} alt={props.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <h3 className="w-full text-[1.3rem] md:text-[1.1rem] lg:text-[1.3rem] leading-tight font-semibold custom-truncate group-hover:text-[var(--secondary-color)] transition-all cursor-pointer">
                    {props.title}
                </h3>
                <div className="text-[1.15rem] text-[#888888] mt-2">
                    <span>{props.createdAt}</span>
                </div>
            </div>
        </Link>
    );
};

export default Card2;
