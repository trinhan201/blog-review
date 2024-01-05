'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false,
});
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoCreateOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { formatVNDateTime } from '@/utils/formatDateTime';

const CreateForm = (props) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [thumbnailImg, setThumbnailImg] = useState('');
    const [isSeries, setIsSeries] = useState(false);
    const [serie, setSerie] = useState('');
    const [allSeries, setAllSeries] = useState([]);
    const [newSerie, setNewSerie] = useState('');
    const [url, setUrl] = useState('');
    const [rerender, setRerender] = useState(false);
    const [tab, setTab] = useState(false);
    const [isEditSerie, setIsEditSerie] = useState(false);
    const [serieId, setSerieId] = useState('');

    const { id } = useParams();
    const router = useRouter();

    const convertUrl = (url) => {
        const id = url.match(/[-\w]{25,}/)[0];
        setUrl(`https://drive.google.com/uc?export=view&id=${id}`);
    };

    const handleSubmit = async (isDraft) => {
        if (!isSeries) {
            if (!title || !category || !thumbnailImg || !content || !tags)
                return toast('Hãy điền đầy đủ thông tin', {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                });
        } else {
            if (!title || !category || !thumbnailImg || !content || !tags || !serie)
                return toast('Hãy điền đầy đủ thông tin', {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: 'warning',
                });
        }

        let res;
        const data = {
            title,
            category,
            thumbnailImg,
            content,
            isDraft,
            author: localStorage?.getItem('userId'),
            isSeries: isSeries ? true : false,
            serieName: isSeries ? serie : '',
            tags: tags?.trim(),
        };
        if (id) {
            res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/post/edit/${id}`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
        } else {
            res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/post/create`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
        }
        if (res.data.code === 200) {
            isDraft
                ? toast('Đã lưu nháp', {
                      hideProgressBar: true,
                      autoClose: 2000,
                      type: 'warning',
                  })
                : toast('Đăng bài thành công', {
                      hideProgressBar: true,
                      autoClose: 2000,
                      type: 'success',
                  });
            router.push('/quan-ly-bai-viet');
        } else {
            toast('Đã xảy ra lỗi', { hideProgressBar: true, autoClose: 2000, type: 'error' });
        }
    };

    const handleCreateSerie = async () => {
        if (!serie)
            return toast('Hãy điền đầy đủ thông tin', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
            });

        let res;
        const data = {
            serieName: newSerie,
        };
        if (isEditSerie) {
            res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/serie/edit/${serieId}`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
        } else {
            res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/serie/create`, data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
            });
        }
        if (res?.data?.code === 200) {
            toast('Tạo chuỗi bài viết thành công', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
            });
            setNewSerie('');
            setSerieId('');
            setIsEditSerie(false);
            setRerender(!rerender);
        } else {
            toast('Đã xảy ra lỗi', { hideProgressBar: true, autoClose: 2000, type: 'error' });
        }
    };

    const handleDeleteSerie = async (serieId) => {
        const confirmMsg = `Bạn có chắc muốn xóa vĩnh viễn chuỗi bài viết không?`;
        if (!window.confirm(confirmMsg)) return;
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/serie/delete/${serieId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        });
        if (res?.data?.code === 200) {
            toast('Đã xóa chuỗi bài viết thành công', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'success',
            });
            setRerender(!rerender);
        } else {
            toast('Đã xảy ra lỗi', { hideProgressBar: true, autoClose: 2000, type: 'error' });
        }
    };

    const handleEditSerie = async (serieId) => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/serie/get/${serieId}`);
        if (res?.data?.code === 200) {
            setIsEditSerie(true);
            setNewSerie(res?.data?.data?.serieName);
            setSerieId(serieId);
        } else {
            return setIsEditSerie(false);
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            if (!id) return;
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/get-by-blogger/${id}`);
            if (res?.data?.code === 200) {
                setTitle(res?.data?.data?.title);
                setCategory(res?.data?.data?.category);
                setContent(res?.data?.data?.content);
                setTags(res?.data?.data?.tags);
                setThumbnailImg(res?.data?.data?.thumbnailImg);
                setIsSeries(res?.data?.data?.isSeries);
                setSerie(res?.data?.data?.serieName);
            } else {
                return;
            }
        };
        fetchApi();
    }, [id]);

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/serie/get-all`);
            if (res.data.code === 200) {
                setAllSeries(res.data.data);
            } else {
                return;
            }
        };
        fetchApi();
    }, [rerender]);

    return (
        <>
            <div className="w-full px-[36px] py-[24px]">
                <div className="flex items-center">
                    <div
                        onClick={() => setTab(false)}
                        className={
                            !tab
                                ? 'text-[1.4rem] font-semibold text-white bg-[var(--primary-color)] px-5 py-3 cursor-pointer'
                                : 'text-[1.4rem] font-semibold px-5 py-3 cursor-pointer'
                        }
                    >
                        Tạo bài viết
                    </div>
                    <div
                        onClick={() => setTab(true)}
                        className={
                            tab
                                ? 'text-[1.4rem] font-semibold text-white bg-[var(--primary-color)] px-5 py-3 cursor-pointer'
                                : 'text-[1.4rem] font-semibold px-5 py-3 cursor-pointer'
                        }
                    >
                        Tạo chuỗi bài viết
                    </div>
                </div>
                {tab ? (
                    <div className="w-full border-t-4 pt-5 border-t-[var(--primary-color)]">
                        <h1 className="flex items-center gap-3 text-[2.4rem] font-semibold">
                            <span>
                                <IoCreateOutline />
                            </span>
                            <span>Tạo chuỗi bài viết</span>
                        </h1>
                        <div className="flex flex-row items-stretch gap-2 mt-[36px]">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={newSerie}
                                    onChange={(e) => setNewSerie(e.target.value)}
                                    placeholder="Nhập chuỗi bài viết"
                                    className="w-full text-[1.4rem] px-5 py-2.5 rounded-md outline-none border"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && newSerie) {
                                            handleCreateSerie();
                                        }
                                    }}
                                />
                            </div>
                            <button
                                onClick={handleCreateSerie}
                                className="bg-green-600 text-white text-[1.3rem] font-semibold px-5 rounded-md hover:bg-green-700"
                            >
                                {isEditSerie ? 'Cập nhật chuỗi' : 'Tạo chuỗi'}
                            </button>
                            {isEditSerie && (
                                <button
                                    onClick={() => {
                                        setIsEditSerie(false), setNewSerie(''), setSerieId('');
                                    }}
                                    className="bg-red-600 text-white text-[1.3rem] font-semibold px-5 rounded-md hover:bg-green-700"
                                >
                                    Hủy
                                </button>
                            )}
                        </div>

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[24px]">
                            <table className="w-full text-[1.4rem] text-left rtl:text-right">
                                <thead className="text-[1.4rem] text-white uppercase bg-[var(--primary-color)]">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Tên chuỗi bài viết
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ngày tạo
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="[&>*:nth-child(odd)]:bg-[#eeeeee]">
                                    {allSeries?.map((as, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                    {as?.serieName}
                                                </th>
                                                <td className="px-6 py-4">{formatVNDateTime(as?.createdAt)}</td>
                                                <td className="flex items-center gap-2 px-6 py-4">
                                                    <div
                                                        onClick={() => handleEditSerie(as?._id)}
                                                        className="font-medium hover:underline cursor-pointer"
                                                    >
                                                        Sửa
                                                    </div>
                                                    <div>|</div>
                                                    <div
                                                        onClick={() => handleDeleteSerie(as?._id)}
                                                        className="font-medium hover:underline cursor-pointer"
                                                    >
                                                        Xóa
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="w-full border-t-4 pt-5 border-t-[var(--primary-color)]">
                        <h1 className="flex items-center gap-3 text-[2.4rem] font-semibold">
                            <span>
                                <IoCreateOutline />
                            </span>
                            <span>{props?.title}</span>
                        </h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-4 mt-[36px]">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Tiêu đề"
                                    className="w-full text-[1.4rem] px-5 py-2.5 rounded-md outline-none border"
                                />
                            </div>
                            <div className="flex-1">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-gray-50 outline-none border border-gray-300 text-gray-900 text-[1.4rem] font-semibold rounded-lg block p-2.5"
                                >
                                    <option>--Thể loại--</option>
                                    <option value="Phim ảnh">Phim ảnh</option>
                                    <option value="Làm đẹp">Làm đẹp</option>
                                    <option value="Đời sống">Đời sống</option>
                                    <option value="Ẩm thực">Ẩm thực</option>
                                    <option value="Công nghệ">Công nghệ</option>
                                    <option value="Trò chơi">Trò chơi</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={thumbnailImg}
                                    placeholder="Ảnh minh họa"
                                    className="w-full text-[1.4rem] px-5 py-2.5 rounded-md outline-none border"
                                    onChange={(e) => setThumbnailImg(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="flex items-center gap-5 mb-5">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        value={tags}
                                        placeholder="Ví dụ: tag, tag 1, tag 2"
                                        className="w-full text-[1.4rem] px-5 py-2.5 rounded-md outline-none border"
                                        onChange={(e) => setTags(e.target.value)}
                                    />
                                </div>
                                {isSeries && (
                                    <div className="flex-1">
                                        <select
                                            value={serie}
                                            onChange={(e) => setSerie(e.target.value)}
                                            className="w-full bg-gray-50 outline-none border border-gray-300 text-gray-900 text-[1.4rem] font-semibold rounded-lg block p-2.5"
                                        >
                                            <option>--Tên chuỗi--</option>
                                            {allSeries?.map((item, index) => {
                                                return (
                                                    <option key={index} value={item?.serieName}>
                                                        {item?.serieName}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                )}
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={isSeries}
                                        onChange={() => setIsSeries(!isSeries)}
                                    />
                                    <div className="w-16 h-8 bg-[#cccccc] rounded-full peer peer-focus:ring-4 peer-focus:ring-[#7995e2] peer-checked:after:translate-x-full peer-checked:after:border-[#ffffff] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-[#ffffff] after:border-[#cccccc] after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-[#321fdb]"></div>
                                    <span className="text-[1.3rem] ml-2">Chuỗi bài viết</span>
                                </label>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={url}
                                    placeholder="https://drive.google.com/..."
                                    className="w-full text-[1.4rem] px-5 py-2.5 rounded-md outline-none border"
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                                <div
                                    onClick={() => convertUrl(url)}
                                    className="bg-green-600 px-4 py-2.5 text-[1.3rem] font-semibold whitespace-nowrap text-white border rounded-md cursor-pointer"
                                >
                                    Chuyển đổi
                                </div>
                            </div>
                            <p className="text-[1.2rem] font-semibold text-red-600">
                                Lưu ý: Nếu dùng link của google drive xin hãy vui lòng chuyển đổi tại đây
                            </p>
                        </div>
                        <div className="mt-[24px]">
                            <JoditEditor
                                value={content}
                                tabIndex={1}
                                onChange={(newContent) => setContent(newContent)}
                            />
                        </div>
                        <div className="flex justify-end gap-3 mt-[24px]">
                            <button
                                onClick={() => handleSubmit(false)}
                                className="text-white px-5 py-3 font-medium rounded-lg bg-green-600 hover:bg-green-700"
                            >
                                Đăng bài
                            </button>
                            <button
                                onClick={() => handleSubmit(true)}
                                className="text-white px-5 py-3 font-medium rounded-lg bg-yellow-400 hover:bg-yellow-500"
                            >
                                Lưu nháp
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default CreateForm;
