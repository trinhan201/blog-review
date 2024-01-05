import setSlug from '@/utils/slugify';
import Link from 'next/link';

const Card6 = (props) => {
    return (
        <Link
            href={`/${setSlug(props.category)}/${setSlug(props.title)}?requestId=${props.id}`}
            className="group flex items-center gap-5 cursor-pointer"
        >
            {props.thumbnailImg && (
                <img
                    src={props.thumbnailImg}
                    alt={props.title}
                    className="w-[100px] h-[100px] md:w-[70px] md:h-[70px] lg:w-[100px] lg:h-[100px] object-cover rounded-full"
                />
            )}
            <div className="flex-1">
                <object>
                    <Link
                        prefetch
                        href={`/${setSlug(props.category)}`}
                        className={
                            props.hoverColor === 'primary'
                                ? 'uppercase text-[1.1rem] hover:text-[var(--primary-color)]'
                                : 'uppercase text-[1.1rem] hover:text-[var(--fifth-color)]'
                        }
                    >
                        {props.category}
                    </Link>
                </object>
                <h3
                    className={
                        props.hoverColor === 'primary'
                            ? 'w-full text-[1.4rem] md:text-[1.1rem] lg:text-[1.3rem] leading-tight font-semibold custom-truncate line-clamp3 group-hover:text-[var(--primary-color)] transition-all'
                            : 'w-full text-[1.4rem] md:text-[1.1rem] lg:text-[1.3rem] leading-tight font-semibold custom-truncate line-clamp3 group-hover:text-[var(--fifth-color)] transition-all'
                    }
                >
                    {props.title}
                </h3>
            </div>
        </Link>
    );
};

export default Card6;
