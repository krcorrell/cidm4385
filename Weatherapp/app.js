/* global angular */
angular.module("ForecastApp", [])
    .controller("WeatherServiceController",
    ["$scope", "$http", "GeoLocationService",
    function($scope, $http, GeoLocationService){
        
        /* Find my own icons to display
         * Dr. Babb doesn't care if we use someone else's code to get the
         * directives, as long as we credit the source.
         */
        
        /* Instructions: Do it myself an prove that I can get it to work.
         * THEN comment it out and do it
         */
         
         /* We are going to be doing the DarkSky method
          * We can (should) use 
          */
          
          // http://codereview.stackexchange.com/questions/93799/angular-filter-to-format-temperature
        var wsc = this;
        
        wsc.selected_lat = 0;
        wsc.selected_long = 0;
        
        // App Name
        wsc.app_name = "Weather App";
        
        wsc.cities = [
            {
                name: "Amarillo",
                url_name: "Amarillo",
                state: "TX",
                lat: 0,
                lon: 0
            },
            {
                name: "Anchorage",
                url_name: "Anchorage",
                state: "AK",
                lat: 0,
                lon: 0
            },
            {
                name: "Denver",
                url_name: "Denver",
                state: "CO",
                lat: 0,
                lon: 0
            },
            {
                name: "Anchorage",
                url_name: "Anchorage",
                state: "AK",
                lat: 0,
                lon: 0
            },
            {
                name: "Denver",
                url_name: "Denver",
                state: "CO",
                lat: 0,
                lon: 0
            }
        ];
        
        //last step
        wsc.getLatLongForSelected = function(){
            GeoLocationService.geoLocate(wsc.selected_city)
                // Then when it's done
                .then(function(res){
                    wsc.selected_lat = res.data.results[0].geometry.location.lat;
                    wsc.selected_long = res.data.results[0].geometry.location.lng;
                    console.log(res);
                })
                .catch(function(err){
                    console.log(err);
                });
        };
        
        // Kick off the getLatLongForSelected function
        wsc.selected_city = wsc.cities[0];
        wsc.getLatLongForSelected();
        
    }])
    
    .factory('GeoLocationService', [/* Dependency list */ '$sce', '$http',
        function($sce, $http){
        // https://docs.angularjs.org/api/ng/service/$sce
        
        // this is an empty object
        var geolocationService = {};
        
        //AIzaSyDIhHGr2u141unuU9FiwGU-evLvEc66Rwc
        var key = "AIzaSyDIhHGr2u141unuU9FiwGU-evLvEc66Rwc";
        
        
        
        /*var mykey = '';
        
        var key = function($http){
            
            $http.get("data.txt")
		   .then(function(response){
				/*fc.forecast = angular.fromJson(response.data);
				// fc.forecast = response.data;
				fc.temp	  = fc.forecast.currently.temperature;
				fc.dp		  = fc.forecast.currently.dewPoint;
				fc.humidity = fc.forecast.currently.humidity * 100;*//*
				
				key = angular.fromJson(response.data);
				key = key.name;
		   });
        };
        */
        
        geolocationService.geoLocate = function(location){
            var address = "+" + location.name + ",+" + location.state +"&key="
                + key;
            
            var url =
                "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                address + "&key=" + key;
                
            var trustedURL = $sce.trustAsResourceUrl(url);
            return $http.get(trustedURL);
        };
        
        return geolocationService;
    }]);