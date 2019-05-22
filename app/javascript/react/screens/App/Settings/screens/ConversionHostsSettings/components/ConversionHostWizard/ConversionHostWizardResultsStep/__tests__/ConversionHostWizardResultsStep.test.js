import React from 'react';
import { shallow } from 'enzyme';

import ConversionHostWizardResultsStep from '../ConversionHostWizardResultsStep';

describe('conversion host wizard results step', () => {
  const getBaseProps = () => ({
    postBodies: [{ mock: 'post body' }],
    postConversionHostsAction: jest.fn(),
    postConversionHostsUrl: '/api/mock/conversion_hosts',
    isPostingConversionHosts: false,
    isRejectedPostingConversionHosts: false,
    postConversionHostsResults: null
  });

  it('calls postConversionHostsAction on mount', () => {
    const baseProps = getBaseProps();
    shallow(<ConversionHostWizardResultsStep {...baseProps} />);
    expect(baseProps.postConversionHostsAction).toHaveBeenCalledTimes(1);
    expect(baseProps.postConversionHostsAction).toHaveBeenCalledWith('/api/mock/conversion_hosts', [
      { mock: 'post body' }
    ]);
  });

  it('renders null when not posting, rejected or complete', () => {
    const component = shallow(<ConversionHostWizardResultsStep {...getBaseProps()} />);
    expect(component.get(0)).toBeFalsy();
  });

  it('renders a loading state when posting conversion hosts', () => {
    const component = shallow(<ConversionHostWizardResultsStep {...getBaseProps()} isPostingConversionHosts />);
    expect(component).toMatchSnapshot();
  });

  it('renders an error state when post was rejected', () => {
    const component = shallow(<ConversionHostWizardResultsStep {...getBaseProps()} isRejectedPostingConversionHosts />);
    expect(component).toMatchSnapshot();
  });

  it('renders a success state when there are post results', () => {
    const component = shallow(
      <ConversionHostWizardResultsStep {...getBaseProps()} postConversionHostsResults={[{ mock: 'results' }]} />
    );
    expect(component).toMatchSnapshot();
  });
});
