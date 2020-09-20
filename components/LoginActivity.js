import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Platform,
    SafeAreaView
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from './locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';



console.disableYellowBox = true;
const APP_POPUP_LOGO = require('../images/Group.png');


class LoginActivity extends Component {

    constructor(props) {
        super(props);
        this.logincall = this.logincall.bind(this);
        this.state = {
            baseUrl: 'http://3.25.67.165/api/Api/login',
            phonenumber: '',
            password: '',
            isModalVisible: false,
            isUsernameVisible: false,
            isModalPopupVisible: false,      
            textOnModel:''     
        };
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    togglePopup = () => {
        this.setState({ isModalPopupVisible: !this.state.isModalPopupVisible });
    };
    closequestionlogPopup = () => {

        this.setState({ isModalPopupVisible: false });

        // this.setState({ questionlogApicalled: true }),
        //     this.RBSheetConfirmDetails.close();
    };
    loading() {
        this.setState({ spinner: true });
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
                //  this.showLoading();
                //console.log("registed token===" + this.state.deviceToken)
                this.logincall();

            } else {
               // Toast.show(stringsoflanguages.please_enter_password,Toast.LONG);
               this.setState({isModalPopupVisible:true});
               this.setState({textOnModel:stringsoflanguages.please_enter_password})
            }
        } else {
            this.setState({isModalPopupVisible:true});
               this.setState({textOnModel:stringsoflanguages.please_enter_phone_number})
            // Toast.show(stringsoflanguages.please_enter_phone_number,Toast.LONG);
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
                    this.setState({isModalPopupVisible:true});
                    this.setState({textOnModel:responseData.message})
                   // Toast.show(responseData.message,Toast.LONG);
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

                        <Image source={require('../images/Group.png')}
                            style={styles.logoStyle} />

                        <Text style={styles.screentitle}>MENEZES PILATES</Text>

                    </LinearGradient>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                        flex: .6, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30,fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif'
                    }}>

                        <View
                            style={styles.inputView}>

                            <Image source={require('../images/phone_no.png')}
                                style={styles.ImageIconStyle} />


                            <View style={{ flexDirection: 'row', marginLeft: 10 }}>

                                <TextInput
                                    placeholder="+61"
                                    placeholderTextColor="#AEB6C1"
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
                                maxLength={10}
                                onChangeText={phonenumber => this.setState({ phonenumber })}
                            />


                        </View>


                        <View
                            style={styles.inputView1}>

                            <Image source={require('../images/lock.png')}
                                style={styles.ImageLockIconStyle} />

                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="#ADB6C1"
                                underlineColorAndroid="transparent"
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                            />

                        </View>

                        <Modal
                        isVisible={this.state.isModalPopupVisible}
                        style={styles.ispopupmodalvisible}
                        hasBackdrop={true}
                        cancelable={false}
                        animationInTiming={300}
                        animationOutTiming={300}
                        backdropTransitionInTiming={300}
                        backdropTransitionOutTiming={300}
                    >


                        <SafeAreaView style={{
                            flexDirection: 'column', backgroundColor: 'white', borderTopLeftRadius: 10,
                            borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                            , marginLeft: 20, marginBottom: 150, marginRight: 20, marginTop: 150

                        }}>

                            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 50 }}>


                                <TouchableOpacity style={{ flex: .40, alignItems: 'flex-start', justifyContent: 'center' }}
                                    onPress={() => { }} >

                                    <Image
                                        source={APP_POPUP_LOGO}
                                        style={{ width: 100, height: 100, borderRadius: 100 / 2, marginLeft: 10, borderWidth: 2, borderColor: 'white' }}
                                    />

                                </TouchableOpacity>

                            </View>

                            <Text style={styles.appnamestyle}>MENEZES PILATES</Text>

                            <Text style={styles.popupmsgstyle}>{this.state.textOnModel}</Text>

                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={this.closequestionlogPopup}>

                                <Text style={styles.fbText}
                                >{stringsoflanguages.ok}</Text>

                            </TouchableOpacity>


                        </SafeAreaView>


                    </Modal>
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
        fontSize: 14,
        marginLeft: 10,
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
        fontSize: 12,
        textAlign: 'center',
        color: '#2B2F3B',
        marginRight: 10,
        marginTop: 20,
        alignSelf: 'center'
    },
    createnewaccounttext: {
        fontSize: 15,
        textAlign: 'center',
        color: '#747A82',
        marginRight: 10,
        alignSelf: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif'
    },
    signuptext: {
        fontSize: 15,
        textAlign: 'center',
        color: '#EB2E45',
        marginRight: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif'
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
        marginLeft: 30,
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
        width: 100,
        height: 110
    },
    scrollViewContainer: {
        backgroundColor: '#F0F5FE'

    },
    appnamestyle: {
        marginTop: 50,
        color: "#626262",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: RFPercentage(4)
    },
    popupmsgstyle: {
        marginTop: 50,
        color: "#626262",
        textAlign: 'center',
        fontSize: RFPercentage(3)
    },
    ispopupmodalvisible: {
        alignItems: undefined,
        justifyContent: undefined, // This is the important style you need to set
    },
    SubmitButtonStyle: {
        marginTop: 50,
        width: 300,
        height: 40,
        padding: 10,
        marginBottom: 50,
        backgroundColor: '#FB3954',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
        fontWeight: 'bold',
    },
    fbText: {
        textAlign: 'center',
        fontSize: 15,
        color: 'white',
        alignContent: 'center',
        fontWeight: 'bold'
    },
    forgotpasswordtext: {
        fontSize: RFPercentage(1.8),
        textAlign: 'center',
        color: '#6F737A',
        marginRight: 10,
        marginTop: 20,
        alignSelf: 'center'
    },
    ImageLockIconStyle: {
        height: 32,
        width: 25,
        marginLeft: 30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screentitle: {
        color: "white",
        fontSize: 20,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif'

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

export default LoginActivity;
