import React from 'react';
import { shallow } from 'enzyme';
import DatastoresStepForm from '../DatastoresStepForm';

import { sourceClusters, targetClusters, sourceDatastores, targetDatastores } from '../DatastoresStepForm.fixtures';

let selectedCluster;
let targetCluster;
let selectedClusterMapping;
let props;

beforeEach(() => {
  [selectedCluster] = sourceClusters;
  [targetCluster] = targetClusters;
  selectedClusterMapping = {
    ...targetCluster,
    nodes: [selectedCluster]
  };
  props = { selectedCluster, selectedClusterMapping };
});

describe('#removeNode', () => {
  let input;
  beforeEach(() => {
    input = { onChange: jest.fn() };
    props = {
      ...props,
      sourceDatastores,
      targetDatastores
    };
  });

  test('removes selected target datastore along with its mapped source datastores', () => {
    const [datastore1, datastore2, datastore3] = sourceDatastores;
    const [targetDatastoreToRemove, targetDatastoreShouldRemain] = targetDatastores;
    input = {
      ...input,
      value: [
        {
          ...targetCluster,
          nodes: [
            {
              ...targetDatastoreToRemove,
              nodes: [datastore1, datastore2]
            },
            {
              ...targetDatastoreShouldRemain,
              nodes: [datastore3]
            }
          ]
        }
      ]
    };

    const wrapper = shallow(<DatastoresStepForm {...props} input={input} />);

    wrapper.find('MappingWizardTreeView').prop('selectNode')({
      ...targetDatastoreToRemove,
      nodes: [datastore1, datastore2]
    });
    wrapper.find('MappingWizardTreeView').prop('removeNode')();

    expect(input.onChange).toHaveBeenLastCalledWith([
      {
        ...targetCluster,
        nodes: [
          {
            ...targetDatastoreShouldRemain,
            nodes: [datastore3]
          }
        ]
      }
    ]);
  });

  test('removes entire datastores mapping if all target datastores are removed', () => {
    const [datastore1, datastore2] = sourceDatastores;
    const [targetDatastoreToRemove] = targetDatastores;
    input = {
      ...input,
      value: [
        {
          ...targetCluster,
          nodes: [
            {
              ...targetDatastoreToRemove,
              nodes: [datastore1, datastore2]
            }
          ]
        }
      ]
    };

    const wrapper = shallow(<DatastoresStepForm {...props} input={input} />);

    wrapper.find('MappingWizardTreeView').prop('selectNode')({
      ...targetDatastoreToRemove,
      nodes: [datastore1, datastore2]
    });
    wrapper.find('MappingWizardTreeView').prop('removeNode')();

    expect(input.onChange).toHaveBeenLastCalledWith([]);
  });

  test('removes selected source datastore', () => {
    const [datastoreToRemove, datastoreShouldRemain] = sourceDatastores;
    const [targetDatastore] = targetDatastores;
    input = {
      ...input,
      value: [
        {
          ...targetCluster,
          nodes: [
            {
              ...targetDatastore,
              nodes: [datastoreToRemove, datastoreShouldRemain]
            }
          ]
        }
      ]
    };

    const wrapper = shallow(<DatastoresStepForm {...props} input={input} />);

    wrapper.find('MappingWizardTreeView').prop('selectNode')(datastoreToRemove);
    wrapper.find('MappingWizardTreeView').prop('removeNode')();

    expect(input.onChange).toHaveBeenLastCalledWith([
      {
        ...targetCluster,
        nodes: [
          {
            ...targetDatastore,
            nodes: [datastoreShouldRemain]
          }
        ]
      }
    ]);
  });

  test('removes entire node if all source datastores are removed', () => {
    const [datastoreToRemove, datastoreShouldRemain] = sourceDatastores;
    const [targetDatastoreToRemove, targetDatastoreShouldRemain] = targetDatastores;
    input = {
      ...input,
      value: [
        {
          ...targetCluster,
          nodes: [
            {
              ...targetDatastoreToRemove,
              nodes: [datastoreToRemove]
            },
            {
              ...targetDatastoreShouldRemain,
              nodes: [datastoreShouldRemain]
            }
          ]
        }
      ]
    };

    const wrapper = shallow(<DatastoresStepForm {...props} input={input} />);

    wrapper.find('MappingWizardTreeView').prop('selectNode')(datastoreToRemove);
    wrapper.find('MappingWizardTreeView').prop('removeNode')();

    expect(input.onChange).toHaveBeenLastCalledWith([
      {
        ...targetCluster,
        nodes: [
          {
            ...targetDatastoreShouldRemain,
            nodes: [datastoreShouldRemain]
          }
        ]
      }
    ]);
  });
});

describe('#selectSourceDatastore', () => {
  let input;
  let hideAlertAction;
  let showAlertAction;

  beforeEach(() => {
    input = { value: [], onChange: jest.fn() };
    hideAlertAction = jest.fn();
    showAlertAction = jest.fn();
    props = {
      ...props,
      input,
      hideAlertAction,
      showAlertAction
    };
  });
});

describe('#selectTargetDatastore', () => {
  let input;
  let hideAlertAction;
  let showAlertAction;

  beforeEach(() => {
    input = { value: [], onChange: jest.fn() };
    hideAlertAction = jest.fn();
    showAlertAction = jest.fn();
    props = {
      ...props,
      input,
      hideAlertAction,
      showAlertAction
    };
  });
});
