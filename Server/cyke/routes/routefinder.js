var jsts = require('jsts');
var fs = require("fs");

// Constructor
class routefinder{

     constructor(carweight) {
          this.carweight = carweight;
          this.fixedCrashes = this.getCSV().then(function(resolve){
               this.fixedCrashes = resolve;
               console.log(this.fixedCrashes);
               // this.formatJSONTo2DJSON(resolve).then((resolve)=>{
               //      return resolve;
               // })
          })
     }

getCSV(){
     return new Promise(function (resolve, reject){
          const csvFilePath='../../north_carolina_bicycle_crash_data_heatmap_.csv';
          const csv=require('csvtojson')
          var v = [];
          csv()
          .fromFile(csvFilePath)
               .on('json', (jsonObj) => {
                    v.push(jsonObj);
               })
               .on('done',(error)=>{
                    console.log('ended parsing');
                    return resolve(v);
               })
          }).then((resolve) => {
               console.log("resolved parsing") ;
          })
}

formatJSONTo2DJSON(json){
     return new Promise(function(resolve, reject){
          var fixedCrashes = [];
          var iter = 0;
          json.foreach(function(crash){
               var fixedCrash = [];

               fixedCrash.push({
                    x : crash["BikeInjury"] [0]
               })
               fixedCrash.push({
                    y : crash["BikeInjury"] [1]
               })

               if(crash["BikeInjury"].indexOf("No") > -1) {
                    var BikeInjury = 0;
               }
               else {
                    var BikeInjury = 1;
               }

               fixedCrash.push({
                    BikeInjury: BikeInjury
               })
               fixedCrash.push(crash["CrashTime"]);

               fixedCrashes.push(fixedCrash);
               iter++;
          })
          console.log("iterated through " + iter +" crashes and parsed into 3; json");
          console.log(fixedCrashes);
          return resolve(fixedCrashes);
     })
}

     // class methods
     getAllRoutesFromMaps() {
           var routes = mapsAPI();
          routes.foreach(function(route) {
               route.foreach(function(roads){
                    roads.foreach(function(polygon){
                         console.log(polygon);
                    })
               })
          } )
     };


}
// export the class
exports.routefinder = routefinder;
