import { CommentType } from './commentType';
import { ImageType } from './imageType';
import { MemberType } from './memberType';

export interface WriteQuestionType {
  targetMemberId: number;
  title: string;
  content: string;
  images: string[];
}

export interface QuestionOwner {
  memberId: number;
  memberName: string;
  memberGrade: number | null;
  role: 'student' | 'teacher';
}

export interface QuestionTarget {
  memberId: number;
  memberName: string;
  memberGrade: number | null;
  role: 'student' | 'teacher';
}

export interface QuestionType {
  questionDetailData: {
    questionId: number;
    title: string;
    content: string;
    solved: boolean;
    viewCount: number;
    registeredDateTime: string;
    registeredMember: MemberType;
    targetMember: MemberType;
    imageUrls: ImageType[];
  };
  commentsData: CommentType[];
}

export interface QuestionFrontType {
  questionDetailData: {
    title: string;
    content: string;
    registeredDateTime: string;
    registerMemberName: MemberType;
    registerMemberGrade: number;
    imageUrls: ImageType[];
  };
  commentsData: CommentType[];
}
