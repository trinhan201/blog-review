import { Router } from 'express';
import {
    createPostController,
    getAllByBloggerController,
    editPostController,
    getPostByBloggerController,
    updateViewController,
    deletePostByIdController,
    getPostByIdController,
    getAllPostsPageController,
    getAllOthersPostsPageController,
    getHome1PostsController,
    getHome2PostsController,
    getHome3PostsController,
    getHomeBeautyPostsController,
    getDetailPostsController,
    getDetailRelatedPostsController,
    getSearchPostsController,
    getSearchPopularPostsController,
    getAuthorPostsController,
    getAuthorPopularPostsController,
} from '../controllers/post-controllers.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();

router.post('/create', verifyToken, createPostController);
router.get('/get-all-by-blogger', verifyToken, getAllByBloggerController);
router.put('/edit/:postId', verifyToken, editPostController);
router.get('/get-by-blogger/:postId', getPostByBloggerController);
router.patch('/update-view/:postId', updateViewController);
router.delete('/delete/:postId', verifyToken, deletePostByIdController);

// All posts page
router.get('/get-all-posts-page', getAllPostsPageController);
router.get('/get-all-others-posts-page', getAllOthersPostsPageController);
// Home page
router.get('/get-home1-posts', getHome1PostsController);
router.get('/get-home2-posts', getHome2PostsController);
router.get('/get-home3-posts', getHome3PostsController);
router.get('/get-home-beauty-posts', getHomeBeautyPostsController);

// Detail page
router.get('/get/:postId', getPostByIdController);
router.get('/get-detail-posts', getDetailPostsController);
router.get('/get-detail-related-posts', getDetailRelatedPostsController);

// Search page
router.get('/get-search-posts', getSearchPostsController);
router.get('/get-search-popular-posts', getSearchPopularPostsController);

// Author page
router.get('/get-author-posts', getAuthorPostsController);
router.get('/get-author-popular-posts', getAuthorPopularPostsController);

export default router;
