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
        this.aboutus = this.aboutus.bind(this);
        this.state = {
            baseUrl: 'https://digimonk.co/fitness/api/Api/aboutus',
            image: '',
            description: ''
        };

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

        this.aboutus()

    }


    aboutus() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    console.log("response data ===" + responseData)

                    this.setState({ image: responseData.data.image });
                    this.setState({ description: responseData.data.description });

            
                }

                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
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


                <ImageBackground source={{ uri: 'https://digimonk.co/fitness/uploads/video_logo/' + this.state.image }}
                            style={{ width: 400, height: 300, justifyContent: 'center' }}>
                            <Image source={require('../images/play_icon.png')}
                                style={styles.playiconstyle} />

                        </ImageBackground>

                <View style={{ flexDirection: 'row', marginTop:20 }}>

                    <Text style={styles.textblacktextstyle}>ABOUT US</Text>

                    <Image source={require('../images/down_arrow.png')}
                        style={styles.downArrowStyle} />

                </View>

           

        <Text style={styles.description_text_color}>{this.state.description}</Text>

             

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
        fontSize: 15,
        color: '#06142D',
        marginTop: 8,
        marginLeft: 5,
        marginLeft: 10
    },
    downArrowStyle: {
        height: 15,
        width: 15,
        marginTop: 10,
        marginLeft: 20
    },
    description_text_color: {
        color: "#999A9A",
        fontSize: 15,
        marginTop:30,
        marginLeft:10
    },
});

export default WhoWeAreActivity;

