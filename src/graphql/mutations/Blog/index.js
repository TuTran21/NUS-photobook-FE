/**
 * Create Blog Mutation
 */

import gql from 'graphql-tag';

const CREATE_BLOG = gql`
	mutation createPost($post: CreatePostInput) {
		createPost(post: $post) {
			status
			message
		}
	}
`;

const DELETE_ONE = gql`
	mutation deletePost($id: String) {
		deletePost(id: $id) {
			status
			message
		}
	}
`;

const DELETE_MANY = gql`
	mutation deleteManyPosts($posts: [String]) {
		deleteManyPosts(posts: $posts) {
			status
			message
		}
	}
`;

const UPDATE_BLOG = gql`
	mutation updatePost($post: UpdatePostInput) {
		updatePost(post: $post) {
			status
			message
		}
	}
`;

export default { CREATE_BLOG, DELETE_ONE, DELETE_MANY, UPDATE_BLOG };
