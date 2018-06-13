import * as assert from 'assert'
import * as Styles from '../App/Artboard/style'
import * as fs from 'fs'
import * as path from 'path'
import { getNodeRect } from '../App/Artboard/State'

const readFile = (file: string) =>
  fs.readFileSync(path.resolve(__dirname, file), 'utf8')

const getSVGDom = (file: string) => {
  const svgStr = readFile(file)
  const div = document.createElement('div')
  div.innerHTML = svgStr
  const $svg = div.querySelector('svg')!
  document.body.appendChild(div)
  return $svg
}

namespace files {
  export const xd = {
    category: () => getSVGDom(`./fixtures/uikit/xd/Category.svg`),
  }

  export const shadow = {
    xd: () => getSVGDom(`./fixtures/xd/shadow.svg`),
    sketch: () => getSVGDom(`./fixtures/sketch/shadow.svg`),
    gravit: () => getSVGDom(`./fixtures/gravit/shadow.svg`),
  }
}

function testCss($svg: SVGSVGElement, sel: string, expect: string, msg?: string) {
  let el = $svg.querySelector(sel)! as SVGRectElement
  let rect = getNodeRect(el, $svg.getBoundingClientRect())
  let result = Styles.getCss(el, rect, $svg).trim()
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
      width: 343px;
      height: 120px;
      border-radius: 8px;
      background-image: linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
      opacity: 0.3;`)

    testCss($svg, '#test2', `
      width: 343px;
      height: 74px;
      background-image: linear-gradient(3.14deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
      opacity: 0.3;`)

    testCss($svg, '#test3', `
      font-size: 28px;
      letter-spacing: 0.36px;
      color: #ffffff;`)
  })
})

describe('shadow', () => {
  let $svg: SVGSVGElement
  it('xd', () => {
    $svg = files.shadow.xd()
    testCss($svg, '#test1', `
    width: 83px;
    height: 49px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(0, 0, 0, 0.5);`)
  })
  it('sketch', () => {
    $svg = files.shadow.sketch()
    testCss($svg, '#test1', `
    width: 343px;
    height: 160px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(0, 0, 0, 0.5);`)
  })
  it('gravit', () => {
    $svg = files.shadow.gravit()
    testCss($svg, '#test1', `
    width: 103px;
    height: 68px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
    background-color: #ebebeb;
    `)
  })
})
