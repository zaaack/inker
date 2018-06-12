/// <reference path="../../node_modules/emotion/types/index.d.ts" />
/// <reference types="react" />
import * as Hydux from 'hydux';
import * as PropsBar from './PropsBar';
export declare const init: () => {
    state: {
        artboard: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
        sidebar: {
            visible: boolean;
            artboards: import("./Artboard/State").SVGFile[];
        };
        propsbar: {
            visible: boolean;
            selected: import("./Artboard/State").RectLayer | null;
            items: PropsBar.PanelItem[];
            animIdx: number;
        };
    };
    cmd: Hydux.Sub<{
        artboard: {
            setRoot: (root: SVGSVGElement, rect: import("./Artboard/State").Rect) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
            setArtboard: (artboard: import("./Artboard/State").SVGFile) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
            handleMouseover: (layer: import("./Artboard/State").RectLayer) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
            handleClick: (selected: import("./Artboard/State").RectLayer | null) => (state: {
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
                artboard: import("./Artboard/State").SVGFile | null;
                hover: import("./Artboard/State").RectLayer | null;
                selected: import("./Artboard/State").RectLayer | null;
                containerId: string;
                rootRect: import("./Artboard/State").Rect;
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
        sidebar: {
            toggle: (visible?: boolean | undefined) => (state: {
                visible: boolean;
                artboards: import("./Artboard/State").SVGFile[];
            }, actions: any) => Hydux.ActionResult<{
                visible: boolean;
                artboards: import("./Artboard/State").SVGFile[];
            }, any>;
            setArtboards: (artboards: import("./Artboard/State").SVGFile[]) => (state: {
                visible: boolean;
                artboards: import("./Artboard/State").SVGFile[];
            }, actions: any) => Hydux.ActionResult<{
                visible: boolean;
                artboards: import("./Artboard/State").SVGFile[];
            }, any>;
        };
        propsbar: {
            setSelected: (selected: import("./Artboard/State").RectLayer | null, css: string) => (state: {
                visible: boolean;
                selected: import("./Artboard/State").RectLayer | null;
                items: PropsBar.PanelItem[];
                animIdx: number;
            }, actions: any) => Hydux.ActionResult<{
                visible: boolean;
                selected: import("./Artboard/State").RectLayer | null;
                items: PropsBar.PanelItem[];
                animIdx: number;
            }, any>;
            setAnimIdx: (animIdx: number) => (state: {
                visible: boolean;
                selected: import("./Artboard/State").RectLayer | null;
                items: PropsBar.PanelItem[];
                animIdx: number;
            }, actions: any) => Hydux.ActionResult<{
                visible: boolean;
                selected: import("./Artboard/State").RectLayer | null;
                items: PropsBar.PanelItem[];
                animIdx: number;
            }, any>;
        };
    }>[];
};
export declare const actions: {
    artboard: {
        setRoot: (root: SVGSVGElement, rect: import("./Artboard/State").Rect) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
        setArtboard: (artboard: import("./Artboard/State").SVGFile) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
        handleMouseover: (layer: import("./Artboard/State").RectLayer) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
        handleClick: (selected: import("./Artboard/State").RectLayer | null) => (state: {
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
            artboard: import("./Artboard/State").SVGFile | null;
            hover: import("./Artboard/State").RectLayer | null;
            selected: import("./Artboard/State").RectLayer | null;
            containerId: string;
            rootRect: import("./Artboard/State").Rect;
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
    sidebar: {
        toggle: (visible?: boolean | undefined) => (state: {
            visible: boolean;
            artboards: import("./Artboard/State").SVGFile[];
        }, actions: any) => Hydux.ActionResult<{
            visible: boolean;
            artboards: import("./Artboard/State").SVGFile[];
        }, any>;
        setArtboards: (artboards: import("./Artboard/State").SVGFile[]) => (state: {
            visible: boolean;
            artboards: import("./Artboard/State").SVGFile[];
        }, actions: any) => Hydux.ActionResult<{
            visible: boolean;
            artboards: import("./Artboard/State").SVGFile[];
        }, any>;
    };
    propsbar: {
        setSelected: (selected: import("./Artboard/State").RectLayer | null, css: string) => (state: {
            visible: boolean;
            selected: import("./Artboard/State").RectLayer | null;
            items: PropsBar.PanelItem[];
            animIdx: number;
        }, actions: any) => Hydux.ActionResult<{
            visible: boolean;
            selected: import("./Artboard/State").RectLayer | null;
            items: PropsBar.PanelItem[];
            animIdx: number;
        }, any>;
        setAnimIdx: (animIdx: number) => (state: {
            visible: boolean;
            selected: import("./Artboard/State").RectLayer | null;
            items: PropsBar.PanelItem[];
            animIdx: number;
        }, actions: any) => Hydux.ActionResult<{
            visible: boolean;
            selected: import("./Artboard/State").RectLayer | null;
            items: PropsBar.PanelItem[];
            animIdx: number;
        }, any>;
    };
};
export declare type Actions = typeof actions;
export declare type State = ReturnType<typeof init>['state'];
