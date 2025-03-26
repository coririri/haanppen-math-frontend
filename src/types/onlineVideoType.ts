export interface AttachmentDetailType {
  attachmentId: number;
  attachmentTitle: string;
  url: string;
}

export interface OnlineVideoDataType {
  videoId: number;
  videoSequence: number;
  mediaName: string;
  isPreview: boolean;
  mediaSrc?: string;
  duration?: number | null;
  attachmentDetails: AttachmentDetailType[];
}
