import ChildProcess from 'child_process';
import Position from './Position.js';
import Logger from './Logger.js';

export default class Stream {
    constructor(name = '') {
        this.URL = new URL(name, 'https://www.twitch.tv');
    }
    play(position) {
        const { top, left, width, height } = new Position(position).getCoordinates();
        Logger.debug(`${top} ${left} ${width} ${height}`);
        return new Promise((resolve, reject) => {
            this.getMediaURL()
                .then((source) => {
                    Logger.debug(source);
                    resolve(
                        ChildProcess.exec(
                            `ffplay -noborder -top ${top} -left ${left} -x ${width} -y ${height} ${source}`
                        )
                    );
                })
                .catch((e) => reject(e));
        });
    }
    getMediaURL() {
        return new Promise((resolve, reject) => {
            ChildProcess.exec(`youtube-dl -g ${this.URL.href}`, (e, stdout, stderr) => {
                if (e) reject(`Stream.getMediaURL() \u00b7 ${e.message}`);
                if (stderr) reject(`Stream.getMediaURL() \u00b7 ${stderr}`);
                if (stdout) resolve(stdout);
            });
        });
    }
    playShell(position) {
        const { top, left, width, height } = new Position(position).getCoordinates();
        Logger.debug(`${this.name} ${top} ${left} ${width} ${height}`);
        ChildProcess.exec(
            `youtube-dl -f 480p ${this.URL.href} -o - | ffplay -noborder -top ${top} -left ${left} -`
        );
    }
}
