const BASE_URL = 'http://localhost:3001';
const GRAPHQL_PATH = '/graphql';

class xhr {
  static buildHeaders() {
    const headers = {
      'Content-type': 'application/json'
    }

    return headers;
  }

  static callApi({query, path = GRAPHQL_PATH, method='POST', variables}) {
    const options = {
      method,
      mode: 'cors',
      headers: this.buildHeaders()
    }

    options.body = JSON.stringify({query, variables: variables});

    return fetch(BASE_URL + path, options)
      .then(responce => responce.json())
      .then(data => {
      	if (data.errors) throw new Error(data.errors);
      	return data
      })
      .catch(err => err)
  }
}

export {xhr};