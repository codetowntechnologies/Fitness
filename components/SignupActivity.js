import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import CheckBox from 'react-native-check-box';
import Toast from 'react-native-simple-toast';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from './locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import Modal from 'react-native-modal';
import _ from 'lodash';
import {
    Picker,
    KeyboardAwareScrollView,
    TextField,
    Colors,
  } from 'react-native-ui-lib';

const width = Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const optionValue = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];

const placeholder = {
    label: 'Select your Gender',
    value: null,
    color: '#9EA0A4',
  };
  
console.disableYellowBox = true;
const APP_POPUP_LOGO = require('../images/Group.png');
var icon;

class SignupActivity extends Component {

    constructor(props) {
        super(props);
        this.signupcall = this.signupcall.bind(this);
        this.state = {
            baseUrl: 'http://3.25.67.165/api/Api/register',
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            gender: 'Select your Gender',
            location: '',
            device_token: '',
            editable: false,
            user: '',
            isModalVisible: false,
            isUsernameVisible: false,
            isModalPopupVisible: false,
            textOnModel:'' 
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Signup'
    };
    updateUser = (user) => {
        this.setState({ user: user })
     }

    componentDidMount() {
        this.focusListener= this.props.navigation.addListener('didFocus', () => {
            console.log('props',this.props.navigation.state.params);
            if(this.props.navigation.state.params!==undefined){
                this.setState({gender:this.props.navigation.state.params.select});
            }
    });

    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    togglePopup = () => {
        this.setState({ isModalPopupVisible: !this.state.isModalPopupVisible });
    };
    closequestionlogPopup = () => {

        this.setState({ isModalPopupVisible: false });

      //  this.setState({ questionlogApicalled: true }),
      //      this.RBSheetConfirmDetails.close();
    };
    CheckTextInput = () => {
        //Handler for the Submit onPress
        if (this.state.name != '') {
            //Check for the Name TextInput
            if (this.state.email != '') {
                //Check for the Name TextInput
                if (this.state.phone != '') {
                    //check for phone number
                    if (this.state.gender != '') {
                        //check for phone number
                        if (this.state.location != '') {
                            //check for phone number
                            if (this.state.password != '') {
                                //Check for the password TextInput
                                console.log('password====' + this.state.password);
                                console.log('confirm password ====' + this.state.confirmPassword);
                                if (this.state.password == this.state.confirmPassword) {
                                    //Check for the password and confirm password
                                    if (this.state.isChecked) {

                                        //   this.showLoading();

                                        this.signupcall();

                                    } else {
                                       // Toast.show(stringsoflanguages.please_accept_terms,Toast.LONG);
                                       this.setState({isModalPopupVisible:true});
                                       this.setState({textOnModel:stringsoflanguages.please_accept_terms})
                                    }

                                } else {
                                   // Toast.show(stringsoflanguages.password_confirm_password_not_match,Toast.LONG);
                                   this.setState({isModalPopupVisible:true});
                                   this.setState({textOnModel:stringsoflanguages.password_confirm_password_not_match})
                                }
                            } else {
                                //Toast.show(stringsoflanguages.please_enter_password,Toast.LONG);
                                this.setState({isModalPopupVisible:true});
                                this.setState({textOnModel:stringsoflanguages.please_enter_password})
                            }
                        } else {
                           // Toast.show(stringsoflanguages.please_enter_location,Toast.LONG);
                           this.setState({isModalPopupVisible:true});
                           this.setState({textOnModel:stringsoflanguages.please_enter_location})
                        }
                    } else {
                   //   Toast.show(stringsoflanguages.please_enter_gender,Toast.LONG);
                      this.setState({isModalPopupVisible:true});
                                this.setState({textOnModel:stringsoflanguages.please_enter_gender})
                       
                    }
                } else {
                    //Toast.show(stringsoflanguages.please_enter_phone_number,Toast.LONG);
                    this.setState({isModalPopupVisible:true});
                    this.setState({textOnModel:stringsoflanguages.please_enter_phone_number})
                  
                }
            } else {
               // Toast.show(stringsoflanguages.please_enter_email,Toast.LONG);
                this.setState({isModalPopupVisible:true});
                this.setState({textOnModel:stringsoflanguages.please_enter_email})
               
            }
        } else {
 //Toast.show(stringsoflanguages.please_enter_name,Toast.LONG);
            this.setState({isModalPopupVisible:true});
            this.setState({textOnModel:stringsoflanguages.please_enter_name})
           
        }
    };




    signupcall() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                gender: this.state.gender.value,
                location: this.state.location,
                device_token: ''
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                // this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                    AsyncStorage.setItem('@user_id', responseData.data.id.toString());

                    this.props.navigation.navigate('OTP', {
                        otpcode: responseData.data.otpcode,
                        phonenumber: this.state.phone
                    })
                }
                console.log('sign up response data:', responseData);
            })
            .catch(error => {
                //   this.hideLoading();
                console.error(error);
            })

            .done();
    }
    render() {
        return (

            <SafeAreaView style={styles.container}>


                <ScrollView>

                    <LinearGradient
                        colors={['#FB3954', '#FA564C', '#F78E3C']}
                        style={styles.linearGradientFull}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}>



                        <View style={styles.container}>


                            <LinearGradient
                                colors={['#FB3954', '#FA564C', '#F78E3C']}
                                style={styles.linearGradient}
                                start={{ x: 0, y: 0.2 }}
                                end={{ x: 1, y: 0.2 }}>

                                <View style={{alignSelf:'flex-start'}}>
                                    <TouchableOpacity style={{ marginTop: 10,marginLeft:15}}
                                        onPress={() => { this.props.navigation.navigate('Login') }}>

                                        <Image source={require('../images/back_icon.png')}
                                            style={styles.backIconStyle} />
                                    </TouchableOpacity>
                                    </View>
                                <View >
<Image source={require('../images/Group.png')}
    style={styles.logoStyle} />

<Text style={styles.screentitle}>MENEZES PILATES</Text>

</View>


                                {/* <View style={{ flexDirection: 'row' }}> */}

                                    {/* <TouchableOpacity style={{ flex: .20, marginTop:1}}
                                        onPress={() => { this.props.navigation.navigate('Login') }}>


                                    </TouchableOpacity> */} 

                                {/* </View> */}

                            </LinearGradient>
                            <ScrollView>
                            <View style={{
                                flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                                 width: '100%',height:'auto', borderTopRightRadius: 30, borderTopLeftRadius: 30
                            }}>

                                <Text style={styles.signuptitle}>Sign Up</Text>

                                <View
                                    style={styles.inputView}>

                                    <Image source={require('../images/name_red.png')}
                                        style={styles.nameIconStyle} />

                                    <TextInput
                                        placeholder="Name"
                                        placeholderTextColor="#AEB6C1"
                                        underlineColorAndroid="transparent"
                                        style={styles.input}
                                        onChangeText={name => this.setState({ name })}
                                    />


                                </View>

                                {/* {this.state.loading && (
                                <View style={styles.loading}>
                                    <ActivityIndicator size="large" color="#ffffff" />
                                </View>
                            )} */}


                                <View
                                    style={styles.inputView1}>

                                    <Image source={require('../images/mail_red.png')}
                                        style={styles.MailIconStyle} />

                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor="#AEB6C1"
                                        underlineColorAndroid="transparent"
                                        style={styles.input}
                                        onChangeText={text => this.setState({ email: text.trim()})}
                                    />


                                </View>


                                <View
                                    style={styles.inputView1}>

                                    <Image source={require('../images/phone_no.png')}
                                        style={styles.phoneIconStyle} />

                                    <View style={{ flexDirection: 'row' }}>

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
                                        maxLength={10}
                                        keyboardType='number-pad'
                                        onChangeText={phone => this.setState({ phone })}
                                    />
                                </View>

                                <View
                                    style={styles.inputView12}>

                                    <Image source={require('../images/name_red.png')}
                                        style={styles.genderIconStyle} />
                                        <View>
                                        <View >
                                            <Picker
              enableModalBlur={false}
             placeholder="Select your gender"
             
              placeholderTextColor="#ADB6C1"
              value={this.state.gender}
              style={{fontSize:RFPercentage(2),marginTop:10,marginLeft:10,width:'80%'}}
              hideUnderline={true}
              onChange={items => this.setState({gender: items})}
            //   mode={Picker.modes.MULTI}
            //   rightIconSource={require('../images/down-arrow.png')}
            >
              {_.map(optionValue, option => (
                <Picker.Item  key={option.value} value={option} disabled={option.disabled}/>
              ))}
            </Picker>

                                       </View>
                                </View>
                                </View>

                                <View
                                    style={styles.inputView1}>

                                    <Image source={require('../images/location_red.png')}
                                        style={styles.locationIconStyle} />

                                    <TextInput
                                        placeholder="Location"
                                        placeholderTextColor="#AEB6C1"
                                        underlineColorAndroid="transparent"
                                        style={styles.input}
                                        onChangeText={location => this.setState({ location })}
                                    />


                                </View>

                                <View
                                    style={styles.inputView1}>

                                    <Image source={require('../images/lock.png')}
                                        style={styles.ImageLockIconStyle} />

                                    <TextInput
                                        placeholder="Password"
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
                                        onChangeText={confirmPassword => this.setState({ confirmPassword })}
                                    />

                                </View>

                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 15
                                }}>

