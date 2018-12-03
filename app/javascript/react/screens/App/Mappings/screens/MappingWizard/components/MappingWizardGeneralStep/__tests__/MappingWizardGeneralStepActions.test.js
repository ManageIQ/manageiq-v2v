import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import * as actions from '../MappingWizardGeneralStepActions';
import { requestConversionHostsData } from '../mappingWizardGeneralStep.fixtures';
import { initialState } from '../MappingWizardGeneralStepReducer';
import { mockRequest, mockReset } from '../../../../../../../../../common/mockRequests';

const middlewares = [thunk, promiseMiddleware()];
const mockStore = configureMockStore(middlewares);
const store = mockStore(initialState);

afterEach(() => {
  store.clearActions();
  mockReset();
});

describe('mappingWizard general step actions', () => {
  it('should dispatch correct action on setEditingMappingAction', () => {
    store.dispatch(actions.setEditingMappingAction(null));
    expect(store.getActions()).toMatchSnapshot();
  });

  it('should fetch conversion hosts and return PENDING and FULFILLED action', () => {
    const { fetchConversionHostsUrl } = requestConversionHostsData;
    mockRequest({
      fetchConversionHostsUrl,
      status: 200
    });
    return store.dispatch(actions.fetchConversionHostsAction(fetchConversionHostsUrl)).then(() => {
      expect(store.getActions()).toMatchSnapshot();
    });
  });
});
