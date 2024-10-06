// types/jquery.sticky.d.ts
import * as $ from 'jquery';

declare global {
    interface JQuery {
        sticky(options?: any): JQuery;
    }
}

export {};
