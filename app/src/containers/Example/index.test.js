import { shallow } from 'enzyme'
import Component from '.'

const requiredProps = {
  status: '',
  fetch: () => null,
}

it('is rendered', () => {
  shallow(pug`Component(...requiredProps)`)
})
