import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SerieSchema = new Schema(
    {
        serieName: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Serie', SerieSchema);
