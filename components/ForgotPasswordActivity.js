import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from './locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

class ForgotPasswordActivity extends Component {

    constructor(props) {
        super(props);
        this.forgotCall = this.forgotCall.bind(this);
        this.state = {
            baseUrl: 'https://digimonk.co/fitness/api/Api/forgot_password',
            phonenumber: '',
            password: '',
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Forgot Password'
    };


    componentDidMount() {

    }


    CheckTextInput = () => {
        if (this.state.phonenumber != '') {
            //     //Check for the phone number
            // this.showLoading();
            this.forgotCall();

        } else {
            alert(stringsoflanguages.please_enter_phone_number);
        }
    };


    forgotCall() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: this.state.phonenumber,
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    console.log("response data id ===" + responseData.data.id)
                    AsyncStorage.setItem('@user_id', responseData.data.id.toString());

                    this.props.navigation.navigate('ForgetOtp', {
                        otpcode: responseData.data.otpcode,
                        phonenumber: this.state.phonenumber
                    })
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

                <LinearGradient
                    colors={['#FB3954', '#FA564C', '#F78E3C']}
                    style={styles.linearGradientFull}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}>


                    <LinearGradient
                        colors={['#FB3954', '#FA564C', '#F78E3C']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}>


                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={{ flex: .20, marginTop: 30 }}
                                onPress={() => { this.props.navigation.navigate('Login') }}>

                                <Image source={require('../images/back_icon.png')}
                                    style={styles.backIconStyle} />


                            </TouchableOpacity>

                            <View style={{ flex: .60 }}>



                            </View>


                            <View style={{ flex: .20 }}>


                            </View>

                        </View>



                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity style={{ flex: .20, marginTop: 30 }}
                                onPress={() => { this.props.navigation.navigate('Login') }}>


                            </TouchableOpacity>

                            <View style={{ flex: .60 }}>

                                <Image source={require('../images/logo.png')}
                                    style={styles.logoStyle} />

                                <Text style={styles.screentitle}>MENEZES PILATES</Text>

                            </View>


                            <View style={{ flex: .20 }}>


                            </View>

                        </View>


                    </LinearGradient>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                        flex: .6, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30
                    }}>

                        {/* {this.state.loading && (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    )} */}

                        <Text style={styles.title}>Forgot Password</Text>

                        <View
                            style={styles.inputView}>

                            <Image source={require('../images/phone_no.png')}
                                style={styles.ImageIconStyle} />


                            <View style={{ flexDirection: 'row' }}>

                                <TextInput
                                    placeholder="+61"
                                    placeholderTextColor="#C3C8D1"
                                    underlineColorAndroid="transparent"
                                    keyboardType='number-pad'
                                    underlineColorAndroid="#ADB6C1"
                                    editable={false}

                                />

                                <Image source={require('../images/down-arrow.png')}
                                    style={styles.arrowIconStyle} />

                            </View>

                            <TextInput
                                placeholder="Phone Number"
                                placeholderTextColor="#AEB6C1"
                                underlineColorAndroid="transparent"
                                style={styles.inputphonenumber}
                                keyboardType='number-pad'
                                onChangeText={phonenumber => this.setState({ phonenumber })}
                            />


                        </View>




                        <TouchableOpacity
                            style={styles.loginButtonStyle}
                            activeOpacity={.5}
                            onPress={this.CheckTextInput}>



                            <Text style={styles.buttonWhiteTextStyle}>Submit</Text>



                        </TouchableOpacity>



                    </View>

                </LinearGradient>
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
        width: 300,
        height: 50,
        padding: 10,
        textAlign: 'left',
        backgroundColor: 'transparent'
    },
    inputphonenumber: {
        color: 'black',
        width: 250,
        height: 50,
        padding: 10,
        fontSize: 14,
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
        width: '90%',
        marginTop: 50,
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
        width: '90%',
        marginTop: 20,
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
        marginLeft: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowIconStyle: {
        height: 15,
        width: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
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
    screentitle: {
        color: "white",
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    backIconStyle: {
        height: 25,
        width: 50,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#2B2F3B',
        fontSize: 21,
        marginTop: 10,
        textAlign: 'center',
    },
    linearGradient: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: .4,
        width: '100%'

    },
    linearGradientFull: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: '100%'

    },
});

export default ForgotPasswordActivity;
