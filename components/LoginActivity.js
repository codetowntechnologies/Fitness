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


class LoginActivity extends Component {

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
        title: 'login'
    };


    componentDidMount() {


    }


    render() {
        return (
            <View style={styles.container}>


                <View style={{
                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FB4252',
                    flex: .4, width: '100%'

                }}>


                </View>

                <View style={{
                    flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                    flex: .6, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30
                }}>


                    <View
                        style={styles.inputView}>

                        <Image source={require('../images/phone_no.png')}
                            style={styles.ImageIconStyle} />

                        <TextInput
                            placeholder="Phone Number"
                            placeholderTextColor="#C3C8D1"
                            underlineColorAndroid="transparent"
                            style={styles.input}
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
                        onPress={this.props.navigation.navigate('Dashboard')}>


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
    ImageLockIconStyle: {
        height: 32,
        width: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default LoginActivity;
