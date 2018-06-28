import * as React from 'react'
import { css, cx } from 'emotion'
import Loading from 'react-loading'

const hintCss = css`
  position: fixed;
  left: 0;
  top: 0;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  box-sizing: border-box;
  margin: 20px;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed rgb(102, 102, 102);
  border-radius: 10px;

  span {
    color: #e8e8e8;
    white-space: normal;
    line-height: 1.6;
    box-sizing: border-box;
    display: block;
    width: 80%;
    text-align: center;
  }

  .loading {

  }
`

export function DropHint({
  position,
  className,
  isLoading,
}: {
  position?: React.CSSProperties['position']
  className?: string
  isLoading?: boolean
}
) {
  return (
    <div className={cx(hintCss, className)} style={{ position }}>
      {isLoading ? <Loading type="spin" color="white" className="loading" /> : <span>Drop your SVG files here...</span>}
    </div>
  )
}
