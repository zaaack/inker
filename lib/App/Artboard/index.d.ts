import * as React from 'react';
import * as Hydux from 'hydux';
import * as State from './State';
export declare type State = State.State;
export declare type Actions = State.Actions;
export declare const init: () => {
    state: {
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
export declare const actions: {
    setRoot: (root: SVGSVGElement, rect: State.Rect) => (state: {
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
    setArtboard: (artboard: State.SVGFile) => (state: {
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
    handleMouseover: (layer: State.RectLayer) => (state: {
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
    handleClick: (selected: State.RectLayer | null) => (state: {
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
export declare const view: (state: {
    artboard: State.SVGFile | null;
    hover: State.RectLayer | null;
    selected: State.RectLayer | null;
    containerId: string;
    rootRect: State.Rect;
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
}, actions: {
    setRoot: (root: SVGSVGElement, rect: State.Rect) => (state: {
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
    setArtboard: (artboard: State.SVGFile) => (state: {
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
    handleMouseover: (layer: State.RectLayer) => (state: {
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
    handleClick: (selected: State.RectLayer | null) => (state: {
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
        artboard: State.SVGFile | null;
        hover: State.RectLayer | null;
        selected: State.RectLayer | null;
        containerId: string;
        rootRect: State.Rect;
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
}) => JSX.Element;
