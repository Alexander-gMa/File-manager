import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startManager(args = process.argv) {
    if (args.length < 3) {
        console.log('Please enter user name (--username=your_name)');
        return;
    }
    const userInfo = args[2].split('=');
    let [userKey, userName] = userInfo;
    if (userKey.startsWith('--')) userKey = userKey.slice(2);
    if (userKey === 'username') {
        console.log(`Welcome to the File Manager, ${userName}!`);
    } else {
        console.log('Please enter user name (--username=your_name)');
    }
}
startManager();