import React from 'react';
import { ListView } from 'patternfly-react';
import { Row, Col } from 'react-bootstrap';
import {
  mockListItems,
  renderActions,
  renderAdditionalInfoItems
} from './__mocks__/mockListItems';

const Dashboard = () => (
  <div>
    <h1>Dashboard Page</h1>

    <ListView>
      {mockListItems.map((item, index) => (
        <ListView.Item
          key={item.id}
          actions={renderActions(item.actions)}
          checkboxInput={<input type="checkbox" />}
          leftContent={<ListView.Icon name="plane" />}
          additionalInfo={renderAdditionalInfoItems(item.properties)}
          heading={item.title}
          description={item.description}
          stacked
        >
          <Row>
            <Col sm={11}>{item.expandedContentText}</Col>
          </Row>
        </ListView.Item>
      ))}
    </ListView>
  </div>
);
export default Dashboard;
