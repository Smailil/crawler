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

type BranchConditionOnExistsStruct = {
    id: number,
    type: string,
    selector: string,
    ifProgram: string[],
    elseProgram: string[]
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
    textManipulation: TextManipulation
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

type LoopOnExistsStruct = {
    id: string;
    type: string;
    selector: string;
    numberOfLoops: string;
    program: string[];
}

type TimeoutStruct = {
    id: string;
    type: string;
    time: string;
}

type ClickStruct = {
    id: string;
    type: string;
    selector: string;
}

type InputStruct = {
    id: string;
    type: string;
    selector: string;
    value: string;
}
interface StoObject {
    [key: string]: string | null | (string | null)[];
}

type SelectorStruct = ExtractorStruct & AttributeExtractorStruct & BranchConditionStruct & BranchConditionOnExistsStruct &
    GotoStruct & IncludeStruct & ForeachStruct & FromHTMLExtractorStruct & ScrollStruct & VariableStruct &
    IncrementStruct & DecrementStruct & WhileStruct & LoopOnExistsStruct & TimeoutStruct & ClickStruct & InputStruct;

type JSONStruct = {
    _id: string;
    startUrls?: string[];
    beginProgram: string[];
    selectors: SelectorStruct[];
}

export {ExtractorStruct, AttributeExtractorStruct, ArrayInS, BranchConditionStruct, BranchConditionOnExistsStruct,
    GotoStruct, TextManipulation, IncludeStruct, ForeachStruct, FromHTMLExtractorStruct, StoObject, ScrollStruct,
    VariableStruct, IncrementStruct, DecrementStruct, WhileStruct, LoopOnExistsStruct, TimeoutStruct, ClickStruct,
    SArray, InputStruct, JSONStruct};

