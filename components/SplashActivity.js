import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator,
    ImageBackground
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';


import stringsoflanguages from '../components/locales/stringsoflanguages';

class SplashActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Splash'
    };


    componentDidMount() {

        this.props.navigation.addListener('willFocus', this.load)
    }

    componentWillUnmount() {

        clearTimeout(this.timeoutHandle); // This is just necessary in the case that the screen is closed before the timeout fires, otherwise it would cause a memory leak that would trigger the transition regardless, breaking the user experience.
    }

    load = () => {

        this.showLoading();

        this.timeoutHandle = setTimeout(() => {
            // Add your logic for the transition

            AsyncStorage.getItem('@is_login').then((isLogin) => {
                if (isLogin == undefined || isLogin == "0") {
                    this.props.navigation.navigate('Login')
                } else if (isLogin == "1") {
                    this.props.navigation.navigate('Dashboard')
                }
            });


        }, 4000);
    }


    render() {
        return (
            <View style={styles.container}>

                <ImageBackground source={require('../images/splashScreen.png')}
                    style={styles.image} >
                    <View style={{justifyContent:'center',alignItems:'center'}}>
                   <View style={{top:120,justifyContent:'center',backgroundColor:'#fff',width:300,height:65,shadowColor:'lightgray',elevation:15,shadowOpacity:0.8}}>
                       <Text style={styles.displayName}>MENEZES METHOD</Text>
                   <Text style={styles.titleName}>"A 
                  <Text style={styles.innerText}> step </Text> 
                   beyond Pilates"</Text>
                   </View>
</View>
                    {this.state.loading && (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#FB3954" />


                        </View>
                    )}


                </ImageBackground>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {

        flex: 1,
        flexDirection: "column"

    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    loading: {

        left: 0,
        right: 0,
        top: 200,
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
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    loaderImage: {

        justifyContent: "center"
    },
    displayName: {
        top:3,
        fontSize: 23,
        fontWeight:'400',
        textAlign: 'center',
        justifyContent: 'center'
    },
    titleName : {
        textAlign: 'center',
        top: 5,
        fontStyle: 'italic'
    },
    innerText: {
        fontWeight: 'bold'
    }
});

export default SplashActivity;
