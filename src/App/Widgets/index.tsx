import * as React from 'react'
import { css, cx } from 'emotion'

const hintCss = css`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 60px 40px;
  background: rgba(0, 0, 0, 0.4);
  &::before {
    content: '';
    display: block;
    border: 2px dashed rgb(102, 102, 102);
    border-radius: 10px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
  }

  span {
    color: #e8e8e8;
    text-align: center;
    display: block;
    position: absolute;
    width: 100%;
    white-space: normal;
    padding: 40px;
    top: 50%;
    left: 0;
    line-height: 1.6;
    transform: translateY(-50%);
    box-sizing: border-box;
  }
`

export function DropHint(
  { position, className }:
  { position?: React.CSSProperties['position'], className?: string }
) {
  return (
    <div className={cx(hintCss, className)} style={{ position }}>
      <span>Drop your SVG files here...</span>
    </div>
  )
}
