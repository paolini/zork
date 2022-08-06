const { exec, spawn } = require('child_process')

//const ps = spawn('./dungeon', [], {'cwd': 'almy'});
const ps = spawn('script', ['-c', './dungeon'], {'cwd': 'almy'});

if (1) {
    ps.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    
    ps.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    ps.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        process.exit(0);
    });

    process.stdin.on('data', (data) => {
        ps.stdin.write(data);
    })
}