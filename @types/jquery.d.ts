import * as jquery from 'jquery';

declare module 'jquery' {
    interface JQuery {
      sticky(options?: any): JQuery;
    }
  }
  