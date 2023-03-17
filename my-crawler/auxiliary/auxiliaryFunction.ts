import {SArray, ArrayInS} from "./type.js";

const findToS = (searchValue: string, sArray: SArray): ArrayInS => {
    const pair = sArray.find((entry) => entry[0] === searchValue);
    if (pair) {
        return pair[1];
    }
    else {
        return null;
    }
}

export {findToS};