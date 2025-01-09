export interface AttachmentType {
  attachmentId: number;
  fileName: string;
  mediaSource: string;
}

export interface MemoMediaType {
  memoMediaId: number;
  mediaName: string;
  mediaSource: string;
  mediaSequence: number;
  attachmentViews: AttachmentType[];
}

export interface OfflineLessonType {
  memoId: number;
  progressed: string;
  homework: string;
  targetDate: string; // "2025-01-07" 형태의 문자열로 처리
  memoMediaViews: MemoMediaType[];
}
