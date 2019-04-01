import { useEffect } from 'react'
import { connect } from 'react-redux'

import { pull } from 'src/collections/Session/actions'

function InitializeSessionContainer(props) {
  useEffect(() => {
    props.pull()
  })

  return pug`
    = props.children
  `
}

const mapDispatchToProps = {
  pull: pull.init,
}

export default connect(null, mapDispatchToProps)(InitializeSessionContainer)
