import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OtherSchema = new Schema(
    {
        video: {
            type: String,
            default: '',
        },
        contacts: {
            type: Object,
            default: {
                gmail: '',
                phone: '',
            },
        },
        socialLinks: {
            type: Object,
            default: {
                facebook: '',
                threads: '',
                x: '',
            },
        },
        advertisements: {
            type: Array,
            default: [
                {
                    bannerTop: '',
                    link: '',
                },
                {
                    bannerMid: '',
                    link: '',
                },
                {
                    bannerBottom: '',
                    link: '',
                },
            ],
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Other', OtherSchema);
