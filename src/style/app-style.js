import {StyleSheet, Platform, Dimensions} from 'react-native';
import { colors } from '../config/colors';

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: "rgba(130,4,150, 0.9)",
    },
    triangle: {
        width: 0,
        height: 0,
        marginLeft: 30,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 50,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: colors.triangle,
        position: 'absolute',//use absolute position to show button on top of the map
        top: '90%', //for center align
        left: '0%',
        alignSelf: 'flex-end' //for align to right
    },
    cover: {
        backgroundColor: "rgba(0,0,0,.5)",
    },
    sheet: {
        position: "absolute",
        top: Dimensions.get("window").height,
        left: 0,
        right: 0,
        height: "100%",
        justifyContent: "flex-end",
    },
    popup: {
        backgroundColor: "#f7f7f7",
        marginHorizontal: 10,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        minHeight: 80,
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 5,
    },


});
