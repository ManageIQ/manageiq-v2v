import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid } from 'patternfly-react';
import { IsoElpasedTime } from '../../../../../../components/dates/IsoElapsedTime';

const MigrationsCompletedList = ({
  finishedTransformationPlans,
  retryClick,
  loading
}) => (
  <Grid.Col xs={12}>
    <ListView style={{ marginTop: 0 }}>
      {finishedTransformationPlans.map(plan => {
        const [mostRecentRequest] = plan.miq_requests.slice(-1);
        const failed = mostRecentRequest.status === 'failed';

        const tasks = {};
        plan.miq_requests.forEach(request => {
          request.miq_request_tasks.forEach(task => {
            tasks[task.source_id] = task.status === 'Ok';
          });
        });

        let succeedCount = 0;
        Object.values(tasks).forEach(value => {
          if (value) succeedCount += 1;
        });

        const elapsedTime = IsoElpasedTime(
          new Date(mostRecentRequest.created_on),
          new Date(mostRecentRequest.options.delivered_on)
        );

        const url = `/api/service_templates/${plan.id}`;

        return (
          <ListView.Item
            key={plan.id}
            leftContent={
              <ListView.Icon
                type="pf"
                name={failed ? 'error-circle-o' : 'ok'}
                size="md"
                style={{ width: 'inherit', backgroundColor: 'transparent' }}
              />
            }
            heading={plan.name}
            additionalInfo={[
              <ListView.InfoItem
                key={`${plan.id}-migrated`}
                style={{ paddingRight: 40 }}
              >
                <ListView.Icon type="pf" size="lg" name="screen" />&nbsp;<strong
                >
                  {succeedCount}
                </strong>{' '}
                {__('of')} &nbsp;<strong>{Object.keys(tasks).length} </strong>
                {__('VMs successfully migrated.')}
              </ListView.InfoItem>,
              <ListView.InfoItem key={`${plan.id}-elapsed`}>
                <ListView.Icon type="fa" size="lg" name="clock-o" />
                {elapsedTime}
              </ListView.InfoItem>
            ]}
            actions={
              (failed && (
                <Button
                  onClick={() => {
                    retryClick(url);
                  }}
                  disabled={loading === url}
                >
                  Retry
                </Button>
              )) ||
              (!failed && <div style={{ width: 50 }} />)
            }
          />
        );
      })}
    </ListView>
  </Grid.Col>
);

MigrationsCompletedList.propTypes = {
  finishedTransformationPlans: PropTypes.array,
  retryClick: PropTypes.func,
  loading: PropTypes.string
};
MigrationsCompletedList.defaultProps = {
  finishedTransformationPlans: [],
  retryClick: noop,
  loading: ''
};

export default MigrationsCompletedList;
