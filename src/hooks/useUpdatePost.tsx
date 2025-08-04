import { useState } from 'react';
import { usePosts } from '../context/Posts';
import { CreatePostProps } from '../interfaces';

export function useUpdatePost() {
  const { updatePost } = usePosts();
  const [loadingUpdatePost, setLoadingUpdatePost] = useState(false);
  const [errorUpdatePost, setErrorUpdatePost] = useState<string | null>(null);
  const [successUpdatePost, setSuccessUpdatePost] = useState(false);

  async function handleUpdatePost(cd_post: number, data: CreatePostProps) {
    setLoadingUpdatePost(true);
    setErrorUpdatePost(null);
    try {
      await updatePost(cd_post, data);
      setSuccessUpdatePost(true);
    } catch (err) {
      setErrorUpdatePost(`Erro ao atualizar Post: ${err}`);
      throw err;
    } finally {
      setLoadingUpdatePost(false);
    }
  }

  return { handleUpdatePost, loadingUpdatePost, errorUpdatePost, successUpdatePost, setSuccessUpdatePost };
}

