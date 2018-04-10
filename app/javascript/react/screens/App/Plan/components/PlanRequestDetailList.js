import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ListView, Spinner, Tooltip, UtilizationBar } from 'patternfly-react';
import { IsoElpasedTime } from '../../../../../components/dates/IsoElapsedTime';

const PlanRequestDetailList = ({ planRequestTasks }) => (
  <ListView className="plan-request-details-list">
    {planRequestTasks.map(task => {
      let leftContent;
      if (task.message === 'Pending') {
        leftContent = <ListView.Icon name="pending" />;
      } else if (task.message === 'VM Transformations completed') {
        leftContent = <ListView.Icon type="fa" name="check" />;
      } else {
        leftContent = <Spinner loading />;
      }
      const currentTime = new Date();
      const startDateTime = new Date(task.delivered_on);
      const lastUpdateDateTime = new Date(task.updated_on);
      const elapsedTime = IsoElpasedTime(
        startDateTime,
        task.completed ? lastUpdateDateTime : currentTime
      );
      const label = sprintf(
        __('%s of %s Migrated'),
        task.diskSpaceCompletedGb,
        task.totalDiskSpaceGb
      );

      return (
        <ListView.Item
          key={task.id}
          leftContent={leftContent}
          heading={task.transformation_host_name}
          additionalInfo={[
            <div style={{ paddingRight: 60 }}>
              <span>
                <strong>{__('Started')}: </strong>
                {moment(startDateTime).format('YYYY-MM-DD HH:mm:ss A')}
              </span>
              <br />
              <span>
                <strong>{__('Elapsed')}: </strong>
                {elapsedTime}
              </span>
            </div>,
            task.message
          ]}
          actions={
            <UtilizationBar
              now={task.percentComplete}
              min={0}
              max={100}
              description={label}
              label=" "
              usedTooltipFunction={(max, now) => (
                <Tooltip id={Date.now()}>
                  {now} % {__('Migrated')}
                </Tooltip>
              )}
              availableTooltipFunction={(max, now) => (
                <Tooltip id={Date.now()}>
                  {max - now} % {__('Remaining')}
                </Tooltip>
              )}
              descriptionPlacementTop
            />
          }
          stacked
        />
      );
    })}
  </ListView>
);

PlanRequestDetailList.propTypes = {
  planRequestTasks: PropTypes.array
};

export default PlanRequestDetailList;
