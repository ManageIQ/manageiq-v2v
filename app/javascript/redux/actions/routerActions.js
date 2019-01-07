import { push } from 'connected-react-router';

export const redirectTo = path => (dispatch, getState) => {
  // NOTE: to avoid pushing the same path to history and throwing error
  if (getState().router.location.pathname !== path) {
    dispatch(push(path));
  }
};
