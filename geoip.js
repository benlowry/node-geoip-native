var countryNamesAndCodes = require('./generated-namesandcodes.js').countryNamesAndCodes;
var countries = require('./generated-countries.js').countries;
var countriesLength = countries.length;

module.exports = geoip = {
   lookup:function (ip) {
      return find(ip);
   }
};

/**
 * @param ip the ip we're looking for
 * @return {*}
 * @see http://en.wikipedia.org/wiki/Binary_search_algorithm   (Iterative approach)
 */
function find(ip) {

   var parts = ip.split(".");
   var target_ip = parseInt(parts[3], 10) +
      (parseInt(parts[2], 10) * 256) +
      (parseInt(parts[1], 10) * 65536) +
      (parseInt(parts[0], 10) * 16777216);

   var idxMin = 0;
   var idxMiddle = 0;
   var idxMax = countriesLength - 1;
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
         break;
      }
   }
   // return previous found country.
   return {ipstart:pickedCountry.ipstart, name:countryNamesAndCodes[pickedCountry.idx], code:countryNamesAndCodes[pickedCountry.idx + 1]};
}
