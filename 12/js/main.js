//import {createDescriptionsPublications,PUBLICATIONS_AMOUNTS} from './generate-post.js';
import {renderPosts,getIdFullscreenPhoto} from './rendering-posts.js';
import {renderFullscreen} from './rendering-full-screen.js';
import {setUserFormSubmit,closePostEditingForm} from './creating-new-post.js';
import {getData} from './api.js';
import { showAlert } from './util.js';
const POSTS_AMOUNT = 25;
getData((arrayPosts) => {
  renderPosts(arrayPosts.slice(0,POSTS_AMOUNT));
  getIdFullscreenPhoto((postId) => {
    const selectedPost = arrayPosts.find((item) => item.id === +postId);
    renderFullscreen(selectedPost);
  });
},
() => showAlert('Не удалось получить данные'));
setUserFormSubmit(closePostEditingForm);
