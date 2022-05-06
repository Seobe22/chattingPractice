import create from 'zustand';
import {devtools} from 'zustand/middleware';

interface Comment {
  id: number;
  comment: string;
}

interface CommentState {
  comments: Comment[];
  addComments: (id: number, comment: string) => void;
  removeComments: (id: number) => void;
}

export const useStore = create<CommentState>()(
  devtools(set => ({
    comments: [{id: 0, comment: '테스트 1'}],
    addComments: (id, comment) =>
      set(state => ({
        comments: [
          ...state.comments,
          {
            id: id,
            comment: comment,
          },
        ],
      })),
    removeComments: id =>
      set(state => ({
        comments: state.comments.filter(item => item.id !== id),
      })),
  })),
);
