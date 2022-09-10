export default class Position {
    constructor(position = 0) {
        this.position = position;
    }
    getCoordinates() {
        return {
            0: { top: 0, left: 0, width: 2160, height: 1215 },
            1: { top: 0, left: 2160, width: 1280, height: 720 },
            2: { top: 720, left: 2160, width: 1280, height: 720 },
        }[this.position];
    }
}
