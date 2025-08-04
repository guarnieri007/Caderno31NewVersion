import { useState } from 'react';
import { usePosts } from '../context/Posts';

export function useDeletePost() {
  const { deletePost } = usePosts();
  const [loadingDeletePost, setLoadingDeletePost] = useState(false);
  const [errorDeletePost, setErrorDeletePost] = useState<string | null>(null);
  const [successDeletePost, setSuccessDeletePost] = useState(false);

  async function handleDeletePost(cd_post: number) {
    setLoadingDeletePost(true);
    setErrorDeletePost(null);
    try {
      await deletePost(cd_post);
      setSuccessDeletePost(true);
    } catch (err) {
      setErrorDeletePost(`Erro ao deletar Post: ${err}`);
      throw err;
    } finally {
      setLoadingDeletePost(false);
    }
  }

  return { handleDeletePost, loadingDeletePost, errorDeletePost, successDeletePost, setSuccessDeletePost };
}

