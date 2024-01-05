import Serie from '../models/Serie.js';

export const createSerieController = async (req, res) => {
    try {
        const newSerie = new Serie(req.body);

        await newSerie.save();
        res.status(200).json({ code: 200, message: 'Chuỗi bài viết được tạo thành công', data: newSerie });
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getAllSeriesController = async (req, res) => {
    try {
        const series = await Serie.find().sort({ createdAt: -1 });

        res.status(200).json({ code: 200, message: 'Successfully', data: series });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const deleteSerieByIdController = async (req, res) => {
    try {
        const serieId = req.params.serieId;
        const serie = await Serie.findById(serieId);
        if (!serie) return res.status(404).json({ code: 404, message: 'Không tìm thấy chuỗi bài viết' });

        await Serie.findByIdAndDelete(serieId);
        res.status(200).json({ code: 200, message: 'Chuỗi bài viết đã được xóa thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

export const editSerieController = async (req, res) => {
    try {
        const serieId = req.params.serieId;
        const serie = await Serie.findById(serieId);
        if (!serie) return res.status(404).json({ code: 404, message: 'Không tìm thấy chuỗi bài viết' });

        const editSerie = await Serie.findByIdAndUpdate(
            serieId,
            {
                $set: req.body,
            },
            {
                new: true,
            },
        );
        res.status(200).json({ code: 200, message: 'Chuỗi bài viết đã được sửa thành công', data: editSerie });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

export const getSerieByIdController = async (req, res) => {
    try {
        const serie = await Serie.findById(req.params.serieId);
        if (!serie) return res.status(404).json({ code: 404, message: 'Không tìm thấy chuỗi bài viết' });
        res.status(200).json({ code: 200, data: serie });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};
