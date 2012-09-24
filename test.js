var geoip = require("./geoip.js");
//var geoip = require("geoip-lite");

var test1 = true;

function test() {

    var total = 0;
    var numtests = 20;
    var numiterations = 1000000;

    console.log("starting test: " + (test1 ? "geoip-native" : "geoip-lite"));

    for(var t=0; t<numtests; t++) {

        var start = new Date().getTime();

        for(var i=0; i<numiterations; i++) {

            var o1 = 1 + Math.round(Math.random() * 254);
            var o2 = 1 + Math.round(Math.random() * 254);
            var o3 = 1 + Math.round(Math.random() * 254);
            var o4 = 1 + Math.round(Math.random() * 254);
            var ip = o1 + "." + o2 + "." + o3 + "." + o4;
            geoip.lookup(ip);
        }

        var finish = new Date().getTime();

        if(t > 4 && t < 15) {
            total += (finish - start);
            console.log("time " + (finish - start));
        }
    }

    console.log("average: " + (total / 10));

    if(!test1) {
        return;
    }

    geoip = require("geoip-lite");
    test1 = false;
    test();
}

setTimeout(test, 3000);

/*
benchmark results:

 geoip-native
 time 1500
 time 1824
 time 1526
 time 1495
 time 1543
 time 1509
 time 1511
 time 1492
 time 1505
 time 1498
 average: 1540.3

 geoip-lite
 time 8339
 time 8335
 time 8314
 time 8327
 time 8631
 time 8315
 time 8512
 time 8303
 time 8416
 time 8261
 average: 8375.3*/