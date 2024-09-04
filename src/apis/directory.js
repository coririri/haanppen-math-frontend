import instance from './instance';

const getDirectory = async (dirPath) =>
  instance.get(`/api/directories?dirPath=${dirPath}`);
export default getDirectory;

export const createDirectory = async (dirPath, dirName) =>
  instance.post(`/api/directories`, {
    directoryPath: dirPath,
    directoryName: dirName,
    canViewByEveryone: true,
    canModifyByEveryone: false,
  });

export const deleteDirectory = (dirPath) =>
  instance.delete(
    `/api/directories?targetDirectory=${dirPath}&deleteChildes=${true}`,
  );

export const changeDirectoryName = (dirPath, newDirName) =>
  instance.put(`/api/directories`, {
    targetDirPath: dirPath,
    newDirName,
  });
