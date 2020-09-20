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

class ResetPasswordActivity extends Component {

    constructor(props) {
        super(props);
        this.logincall = this.logincall.bind(this);
        this.state = {
            baseUrl: 'http://3.25.67.165/api/Api/reset_password',
            confirmpassword: '',
            password: '',
            userId: '',
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Reset Password'
    };


    componentDidMount() {

        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);

            }
        });


    }


    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.password != '') {
            //Check for the Name TextInput
            if (this.state.password == this.state.confirmpassword) {
                //Check for the Email TextInput
                this.showLoading();
                this.logincall();

            } else {
                alert(stringsoflanguages.password_confirm_password_not_match);
            }
        } else {
            alert(stringsoflanguages.please_enter_password);
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
                id: this.state.userId,
                new_password: this.state.password,
                confirm_password: this.state.confirmpassword,
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    this.props.navigation.navigate('Login')
                    //   this.saveLoginUserData(responseData);
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

                        <Image source={require('../images/logo.png')}
                            style={styles.logoStyle} />

                        <Text style={styles.screentitle}>MENEZES PILATES</Text>

                    </LinearGradient>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                        flex: .6, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30
                    }}>

                        {this.state.loading && (
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#ffffff" />
                            </View>
                        )}

                        <Text style={styles.title}>Reset Password</Text>


                        <View
                            style={styles.inputView}>

                            <Image source={require('../images/lock.png')}
                                style={styles.ImageLockIconStyle} />

                            <TextInput
                                placeholder="New Password"
                                placeholderTextColor="#AEB6C1"
                                underlineColorAndroid="transparent"
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                            />

                        </View>


                        <View
                            style={styles.inputView1}>

                            <Image source={require('../images/lock.png')}
                                style={styles.ImageLockIconStyle} />

                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="#AEB6C1"
                                underlineColorAndroid="transparent"
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={confirmpassword => this.setState({ confirmpassword })}
                            />

                        </View>


                        <TouchableOpacity
                            style={styles.loginButtonStyle}
                            activeOpacity={.5}
                            onPress={this.CheckTextInput}>


                            <Text style={styles.buttonWhiteTextStyle}>Reset Password</Text>

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
        fontSize: 14,
        marginLeft: 10,
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
        fontSize: 16,
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
        textAlign: 'center'
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

export default ResetPasswordActivity;
