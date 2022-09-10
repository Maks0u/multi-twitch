import Stream from './src/js/Stream.js';

const streamers = process.argv.slice(2);

let pos = 0;
streamers.forEach((n) => {
    const s = new Stream(n);
    s.playShell(pos);
    pos++;
});
