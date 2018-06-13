import * as React from 'react'
import * as Hydux from 'hydux'
import { SVGFile } from '../Artboard/State'
import { cx, css } from 'emotion'
import * as Utils from 'utils'
const { Cmd } = Hydux

const width = 379
const rootCss = css`
  width: 100%;
  height: ${Utils.TopBarHeight}px;
  box-sizing: border-box;
  padding: ${(Utils.TopBarHeight - Utils.TopBarIconSize) / 2}px;
  line-height: ${Utils.TopBarIconSize}px;
  background-color: rgb(70, 70, 70);
  box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
`

export default function TopBar(
  props: {
    className?: string
    children?: any
    style?: React.CSSProperties
  }
) {
  return (
    <div className={cx(rootCss, props.className)} style={props.style}>
      {props.children}
    </div>
  )
}
