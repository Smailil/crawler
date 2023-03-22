type ArrayInS = string | null | (string | null)[];
type SArray = [string, ArrayInS][];

type TextManipulation = {
    trim?: boolean,
    replaceText?: string,
    replacementText?: string,
    textPrefix?: string,
    textSuffix?: string,
    regExpText?: string
}

type ExtractorStruct = {
    id: number,
    type: string,
    subType: string,
    selector: string,
    name: string,
    multiple: boolean
    textManipulation: TextManipulation
}

type FromHTMLExtractorStruct = {
    id: number,
    type: string,
    subType: string,
    html: string,
    selector: string,
    name: string,
    multiple: boolean,
    textManipulation: TextManipulation
}

type BranchConditionStruct = {
    id: number,
    type: string,
    firstOperand: string,
    logicalOperation: string,
    secondOperand: string,
    ifProgram: string[],
    elseProgram: string[]
    typeOfOperand: string
}

type GotoStruct = {
    id: number,
    type: string,
    link: string
}

type IncludeStruct = {
    id: string;
    type: string;
    label: string;
};

type ForeachStruct = {
    id: string;
    type: string;
    array: string;
    name: string;
    program: string[];
}

interface StoObject {
    [key: string]: string | null | (string | null)[];
}

export {ExtractorStruct, SArray, ArrayInS, BranchConditionStruct, GotoStruct, TextManipulation,
    IncludeStruct, ForeachStruct, FromHTMLExtractorStruct, StoObject};

