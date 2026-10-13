import measurements from './office-frames.json';
export const OFFICE_FRAMES:Record<string,{x:number;y:number;width:number;height:number}>=measurements;
export const OFFICE_SHEET='./assets/generated-v1/sheets/office_props.png';
// Source-sheet coordinates for the sign's blue panel and brand pixel heart placement.
export const SIGN_PANEL={x:1207,y:743,width:137,height:207};
export const SIGN_HEART={x:1227,y:816,width:94,height:74};
export const SIGN_BLUE=0x0374da;
