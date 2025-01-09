export interface OnlineAttachmentType {
  attachmentId: number;
  attachmentTitle: string;
  url: string;
}

export interface LessonCategoryInfoType {
  categoryId: number;
  parentCategoryName: string;
  categoryName: string;
}

export interface OnlineVideoDetailType {
  videoId: number;
  videoSequence: number;
  mediaName: string;
  isPreview: boolean;
  mediaSrc: string;
  attachmentDetails: OnlineAttachmentType[];
}

export interface OnlineLessonType {
  onlineCourseId: number;
  title: string;
  lessonRange: string;
  lessonDesc: string;
  onlineVideoDetails: OnlineVideoDetailType[];
  lessonCategoryInfo: LessonCategoryInfoType;
}
