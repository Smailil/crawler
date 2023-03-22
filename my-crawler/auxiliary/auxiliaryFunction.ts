import {SArray, ArrayInS, TextManipulation} from "./type.js";

const findToS = (searchValue: string, sArray: SArray): ArrayInS => {
    const pair = sArray.find((entry) => entry[0] === searchValue);
    if (pair) {
        return pair[1];
    }
    else {
        return null;
    }
}

const textManipulation = (texts: string | string[], textManipulationStruct: TextManipulation): string | string[] => {
    // Helper function to manipulate a single string
    const manipulateText = (text: string): string => {
        let newText = text;

        if ('trim' in textManipulationStruct && textManipulationStruct.trim !== undefined
            && textManipulationStruct.trim) {
            newText = newText.trim();
        }
        if ('replaceText' in textManipulationStruct && 'replacementText' in textManipulationStruct &&
            textManipulationStruct.replaceText !== undefined && textManipulationStruct.replacementText !== undefined) {
            newText = newText.replace(textManipulationStruct.replaceText, textManipulationStruct.replacementText);
        }
        if ('regExpText' in textManipulationStruct && textManipulationStruct.regExpText !== undefined) {
            const regExp = new RegExp(textManipulationStruct.regExpText, "g");
            newText = newText.replace(regExp, newText);
        }
        if ('textPrefix' in textManipulationStruct && textManipulationStruct.textPrefix !== undefined) {
            newText = textManipulationStruct.textPrefix + newText;
        }
        if ('textSuffix' in textManipulationStruct && textManipulationStruct.textSuffix !== undefined) {
            newText = newText + textManipulationStruct.textSuffix;
        }
        return newText;
    };
    if (texts instanceof Array) {
        return texts.map(manipulateText);
    } else {
        return manipulateText(texts);
    }
};


    export {findToS, textManipulation};