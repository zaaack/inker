import * as React from 'react'
import { pure } from 'utils'
export const Copy = pure(
  ({ color = '#a2a2a2' }: { color?: string }) => (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ isolation: 'isolate', display: 'block' }}
      viewBox="1257 347 14 13"
      width="100%"
      height="100%"
    >
      <path
        d=" M 1258.5 347 C 1257.676 347 1257 347.676 1257 348.5 L 1257 356.5 C 1257 357.324 1257.676 358 1258.5 358 L 1260 358 L 1260 358.5 C 1260 359.324 1260.676 360 1261.5 360 L 1269.5 360 C 1270.324 360 1271 359.324 1271 358.5 L 1271 350.5 C 1271 349.676 1270.324 349 1269.5 349 L 1268 349 L 1268 348.5 C 1268 347.676 1267.324 347 1266.5 347 L 1258.5 347 Z  M 1258.5 348 L 1266.5 348 C 1266.781 348 1267 348.219 1267 348.5 L 1267 356.5 C 1267 356.781 1266.781 357 1266.5 357 L 1258.5 357 C 1258.367 357.002 1258.239 356.949 1258.145 356.855 C 1258.051 356.761 1257.998 356.633 1258 356.5 L 1258 348.5 C 1258 348.219 1258.219 348 1258.5 348 Z  M 1268 350 L 1269.5 350 C 1269.781 350 1270 350.219 1270 350.5 L 1270 358.5 C 1270 358.781 1269.781 359 1269.5 359 L 1261.5 359 C 1261.367 359.002 1261.239 358.949 1261.145 358.855 C 1261.051 358.761 1260.998 358.633 1261 358.5 L 1261 358 L 1266.5 358 C 1267.324 358 1268 357.324 1268 356.5 L 1268 350 Z "
        fill={color}
      />
    </svg>
  )
)

export const ArrayLeft = pure(
  () => (
        <svg
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ isolation: 'isolate', display: 'block' }}
          viewBox="304 14 52 52"
          width="100%"
          height="100%"
        >
          <rect x={310} y={20} width={40} height={40} transform="matrix(1,0,0,1,0,0)" fill="none" />
          <path
            d="M339 22l-20 18 10 9 10 9"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeWidth={4}
            stroke="#D1D1D1"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit={3}
          />
        </svg>
  )
)

export const Menu = pure(
  () => (
        <svg
          xmlnsXlink="http://www.w3.org/1999/xlink"
          style={{ isolation: 'isolate', display: 'block' }}
          viewBox="386 23 34 34"
          width="100%"
          height="100%"
        >
          <path
            d="M388 40h30m-30 12.5h30m-30-25h30"
            fill="none"
            vectorEffect="non-scaling-stroke"
            strokeWidth={4}
            stroke="#D1D1D1"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit={3}
          />
        </svg>
  )
)

export const Github = pure(
  () => (
    <svg
      width="100%"
      height="100%"
      className="octicon octicon-mark-github"
      viewBox="0 0 16 16"
      version="1.1"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        fill="white"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
      />
    </svg>
  )
)
