import React from 'react';

import DualPaneMapper from './DualPaneMapper';
import DualPaneMapperList from './DualPaneMapperList';
import DualPaneMapperListItem from './DualPaneMapperListItem';

const source = {
  name: 'Source Clusters',
  count: 2,
  resources: [
    {
      id: 1,
      name: 'VMWareCluster1'
    },
    {
      id: 2,
      name: 'VMWareCluster2'
    }
  ]
};

const target = {
  name: 'Target Clusters',
  count: 2,
  resources: [
    {
      id: 3,
      name: 'RHVCluster1'
    },
    {
      id: 4,
      name: 'RHVCluster2'
    }
  ]
};

class DualPaneMapperContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceClusters: null,
      targetClusters: null
    };
  }

  componentDidMount() {
    this.setState(() => ({ sourceClusters: source, targetClusters: target }));
  }

  render() {
    const { sourceClusters, targetClusters } = this.state;
    return (
      <DualPaneMapper>
        {sourceClusters && (
          <DualPaneMapperList listTitle={sourceClusters.name}>
            {sourceClusters.resources.map(item => (
              <DualPaneMapperListItem displayText={item.name} key={item.id} />
            ))}
          </DualPaneMapperList>
        )}
        {targetClusters && (
          <DualPaneMapperList listTitle={targetClusters.name}>
            {targetClusters.resources.map(item => (
              <DualPaneMapperListItem displayText={item.name} key={item.id} />
            ))}
          </DualPaneMapperList>
        )}
      </DualPaneMapper>
    );
  }
}

export default DualPaneMapperContainer;
