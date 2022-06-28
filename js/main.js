import {createDescriptionsPublications,PUBLICATIONS_AMOUNTS} from './generate-post.js';
import {renderingPosts} from './rendering-posts.js';
renderingPosts(createDescriptionsPublications(PUBLICATIONS_AMOUNTS));
