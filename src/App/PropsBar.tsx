import * as React from 'react'
import * as Hydux from 'hydux'
import { SVGFile, RectLayer } from 'App/Artboard/State'
import { cx, css } from 'emotion'
import TopBar from 'App/Widgets/TopBar'
import * as Icons from 'Icons'
import * as Utils from 'utils'
import { getIn, updateIn, setIn } from 'hydux-mutator'
import Clipboard from 'react-clipboard.js'
// import * as Prism from 'prismjs'
// import 'prismjs/themes/prism-solarizedlight.css'
import * as hljs from 'highlight.js/lib/highlight.js'
// import * as hljs from 'highlight.js'
import * as hljsCss from 'highlight.js/lib/languages/css.js'
import 'highlight.js/styles/vs2015.css'
import * as LRUCache from 'lru-cache'

hljs.registerLanguage('css', hljsCss)

export interface Profile {
  name: string
  unit: {
    name: string
    rate: number
  },
  colors: { [k: string]: string }
  lengths: { [k: string]: string }
}

namespace Profile {
  export const init = (): Profile => ({
    name: 'default',
    unit: {
      name: 'px',
      rate: 1,
    },
    colors: {},
    lengths: {},
  })
}

export interface Props {
  text: string
  css: string
  highlightedCss: string
}
export namespace Props {
  export const init = (): Props => ({
    text: '',
    css: '',
    highlightedCss: '',
  })
}

const { Cmd } = Hydux
export const init = () => ({
  state: {
    profile: Profile.init(),
    profileChanged: false,
    profiles: [],
    visible: true,
    selected: null as null | RectLayer,
    animIdx: -1,
    props: Props.init(),
  },
  cmd: Cmd.ofSub<Actions>(
    // tslint:disable-next-line:no-empty
    _ => {
    }
  ),
})

function highlightCss(v: string) {
  let key = v
  let cachedV = cache.get(key)
  if (cachedV) return cachedV
  v = hljs.highlightAuto(`.cls {${v}}`, ['css']).value.trim()
  Utils.log('v', v)
  v = v.replace(/<[^>]*hljs-selector-class[^>]*>[^<]*<\/span>/, '')
  v = v.trim().slice(1, -1)
  cache.set(key, v)
  return v
}

const cache = new LRUCache<string, string>({ max: 10 })
export const actions = {
  setSelected: (selected: null | RectLayer, css: string) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    const props = Props.init()
    state = {
      ...state,
      visible: !!selected,
      selected,
      props,
    }
    if (selected) {
      let { node } = selected
      if (node.tagName === 'tspan') {
        node = node.closest('text') || node
      }
      let innerText = node.textContent
      innerText = innerText && innerText.trim()
      if (innerText) {
        props.text = innerText
      }
      if (css) {
        props.css = css
        props.highlightedCss = highlightCss(css)
      }
    }
    return state
  },
}

const panelCss = css`
  display: block;
  padding: 0 15px;
  & + & {
    margin-top: 20px;
  }

  .title {
    margin: 0 -15px 0 -20px;
    background-color: rgb(70, 70, 70);
    box-shadow: 2px 3px 2px rgba(0, 0, 0, .5);
    font-size: 16px;
    color: #A2A2A2;
    line-height: 30px;
    padding: 0 7px 0 12px;
    margin-bottom: 18px;

    .btn {
      cursor: pointer;
      width: 30px;
      height: 30px;
      float: right;
      box-sizing: border-box;
      padding: 8px;

      &:active {
        transform: scale(1.1);
        transform-origin: center center;
        opacity: 0.5;
      }

      /* &.anim {
        transform: scale(1.5);
        transform-origin: center center;
        opacity: 0.5;
      } */
    }
  }

  .content {
    background-color: #494949;
    box-shadow: inset 0 0 3px rgba(0, 0, 0, .5);
    font-size: 14px;
    color: #E8E8E8;
    white-space: pre-wrap;
    padding: 10px;
    line-hight: 1.3;
  }
`

function PropsPanel({
  title,
  children,
  copyText,
  btns,
  hidden,
}: {
  title: string
  children: React.ReactChildren | React.ReactChild
  copyText?: string
  btns?: React.ReactNode[]
  hidden?: boolean
}) {
  if (hidden) {
    return null
  }
  return (
    <div className={panelCss}>
      <div className="title">
        {title}
        {copyText && (
          <Clipboard component="div" className="btn copy" data-clipboard-text={copyText}>
            <Icons.Copy />
          </Clipboard>
        )}
        {btns}
      </div>
      <div className="content">
        {children}
      </div>
    </div>
  )
}

const rootCss = css`
  width: ${Utils.SideBarWidth + 5}px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  transform: translateX(100%);
  transition: all .3s ease-in-out;
  padding-left: 5px;
  overflow-y: auto;

  & > .wrapper {
    background-color: rgb(46, 46, 46);
    padding-top: ${Utils.TopBarHeight + 30}px;
    box-sizing: border-box;
    min-height: 100%;
  }

  &.visible {
    transform: translateX(0);
  }

  .info {
    margin-top: 40px;
    font-size: 14px;
    &, a, a:active, a:hover {
      color: #cecece;
    }
  }
`

export function view(
  state: State,
  actions: Actions,
) {
  return (
    <div className={cx(rootCss, state.selected && 'visible')}>
      <div className="wrapper">
        <PropsPanel
          title="Text Content"
          copyText={state.props.text}
          hidden={!state.props.text}
        >
          {state.props.text}
        </PropsPanel>
        <PropsPanel
          title="CSS"
          copyText={state.props.css}
          hidden={!state.props.css}
        >
          <div dangerouslySetInnerHTML={{ __html: state.props.highlightedCss }} />
        </PropsPanel>
        <div className={cx(panelCss, 'info')}>
          Powered by <a target="_blank" href="https://github.com/hydux/hydux">hydux</a>
        </div>
      </div>
    </div>
  )
}

export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
