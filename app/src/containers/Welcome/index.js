import FormContainer from 'src/containers/FormContainer';

class Welcome extends React.Component {
  state = {
    show: false
  }

  onShowRequest = () => {this.setState({show: !this.state.show});};

  render() {
  	return(
  	  <div>
  	    <h1>Welcome</h1>
  	    {this.state.show
  	    	?
  	      <a href="#welcome" onClick={this.onShowRequest}>Close Organization form</a>
  	        :
  	      <span>
  	        You can
  	        <a href="#create" onClick={this.onShowRequest}> create new Organization </a>
  	        to start use this service
  	      </span>
  	    }
        {this.state.show && <FormContainer />}
      </div>
  	)
  }
}

export default Welcome