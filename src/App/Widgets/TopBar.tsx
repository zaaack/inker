import * as React from 'react'
import * as Hydux from 'hydux'
import { SVGFile } from '../Artboard/State'
import { cx, css } from 'emotion'
import * as Utils from 'utils'
const { Cmd } = Hydux

const width = 379
const rootCss = css`
  width: 100%;
  height: 80px;
  box-sizing: border-box;
  padding: 20px;
  line-height: 40px;
  background-color: rgb(70, 70, 70);
  box-shadow: 0px 3px 2px black;
  position: fixed;
  top: 0;
  left: 0;
`

export default function TopBar(
  props: {
    className?: string
    children?: any
  }
) {
  return (
    <div className={cx(rootCss, props.className)}>
      {props.children}
    </div>
  )
}
