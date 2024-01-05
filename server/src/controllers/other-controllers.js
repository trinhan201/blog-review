import sendMail from '../utils/email.js';
import Other from '../models/Other.js';

export const getAllOthersController = async (req, res) => {
    try {
        const result = await Other.findOne({});
        const video = result.video;
        const contacts = result.contacts;
        const socialLinks = result.socialLinks;
        const advertisements = result.advertisements;

        res.status(200).json({ code: 200, message: 'Successfully', video, contacts, socialLinks, advertisements });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const sendEmailController = async (req, res) => {
    try {
        const { subject, html } = req.body;

        sendMail(subject, html);

        res.status(200).json({ code: 200, message: 'Successfully' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};
