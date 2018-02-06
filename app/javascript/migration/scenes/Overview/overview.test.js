import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { coreComponents } from '../../../components';
import componentRegistry from '../../../components/componentRegistry';

jest.mock('../../../components/componentRegistry');

componentRegistry.registerMultiple(coreComponents);

describe('Overview component', () => {
  it('renders the overview', () => {
    const Overview = componentRegistry.markup('Overview');
    const wrapper = mount(Overview);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
