import * as React from 'react';
import styles from './MyPlannerTasks.module.scss';
import { IMyPlannerTasksProps } from './IMyPlannerTasksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { MSGraphClient } from '@microsoft/sp-http';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

export default class MyPlannerTasks extends React.Component<IMyPlannerTasksProps, {}> {

  public componentWillMount() {
    this.props.context.msGraphClientFactory.getClient()
      .then((client: MSGraphClient): void => {
        client.api('/me/planner/tasks')
        .get((error, plannerTasksResponse: any, rawResponse?: any) => {
          let plannerTasks = plannerTasksResponse.value as MicrosoftGraph.PlannerTask[];
          plannerTasks.forEach(task => {
            console.log(task.title);
          });
          console.log(plannerTasks);
      });
      });
  }


  public render(): React.ReactElement<IMyPlannerTasksProps> {
    return (
      <div className={styles.myPlannerTasks}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>Welcome to SharePoint!</span>
              <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
              <p className={styles.description}>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={styles.button}>
                <span className={styles.label}>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
