import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
    Button,
    SafeAreaView,
    TextInput,
} from "react-native";

import {styles} from "./src/style/app-style";

import MapView from "react-native-maps";
import Scroller from "./src/component/scroller";

import { StatusBar } from 'expo-status-bar';

const Images = [
    { uri: "https://instagram.fuab1-2.fna.fbcdn.net/v/t51.2885-15/e35/69904990_742876242825942_4207710376198185136_n.jpg?_nc_ht=instagram.fuab1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=0f5xfVAfJ88AX-lScmO&_nc_tp=18&oh=1954c0a42aa89921eb38c59e46778943&oe=5FAF0255" },
    { uri: "https://instagram.fuab1-2.fna.fbcdn.net/v/t51.2885-15/e35/67970983_536500417092341_9134888511652484285_n.jpg?_nc_ht=instagram.fuab1-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=1SGLlzptLBIAX-Tt8-i&_nc_tp=18&oh=3d0ee1ce3f28bed4736b8fc7e545c9d5&oe=5FB12C0B" },
    { uri: "https://instagram.fuab1-1.fna.fbcdn.net/v/t51.2885-15/e35/70055950_832441350487367_2629602150785528244_n.jpg?_nc_ht=instagram.fuab1-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=G-oc9BMUCa8AX97R2cn&_nc_tp=18&oh=873c05d000b6b6da3ab72098abc34db2&oe=5FAF64D2" },
    { uri: "https://instagram.fuab1-2.fna.fbcdn.net/v/t51.2885-15/e35/68930806_249374159353302_173998819978947293_n.jpg?_nc_ht=instagram.fuab1-2.fna.fbcdn.net&_nc_cat=106&_nc_ohc=f4czbXCLOxcAX_72PtG&_nc_tp=18&oh=59db1525e102649eff4124b2fb542671&oe=5FAEAC08" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class screens extends Component {
    state = {
        markers: [
            {
                coordinate: {
                    latitude: 40.028921,
                    longitude: 32.7375997,
                },
                title: "Best Place",
                description: "This is the best place in Portland",
                image: Images[0],
            },
            {
                coordinate: {
                    latitude: 41.039572,
                    longitude: 28.954157,
                },
                title: "Second Best Place",
                description: "This is the second best place in Portland",
                image: Images[1],
            },
            {
                coordinate: {
                    latitude: 38.538160,
                    longitude:  27.131529,
                },
                title: "Third Best Place",
                description: "This is the third best place in Portland",
                image: Images[2],
            },
            {
                coordinate: {
                    latitude: 36.992271,
                    longitude: 35.325539,
                },
                title: "Fourth Best Place",
                description: "This is the fourth best place in Portland",
                image: Images[3],
            },
        ],
        title: "",
        description: "",
        animation: new Animated.Value(0), //popup
    };
    //popup --------start--------

    handleOpen = () => {
        Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };
    handleClose = () => {
        Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    //popup --------end--------

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
    }
    componentDidMount() {
        // We should detect when scrolling has stopped then animate
        // We should just debounce the event listener here
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= this.state.markers.length) {
                index = this.state.markers.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);

        });
    }


    refreshLoc= ()=>{ //current location
        navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error:null,
                });

                this.setState((state) => {
                    return{markers: [
                            {
                                coordinate: {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    error:null,
                                },
                                title: this.state.title,
                                description: this.state.description,
                            }]};
                });
            }, error => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
        );
        console.warn("wd");
    };

    render() {
        //popup -------start-------
        const screenHeight = Dimensions.get("window").height;
        const backdrop = {
            transform: [
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0, 0.01],
                        outputRange: [screenHeight, 0],
                        extrapolate: "clamp",
                    }),
                },
            ],
            opacity: this.state.animation.interpolate({
                inputRange: [0.01, 0.5],
                outputRange: [0, 1],
                extrapolate: "clamp",
            }),
        };

        const slideUp = {
            transform: [
                {
                    translateY: this.state.animation.interpolate({
                        inputRange: [0.01, 1],
                        outputRange: [0, -1 * screenHeight],
                        extrapolate: "clamp",
                    }),
                },
            ],
        };

        //popup --------end--------

        //map --------start--------

        const interpolations = this.state.markers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });
        //map --------end--------

        return (
            <View style={styles.container} >
                <StatusBar hidden={true}  />
                <MapView  onPress={this.handleClose}
                    ref={map => this.map = map}
                    initialRegion={this.state.region}
                    style={styles.container}
                >
                    {this.state.markers.map((marker, index) => {
                        const scaleStyle = {
                            transform: [
                                {
                                    scale: interpolations[index].scale,
                                },
                            ],
                        };
                        const opacityStyle = {
                            opacity: interpolations[index].opacity,
                        };
                        return (
                            <MapView.Marker key={index} coordinate={marker.coordinate}>
                                <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                    <View style={styles.marker} />
                                </Animated.View>
                            </MapView.Marker>
                        );
                    })}
                </MapView>
                <Animated.ScrollView
                    horizontal
                    scrollEventThrottle={1}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={CARD_WIDTH}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        x: this.animation,
                                    },
                                },
                            },
                        ],
                        { useNativeDriver: true }
                    )}
                    style={styles.scrollView}
                    contentContainerStyle={styles.endPadding}
                >
                    {this.state.markers.map((marker, index) => (
                        <View style={styles.card} key={index}>
                            <Image
                                source={marker.image}
                                style={styles.cardImage}
                                resizeMode="cover"
                            />
                            <View style={styles.textContent}>
                                <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
                                <Text numberOfLines={1} style={styles.cardDescription}>
                                    {marker.description}
                                </Text>
                            </View>
                        </View>
                    ))}
                </Animated.ScrollView>
                <View>
                    <TouchableOpacity onPress={this.handleOpen}>
                        <Text style={{left: '38%'}}>Update location</Text>
                    </TouchableOpacity>

                    <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
                        <View style={[styles.sheet]}>
                            <Animated.View style={[styles.popup, slideUp]}>
                                <Text> TYpe Information about location </Text>
                                <TextInput style={[styles.input]} placeholder="text" onChangeText={(title) => {
                                    this.setState({title})
                                }}/>
                                <TextInput style={[styles.input]} placeholder="text" onChangeText={(description) => {
                                    this.setState({description})
                                }}/>
                                <View
                                    style={{
                                        position: 'absolute',//use absolute position to show button on top of the map
                                        top: '60%', //for center align
                                        alignSelf: 'flex-end' //for align to right
                                    }}
                                >
                                    <Button title={"Upload"} onPress={this.refreshLoc}/>
                                </View>

                            </Animated.View>
                        </View>
                    </Animated.View>
                </View>

            </View>

        );
    }
}


AppRegistry.registerComponent("mapfocus", () => screens);
