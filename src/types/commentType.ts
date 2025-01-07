import { ImageType } from './imageType';

export interface WriteCommentType {
  questionId: number;
  content: string;
  images: string[];
}

export type RegisteredMemberDetailsType = {
  memberId: number;
  memberName: string;
  memberGrade: number;
  role: string;
};

export type CommentType = {
  commentId: number;
  content: string;
  selected: boolean;
  images: ImageType[];
  registeredDateTime: string;
  registeredMemberDetails: RegisteredMemberDetailsType;
};
