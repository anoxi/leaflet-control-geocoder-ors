# leaflet-control-geocoder-ors
[Leaflet Control Geocoder](https://github.com/perliedman/leaflet-control-geocoder/) for [Openrouteservice](https://openrouteservice.org)

## L.Control.Geocoder.Openrouteservice

Uses [Openrouteservice](https://openrouteservice.org). Implements [```IGeocoder```](https://github.com/perliedman/leaflet-control-geocoder#igeocoder).

### Constructor

```js
new L.Control.Geocoder.Openrouteservice(options)
// or
L.Control.Geocoder.openrouteservice(options)
```

## Options

| Option          |  Type            |  Default          | Description |
| --------------- | ---------------- | ----------------- | ----------- |
| `api_key`       | String          |  `""` | Openrouteservice API Key |
| `url_params`       | Object          |  `{}` | Additional URL parameters (strings) that will be added to geocoding requests |
| `suggest_timeout`       | Number          |  `2000` | Suggest request timeout in ms for auto completion (type ahead) feature|
| `suggest_min_length`     | Number        | `3`           | Min string length for auto completion (type ahead) feature

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
