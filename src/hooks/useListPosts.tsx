import { useState } from 'react';
import { usePosts } from '../context/Posts';

export function useListPosts() {
  const { posts, listPosts } = usePosts();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [errorPosts, setErrorPosts] = useState<string | null>(null);

  async function handleListPosts() {
    setLoadingPosts(true);
    setErrorPosts(null);
    try {
      await listPosts();
    } catch (err) {
      setErrorPosts(`Erro ao listar Posts: ${err}`);
    } finally {
      setLoadingPosts(false);
    }
  }

  return { posts, handleListPosts, loadingPosts, errorPosts };
}

