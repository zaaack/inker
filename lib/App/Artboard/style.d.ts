import { Rect } from './State';
export declare enum Keys {
    shadowNodes = "shadowNodes"
}
export declare type Styles = {
    [k: string]: string;
};
export declare function getStyle(el: SVGElement, rect: Rect, root: SVGSVGElement): {
    [x: string]: string;
};
export declare function getCss(el: SVGElement, rect: Rect, root: SVGSVGElement): string;
