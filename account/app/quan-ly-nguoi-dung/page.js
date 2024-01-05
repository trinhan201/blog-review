'use client';

import { useLayoutEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '@/utils/auth';

const page = () => {
    const router = useRouter();
    const isAuth = Auth(typeof window !== 'undefined' && localStorage.getItem('accessToken'));

    useLayoutEffect(() => {
        if (!isAuth) {
            toast('Đã hết phiên đăng nhập', {
                hideProgressBar: true,
                autoClose: 2000,
                type: 'warning',
            });
            return router.push('/');
        } else {
            return;
        }
    }, [isAuth]);

    return <>{isAuth ? <div>Quan ly nguoi dung</div> : <></>}</>;
};

export default page;
