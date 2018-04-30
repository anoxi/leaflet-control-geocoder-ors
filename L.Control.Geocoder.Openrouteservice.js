/**
 * Leaflet Control Geocoder - Openrouteservice
 * @see https://github.com/perliedman/leaflet-control-geocoder/
 * @type {Object}
 */
(function() {
  'use strict';
  L.Control.Geocoder.Openrouteservice = L.Class.extend({
    options: {
      api_key: '', // required
      api_base_uri: 'https://api.openrouteservice.org/geocoding',
      suggest_timeout: 2000,
      suggest_min_length: 3,
      url_params: {} // optional
    },
    _parse: function(data) {
      var res = [];
      if (data) {
        data['features'].forEach(function(item) {
          res.push({
            name: [item.properties.name, item.properties.locality,
              item.properties.region, item.properties.country
            ].filter(function(item) {
              return typeof item !== 'undefined';
            }).filter(function(value, index, self) {
              return self.indexOf(value) === index;
            }).join(', '),
            center: L.latLng(item.geometry.coordinates[1], item.geometry.coordinates[0]),
            bbox: L.latLngBounds(
              L.latLng(data['bbox'][2], data['bbox'][3])
            ),
          })
        });
      }
      return res;
    },
    _getCORS(url, success) {
      var xhr = new XMLHttpRequest();
      if (!('withCredentials' in xhr)) xhr = new XDomainRequest(); // fix IE8/9
      xhr.open('GET', url);
      xhr.onload = success;
      xhr.send();
      return xhr;
    },
    _getJSON: function(params, callback) {
      this._getCORS(this.options.api_base_uri + L.Util.getParamString(L.Util.extend({
        'api_key': this.options.api_key
      }, this.options.url_params, params)), function(request) {
        var response = request.currentTarget.response || request.target.responseText;
        if (response) {
          callback(JSON.parse(response));
        }
      });
    },
    geocode: function(query, callback, context) {
      var _this = this;
      _this._getJSON({
        'query': query
      }, function(data) {
        callback.call(context, _this._parse(data));
      });
    },
    suggest: function(query, callback, context) {
      var _this = this, _args = arguments, t;
      if(t){
        clearTimeout(t);
      }
      if(typeof query === 'string' && query.length > _this.options.suggest_min_length){
        t = setTimeout(function(){
          _this.geocode.apply(_this, _args);
        }, _this.options.suggest_timeout);
      }
    },
    reverse: function(location, scale, callback, context) {
      var _this = this;
      _this._getJSON({
        'location': [location.lng, location.lat].join(',')
      }, function(data) {
        callback.call(context, _this._parse(data));
      });
    },
    initialize: function(options) {
      L.setOptions(this, options);
    }
  });

  L.Control.Geocoder.openrouteservice = function(options) {
    return new L.Control.Geocoder.Openrouteservice(options);
  }
})();
