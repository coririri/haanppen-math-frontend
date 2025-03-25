export interface DirectoryType {
  fileName: string;
  isDir: boolean;
  path: string;
  createdTime: string;
  canViewByEveryone: boolean;
  canModifyByEveryone: boolean;
  runtimeDuration?: number;
}
