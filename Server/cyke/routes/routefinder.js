var jsts = require('jsts');
var fs = require("fs");

// Constructor
class routefinder{

     constructor(carweight) {
          this.carweight = carweight;
          var arr = undefined;

          const csvFilePath='../../north_carolina_bicycle_crash_data_heatmap_.csv';
          const csv=require('csvtojson')
          csv()
          .fromFile(csvFilePath)
               .on('json',(jsonObj)=>{
                    arr = jsonObj;
                    // combine csv header row and csv line to a json object
                    // jsonObj.a ==> 1 or 4
               })
               .on('done',(error)=>{
                    console.log('end')
               })
               console.log(arr);
}

getCSV(){
     return this.arr;
}

csvJSON(csv){

  var lines=csv.split("\n");
  console.log(lines);
  var result = [];

  var headers=lines[0].split(",");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(",");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

     }


  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
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
