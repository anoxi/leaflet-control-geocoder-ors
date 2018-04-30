# leaflet-control-geocoder-ors
Leaflet Control Geocoder - Openrouteservice

## Example
```
L.Routing.control({
      geocoder: L.Control.Geocoder.openrouteservice({
        'api_key': apiKey,
        'url_params': {
          'lang': 'de' // optional
        },
        'suggest_timeout': 2000,
        'suggest_min_length': 3
      })
})
```
