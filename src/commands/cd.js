import path from 'path';
import { access } from 'fs/promises';

export async function cd(currentDir, pathToDir) {
    let newPathtoDir = path.join(currentDir, pathToDir);
    try {
        await access(newPathtoDir);
        return newPathtoDir
    } catch (err) {
        console.log('Operation failed');
        return currentDir
    }
};

