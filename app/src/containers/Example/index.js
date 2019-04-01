import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetch } from 'src/collections/Example/actions'

class ExampleContainer extends React.Component {
  componentDidMount() {
    this.props.fetch()
  }

  render = () => pug`
    p I'm a container. From store: #{this.status()}
  `

  status = () => this.props.status
}

ExampleContainer.propTypes = {
  status: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
}

const mapStateToProps = ({ example }) => ({
  status: example.status,
})

const mapDispatchToProps = {
  fetch: fetch.init,
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleContainer)
