import { useState } from 'react';
import { usePosts } from '../context/Posts';
import { CreatePostProps } from '../interfaces/interfaces';

export function useCreatePost() {
  const { createPost } = usePosts();
  const [loadingCreatePost, setLoadingCreatePost] = useState(false);
  const [errorCreatePost, setErrorCreatePost] = useState<string | null>(null);
  const [successCreatePost, setSuccessCreatePost] = useState(false);

  async function handleCreatePost(data: CreatePostProps) {
    setLoadingCreatePost(true);
    setErrorCreatePost(null);
    try {
      await createPost(data);
      setSuccessCreatePost(true);
    } catch (err) {
      setErrorCreatePost(`Erro ao criar Post: ${err}`);
      throw err;
    } finally {
      setLoadingCreatePost(false);
    }
  }

  return { handleCreatePost, loadingCreatePost, errorCreatePost, successCreatePost, setSuccessCreatePost };
}

