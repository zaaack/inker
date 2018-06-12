export * from './consts';
export * from './dom-query';
import * as Hydux from 'hydux';
export declare function slug(key: string): string;
export declare function deslug(key: string): string;
export declare function svg2dataUrl(svg: string): {};
export declare function replaceAction<S, A, PS, PA, A1>(parentActions: PA, getter: (_: PA) => (a1: A1) => (s: S, a: A) => any, wrapper?: (a1: A1) => (action: (a1: A1) => Hydux.ActionCmdResult<S, A>, parentState: PS, parentActions: PA, state: S, actions: A) => Hydux.ActionResult<S, A>): any;
export declare function replaceAction<S, A, PS, PA, A1, A2>(parentActions: PA, getter: (_: PA) => (a1: A1, a2: A2) => (s: S, a: A) => any, wrapper?: (a1: A1, a2: A2) => (action: (a1: A1, a2: A2) => Hydux.ActionCmdResult<S, A>, parentState: PS, parentActions: PA, state: S, actions: A) => Hydux.ActionResult<S, A>): any;
