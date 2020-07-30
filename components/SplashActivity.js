import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ActivityIndicator
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-community/async-storage';

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

                <Image source={require('../images/splash_bg.png')} />

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'

    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
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
});

export default SplashActivity;
