import instance from './instance';

const getDirectory = async (dirPath: string) =>
  instance.get(`/api/directories?dirPath=${dirPath}`);
export default getDirectory;

export const createDirectory = async (dirPath: string, dirName: string) =>
  instance.post(`/api/directories`, {
    directoryPath: dirPath,
    directoryName: dirName,
    canViewByEveryone: false,
    canModifyByEveryone: false,
  });

export const deleteDirectory = (dirPath: string) =>
  instance.delete(
    `/api/directories?targetDirectory=${dirPath}&deleteChildes=${true}`,
  );

export const changeDirectoryName = (dirPath: string, newDirName: string) =>
  instance.put(`/api/directories`, {
    targetDirPath: dirPath,
    newDirName,
  });
