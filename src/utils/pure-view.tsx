import * as React from 'react'

export class PureView extends React.PureComponent {
  render() {
    return typeof this.props.children === 'function'
      ? (this.props.children as any)()
      : this.props.children
  }
}

export function pure<P = {}>(fn: React.StatelessComponent<P>): React.StatelessComponent<P> {
  return (props: P & { children?: React.ReactNode }) => {
    let { children, ..._props } = props as { children?: React.ReactNode }
    return (
      <PureView {..._props}>
        {() => fn(props)}
      </PureView>
    )
  }
}
