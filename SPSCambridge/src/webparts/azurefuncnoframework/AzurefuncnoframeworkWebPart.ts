import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AzurefuncnoframeworkWebPart.module.scss';
import * as strings from 'AzurefuncnoframeworkWebPartStrings';
import { AadHttpClient, HttpClient } from '@microsoft/sp-http';


export interface IAzurefuncnoframeworkWebPartProps {
  description: string;
}

export default class AzurefuncnoframeworkWebPart extends BaseClientSideWebPart<IAzurefuncnoframeworkWebPartProps> {

  public render(): void {

    let funcUrl = "https://cambridgefunctionapp.azurewebsites.net/api/values";

    console.log(this.context.aadHttpClientFactory);
  
    this.context.aadTokenProviderFactory.getTokenProvider().then(provider => {
      provider.getToken("43621dac-6b7f-49b3-a863-b1bfc203ee5d").then(val => {
         console.log("have token");
          
  
          const headers = new Headers();
          headers.append("Authorization","Bearer " + val);
          headers.append('Content-Type', 'application/json');
          console.log("Bearer " + val);
  
  
          this.context.httpClient.fetch(funcUrl, HttpClient.configurations.v1, { headers : headers }).then(response => {
              console.log("fetchgood");
                  if (response.ok)
                  {
                     response.json().then(data => {console.log(data);});
                  }
                  console.log(response);
  
          }).catch(err =>
              {
                  console.log("err token");
                  console.log(err);
                 
              });
  
  
      });
  
  });



    // this.context.aadHttpClientFactory.getClient("43621dac-6b7f-49b3-a863-b1bfc203ee5d") // Application ID
    //   .then(client => {
    //     client.get(funcUrl, AadHttpClient.configurations.v1)
    //       .then(response => {
    //         console.log(response);
    //         if (response.ok) {
    //           response.json().then(value => {
    //             console.log(value);
    //             this.domElement.innerHTML = "<div>" + value[0] + "</div>";
    //           });
    //         }
    //       });
    //   });

    
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
