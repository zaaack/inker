import * as React from 'react'
import * as Hydux from 'hydux'
import { SVGFile, RectLayer } from 'App/Artboard/State'
import { cx, css } from 'emotion'
import TopBar from 'App/Widgets/TopBar'
import * as Icons from 'Icons'
import * as Utils from 'utils'
import { getIn } from 'hydux-mutator'
import Clipboard from 'react-clipboard.js'
// import * as Prism from 'prismjs'
// import 'prismjs/themes/prism-solarizedlight.css'
import * as hljs from 'highlight.js/lib/highlight.js'
// import * as hljs from 'highlight.js'
import * as hljsCss from 'highlight.js/lib/languages/css.js'
import 'highlight.js/styles/vs2015.css'
import * as LRUCache from 'lru-cache'

hljs.registerLanguage('css', hljsCss)

const { Cmd } = Hydux
export interface PanelItem {
  title: string
  content: string
  processor?: (v: string) => string
}
export const init = () => ({
  state: {
    visible: true,
    selected: null as null | RectLayer,
    items: [] as PanelItem[],
    animIdx: -1,
  },
  cmd: Cmd.none,
})

const cache = new LRUCache<string, string>({ max: 10 })
export const actions = {
  setSelected: (selected: null | RectLayer, css: string) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    state = {
      ...state,
      visible: !!selected,
      selected,
    }
    if (selected) {
      state.items = []
      let innerText = selected.node.textContent
      innerText = innerText && innerText.trim()
      if (innerText) {
        state.items.push({
          title: 'Text Content',
          content: innerText,
        })
      }
      if (css) {
        state.items.push({
          title: 'CSS',
          content: css,
          processor(v) {
            try {
              let key = v
              let cachedV = cache.get(key)
              if (cachedV) return cachedV

              v = hljs.highlightAuto(`.cls {${v}}`, ['css']).value.trim()
              console.log('v', v)
              v = v.replace(/<[^>]*hljs-selector-class[^>]*>[^<]*<\/span>/, '')
              v = v.trim().slice(1, -1)
              cache.set(key, v)
              return v
            } catch (error) {
              console.error(error)
            }
            return v
          }
        })
      }
    }
    return state
  },
  setAnimIdx: (animIdx: number) => (state: State, actions: Actions): Hydux.AR<State, Actions> => {
    return [
      { animIdx },
      Cmd.ofSub(
        _ =>
          animIdx >= 0 && setTimeout(_.setAnimIdx, 300, -1)
      )
    ]
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

    .btn-copy {
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
  content,
  displayContent,
  onCopyAnim,
  animate
}: PanelItem & {
  displayContent: string
  onCopyAnim: () => void
  animate: boolean
}) {
  return (
    <div className={panelCss}>
      <div className="title">
        {title}
        <Clipboard onClick={onCopyAnim} component="div" className={cx('btn-copy', animate && 'anim')} data-clipboard-text={content}>
          <Icons.Copy />
        </Clipboard>
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: displayContent }}></div>
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
  &::-webkit-scrollbar {
    display: none;
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
        {state.items.map(
          (item, i) => (
            <PropsPanel
              title={item.title}
              content={item.content}
              displayContent={item.processor ? item.processor(item.content) : item.content}
              onCopyAnim={() => actions.setAnimIdx(i)}
              animate={i === state.animIdx}
            />
          )
        )}
        <div className={cx(panelCss, 'info')}>
          Powered by <a target="_blank" href="https://github.com/hydux/hydux">hydux</a>
        </div>
      </div>
    </div>
  )
}

export type Actions = typeof actions
export type State = ReturnType<typeof init>['state']
