export interface AttachmentViewType {
  attachmentId?: number;
  fileName: string;
  mediaSource?: string;
}

export interface VideoType {
  memoMediaId: number;
  mediaName: string;
  mediaSource: string;
  mediaSequence: number;
  title: string;
  attachmentViews: AttachmentViewType[];
}
