import * as React from 'react';
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
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    };
};
export declare const lineWidth = 2;
export declare function getNodeRect(el: SVGElement, rootRect: Rect): Rect;
export declare const actions: {
    setRoot: (root: SVGSVGElement, rect: Rect) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
    setCss: (css: string) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
    setArtboard: (artboard: SVGFile) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
    setScale: (scale: number) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
    handleMouseover: (layer: RectLayer) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
    handleMouseout: () => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
    handleClick: (selected: RectLayer | null) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
    dragStart: (e: React.MouseEvent<any>) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
    dragMove: (e: React.MouseEvent<any>) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
    dragEnd: (e: React.MouseEvent<any>) => (state: {
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: SVGFile | null;
        hover: RectLayer | null;
        selected: RectLayer | null;
        containerId: string;
        rootRect: Rect;
        root: SVGSVGElement | null;
        scale: number;
        css: string;
        ratio: number;
        isDragging: boolean;
        initDrag: {
            x: number;
            y: number;
        };
        initScroll: {
            x: number;
            y: number;
        };
    }, any>;
};
export declare type Actions = typeof actions;
export declare type State = ReturnType<typeof init>['state'];
