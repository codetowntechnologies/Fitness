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


class Thankyou extends Component {

  
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



                    this.showLoading();
                    this.logincall();

                } else {
                    alert(stringsoflanguages.new_password_confirm_password_not_match);
                }
            } else {
                alert(stringsoflanguages.please_enter_new_password);
            }
        } else {
            alert(stringsoflanguages.please_enter_current_password);
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
                    alert(responseData.message);
                } else {

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

                      

                        <View  style={{alignContent:'center', justifyContent:'center', marginTop:70}}>

                <Text style={{fontSize: RFPercentage(7), fontWeight:'600', alignItems:'center', justifyContent:'center'}}> Success</Text>
                </View>
                <View style={{marginTop: 20}}>
                        <Text style={{fontSize: RFPercentage(2.5), fontWeight:'60', alignItems:'center', justifyContent:'center'}}> Payment has been made you paid $1200 </Text>
                        </View>
                        <View style={{marginTop: 20}}>
                        <Text style={{fontSize: RFPercentage(4), fontWeight:'60', alignItems:'center', justifyContent:'center'}}> Subscription Activated </Text>
                        </View>
                        <TouchableOpacity  onPress={() => { this.props.navigation.navigate('Dashboard')}}
                            style={styles.loginButtonStyle}
                           >

                            <View style={{flexDirection:'row'}}>
                            <Text style={styles.buttonWhiteTextStyle}>Back to Home </Text>
                            <Image source={require('../images/back_right_icon.png')}
                                    style={styles.backIconStyle} />
                                    </View>
                           
                            

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
        width: 120,
        height: 130
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
        marginTop: 0,
        height: 22,
        width: 30,
        marginLeft: 3,
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

export default Thankyou;
