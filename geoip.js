var countries = [],
	midpoints = [],
	numcountries = 0,
	ready = false;

module.exports = geoip = {
   lookup: function(ip) {
	   if(!ready) {
		   console.log("geoip warming up");
	       return {code: "N/A", name: "UNKNOWN"};
	   }
	   
	   return find(ip);
   }
};

/**
 * A qcuick little binary search
 * @param ip the ip we're looking for
 * @return {*}
 */
function find(ip) {

   var parts = ip.split(".");
   var target_ip = parseInt(parts[3], 10) +
      (parseInt(parts[2], 10) * 256) +
      (parseInt(parts[1], 10) * 65536) +
      (parseInt(parts[0], 10) * 16777216);

   var idxMin = 0;
   var idxMiddle = 0;
   var idxMax = numcountries - 1;
   var pickedCountry = undefined;
   while (idxMin < idxMax) {
      idxMiddle = (idxMax + idxMin) >> 1;
      pickedCountry = countries[idxMiddle];
      // determine which subarray to search
      if (pickedCountry.ipstart < target_ip) {
         // change min index to search upper subarray
         idxMin = idxMiddle + 1;
      } else if (pickedCountry.ipstart > target_ip) {
         // change max index to search lower subarray
         idxMax = idxMiddle - 1;
      } else {
         // key found at index imid
         return pickedCountry;
      }
   }
   // return previous found country.
   return pickedCountry;
}

/**
* Prepare the data.  This uses the standard free GeoIP CSV database 
* from MaxMind, you should be able to update it at any time by just
* overwriting GeoIPCountryWhois.csv with a new version.
*/
(function() {

    var fs = require("fs");
    var sys = require("sys");
    var stream = fs.createReadStream(__dirname + "/GeoIPCountryWhois.csv");
    var buffer = "";

    stream.addListener("data", function(data) {
        buffer += data.toString().replace(/"/g, "");
    });

    stream.addListener("end", function() {

        var entries = buffer.split("\n");

        for(var i=0; i<entries.length; i++) {
            var entry = entries[i].split(",");
            if (entry.length > 5) {
                countries.push({ipstart: parseInt(entry[2]), code: entry[4], name: entry[5].trim()});
            }
        }

        countries.sort(function(a, b) {
            return a.ipstart - b.ipstart;
        });

        numcountries = countries.length;
        var n = numcountries;
        while(n >= 1) {
            n = n >> 1;
            midpoints.push(n);
        }

		    ready = true;
    });

}());