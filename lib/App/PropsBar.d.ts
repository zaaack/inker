/// <reference types="react" />
import * as Hydux from 'hydux';
import { RectLayer } from 'App/Artboard/State';
export interface PanelItem {
    title: string;
    content: string;
}
export declare const init: () => {
    state: {
        visible: boolean;
        selected: RectLayer | null;
        items: PanelItem[];
        animIdx: number;
    };
    cmd: Hydux.Sub<any>[];
};
export declare const actions: {
    setSelected: (selected: RectLayer | null, css: string) => (state: {
        visible: boolean;
        selected: RectLayer | null;
        items: PanelItem[];
        animIdx: number;
    }, actions: any) => Hydux.ActionResult<{
        visible: boolean;
        selected: RectLayer | null;
        items: PanelItem[];
        animIdx: number;
    }, any>;
    setAnimIdx: (animIdx: number) => (state: {
        visible: boolean;
        selected: RectLayer | null;
        items: PanelItem[];
        animIdx: number;
    }, actions: any) => Hydux.ActionResult<{
        visible: boolean;
        selected: RectLayer | null;
        items: PanelItem[];
        animIdx: number;
    }, any>;
};
export declare function view(state: State, actions: Actions): JSX.Element;
export declare type Actions = typeof actions;
export declare type State = ReturnType<typeof init>['state'];
