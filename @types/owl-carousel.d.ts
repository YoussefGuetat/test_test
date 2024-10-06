// /@types/owl-carousel.d.ts
import * as jquery from 'jquery';

declare module 'jquery' {
    const $: JQueryStatic;
    export = $;
  }
  
  declare module 'owl.carousel' {
    interface JQuery {
      owlCarousel(options?: any): JQuery;
    }
  }
  
