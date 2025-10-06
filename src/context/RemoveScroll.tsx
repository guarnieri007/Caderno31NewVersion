import { useState, useEffect } from 'react';
import { getRemoveScroll, subscribeToRemoveScroll } from './RemoveScrollSingleton';

export function useRemoveScroll() {
  const [removeScroll, setRemoveScroll] = useState<boolean>(getRemoveScroll());

  useEffect(() => {
    const unsubscribe = subscribeToRemoveScroll(setRemoveScroll);
    return unsubscribe;
  }, []);

  return removeScroll;
}
