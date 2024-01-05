import { formatVNDateTime } from '@/utils/formatDateTime';
import Link from 'next/link';

const PostCard = (props) => {
    return (
        <>
            <div className="max-w-full bg-white border border-gray-200 rounded-lg shadow">
                <div>
                    <img
                        className="rounded-t-lg w-full h-[160px] object-cover"
                        src={props.thumbnailImg}
                        alt="post image"
                        width={500}
                        height={500}
                    />
                </div>
                <div className="p-5">
                    <a href="#">
                        <h5 className="w-full custom-truncate mb-2 text-[1.8rem] font-bold tracking-tight text-gray-900">
                            {props.title}
                        </h5>
                    </a>
                    <p className="text-[1.2rem] font-medium text-gray-700">
                        <span className="font-semibold">{props.author}</span>
                        <span className="mx-2">-</span>
                        {props.status === false ? (
                            <span className="text-green-500">Đã đăng</span>
                        ) : (
                            <span className="text-yellow-400">Nháp</span>
                        )}
                    </p>
                    <p className="uppercase font-semibold text-[1.4rem] my-3">{props.category}</p>
                    <p className="text-[1.3rem]">
                        <span className="font-semibold">Ngày tạo:</span>{' '}
                        <span>{formatVNDateTime(props.createdAt)}</span>
                    </p>
                    <p className="text-[1.3rem]">
                        <span className="font-semibold">Ngày cập nhật:</span>{' '}
                        <span>{formatVNDateTime(props.upadatedAt)}</span>
                    </p>
                    <div className="flex items-center gap-3">
                        <Link
                            prefetch
                            href={`/sua-bai-viet/${props.id}`}
                            className="inline-flex items-center px-3 py-2 mt-3 text-[1.3rem] font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                        >
                            Chỉnh sửa
                        </Link>
                        <div
                            onClick={props.handleDelete}
                            className="inline-flex items-center px-3 py-2 mt-3 text-[1.3rem] font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer"
                        >
                            Xóa
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostCard;
