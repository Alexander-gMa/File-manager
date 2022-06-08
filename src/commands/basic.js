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


// export async function cat(currentPath, pathToFile) {

//     let readableStream = fs.createReadStream(
//         path.join(currentPath, pathToFile),
//         { flags: 'r', encoding: 'UTF-8', },
//     );

//     readableStream.on("data", chunk => {
//         console.log(`File content : \n${chunk}`);
//     });
//     readableStream.on("error", () => {
//         console.log('Operation failed');
//     });
// }