import os from 'os';

export const osInfo = async (type) => {
    let command;
    type.startsWith('--') ? command = type.slice(2) : command = type;
    switch (command) {
        case 'homedir': {
            console.log(`homedir: ${os.homedir()}`)
        }
        case 'username': {
            console.log(`homedir: ${os.homedir()}`)
        }
        default:{
            console.log('Invalid input');
        }
    }
};
