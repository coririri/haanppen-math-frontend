export interface Attachment {
  attachmentId: number;
  fileName: string;
  mediaSource: string;
}

export interface MemoMedia {
  memoMediaId: number;
  mediaName: string;
  mediaSource: string;
  mediaSequence: number;
  attachmentViews: Attachment[];
}

export interface OfflineLessonType {
  memoId: number;
  progressed: string;
  homework: string;
  targetDate: string; // "2025-01-07" 형태의 문자열로 처리
  memoMediaViews: MemoMedia[];
}
