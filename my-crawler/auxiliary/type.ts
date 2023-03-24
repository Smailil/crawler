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

type AttributeExtractorStruct = {
    id: number,
    type: string,
    subType: string,
    selector: string,
    attribute: string,
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

type ScrollStruct = {
    id: string;
    type: string;
    subType: string;
}

type VariableStruct = {
    id: string;
    type: string;
    name: string;
    value: string;
}

type IncrementStruct = {
    id: string;
    type: string;
    name: string;
}

type DecrementStruct = {
    id: string;
    type: string;
    name: string;
}

type WhileStruct = {
    id: string;
    type: string;
    firstOperand: string;
    logicalOperation: string;
    secondOperand: string;
    program: string[];
    typeOfOperand: string;
}

type WhileOnExistsStruct = {
    id: string;
    type: string;
    selector: string;
    program: string[];
}

type TimeoutStruct = {
    id: string;
    type: string;
    time: string;
}

interface StoObject {
    [key: string]: string | null | (string | null)[];
}

export {ExtractorStruct, AttributeExtractorStruct, SArray, ArrayInS, BranchConditionStruct, GotoStruct,
    TextManipulation, IncludeStruct, ForeachStruct, FromHTMLExtractorStruct, StoObject, ScrollStruct, VariableStruct,
    IncrementStruct, DecrementStruct, WhileStruct, WhileOnExistsStruct, TimeoutStruct};