<CheckBox
                                        uncheckedCheckBoxColor={'#FB3954'}
                                        checkedCheckBoxColor={'#FB3954'}
                                        value={this.state.isChecked}
                                        onValueChange={() => this.setState({ isChecked: !this.state.isChecked })}
                                        onClick={() => {
                                            this.setState({ isChecked: !this.state.isChecked },()=>{
                                                if (this.state.isChecked==true) {
                                                
                                            }
                                            });
                        

                                        }}
                                        isChecked={this.state.isChecked}
                                    />
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate('TermsAndCondition')}>
                                    <Text
                                        style={{
                                            marginTop: 5, color: '#06142D', marginHorizontal: 5,
                                            borderBottomWidth: 1, borderColor: '#C7E8F2', fontSize: 12
                                        }}
                                    >Accept
                                     <Text style={{color:'#FB3954'}}> Terms and Conditions</Text></Text>
                                    </TouchableOpacity>

                                </View>



                                <TouchableOpacity
                                    style={styles.loginButtonStyle}
                                    activeOpacity={.5}
                                    onPress={this.CheckTextInput}>


                                    <Text style={styles.buttonWhiteTextStyle}>Sign Up</Text>

                                </TouchableOpacity>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', flex: .1 }}>
                                    </View>

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

                            </View>
