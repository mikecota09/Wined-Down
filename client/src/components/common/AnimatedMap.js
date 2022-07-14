import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactMapGL from 'react-map-gl'
  
const AnimatedMap = () => {

  const reactMapToken = process.env.REACT_APP_MAPBOX_TOKEN

  console.log('react-map-token', reactMapToken)
  const [locationData, setLocationData] = useState([])
  //const typesOfLocation = ['All']
  const [viewport, setNewViewport] = useState({
    latitude: 21.521757,
    longitude: -77.781166,
    zoom: 12,
    bearing: 0,
    pitch: 0,
  })
  const [hasError, setHasError] = useState(false)

  // request to Api on the first render
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/drinks')
        setLocationData(data)
        console.log('Test Me=>', data)
      } catch (err) {
        setHasError(true)
        console.log(err)
      }
    }
    getData()
  }, [])

  const MapController = ({ onClick }) => {
    return (
      <div className="map-controller">
        <div className="buttons">
          {locationData.map(location => (
            <button
              key={location.id}
              className="button is-small is-rounded is-info"
              onClick={() => onClick(location)}
            >
              {location.icon}
            </button>
          ))
          }
        </div>
      </div>
    )
  }

  console.log('Location Data=>', locationData)
  
  // default display for 'All', creates array of types of drinks
  // const getLatitude = () => {
  //   locationData.map(location => {
  //     if (!typesOfLocation.includes(location.latitude)) {
  //       typesOfLocation.push(location.latitude)
  //     }
  //   })
  // }
  // getLatitude()

  // const getLongitude = () => {
  //   locationData.map(location => {
  //     if (!typesOfLocation.includes(location.longitude)) {
  //       typesOfLocation.push(location.longitude)
  //     }
  //   })
  // }
  // getLongitude()

  const handleNewLocation = ({ longitude, latitude }) => {
    setNewViewport({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator({ speed: 1 }),
      transitionDuration: 'auto',
    })
  }

  return (
    <div>
      {locationData.length > 0 ? 
        <ReactMapGL 
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          height="100%"
          width="100%"
          mapStyle='mapbox://styles/mapbox/outdoors-v11'
          {...viewport}
          onViewportChange={viewport => setNewViewport(viewport)}
        >
          <Marker
            latitude={viewport.latitude}
            longitude={viewport.longitude}
          >
            <span role="img" aria-label="map-marker" className="marker rocket">🚀</span>
          </Marker>
          {locationData.map(location => (
            <Marker
              key={location.id}
              latitude={location.latitude}
              longitude={location.longitude}
            >
              <span role="img" aria-label="map-marker" className="marker">{location.icon}</span>
            </Marker>
          ))}
          <MapController onClick={handleNewLocation}/>
        </ReactMapGL>
        :
        <h2 className="title has-text-centered">
          {hasError ? 'Something has gone wrong!' : 'loading...☕️'}
        </h2>
      }
    </div>
  )

}

export default AnimatedMap