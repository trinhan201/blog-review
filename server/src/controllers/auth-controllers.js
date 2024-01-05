import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Generate access token
const generateAccessToken = (user) => {
    return jwt.sign({ _id: user._id, role: user.role }, process.env.ACCESS_SECRET, {
        expiresIn: '1d',
    });
};

// Sign in controller
export const signInController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user || user.isActived === false)
            return res.status(200).json({ code: 404, message: 'Tài khoản không tồn tại hoặc đã bị xóa' });

        const isCorrect = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrect) return res.status(200).json({ code: 400, message: 'Email hoặc mật khẩu không chính xác' });

        const accessToken = generateAccessToken(user);

        res.status(200).json({
            code: 200,
            message: 'Đăng nhập thành công',
            accessToken: accessToken,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Get current user controller
export const getCurrentUserController = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id);
        res.status(200).json({ code: 200, message: 'Success', data: currentUser });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
