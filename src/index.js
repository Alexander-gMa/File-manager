import readline from 'readline';
import { homedir } from 'os';

import up from './commands/up.js'
import cd from './commands/cd.js'

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
            switch (operation) {
                case '.exit': {
                    process.exit(userName);
                }
            }
            try {
                if (operation === '.up' || operation === 'up') {
                    __dirname = await up(__dirname);
                }
                if (operation === '.cd' || operation === 'cd') {
                    __dirname = await cd(__dirname, path[0]);
                }
            } catch (err) {
                console.log(err);
            }
            questions()
        })
}
startManager();