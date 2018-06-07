import * as Hydux from 'hydux';
export declare const init: {
    state: () => {
        artboard: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        };
    };
    cmd: () => Hydux.Sub<{
        artboard: {
            setRootRect: (rect: import("./Artboard/State").Rect) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, actions: any) => Hydux.ActionResult<{
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, any>;
            setCss: (css: string) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, actions: any) => Hydux.ActionResult<{
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, any>;
            setArtboard: (artboard: import("./Artboard/State").SVGFile) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, actions: any) => Hydux.ActionResult<{
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, any>;
            setScale: (scale: number) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, actions: any) => Hydux.ActionResult<{
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, any>;
            handleMouseover: (layer: import("./Artboard/State").RectLayer) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, actions: any) => Hydux.ActionResult<{
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, any>;
            handleMouseout: () => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, actions: any) => Hydux.ActionResult<{
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, any>;
            handleClick: (selected: import("./Artboard/State").RectLayer | null) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, actions: any) => Hydux.ActionResult<{
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            }, any>;
        };
        update: () => (state: {
            artboard: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            };
        }, actions: any) => Hydux.ActionResult<{
            artboard: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
                scale: number;
                css: string;
            };
        }, any>;
    }>[];
};
export declare const actions: {
    artboard: {
        setRootRect: (rect: import("./Artboard/State").Rect) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, actions: any) => Hydux.ActionResult<{
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, any>;
        setCss: (css: string) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, actions: any) => Hydux.ActionResult<{
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, any>;
        setArtboard: (artboard: import("./Artboard/State").SVGFile) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, actions: any) => Hydux.ActionResult<{
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, any>;
        setScale: (scale: number) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, actions: any) => Hydux.ActionResult<{
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, any>;
        handleMouseover: (layer: import("./Artboard/State").RectLayer) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, actions: any) => Hydux.ActionResult<{
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, any>;
        handleMouseout: () => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, actions: any) => Hydux.ActionResult<{
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, any>;
        handleClick: (selected: import("./Artboard/State").RectLayer | null) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, actions: any) => Hydux.ActionResult<{
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        }, any>;
    };
    update: () => (state: {
        artboard: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        };
    }, actions: any) => Hydux.ActionResult<{
        artboard: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
            scale: number;
            css: string;
        };
    }, any>;
};
export declare type Actions = typeof actions;
export declare type State = ReturnType<typeof init.state>;
