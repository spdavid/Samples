import {
  WebPartContext
 } from '@microsoft/sp-webpart-base';

export interface IAzureFunctionCallProps {
  description: string;
  context: WebPartContext;
}
