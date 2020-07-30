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

class LoginActivity extends Component {

    constructor(props) {
        super(props);
        this.logincall = this.logincall.bind(this);
        this.state = {
            baseUrl: 'https://digimonk.co/fitness/api/Api/login',
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
        title: 'login'
    };


    componentDidMount() {

    }


    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.phonenumber != '') {
            //Check for the Name TextInput
            if (this.state.password != '') {
                //Check for the Email TextInput
                this.showLoading();
                //console.log("registed token===" + this.state.deviceToken)
                this.logincall();

            } else {
                alert(stringsoflanguages.please_enter_password);
            }
        } else {
            alert(stringsoflanguages.please_enter_phone_number);
        }
    };


    logincall() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: this.state.phonenumber,
                password: this.state.password,
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                    this.saveLoginUserData(responseData);
                }
                console.log(responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }



  async saveLoginUserData(responseData) {
    try {

      await AsyncStorage.setItem('@user_id', responseData.data.id.toString());
      await AsyncStorage.setItem('@email', responseData.data.email.toString());
      await AsyncStorage.setItem('@name', responseData.data.name.toString());
      await AsyncStorage.setItem('@is_login', "1");
      this.props.navigation.navigate('Dashboard') 

    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

    render() {
        return (
            <View style={styles.container}>


                <View style={{
                    flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FB4252',
                    flex: .4, width: '100%'


                }}>

                    <Image source={require('../images/logo.png')}
                        style={styles.logoStyle} />

                    <Text style={styles.screentitle}>MENEZES PILATES</Text>

                </View>

                <View style={{
                    flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                    flex: .6, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30
                }}>

                    {this.state.loading && (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    )}



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
                            placeholderTextColor="#C3C8D1"
                            underlineColorAndroid="transparent"
                            style={styles.inputphonenumber}
                            keyboardType='number-pad'
                            onChangeText={phonenumber => this.setState({ phonenumber })}
                        />


                    </View>


                    <View
                        style={styles.inputView1}>

                        <Image source={require('../images/lock.png')}
                            style={styles.ImageLockIconStyle} />

                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#C3C8D1"
                            underlineColorAndroid="transparent"
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password })}
                        />

                    </View>


                    <TouchableOpacity
                        style={styles.loginButtonStyle}
                        activeOpacity={.5}
                        onPress={this.CheckTextInput}>



                        <Text style={styles.buttonWhiteTextStyle}>Sign In</Text>

                    </TouchableOpacity>

                    <Text style={styles.forgotpasswordtext} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password?</Text>


                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>

                        <View style={{ flexDirection: 'row', flex: .5 }}>

                            <Text style={styles.createnewaccounttext} onPress={() => this.props.navigation.navigate('Signup')}>Don't have an account?</Text>


                            <Text style={styles.signuptext} onPress={() => this.props.navigation.navigate('Signup')}>Sign Up</Text>


                        </View>

                    </View>

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
        fontSize: RFPercentage(1.8),
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
        width: '90%',
        marginTop: 100,
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
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },

});

export default LoginActivity;
