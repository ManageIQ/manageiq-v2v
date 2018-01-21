import React from 'react';
import { Button, Breadcrumb, BreadcrumbItem, EmptyState } from 'patternfly-react';

export default () => (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item href="#">Compute</Breadcrumb.Item>
      <Breadcrumb.Item href="#">Migration</Breadcrumb.Item>
      <Breadcrumb.Item active>Overview</Breadcrumb.Item>
    </Breadcrumb>
    <hr />
    <EmptyState>
      <EmptyState.Icon />
      <EmptyState.Title>Empty State Title</EmptyState.Title>
      <EmptyState.Info>
        This is the Empty State component. The goal of a empty state pattern is to provide a good
        first impression that helps users to achieve their goals. It should be used when a view is
        empty because no objects exists and you want to guide the user to perform specific actions.
      </EmptyState.Info>
      <EmptyState.Help>
        For more information please see
        <a href="#">pfExample</a>
      </EmptyState.Help>
      <EmptyState.Action>
        <Button bsStyle="primary" bsSize="large">
          Main Action
        </Button>
      </EmptyState.Action>
      <EmptyState.Action secondary>
        <Button title="Perform an action">Secondary Action 1</Button>
        <Button title="Perform an action">Secondary Action 2</Button>
        <Button title="Perform an action">Secondary Action 3</Button>
      </EmptyState.Action>
    </EmptyState>
  </div>
);
