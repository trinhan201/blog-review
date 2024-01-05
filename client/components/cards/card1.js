import setSlug from '@/utils/slugify';
import Link from 'next/link';

const Card1 = (props) => {
    return (
        <Link
            prefetch
            href={`/${setSlug(props.category)}/${setSlug(props.title)}?requestId=${props.id}`}
            className="flex items-center gap-5"
        >
            <div className="w-[78px] h-[62px]">
                <img src={props.thumbnailImg} alt={props.title} className="w-full h-[62px] object-cover" />
            </div>
            <div className="flex-1">
                <h3 className="w-full md:w-[160px] text-white md:text-black text-[1.3rem] font-semibold custom-truncate hover:text-[var(--primary-color)] cursor-pointer">
                    {props.title}
                </h3>
                <div className="text-[1.15rem] text-[#888888]">
                    <span>{props.createdAt}</span>
                </div>
            </div>
        </Link>
    );
};

export default Card1;
