import * as React from 'react';
import styles from './AzureFunctionCall.module.scss';
import { IAzureFunctionCallProps } from './IAzureFunctionCallProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { AadHttpClient, AadHttpClientConfiguration } from '@microsoft/sp-http';

export interface ICallsecuredfunctionState {
  isReady?: boolean;
}


export default class AzureFunctionCall extends React.Component<IAzureFunctionCallProps, ICallsecuredfunctionState> {
  
  private _data : any;

  constructor(props) {
    super(props);

    this.state = { isReady: false };
  }

  public componentWillMount() {
    var client = new AadHttpClient(this.props.context.serviceScope, "0b2fd4a7-2130-46ee-8ce4-05d2c9ccf503")
      .get("https://spscambridgedemo1.azurewebsites.net/api/HttpTriggerJS1?code=no8Rf6TuI8jKtdwnpnAD6Mk3AarDjCb3IvAdP9EP5ZXQA0EwiWLUIw==", AadHttpClient.configurations.v1)
      .then(result => {
        if (result.ok) {
          result.json().then(data => {
            console.log(data);
            this._data = data;
            this.setState({isReady : true});
          });
        }

      });
  }
  
  public render(): React.ReactElement<IAzureFunctionCallProps> {
    if (this.state.isReady) {
      return (
        <div>
          Hello {this._data.developer} from {this._data.location}
        </div>
      );
    }
    else {
      return (
      <div></div>
      );
    }
  }
}
