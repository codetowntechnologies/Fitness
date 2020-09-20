import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Alert,
    SafeAreaView

} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from './locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';


const APP_POPUP_LOGO = require('../images/Group.png');
class ChangePasswordActivity extends Component {

    constructor(props) {
        super(props);
        this.logincall = this.logincall.bind(this);
        this.state = {
            baseUrl: 'http://3.25.67.165/api/Api/changePassword',
            confirmpassword: '',
            password: '',
            currentpassword: '',
            userId: '',
            spinner: false,
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
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);

            }
        });


    }
    createTwoButtonAlert = () =>
    {
      this.setState({isModalPopupVisible:true});
  
    }

    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.currentpassword != '') {
            //Check for the Name TextInput
            if (this.state.password != '') {
                //Check for the Name TextInput
                if (this.state.password == this.state.confirmpassword) {
                    //Check for the Email TextInput

                    console.log("id==" + this.state.userId)
                    console.log("current ==" + this.state.currentpassword)
                    console.log("confirmpassword ==" + this.state.confirmpassword)

                      this.loading();

                    this.showLoading();
                    this.logincall();

                } else {
                    
//Toast.show(stringsoflanguages.new_password_confirm_password_not_match,Toast.LONG);
                this.setState({isModalPopupVisible:true});
               this.setState({textOnModel:stringsoflanguages.new_password_confirm_password_not_match})
                }
            } else {
             //Toast.show(stringsoflanguages.please_enter_new_password, Toast.LONG);
                this.setState({isModalPopupVisible:true});
                this.setState({textOnModel:stringsoflanguages.please_enter_new_password})
            }
        } else {
     // Toast.show(stringsoflanguages.please_enter_current_password, Toast.LONG);
            this.setState({isModalPopupVisible:true});
            this.setState({textOnModel:stringsoflanguages.please_enter_current_password})
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
                current_password: this.state.currentpassword,
                new_password: this.state.password,
                confirm_password: this.state.confirmpassword,
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    this.setState({isModalPopupVisible:true});
                    this.setState({spinner:false})
                    this.setState({textOnModel:responseData.message})
                } else {
                    this.setState({textOnModel:responseData.message})
                    this.setState({spinner:false})
                   this.createTwoButtonAlert();
                   this.setState({spinner:<i class="fas fa-sliders-v-square    "></i>})
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
            <ScrollView contentContainerStyle={{flexGrow:1}}>
            <View style={styles.container}>
            <Spinner size={50}  color="red"
          visible={this.state.spinner}
        //   textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
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
                               onPress={() => { this.props.navigation.goBack() }}>

                                <Image source={require('../images/back_icon.png')}
                                    style={styles.backIconStyle} />


                            </TouchableOpacity>

                            <View style={{ flex: .60 }}>



                            </View>


                            <View style={{ flex: .20 }}>


                            </View>

                        </View>


                        <View style={{ flexDirection: 'row' }}>

                            <View style={{ flex: .20, marginTop: 30 }}>


                            </View>

                            <View style={{ flex: .60 }}>

            
                                     <Image source={require('../images/Group.png')}
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

                        {this.state.loading && (
                            <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#ffffff" />
                            </View>
                        )}

                        <Text style={styles.title}>Change Password</Text>


                        <View
                            style={styles.inputView}>
                                

                            <Image source={require('../images/lock.png')}
                                style={styles.ImageLockIconStyle} />

                            <TextInput
                                placeholder="Current Password"
                                placeholderTextColor="#AEB6C1"
                                underlineColorAndroid="transparent"
                                style={styles.input}

                                onChangeText={currentpassword => this.setState({ currentpassword })}
                            />

                        </View>


                        <View
                            style={styles.inputView1}>

                            <Image source={require('../images/lock.png')}
                                style={styles.ImageLockIconStyle} />

                            <TextInput
                                placeholder="New Password"
                                placeholderTextColor="#AEB6C1"
                                underlineColorAndroid="transparent"
                                style={styles.input}

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

                                onChangeText={confirmpassword => this.setState({ confirmpassword })}
                            />

                        </View>

                        <View style={{marginBottom:50}}>
                        <TouchableOpacity
                            style={styles.loginButtonStyle}
                            activeOpacity={.5}
                            onPress={this.CheckTextInput}>
 {/* <Spinner size={50}  color="red"
          visible={this.state.spinner}
          textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        /> */}

                            <Text style={styles.buttonWhiteTextStyle}>Change Password</Text>

                        </TouchableOpacity>
                        </View>

                    </View>

                </LinearGradient>

            </View>
            </ScrollView>
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
        marginTop: 8,
        width: 100,
        height: 40,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#FB3954',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        // Setting up View inside component align horizontally center.
        alignItems: 'center',
        fontWeight: 'bold',
    },
    cancelButtonStyle: {
        marginTop: 8,
        width: 100,
        marginLeft:10,
        height: 40,
        padding: 10,
        marginBottom: 20,
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
    spinnerTextStyle: {
        color: '#FFF'
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
        width: 100,
        height: 100
    },
    ImageLockIconStyle: {
        height: 33,
        width: 25,
        marginLeft: 30,
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
    title: {
        color: '#2B2F3B',
        fontSize: 21,
        marginTop: 20,
        textAlign: 'center'
    },
    backIconStyle: {
        height: 25,
        width: 40,
        marginLeft: 30,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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

export default ChangePasswordActivity;