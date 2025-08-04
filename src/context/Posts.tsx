import { createContext, ReactNode, useContext, useState } from 'react';
import { CreatePostProps, Post, PostContextType } from '../interfaces';
import { PostAPI } from '../api/posts';

const PostContext = createContext<PostContextType>({} as PostContextType);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { listPosts: apiListPosts, getPost: apiGetPost, createPost: apiCreatePost, updatePost: apiUpdatePost, deletePost: apiDeletePost } = PostAPI();

  const listPosts = async () => {
    const res = await apiListPosts();
    if (res) setPosts(res);
  };

  const getPost = async (cd_post: number) => {
    return apiGetPost(cd_post);
  };

  const createPost = async (data: CreatePostProps) => {
    const newPost = await apiCreatePost(data);
    if (newPost) setPosts(prev => [...prev, newPost]);
    return newPost;
  };

  const updatePost = async (cd_post: number, data: CreatePostProps) => {
    const updated = await apiUpdatePost(cd_post, data);
    if (updated) setPosts(prev => prev.map(p => (p.cd_post === cd_post ? updated : p)));
    return updated;
  };

  const deletePost = async (cd_post: number) => {
    await apiDeletePost(cd_post);
    setPosts(prev => prev.filter(p => p.cd_post !== cd_post));
  };

  return (
    <PostContext.Provider value={{ posts, listPosts, getPost, createPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);