</ScrollView>

                        </View>

                    </LinearGradient>

                </ScrollView>

            </SafeAreaView>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
      
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
        backgroundColor: 'transparent',
        justifyContent:'center'
    },
    loginButtonStyle: {
        marginTop: 10,
        width: 250,
        height: 40,
        padding: 10,
        marginBottom:20,
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
        marginTop: 10,
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
        marginTop: 15,
        position:'relative',
        borderRadius: 10,
        elevation: 20,
        shadowColor: 'grey',
        elevation: 20,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    },
    inputView12: {
        flexDirection:'row',
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        height:50,
        width: '90%',
        marginTop: 15,
        borderRadius: 10,
        elevation: 20,
        shadowColor: 'grey',
        elevation: 20,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    },
    nameIconStyle: {
        height: 24,
        width: 20,
        marginLeft: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    phoneIconStyle: {
        height: 21,
        width: 21,
        marginLeft: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    genderIconStyle: {
        height: 20,
        width: 17,
        marginLeft: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationIconStyle: {
        height: 22,
        width: 15,
        marginLeft: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MailIconStyle: {
        height: 17,
        width: 22,
        marginLeft: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageLockIconStyle: {
        height: 24,
        width: 18,
        marginLeft: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screentitle: {
        color: "white",
        fontSize: 18,
        // textAlign: 'center',
        marginBottom:15
    },
    signuptitle: {
        color: '#2B2F3B',
        fontSize: 21,
        marginTop: 10,
        textAlign: 'center',

    },
    backIconStyle: {
        height: 15,
        width: 20,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 90,
        marginBottom:8
    },
    arrowIconStyle: {
        height: 15,
        width: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
    linearGradient: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 0,
        width: '100%'

    },
    linearGradientFull: {
        flexDirection: 'column',
        flex: 1,
        width: '100%'

    },

});

export default SignupActivity;
