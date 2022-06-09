import fs from "fs/promises";
import path from 'path';
import * as constants from "constants";

export const cat = async (currentPath, pathToFile) => {
    try {
        const data = await fs.readFile(path.join(currentPath, pathToFile), "utf8");
        console.log(`Content of the file:\n${data}`);
    } catch (error) {
        console.log('Operation failed');
    }
}

export const add = async (currentPath, fileName) => {
    try {
        await fs.writeFile(path.join(currentPath, fileName), '', { flag: 'wx' });
        console.log(`${fileName} is created`);
    } catch (error) {
        console.log('Operation failed');
    }
};

export const rename = async (currentPath, fileName, newfilename) => {
    const pathToFolder = path.join(currentPath, fileName).split('\\');
    pathToFolder.splice(-1, 1);
    try {
        await fs.rename(
            path.join(currentPath, fileName),
            path.join(pathToFolder.join('\\'), newfilename)
        )
        console.log(`Operation done`);
    } catch (error) {
        console.log('Operation failed');
    }
};

export const cp = async (currentPath, pathToFile, pathToNewDir) => {
    const pathToFolder = path.join(currentPath, pathToFile).split('\\');
    const filename = pathToFolder.slice(-1);
    try {
        await fs.copyFile(pathToFile,
            path.join(pathToNewDir, filename[0]),
            constants.COPYFILE_EXCL);
    } catch (err) {
        err.code === 'EEXIST' ?
            console.log('Operation failed\nFile already exists') :
            console.log('Operation failed');
    }
};
