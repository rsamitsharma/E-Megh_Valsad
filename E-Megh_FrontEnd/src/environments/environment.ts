// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: "(DEV)",
  // url: "https://responscity.com/EWSVSApi/", //production
  //url: "https://responscity.com/EWSDEMOApi/",
  // url: "https://responscity.com/EWSDGApi", 
  // url: "http://192.168.27.3:5000", //dev
  url: "http://localhost:5000", //dev
  // url: "http://100.100.100.1:3000",
  //mapKey: 'AIzaSyBPPFR9HkxOfhzqCWfyUjmTC4GDsQ-9A2A',
  // GOOGLE_MAP_KEY: "AIzaSyBPPFR9HkxOfhzqCWfyUjmTC4GDsQ-9A2A",  //dev-chetan
  GOOGLE_MAP_KEY: "AIzaSyAH1sD5rS9AJLiEtLs0MjPfBSuZ_K7Da-g",
  SECRET_KEY: "Acc_Diam_Vinesh_Patel",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
