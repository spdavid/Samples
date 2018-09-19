import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { MSGraphClient } from '@microsoft/sp-http';

import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

import styles from './PlannertasksnoframeworkWebPart.module.scss';
import * as strings from 'PlannertasksnoframeworkWebPartStrings';

export interface IPlannertasksnoframeworkWebPartProps {
  description: string;
}

export default class PlannertasksnoframeworkWebPart extends BaseClientSideWebPart<IPlannertasksnoframeworkWebPartProps> {

  public render(): void {
    this.context.msGraphClientFactory.getClient()
      .then((client: MSGraphClient): void => {
        client.api('/me/planner/tasks')
          .get((error, response: any, rawResponse?: any) => {
            let tasks = response.value as MicrosoftGraph.PlannerTask[];
            this.domElement.innerHTML = "";
            tasks.forEach(task => {
              this.domElement.innerHTML += `<div>${task.title}</div>`;
            });
            
          });
      });



   
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
