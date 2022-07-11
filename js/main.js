import {createDescriptionsPublications,PUBLICATIONS_AMOUNTS} from './generate-post.js';
import {renderPosts,getIdFullscreenPhoto} from './rendering-posts.js';
import {renderFullscreen} from './rendering-full-screen.js';
import './validation-form.js';
const arrayPosts = createDescriptionsPublications(PUBLICATIONS_AMOUNTS);
renderPosts(arrayPosts);
getIdFullscreenPhoto((postId) => {
  const selectedPost = arrayPosts.find((item) => item.id === +postId);
  renderFullscreen(selectedPost);
});
