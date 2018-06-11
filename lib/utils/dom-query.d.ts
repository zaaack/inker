export interface Document {
    nodeName: string;
    mode: string;
    childNodes: NodeItem[];
}
export interface NodeItem {
    nodeName: string;
    name?: string;
    publicId?: null;
    systemId?: null;
    parentNode: string;
    __location: Location | null;
    tagName?: string;
    attrs?: AttrsItem[];
    namespaceURI?: string;
    childNodes?: NodeItem[];
    value?: string;
}
export interface AttrsItem {
    name: string;
    value: string;
}
export interface Location {
    line?: number;
    col?: number;
    startOffset?: number;
    endOffset: number;
    startTag?: StartTag;
    endTag?: EndTag;
}
export interface StartTag {
    line: number;
    col: number;
    startOffset: number;
    endOffset: number;
}
export interface EndTag {
}
export declare class DOMWrapper {
    private _node;
    constructor(_node: NodeItem);
    readonly innerText: string;
    getAttribute(key: string): string | null;
}
export declare function findOne(dom: object, fn: (node: NodeItem) => boolean): DOMWrapper | void;
export declare function find(dom: object, fn: (node: NodeItem) => boolean): DOMWrapper[];
