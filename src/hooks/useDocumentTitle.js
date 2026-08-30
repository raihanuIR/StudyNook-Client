import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title || 'StudyNook';
  }, [title]);
};

export default useDocumentTitle;
