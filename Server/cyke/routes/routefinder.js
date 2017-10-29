var jsts = require('jsts');
var fs = require("fs");
var inside = require('point-in-polygon');

function distance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	return dist
}
function fatRoad(lat, long, startLat,startLong, stopLat, stopLong) { //Border lat longs
  var antiSlope = -(stopLat-startLat)/(stopLong-startLong);
  var bufferX = .002;
  var Blat1 = startLat + bufferX;
  var Blat2 = startLat - bufferX;
  var Blat3 = stopLat + bufferX;
  var Blat4 = stopLat - bufferX;
  var Blong1 = startLong + antiSlope*bufferX;
  var Blong2 = startLong - antiSlope*bufferX;
  var Blong3 = stopLong + antiSlope*bufferX;
  var Blong4 = stopLong - antiSlope*bufferX;

  var polygon = [ [Blat1, Blon1], [Blat2, Blon2], [Blat3, Blon3], [Blat4, Blon4] ];
  return inside([ lat,long ], polygon);
}

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
