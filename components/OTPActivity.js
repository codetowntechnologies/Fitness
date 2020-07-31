import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import stringsoflanguages from '../components/locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';

var otpcode, phonenumber;

class OTPActivity extends Component {

    constructor(props) {
        super(props);
        this.resendotp = this.resendotp.bind(this);
        this.verifyotp = this.verifyotp.bind(this);
        this.state = {
            otpUrl: 'https://digimonk.co/fitness/api/Api/resendOtp',
            verifyOtpUrl: 'https://digimonk.co/fitness/api/Api/verify',
            otpcode: '',
            userId: ''
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'OTP Activity'
    };


    componentDidMount() {

        const { navigation } = this.props;
        otpcode = navigation.getParam('otpcode', 'no-otp');
        phonenumber = navigation.getParam('phonenumber', 'no-otp');

        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
              
            }
        });

        console.log("otp code===" + otpcode)
        console.log("phonenumber ===" + phonenumber)


    }

    resendotp() {

        var url = this.state.otpUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.userId
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                    otpcode = responseData.data.otpcode;

                    alert(responseData.message);
                }
                console.log(responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }



    verifyotp() {

        var url = this.state.verifyOtpUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                otpcode: this.state.otpcode,
                id : this.state.userId
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                    this.props.navigation.navigate('Dashboard')
                }
                console.log(responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }





    render() {
        return (
            <View style={styles.container}>


                <View style={{
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FB4252',
                    flex: .4, width: '100%'

                }}>

                    <View style={{ flexDirection: 'row' }}>


                        <View style={{ flex: .10 }}>

                            <TouchableOpacity style={{ flex: .20, marginTop: 30 }}
                                onPress={() => { this.props.navigation.goBack() }}>

                                <Image source={require('../images/back_icon.png')}
                                    style={styles.backIconStyle} />

                            </TouchableOpacity>

                        </View>


                        <View style={{ flex: .90 }}>

                            <Image source={require('../images/logo.png')}
                                style={styles.logoStyle} />

                            <Text style={styles.screentitle}>MENEZES PILATES</Text>

                        </View>
                    </View>

                </View>

                <View style={{
                    flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                    flex: .6, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30
                }}>

                    <Text style={styles.title}>Verify OTP</Text>

                    <Text style={styles.title}>OTP - {otpcode}</Text>

                    <OTPInputView
                        style={{ width: '80%', height: 200 }}
                        pinCount={4}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.underlineStyleBase}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            this.setState({ otpcode: code })
                            //  console.log(`Code is ${code}, you are good to go!`)
                        })}
                    />

                    <View style={{ flexDirection: 'row' }}>

                        <Text style={styles.didntrectext}>{stringsoflanguages.didnt_received_code}</Text>
                        <Text style={styles.sendagaintext} onPress={this.resendotp}>{stringsoflanguages.send_again}</Text>


                    </View>

                    <TouchableOpacity
                        style={styles.loginButtonStyle}
                        activeOpacity={.5}
                        onPress={this.verifyotp}>

                        <Text style={styles.buttonWhiteTextStyle}>Verify</Text>

                    </TouchableOpacity>

                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FB4252'
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
    input: {
        color: 'black',
        width: 50,
        height: 50,
        padding: 10,
        textAlign: 'left',
        backgroundColor: 'transparent'
    },
    loginButtonStyle: {
        marginTop: 50,
        width: 250,
        height: 40,
        padding: 10,
        backgroundColor: '#FB3954',
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    buttonWhiteTextStyle: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        alignContent: 'center',
    },
    forgotpasswordtext: {
        fontSize: RFPercentage(2.5),
        textAlign: 'center',
        color: '#6F737A',
        marginRight: 10,
        marginTop: 20,
        alignSelf: 'center'
    },
    createnewaccounttext: {
        fontSize: RFPercentage(2),
        textAlign: 'center',
        color: '#6F737A',
        marginRight: 10,
        alignSelf: 'center'
    },
    signuptext: {
        fontSize: RFPercentage(2),
        textAlign: 'center',
        color: '#FB3954',
        marginRight: 10,
        fontWeight: 'bold',
        alignSelf: 'center'
    },

    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 20,
        shadowColor: 'grey',
        elevation: 20,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    },
    inputView1: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 20,
        shadowColor: 'grey',
        elevation: 20,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    },
    ImageIconStyle: {
        height: 25,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageLockIconStyle: {
        height: 32,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screentitle: {
        color: "white",
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    title: {
        color: '#3F434E',
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    backIconStyle: {
        marginTop: 3,
        height: 25,
        width: 50,
        marginLeft: 30,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    didntrectext: {
        fontSize: 15,
        textAlign: 'center',
        color: '#6F737A',
        alignSelf: 'center',
        marginBottom: 10
    },
    sendagaintext: {
        fontSize: 15,
        textAlign: 'center',
        color: '#FB4252',
        alignSelf: 'center',
        marginBottom: 10,
        textDecorationLine: 'underline'
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        color: 'black',
        borderBottomWidth: 1,
    },
    underlineStyleHighLighted: {
        borderColor: "#6F737A",
    },

});

export default OTPActivity;
