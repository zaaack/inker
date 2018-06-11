import * as Hydux from 'hydux';
export interface SVGFile {
    name: string;
    title: string;
    content: string;
}
export interface Rect {
    left: number;
    top: number;
    width: number;
    height: number;
}
export interface Line {
    rect: Rect;
    length: number;
    direction: 'horizon' | 'vertical';
}
export declare namespace Rect {
    let empty: Rect;
}
export interface RectLayer {
    node: SVGElement;
    rect: Rect;
    lines: Line[];
}
export declare const init: () => {
    state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    };
};
export declare const lineWidth = 2;
export declare function getNodeRect(el: SVGElement, rootRect: Rect): Rect;
export declare const actions: {
    setRootRect: (rect: Rect) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, any>;
    setCss: (css: string) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, any>;
    setArtboard: (artboard: SVGFile) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, any>;
    setScale: (scale: number) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, any>;
    handleMouseover: (layer: RectLayer) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, any>;
    handleMouseout: () => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, any>;
    handleClick: (selected: RectLayer | null) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
        ratio: number;
    }, any>;
};
export declare type Actions = typeof actions;
export declare type State = ReturnType<typeof init>['state'];
