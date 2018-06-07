import * as Hydux from 'hydux';
export interface SVGFile {
    name: string;
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
export declare const init: {
    state: () => {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    };
};
export declare const lineWidth = 2;
export declare const actions: {
    setRootRect: (rect: Rect) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, any>;
    setCss: (css: string) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, any>;
    setArtboard: (artboard: SVGFile) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, any>;
    setScale: (scale: number) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, any>;
    handleMouseover: (layer: RectLayer) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, any>;
    handleMouseout: () => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, any>;
    handleClick: (selected: RectLayer | null) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        scale: number;
        css: string;
    }, any>;
};
export declare type Actions = typeof actions;
export declare type State = ReturnType<typeof init.state>;
