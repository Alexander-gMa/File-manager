import readline from 'readline';
import { homedir } from 'os';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startManager(args = process.argv) {
    console.log(homedir());
    if (args.length < 3) {
        console.log('Please enter user name (--username=your_name)');
        rl.close();
        return;
    }
    const userInfo = args[2].split('=');
    let [userKey, userName] = userInfo;

    process.openStdin().on("keypress", (chunk, key) => {
        if(key && key.name === "c" && key.ctrl) {
          process.exit(userName);
        }
      });
    process.on('exit', (name) => {
        console.info(`Thank you for using File Manager, ${name}!`);
        rl.close();
    })

    if (userKey.startsWith('--')) userKey = userKey.slice(2);
    if (userKey === 'username') {
        console.log(`Welcome to the File Manager, ${userName}!`);
    } else {
        console.log('Please enter user name (--username=your_name)');
    }

    rl.on('line', (input) => {
        const [operation, ...path] = input.split(' ');

        switch (operation) {
            case '.exit': {
                process.exit(userName);
            }
        }
    });
}
startManager();