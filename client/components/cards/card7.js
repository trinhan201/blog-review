import setSlug from '@/utils/slugify';
import Link from 'next/link';

const Card7 = (props) => {
    return (
        <Link
            prefetch
            href={`/${setSlug(props.category)}/${setSlug(props.title)}?requestId=${props.id}`}
            className="block group cursor-pointer"
        >
            <object>
                <Link
                    prefetch
                    href={`/${setSlug(props.category)}`}
                    className="uppercase block text-[1.2rem] md:text-[1.1rem] lg:text-[1.2rem] hover:text-[var(--sixth-color)] mb-3 cursor-pointer"
                >
                    {props.category}
                </Link>
            </object>
            <h3 className="w-full text-[1.4rem] md:text-[1.2rem] lg:text-[1.6rem] leading-tight font-semibold custom-truncate group-hover:text-[var(--sixth-color)] transition-all cursor-pointer">
                {props.title}
            </h3>
            <div className="flex items-center gap-2 text-[1.25rem] md:text-[1.15rem] my-4">
                <object>
                    <Link
                        prefetch
                        href={`/tac-gia/${props.idName}`}
                        className="hover:text-[var(--sixth-color)] cursor-pointer"
                    >
                        {props.author}
                    </Link>
                </object>
                <span>-</span>
                <span className="text-[#888888]">{props.createdAt}</span>
            </div>
        </Link>
    );
};

export default Card7;
