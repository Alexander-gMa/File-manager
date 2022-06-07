import readline from 'readline';
import { homedir } from 'os';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let pathToWorkDir = homedir();

function startManager(args = process.argv) {

    if (args.length < 3) {
        console.log('Please enter user name (--username=your_name)');
        rl.close();
        return;
    }
    const userInfo = args[2].split('=');
    let [userKey, userName] = userInfo;

    process.openStdin().on("keypress", (chunk, key) => {
        if (key && key.name === "c" && key.ctrl) {
            process.exit(userName);
        }
    });
    process.on('exit', (name) => {
        console.info(`Thank you for using File Manager, ${name}!\n`);
        rl.close();
    })

    if (userKey.startsWith('--')) userKey = userKey.slice(2);
    if (userKey === 'username') {
        console.log(`Welcome to the File Manager, ${userName}!`);
    } else {
        console.log('Please enter user name (--username=your_name)');
    }
    rl.question(`You are currently in + ${pathToWorkDir}, please enter your command \n`,
     async (input) => {
        const [operation, ...path] = input.split(' ');
        switch (operation) {
            case '.exit': {
                process.exit(userName);
            }
        }
    })
}
startManager();