function ErrorBlock(props) {
  return pug`
    h2= props.label
    pre= props.children
  `
}

export default ErrorBlock
