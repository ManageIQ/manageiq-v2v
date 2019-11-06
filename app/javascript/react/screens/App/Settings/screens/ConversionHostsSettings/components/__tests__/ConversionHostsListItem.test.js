import React from 'react';
import { shallow } from 'enzyme';
import { DropdownKebab, MenuItem } from 'patternfly-react';
import ConversionHostsListItem from '../ConversionHostsListItem';
import { success, inProgress, failed } from '../../../../settings.fixtures';
import ConversionHostRemoveButton from '../ConversionHostRemoveButton';
import ConversionHostRetryButton from '../ConversionHostRetryButton';

const conversionHostEnabled = {
  name: 'Conversion Host 1',
  id: '1',
  vddk_transport_supported: true,
  meta: {
    tasksByOperation: {
      enable: [
        {
          id: '1',
          meta: { isTask: true, operation: 'enable' },
          updated_on: '2019-05-13T18:06:11.849Z',
          ...failed
        },
        {
          id: '2',
          meta: { isTask: true, operation: 'enable', resourceName: 'Conversion Host 1' },
          updated_on: '2019-05-13T18:07:11.849Z',
          context_data: {
            conversion_host_enable: 'MOCK PLAYBOOK LOG OUTPUT',
            conversion_host_check: 'MOCK PLAYBOOK LOG OUTPUT'
          },
          ...success
        }
      ]
    }
  }
};
const conversionHostDisabling = {
  name: 'Conversion Host 1',
  id: '1',
  vddk_transport_supported: true,
  meta: {
    tasksByOperation: {
      enable: [
        {
          id: '1',
          meta: { isTask: true, operation: 'enable' },
          updated_on: '2019-05-13T18:05:11.849Z',
          ...success
        }
      ],
      disable: [
        {
          id: '3',
          meta: { isTask: true, operation: 'disable' },
          updated_on: '2019-05-13T18:07:11.849Z',
          ...inProgress
        },
        {
          id: '2',
          meta: { isTask: true, operation: 'disable' },
          updated_on: '2019-05-13T18:06:11.849Z',
          context_data: { request_params: { mock: 'params' } },
          ...failed
        }
      ]
    }
  }
};
const enableTaskInProgress = {
  id: '1',
  meta: { isTask: true, operation: 'enable' },
  context_data: { request_params: { vmware_vddk_package_url: 'foo' } },
  ...inProgress
};
const enableTaskFailed = {
  id: '1',
  meta: { isTask: true, operation: 'enable' },
  context_data: { request_params: { vmware_vddk_package_url: 'foo' } },
  ...failed
};
const disableTaskFailed = {
  id: '1',
  meta: { isTask: true, operation: 'disable' },
  context_data: { request_params: { vmware_vddk_package_url: 'foo' } },
  ...failed
};

describe('conversion hosts list item', () => {
  const getBaseProps = () => ({
    isTask: false,
    setHostToDeleteAction: jest.fn(),
    showConversionHostDeleteModalAction: jest.fn(),
    setConversionHostTaskToRetryAction: jest.fn(),
    showConversionHostRetryModalAction: jest.fn(),
    isPostingConversionHosts: false,
    saveTextFileAction: jest.fn()
  });

  it('renders correctly with an enabled conversion host', () => {
    const component = shallow(<ConversionHostsListItem {...getBaseProps()} listItem={conversionHostEnabled} />);
    const actions = shallow(component.props().actions);
    expect(actions.find(ConversionHostRemoveButton).props().disabled).toBe(false);
    expect(
      actions
        .find(DropdownKebab)
        .find(MenuItem)
        .props().disabled
    ).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with a conversion host being disabled', () => {
    const component = shallow(<ConversionHostsListItem {...getBaseProps()} listItem={conversionHostDisabling} />);
    const actions = shallow(component.props().actions);
    expect(actions.find(ConversionHostRemoveButton).props().disabled).toBe(true);
    expect(
      actions
        .find(DropdownKebab)
        .find(MenuItem)
        .props().disabled
    ).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with a manually enabled host (no enable task)', () => {
    const host = {
      name: 'Conversion Host 1',
      id: '1',
      meta: { tasksByOperation: {} }
    };
    const component = shallow(<ConversionHostsListItem {...getBaseProps()} listItem={host} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with an in-progress enable task', () => {
    const component = shallow(<ConversionHostsListItem {...getBaseProps()} listItem={enableTaskInProgress} isTask />);
    const actions = shallow(component.props().actions);
    expect(
      actions
        .find(DropdownKebab)
        .find(MenuItem)
        .props().disabled
    ).toBe(true);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with a failed enable task', () => {
    const component = shallow(<ConversionHostsListItem {...getBaseProps()} listItem={enableTaskFailed} isTask />);
    const actions = shallow(component.props().actions);
    expect(actions.find(ConversionHostRetryButton)).toHaveLength(1);
    expect(
      actions
        .find(DropdownKebab)
        .find(MenuItem)
        .props().disabled
    ).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with a failed disable task', () => {
    const component = shallow(<ConversionHostsListItem {...getBaseProps()} listItem={disableTaskFailed} isTask />);
    const actions = shallow(component.props().actions);
    expect(actions.find(ConversionHostRetryButton)).toHaveLength(1);
    expect(
      actions
        .find(DropdownKebab)
        .find(MenuItem)
        .props().disabled
    ).toBe(false);
    expect(component).toMatchSnapshot();
  });

  it('calls the correct action when downloading a log', () => {
    const baseProps = getBaseProps();
    const component = shallow(<ConversionHostsListItem {...baseProps} listItem={conversionHostEnabled} />);
    const actions = shallow(component.props().actions);
    actions
      .find(DropdownKebab)
      .find(MenuItem)
      .simulate('click');
    expect(baseProps.saveTextFileAction).toHaveBeenCalledTimes(1);
    const fileObject = baseProps.saveTextFileAction.mock.calls[0][0];
    expect(fileObject.fileName).toBeTruthy();
    expect(fileObject.fileBody).toBeTruthy();
  });

  it('does not call the save file action when trying to download a bogus log task', () => {
    const baseProps = getBaseProps();
    const task = { ...disableTaskFailed, meta: { isTask: true, operation: 'unknown' } };
    const component = shallow(<ConversionHostsListItem {...baseProps} listItem={task} isTask />);
    const actions = shallow(component.props().actions);
    actions
      .find(DropdownKebab)
      .find(MenuItem)
      .simulate('click');
    expect(baseProps.saveTextFileAction).toHaveBeenCalledTimes(0);
  });
});
