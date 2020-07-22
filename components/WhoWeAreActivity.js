import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Button,
    ImageBackground
} from 'react-native';
import stringsoflanguages from './locales/stringsoflanguages';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";


class WhoWeAreActivity extends Component {

    constructor(props) {
        super(props);


    }

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'WhoWeAre'
    };

    componentDidMount() {


    }



    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.headerView}>

                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: .20 }}
                        onPress={() => { this.props.navigation.goBack() }}>

                        <Image source={require('../images/back_icon.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: .60 }}
                    >

                        <Text style={styles.screentitle}>WHO WE ARE</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: .20 }}
                    >

                    </TouchableOpacity>

                </View>


                <ImageBackground source={{ uri: 'https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg' }}
                    style={{ height: 400, justifyContent: 'center' }}
                >
                    <Image source={require('../images/play_icon.png')}
                        style={styles.playiconstyle} />

                </ImageBackground>

                <View style={{ flexDirection: 'row' }}>

                    <Text style={styles.textblacktextstyle}>ABOUT US</Text>

                    <Image source={require('../images/down_arrow.png')}
                        style={styles.downArrowStyle} />

                </View>

           

                <Text style={styles.description_text_color}>In 1992, Tim Berners-Lee circulated a document titled “HTML Tags,” which outlined just 20 tags, many of which are now obsolete or have taken other forms. The first surviving tag to be defined in the document, after the crucial anchor tag, is the paragraph tag. It wasn’t until 1993 that a discussion emerged on the proposed image tag</Text>

             

            </SafeAreaView>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F9FE'
    },
    loading: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading_text: {
        fontSize: RFValue(10, 580),
        textAlign: 'center',
        color: '#FFC33B',
        fontWeight: 'bold'
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#FB3954'
    },
    screentitle: {
        color: "white",
        fontSize: 20,
        textAlign: 'center'
    },
    backIconStyle: {
        marginTop: 3,
        height: 25,
        width: 50,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    playiconstyle: {
        height: 50,
        width: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textblacktextstyle: {
        fontSize: 19,
        color: '#06142D',
        marginTop:10,
        marginLeft:10,
        marginLeft: 10
    },
    downArrowStyle: {
        height: 25,
        width: 25,
        marginTop: 10,
        marginLeft: 20
    },
    description_text_color: {
        color: "black",
        fontSize: 15,
        marginTop:30,
        marginLeft:10
    },
});

export default WhoWeAreActivity;

