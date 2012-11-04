# Node GeoIP Native

This package is a lightning-fast, native JavaScript geoip lookup built on [MaxMind](http://www.maxmind.com/)'s free country database.

It is non-blocking and operates without any IO after initially loading the data into memory.

Results are 4 - 5 times faster than [geoip-lite](https://github.com/bluesmoon/node-geoip) with the caveat that it takes 2 or 3 times longer to initialize and uses 60 or 70 megabytes memory.

This is used in production at [Playtomic](https://playtomic.com/) in a [high volume API](https://success.heroku.com/playtomic) where performance matters.

Benchmarks on my 2011 Macbook Air whilst running lots of software.  The test took the middle 10 results from 20 iterations and averaged them.  The APIs are interchangeable so tests  were identical.

	geoip-native:	average: 1540.3ms / million lookups
	geoip-lite: 	average: 8375.3ms / million lookups

## Requires

1. Comes with the [standard CSV database by MaxMind](http://www.maxmind.com/app/geolite) which may require updating.

## How to use
1. git clone https://github.com/benlowry/node-geoip-native
2. cd node-geoip-native
3. node benchmark.js

or just ```npm install geoip-native```

## Methods

Node GeoIP Native provides methods for:

1. ```lookup``` performs the lookup, takes the ip address as a parameter

## Testing
First, you have to install nodeunit (https://github.com/caolan/nodeunit)

	$> npm install nodeunit

Second, run the unit test:

	$> ./node_modules/nodeunit/bin/nodeunit test/unit/lookupTest.js

## Examples

	var geoip = require("geoip-native");
	var ip = "123.123.123.123";
	geoip.lookup(ip);
	console.log("country: " + ip.name + " / " + ip.code);

	// in practice you'd want:
	// ip = request.headers["x-forwarded-for"] || request.connection.remoteAddress,

### What's missing
Be neat to expand this to include cities.

### License
Copyright [Playtomic Inc](https://playtomic.com), 2012.  Licensed under the MIT license.  Certain portions may come from 3rd parties and carry their own licensing terms and are referenced where applicable.

This product includes GeoLite data created by MaxMind, available from http://www.maxmind.com
