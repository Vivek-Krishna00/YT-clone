import { useEffect, useCallback } from 'react';

export const useInfiniteScroll = (callback, loading) => {
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight || loading) {
      return;
    }
    callback();
  }, [callback, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);
};