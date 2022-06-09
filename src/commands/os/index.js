import os from 'os';

export const osInfo = async (type) => {
    let command;
    type.startsWith('--') ? command = type.slice(2) : command = type;
    switch (command) {
        case 'homedir': {
            console.log(`homedir: ${os.homedir()}`)
            break;
        }
        case 'username': {
            console.log(`username: ${os.userInfo().username}`)
            break;
        }
        default:{
            console.log('Invalid input');
        }
    }
};
