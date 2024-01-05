import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        thumbnailImg: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },
        isDraft: {
            type: Boolean,
            required: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        isSeries: {
            type: Boolean,
            default: false,
        },
        serieName: {
            type: String,
            trim: true,
        },
        tags: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Post', PostSchema);
