import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Index from "../../index";

import * as Permissions from 'expo-permissions';

export default class Map extends React.Component {

    render() {
        const [permission, askPermission, getPermission] = usePermissions(Permissions.LOCATION, { ask:true });
        return (
            <View style={styles.container}>
                <MapView style={styles.mapStyle} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});

