const { exec, spawn } = require('child_process')

class Session {
    constructor(options) {
        this.ps = null;
        const output_cb = options.output_cb || ((data) => {console.log(`output: ${data}`)});
        const close_cb = options.close_cb || ((code) => {console.log(`exit: ${code}`)});
        this.ps = spawn('script', ['-c', './dungeon'], {'cwd': 'almy'});
        this.ps.stdout.on('data', output_cb);
        this.ps.stderr.on('data', data => {console.error(`stderr: ${data}`)});
        this.ps.on('close', close_cb);
    }

    write(command) {
        if (!this.ps) {
            console.error(`cannot write: no process started`);
            return;
        }
        this.ps.stdin.write(command);
    }

}

if (0) {
    const session = new Session({close_cb: process.exit});
    process.stdin.on('data', command => zork.write(command));
}