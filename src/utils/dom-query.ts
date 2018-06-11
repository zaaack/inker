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

export class DOMWrapper {
  constructor(
    private _node: NodeItem
  ) {
  }
  get innerText() {
    let text = ''
    for (const child of this._node.childNodes || []) {
      text +=
        child.nodeName === '#text'
        ? child.value
        : new DOMWrapper(child).innerText
    }
    return text
  }
  getAttribute(key: string) {
    for (const attr of this._node.attrs || []) {
      if (attr.name === key) {
        return attr.value
      }
    }
    return null
  }
}

export function findOne(dom: object, fn: (node: NodeItem) => boolean): DOMWrapper | void {
  let loop = (dom: NodeItem | Document, fn: (node: NodeItem) => boolean) => {
    for (const child of (dom.childNodes || [])) {
      if (fn(child)) {
        return child
      }
      let ret = loop(child, fn)
      if (ret) return ret
    }
  }
  let ret = loop(dom as Document, fn)
  if (ret) {
    return new DOMWrapper(ret)
  }
}

export function find(dom: object, fn: (node: NodeItem) => boolean): DOMWrapper[] {
  let loop = (dom: NodeItem | Document, fn: (node: NodeItem) => boolean, acc: NodeItem[]) => {
    for (const child of (dom.childNodes || [])) {
      if (fn(child)) {
        acc.push(child)
      }
      loop(child, fn, acc)
    }
    return acc
  }
  return loop(dom as Document, fn, []).map(_ => new DOMWrapper(_))
}
