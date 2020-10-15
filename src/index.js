import * as React from 'react';
import {View, ScrollView, Text} from 'react-native'
import Map from "./screens/map/Map";

class Index extends React.Component{
    render() {
        return(
            <View style={{flex: 1}}>
                <Map/>
            </View>
        )
    }
}

export default Index;
