import * as assert from 'assert'
import * as Styles from '../App/Artboard/style'
import * as fs from 'fs'
import * as path from 'path'
import { getNodeRect } from '../App/Artboard/State'

global['__DEV__'] = true

const readFile = (file: string) =>
  fs.readFileSync(path.resolve(__dirname, file), 'utf8')

const getSVGDom = (file: string) => () => {
  const svgStr = readFile(file)
  const div = document.createElement('div')
  div.innerHTML = svgStr
  const $svg = div.querySelector('svg')!
  document.body.appendChild(div)
  return $svg
}

namespace files {
  export const xd = {
    category: getSVGDom(`./fixtures/uikit/xd/Category.svg`),
  }

  export const rectMerge = getSVGDom(`./fixtures/sketch/rect-merge.svg`)

  export const shadow = {
    xd: getSVGDom(`./fixtures/xd/shadow.svg`),
    sketch: getSVGDom(`./fixtures/sketch/shadow.svg`),
    gravit: getSVGDom(`./fixtures/gravit/shadow.svg`),
  }
}

function testCss($svg: SVGSVGElement, sel: string, expect: string, msg?: string) {
  let el = $svg.querySelector(sel)! as SVGRectElement
  let rect = getNodeRect(el, $svg.getBoundingClientRect())
  let result = Styles.getCss(el, $svg, rect).trim()
  console.log('el', el.outerHTML, result)
  expect = expect.split('\n').map(s => s.trim()).join('\n').trim()
  assert.equal(result, expect, msg || sel)
}

describe('uikit', () => {
  let $svg: SVGSVGElement
  let el: SVGElement
  it('xd', () => {
    $svg = files.xd.category()

    testCss($svg, '#test1', `
      background-image: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
      opacity: .3;
      border-radius: 8px;
      width: 343px;
      height: 120px;
    `)

    testCss($svg, '#test2', `
      background-image: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
      opacity: .3;
      border-radius: 8px;
      width: 343px;
      height: 74px;
    `)

    testCss($svg, '#test3', `
      font-size: 28px;
      line-height: 34px;
      letter-spacing: .36px;
      color: #ffffff;`)
  })
})

describe('shadow', () => {
  let $svg: SVGSVGElement
  it('xd', () => {
    $svg = files.shadow.xd()
    testCss($svg, '#test1', `
      background-color: #ffffff;
      border: 1px solid #707070;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
      width: 82px;
      height: 72px;
    `)
  })
  it('sketch', () => {
    $svg = files.shadow.sketch()
    testCss($svg, '#test1', `
      box-shadow: 0 2px 4px rgba(0, 0, 0, .5), inset 0 1px 3px rgba(0, 0, 0, .5);
      width: 343px;
      height: 160px;
    `)
  })
  it('gravit', () => {
    $svg = files.shadow.gravit()
    testCss($svg, '#test1', `
      background-color: #ebebeb;
      box-shadow: 1px 2px 5px rgba(0, 0, 0, .5);
      width: 103px;
      height: 68px;
    `)
  })

  it('rect-merge', () => {
    $svg = files.rectMerge()
    testCss($svg, '#test1', `
      background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
      border-radius: 12px;
      border: 1px solid #979797;
      background-color: #000000;
      width: 82px;
      height: 56px;
    `)
  })
})
