import path from 'path';

async function up(workdir) {
    let newPathtoDir = path.join(workdir, "..");

    return newPathtoDir;
};

export default up;