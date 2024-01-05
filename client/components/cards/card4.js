import setSlug from '@/utils/slugify';
import Link from 'next/link';

const Card4 = (props) => {
    return (
        <Link
            prefetch
            href={`/${setSlug(props.category)}/${setSlug(props.title)}?requestId=${props.id}`}
            className="group flex flex-col md:flex-row items-center gap-5 cursor-pointer"
        >
            <div className="w-full h-[191px] md:w-[145px] md:h-[101px] lg:w-[209px] lg:h-[146px]">
                <img src={props.thumbnailImg} alt={props.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <h3 className="w-full text-[1.7rem] md:text-[1.6rem] lg:text-[1.7rem] font-semibold custom-truncate group-hover:text-[var(--forth-color)] transition-all cursor-pointer">
                    {props.title}
                </h3>
                <div className="flex items-center text-[1.25rem] md:text-[1.15rem] my-4">
                    <object>
                        <Link
                            prefetch
                            href={setSlug(props.category)}
                            className="uppercase hover:text-[var(--forth-color)]"
                        >
                            {props.category}
                        </Link>
                    </object>
                    <div className="flex items-center gap-2">
                        <object>
                            <Link
                                prefetch
                                href={`/tac-gia/${props.idName}`}
                                className="ml-5 hover:text-[var(--forth-color)] cursor-pointer"
                            >
                                {props.author}
                            </Link>
                        </object>
                        <span>-</span>
                        <span className="text-[#888888]">{props.createdAt}</span>
                    </div>
                </div>
                <div className="md:hidden lg:block w-full">
                    <p className="w-full text-[1.3rem] text-[#888888] custom-truncate line-clamp3">{props.content}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card4;
