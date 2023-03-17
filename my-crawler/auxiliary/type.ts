type ArrayInS = string | null | (string | null)[];
type SArray = [string, ArrayInS][];

type ExtractorStruct = {
    id: number,
    type: string,
    subType: string,
    selector: string,
    name: string,
    multiple: boolean
}

type BranchConditionStruct = {
    id: number,
    type: string,
    firstOperand: string,
    logicalOperation: string,
    secondOperand: string,
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

export {ExtractorStruct, SArray, ArrayInS, BranchConditionStruct, GotoStruct, IncludeStruct};

