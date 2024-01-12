import Post from '../models/Post.js';

// Phía người viết
export const createPostController = async (req, res) => {
    try {
        const newPost = new Post(req.body);

        await newPost.save();
        res.status(200).json({ code: 200, message: 'Bài viết được tạo thành công', data: newPost });
    } catch (error) {
        console.log(error);
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getAllByBloggerController = async (req, res) => {
    try {
        let { page, limit, search, category, isDraft } = req.query;

        let queryFilters = {};

        if (search) {
            queryFilters = { title: { $regex: search, $options: 'i' } };
        }

        if (category) {
            queryFilters.category = category;
        }

        if (isDraft) {
            queryFilters.isDraft = isDraft;
        }

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const posts = await Post.find(queryFilters).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalPosts = await Post.countDocuments(queryFilters);
        const totalPages = Math.ceil(totalPosts / limit);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            posts,
            totalPages,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const editPostController = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ code: 404, message: 'Không tìm thấy bài viết' });

        const editPost = await Post.findByIdAndUpdate(
            postId,
            {
                $set: req.body,
            },
            {
                new: true,
            },
        );
        res.status(200).json({ code: 200, message: 'Bài viết đã được sửa thành công', data: editPost });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

export const getPostByBloggerController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(404).json({ code: 404, message: 'Không tìm thấy bài viết' });
        res.status(200).json({ code: 200, data: post });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

export const deletePostByIdController = async (req, res) => {
    try {
        const postId = req.params.postId;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ code: 404, message: 'Không tìm thấy bài viết' });

        await Post.findByIdAndDelete(postId);
        res.status(200).json({ code: 200, message: 'bài viết đã được xóa thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

export const updateViewController = async (req, res) => {
    try {
        const postId = req.params.postId;
        const views = req.body.views;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ code: 404, message: 'Không tìm thấy bài viết' });

        await Post.findByIdAndUpdate(
            postId,
            {
                $set: { ...req.body, views },
            },
            {
                new: true,
            },
        );
        res.status(200).json({ code: 200, message: 'Cập nhật views thành công' });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

// Phía người xem
// Home page
export const getHome1PostsController = async (req, res) => {
    try {
        const newPosts = await Post.find({ isDraft: false }).sort({ createdAt: -1 }).limit(5);
        const moviePosts = await Post.find({ category: 'Phim ảnh', isDraft: false }).sort({ createdAt: -1 }).limit(5);
        const lifePosts = await Post.find({ category: 'Đời sống', isDraft: false }).sort({ createdAt: -1 }).limit(3);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            newPosts,
            moviePosts,
            lifePosts,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getHome2PostsController = async (req, res) => {
    try {
        const foodPosts = await Post.find({ category: 'Ẩm thực', isDraft: false }).sort({ createdAt: -1 }).limit(3);
        const techPosts = await Post.find({ category: 'Công nghệ', isDraft: false }).sort({ createdAt: -1 }).limit(5);
        const gamePosts = await Post.find({ category: 'Trò chơi', isDraft: false }).sort({ createdAt: -1 }).limit(6);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            foodPosts,
            techPosts,
            gamePosts,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getHome3PostsController = async (req, res) => {
    try {
        const random = Math.floor(Math.random() * 10);

        const popularPosts = await Post.find({ isDraft: false }).sort({ views: -1 }).limit(5);
        const suggestPosts = await Post.find({ isDraft: false }).sort({ createdAt: -1 }).skip(random).limit(5);

        const allMoviePosts = await Post.countDocuments({ category: 'Phim ảnh', isDraft: false });
        const allBeautyPosts = await Post.countDocuments({ category: 'Làm đẹp', isDraft: false });
        const allLifePosts = await Post.countDocuments({ category: 'Đời sống', isDraft: false });
        const allFoodPosts = await Post.countDocuments({ category: 'Ẩm thực', isDraft: false });
        const allTechPosts = await Post.countDocuments({ category: 'Công nghệ', isDraft: false });
        const allGamePosts = await Post.countDocuments({ category: 'Trò chơi', isDraft: false });

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            allMoviePosts,
            allBeautyPosts,
            allLifePosts,
            allFoodPosts,
            allTechPosts,
            allGamePosts,
            popularPosts,
            suggestPosts,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getHomeBeautyPostsController = async (req, res) => {
    try {
        let { page } = req.query;

        if (!page) page = 1;
        const skip = (page - 1) * 3;

        const beautyPosts = await Post.find({ category: 'Làm đẹp', isDraft: false })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(3);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            beautyPosts,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

// All posts page
export const getAllPostsPageController = async (req, res) => {
    try {
        let { page, limit, category } = req.query;

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const posts = await Post.find({ category, isDraft: false }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalPosts = await Post.countDocuments({ category, isDraft: false });
        const totalPages = Math.ceil(totalPosts / limit);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            posts,
            totalPages,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getAllOthersPostsPageController = async (req, res) => {
    try {
        let { category } = req.query;
        const random = Math.floor(Math.random() * 10);

        const popularPosts = await Post.find({ category, isDraft: false }).sort({ views: -1 }).limit(4);
        const suggestPosts = await Post.find({ category, isDraft: false })
            .sort({ createdAt: -1 })
            .skip(random)
            .limit(5);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            popularPosts,
            suggestPosts,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

// Detail page
export const getPostByIdController = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) return res.status(200).json({ code: 404, message: 'Không tìm thấy bài viết' });
        if (post?.isDraft === true) return res.status(404).json({ code: 404, message: 'Không tìm thấy bài viết' });
        res.status(200).json({ code: 200, data: post });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
        console.log(error);
    }
};

export const getDetailPostsController = async (req, res) => {
    try {
        let { category, serieName } = req.query;
        let seriePosts;

        if (serieName) {
            seriePosts = await Post.find({ serieName, isDraft: false }).sort({ createdAt: -1 });
        } else {
            seriePosts = [];
        }
        const popularPosts = await Post.find({ category, isDraft: false }).sort({ views: -1 }).limit(5);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            seriePosts,
            popularPosts,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getDetailRelatedPostsController = async (req, res) => {
    try {
        let { category } = req.query;

        const categoryPosts = await Post.find({ category, isDraft: false }).sort({ createdAt: -1 });

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            categoryPosts,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

// Search page
export const getSearchPostsController = async (req, res) => {
    try {
        let { page, limit, search } = req.query;

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const posts = await Post.find({ title: { $regex: search, $options: 'i' }, isDraft: false })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        const totalPosts = await Post.countDocuments({ title: { $regex: search, $options: 'i' }, isDraft: false });
        const totalPages = Math.ceil(totalPosts / limit);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            posts,
            totalPages,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getSearchPopularPostsController = async (req, res) => {
    try {
        const popularPosts = await Post.find({ isDraft: false }).sort({ views: -1 }).limit(5);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            popularPosts,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

// Author page
export const getAuthorPostsController = async (req, res) => {
    try {
        let { page, limit, author } = req.query;

        if (!page) page = 1;
        if (!limit) limit = 5;
        const skip = (page - 1) * limit;

        const posts = await Post.find({ author, isDraft: false }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        const totalPosts = await Post.countDocuments({ author, isDraft: false });
        const totalPages = Math.ceil(totalPosts / limit);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            posts,
            totalPosts,
            totalPages,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};

export const getAuthorPopularPostsController = async (req, res) => {
    try {
        let { author } = req.query;

        const popularPosts = await Post.find({ author, isDraft: false }).sort({ views: -1 }).limit(5);

        res.status(200).json({
            code: 200,
            message: 'Successfully',
            popularPosts,
        });
    } catch (error) {
        res.status(400).json({ code: 400, message: 'Unexpected error' });
    }
};
