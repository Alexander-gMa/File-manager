import readline from 'readline';
import { homedir } from 'os';

import * as nwd from './commands/nwd.js'
import * as basic_operation from './commands/basic.js'

let userName;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let __dirname = homedir();

function startManager(args = process.argv) {

    if (args.length < 3) {
        console.log('Please enter user name (--username=your_name)');
        rl.close();
        return;
    }

    const userInfo = args[2].split('=');
    let [userKey, nameInfo] = userInfo;
    userName = nameInfo;

    if (userKey.startsWith('--')) userKey = userKey.slice(2);
    if (userKey === 'username' || userKey === 'userName') {
        console.log(`Welcome to the File Manager, ${userName}!`);
        questions();
    } else {
        console.log('Please enter user name (--username=your_name)');
        rl.close();
        return;
    }

    process.on('exit', (name) => {
        console.info(`\nThank you for using File Manager, ${name}!\n`);
        rl.close();
    })

    process.openStdin().on("keypress", (chunk, key) => {
        if (key && key.name === "c" && key.ctrl) {
            process.exit(userName);
        }
    });
}

function questions() {

    rl.question(`\nYou are currently in + ${__dirname}, please enter your command \n`,
        async (input) => {
            const [operation, ...path] = input.split(' ');
            const correctPath = path.filter(el => el !== '' && el !== ' ');

            switch (operation) {
                case '.exit': {
                    process.exit(userName);
                    
                };
                case 'rn': {
                    await basic_operation.rename(__dirname, correctPath[0], correctPath[1]);
                    break;
                };
                case 'up': {
                    __dirname = await nwd.up(__dirname);
                    break;
                };
                case 'cd': {
                    __dirname = await nwd.cd(__dirname, correctPath.join(' '));
                    break;
                };
                case 'ls': {
                    await nwd.ls(__dirname);
                    break;
                };
                case 'cat': {
                    await basic_operation.cat(__dirname, correctPath.join(' '));
                    break;
                };
                case 'add': {
                    await basic_operation.add(__dirname, correctPath.join(' '));
                    break;
                };
                default: {
                    console.log('Invalid input')
                }
            }
            questions()
        })
}
startManager();