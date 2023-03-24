import {TimeoutStruct} from "../auxiliary/type";

class Timeout {
    time: string;
    constructor(timeout: TimeoutStruct) {
        this.time = timeout.time;
    }
    async TimeoutDone() {
        await new Promise(resolve => setTimeout(resolve, Number(this.time)));
    }
}

export {Timeout};