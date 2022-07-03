import {createDescriptionsPublications,PUBLICATIONS_AMOUNTS} from './generate-post.js';
import {renderPosts} from './rendering-posts.js';
import {getInfoPosts,getTargetPost} from './rendering-full-screen.js';
const arrayPosts = createDescriptionsPublications(PUBLICATIONS_AMOUNTS);
renderPosts(arrayPosts);
getTargetPost((postId) => {
  const selectedPost = arrayPosts.find((item) => item.id === +postId);
  getInfoPosts(selectedPost);
});
