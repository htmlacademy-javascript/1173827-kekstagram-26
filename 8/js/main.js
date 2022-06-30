import {createDescriptionsPublications,PUBLICATIONS_AMOUNTS} from './generate-post.js';
import {renderingPosts} from './rendering-posts.js';
import {getFullScreen} from './rendering-full-screen.js';
const arrayPosts = createDescriptionsPublications(PUBLICATIONS_AMOUNTS);
renderingPosts(arrayPosts);
getFullScreen(arrayPosts);
