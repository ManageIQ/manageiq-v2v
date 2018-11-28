import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

// Mocking translation function
global.__ = str => str;
global.n__ = str => str;
global.sprintf = str => str;
global.Jed = { sprintf: str => str };
global.API.get = jest.fn(() => Promise.resolve());
global.API.post = jest.fn(() => Promise.resolve());
