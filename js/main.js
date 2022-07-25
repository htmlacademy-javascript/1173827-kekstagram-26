import { getIdFullscreenPhoto,getFilteredPosts } from './rendering-posts.js';
import {renderFullscreen} from './rendering-full-screen.js';
import './creating-new-post.js';
import {getData} from './api.js';
getData((postsData) => {
  getFilteredPosts(postsData);
  getIdFullscreenPhoto((postId) => {
    const selectedPost = postsData.find((item) => item.id === +postId);
    renderFullscreen(selectedPost);
  });
});

