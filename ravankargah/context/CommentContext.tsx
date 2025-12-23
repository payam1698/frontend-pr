
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  contentId: string; // Course ID or Blog Post ID
  contentType: 'course' | 'blog';
  text: string;
  rating?: number; // 1-5, only for courses
  status: 'pending' | 'approved';
  createdAt: string;
}

interface CommentContextType {
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'status' | 'createdAt'>) => void;
  approveComment: (id: string) => void;
  deleteComment: (id: string) => void;
  getCommentsByContentId: (contentId: string) => Comment[];
  getPendingComments: () => Comment[];
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const storedComments = localStorage.getItem('appComments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    } else {
      // Seed some dummy approved comments
      const initialComments: Comment[] = [
        {
          id: 'cm1', userId: 'u1', userName: 'سارا احمدی', contentId: 'c1', contentType: 'course',
          text: 'این دوره واقعاً عالی بود. استاد شفیعی‌فرد بسیار مسلط هستند.', rating: 5, status: 'approved', createdAt: '1402/11/01'
        },
        {
           id: 'cm2', userId: 'u2', userName: 'علی رضایی', contentId: 'c1', contentType: 'course',
           text: 'محتوای دوره خوب بود ولی کاش ساعات برگزاری متنوع‌تر بود.', rating: 4, status: 'approved', createdAt: '1402/11/05'
        }
      ];
      setComments(initialComments);
      localStorage.setItem('appComments', JSON.stringify(initialComments));
    }
  }, []);

  const saveComments = (newComments: Comment[]) => {
    setComments(newComments);
    localStorage.setItem('appComments', JSON.stringify(newComments));
  };

  const addComment = (data: Omit<Comment, 'id' | 'status' | 'createdAt'>) => {
    const newComment: Comment = {
      ...data,
      id: 'cm-' + Date.now(),
      status: 'pending',
      createdAt: new Date().toLocaleDateString('fa-IR')
    };
    saveComments([...comments, newComment]);
  };

  const approveComment = (id: string) => {
    const newComments = comments.map(c => c.id === id ? { ...c, status: 'approved' as const } : c);
    saveComments(newComments);
  };

  const deleteComment = (id: string) => {
    const newComments = comments.filter(c => c.id !== id);
    saveComments(newComments);
  };

  const getCommentsByContentId = (contentId: string) => {
    return comments.filter(c => c.contentId === contentId && c.status === 'approved');
  };

  const getPendingComments = () => {
    return comments.filter(c => c.status === 'pending');
  };

  return (
    <CommentContext.Provider value={{ comments, addComment, approveComment, deleteComment, getCommentsByContentId, getPendingComments }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useComments = () => {
  const context = useContext(CommentContext);
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentProvider');
  }
  return context;
};
