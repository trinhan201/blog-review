import setSlug from '@/utils/slugify';
import Link from 'next/link';

const Card5 = (props) => {
    return (
        <Link
            prefetch
            href={`/${setSlug(props.category)}/${setSlug(props.title)}?requestId=${props.id}`}
            className="block group cursor-pointer"
        >
            <img
                src={props.thumbnailImg}
                alt={props.title}
                className="w-full h-[200px] md:h-[150px] lg:h-[200px] object-cover"
            />
            <div className="mt-3">
                <object>
                    <Link
                        prefetch
                        href={setSlug(props.category)}
                        className={
                            props.hoverColor === 'primary'
                                ? 'uppercase text-[1.2rem] hover:text-[var(--primary-color)] transition-all'
                                : 'uppercase text-[1.2rem] hover:text-[var(--seventh-color)] transition-all'
                        }
                    >
                        {props.category}
                    </Link>
                </object>
                <h3
                    className={
                        props.hoverColor === 'primary'
                            ? 'w-full font-semibold md:text-[1.5rem] lg:text-[1.8rem] group-hover:text-[var(--primary-color)] transition-all custom-truncate line-clamp3 mt-1'
                            : 'w-full font-semibold md:text-[1.5rem] lg:text-[1.8rem] group-hover:text-[var(--seventh-color)] transition-all custom-truncate line-clamp3 mt-1'
                    }
                >
                    {props.title}
                </h3>
                <span className="flex items-center text-[1.25rem] mt-3">
                    <object>
                        <Link
                            prefetch
                            href={`/tac-gia/${props.idName}`}
                            className={
                                props.hoverColor === 'primary'
                                    ? 'hover:text-[var(--primary-color)] transition-all'
                                    : 'hover:text-[var(--seventh-color)] transition-all'
                            }
                        >
                            {props.author}
                        </Link>
                    </object>
                    <div>
                        <span className="mx-2">-</span>
                        <span className="text-[#888888]">{props.createdAt}</span>
                    </div>
                </span>
            </div>
        </Link>
    );
};

export default Card5;
