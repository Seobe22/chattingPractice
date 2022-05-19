import React, {useEffect, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import NaverMapView, {Coord, TrackingMode} from 'react-native-nmap';
import {request, check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export default function Map() {
  const center: Coord & {
    zoom?: number;
    tilt?: number;
    bearing?: number;
  } = {
    zoom: 13,
    latitude: 37.5666805,
    longitude: 126.9784147,
  };

  const mapRef = useRef<any>(null);

  useEffect(() => {
    const trackingMode = (): void => {
      mapRef.current?.setLocationTrackingMode(TrackingMode.Follow);
    };
    request('ios.permission.LOCATION_WHEN_IN_USE').then(result =>
      console.log(result),
    );
    check(PERMISSIONS.IOS.LOCATION_ALWAYS)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            break;
          case RESULTS.DENIED:
            request('ios.permission.LOCATION_WHEN_IN_USE').then(result =>
              console.log(result),
            );
            break;
          case RESULTS.LIMITED:
            break;
          case RESULTS.GRANTED:
            trackingMode();
            break;
          case RESULTS.BLOCKED:
            request('ios.permission.LOCATION_WHEN_IN_USE').then(result =>
              console.log(result),
            );
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.mapContainer}>
      <NaverMapView
        ref={mapRef}
        center={center}
        style={{height: '100%', width: '100%'}}
        showsMyLocationButton={true}
        useTextureView
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
