/// <reference types="react" />
import * as Hydux from 'hydux';
import { SVGFile } from '../Artboard/State';
export declare const init: {
    state: () => {
        visible: boolean;
        artboards: SVGFile[];
    };
    cmd: () => Hydux.Sub<any>[];
};
export declare const actions: {
    toggle: (visible?: boolean | undefined) => (state: {
        visible: boolean;
        artboards: SVGFile[];
    }, actions: any) => Hydux.ActionResult<{
        visible: boolean;
        artboards: SVGFile[];
    }, any>;
    setArtboards: (artboards: SVGFile[]) => (state: {
        visible: boolean;
        artboards: SVGFile[];
    }, actions: any) => Hydux.ActionResult<{
        visible: boolean;
        artboards: SVGFile[];
    }, any>;
};
export declare function view(state: State, actions: Actions, onItemClick: (artboard: SVGFile, i: number) => void): JSX.Element;
export declare type Actions = typeof actions;
export declare type State = ReturnType<typeof init.state>;
