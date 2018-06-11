import * as React from 'react'
export function Copy({ color = '#a2a2a2' }: { color?: string }) {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ isolation: 'isolate' }}
      viewBox="1257 313 14 47"
      width="100%"
      height="100%"
    >
      <path
        d="M1258.5 347c-.824 0-1.5.676-1.5 1.5v8c0 .824.676 1.5 1.5 1.5h1.5v.5c0 .824.676 1.5 1.5 1.5h8c.824 0 1.5-.676 1.5-1.5v-8c0-.824-.676-1.5-1.5-1.5h-1.5v-.5c0-.824-.676-1.5-1.5-1.5h-8zm0 1h8c.281 0 .5.219.5.5v8c0 .281-.219.5-.5.5h-8a.492.492 0 0 1-.5-.5v-8c0-.281.219-.5.5-.5zm9.5 2h1.5c.281 0 .5.219.5.5v8c0 .281-.219.5-.5.5h-8a.492.492 0 0 1-.5-.5v-.5h5.5c.824 0 1.5-.676 1.5-1.5V350z"
        fill={color}
      />
    </svg>
  )
}

export function ArrayLeft() {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ isolation: 'isolate' }}
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
}

export function Menu() {
  return (
    <svg
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{ isolation: 'isolate' }}
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
}
