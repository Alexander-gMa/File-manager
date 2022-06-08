import fs from "fs/promises";
import path from 'path';

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
