import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    SafeAreaView,
    ScrollView,
    TouchableHighlight,
    Alert
} from 'react-native';
import Grid from 'react-native-grid-component';
import Icon from 'react-native-vector-icons/AntDesign';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import BottomBar from './BottomBar';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
<<<<<<< HEAD
import Modal from 'react-native-modal';
import moment from 'moment';

const APP_POPUP_LOGO = require('../images/Group.png');


=======
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const myIcon1 = <View style={{ backgroundColor: '#32CD32', position: 'absolute', top: -10, right: -2, zIndex: 1, borderRadius: 35, width: 25, borderWidth: 2, borderColor: 'white', alignSelf: 'flex-end' }}><Icon name="check" size={18} color="white" style={{ textAlign: 'center' }} /></View>
class Subscription extends Component {
    state = {
        loading: '',
        userApiData:'',
        userId:'',
        isData:false,
        url:'http://3.25.67.165/api/Api/subscribedVideoList',
        cancelUrl:'http://3.25.67.165/api/Api/cancelSubscription',
<<<<<<< HEAD
        subscribeVideo:'http://3.25.67.165/api/Api/subscriber',
        textOnModel:'',
        isModalVisible: false,
    isUsernameVisible: false,
    isModalPopupVisible: false,
    showAlert:'',
    modelText:'',
    isCancelModalPopup:false,
    isAlertModalPopup:false,
=======
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
        selected: [],
        item: [{ id: 1, text: 'Menezes Pilates Floor 1', price: '$10 per month' }, { id: 2, price: '$10 per month', text: 'Menezes Pilates Floor 2' }, { id: 3, price: '$10 per month', text: 'Menezes Pilates Floor 3' },
        { id: 4, price: '$10 per month', text: 'Menezes Pilates on the Ball' }, { id: 5, price: '$10 per month', text: 'Menezes Pilates on the Foam Roller' }, { id: 6, price: '$10 per month', text: 'Menezes Pilates Pregnancy' }]
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
    showLoading() {
        this.setState({ loading: true });
    }
    loading() {
        this.setState({ spinner: true });
      }
    hideLoading() {
        this.setState({ loading: false });
    }
    componentDidMount(){
        this.loading();
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
                this.SubscriptionData();
            }
        });
    }
<<<<<<< HEAD
    SubscribeVideo =() => {
        let bar = new Promise((resolve, reject) => {
               this.state.selected.forEach(item=>{
        console.log('video ID',item.id);
        console.log(this.state.dollar);
            let startdate=moment().add(30,'days').format("YYYY-MM-DD");
           console.log(startdate);
        let ProfileAPI = this.state.subscribeVideo;
        fetch(ProfileAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                app_user_id: this.state.userId,
                subscribed_video_id:item.subscribed_video_id,
                amount_paid:this.state.dollar,
                expire_on:startdate
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    this.setState({ isnoDataVisible: true })
                 
                } else {
                    this.setState({ isnoDataVisible: false }); resolve();
                  
                }
                console.log('response object:', responseData); resolve();
               

            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })
            .done();
    });
}); 
bar.then(() => {
    this.props.navigation.navigate('Thankyou');
});
       
    }
=======
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
    SubscriptionData=()=>{
        let urlID=this.state.url;
        fetch(urlID, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: this.state.userId

            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    this.setState({spinner : false})
                    this.setState({ isData: false })
                    console.log("working no video")
                } else {
                    this.setState({spinner : false})
                    this.setState({ isData: true })
                    this.setState({ userApiData: responseData.data });
                }
                this.setState({ userApiData: responseData.data });
                
                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }
    renewSubscription = async () => {
        if (this.state.selected.length > 0) {
            await AsyncStorage.setItem('@MySubscription', JSON.stringify(this.state.selected));
        } else {
            // alert("Please selected atleast one subscription");
            this.setState({showAlert:"Please selected atleast one subscription"});
            this.setState({isAlertModalPopup:true})
        }
    }
    cancelSubscription = () => {
        // alert("Are you sure to cancel the subscription");
        if(this.state.selected.length >0){
            this.setState({isCancelModalPopup:true});
    // Alert.alert(
    //   "Cancel Subscription",
    //   "Are you sure you want to cancel this subscription?",
    //   [
    //     {
    //       text: "No",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     { text: "Yes", onPress: () => {this.ApiTocancelSubscription()} }
    //   ],
    //   { cancelable: false }
    // );
        }else{
            // alert("Please select the subscription which you want to cancel");
            this.setState({showAlert:"Please select the subscription which you want to cancel"});
            this.setState({isAlertModalPopup:true})
        }
        
    }
    createTwoButtonAlert = () =>
    {
      this.setState({isModalPopupVisible:true});
    }
    logoutcall=()=> {
        this.loading();
        var url = this.state.logouturl;
        console.log('logouturl:' + url);
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
                    this.setState({ isModalPopupVisible: false });
                    this.setState({spinner:false});
                } else {
                    AsyncStorage.setItem('@is_login', "");
                    AsyncStorage.setItem('@user_id', "");
                    AsyncStorage.setItem('@email', "");
                    AsyncStorage.setItem('@name', "");
                    this.setState({ isModalPopupVisible: false });
                    this.setState({spinner:false});
                    this.props.navigation.navigate('Login')
                }
                console.log(responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }
    ApiTocancelSubscription=()=>{
        this.loading();
        let CancelAPI=this.state.cancelUrl;
        this.state.selected.forEach(item=>{
            fetch(CancelAPI, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    app_user_id:item.app_user_id,
                    subscribed_video_id:item.subscribed_video_id
                }),
            })
                .then(response => response.json())
                .then(responseData => {
                    this.hideLoading();
                    if (responseData.status == '0') {
                        this.setState({ isnoDataVisible: true });
                        this.setState({spinner:false});
                        this.setState({isCancelModalPopup:false});
    
                    } else {
                        this.setState({ isnoDataVisible: false })
                        this.setState({spinner:false});
                        this.setState({isCancelModalPopup:false});
                        this.setState({dollar:''});
                        this.SubscriptionData();
                        // alert(responseData.message);
                    }
                    console.log('response object:', responseData);
                })
                .catch(error => {
                    this.hideLoading();
                    console.error(error);
                    this.setState({spinner:false});
                    this.setState({isCancelModalPopup:false});
                })
    
                .done();
            });
    }
    selectItem = (value) => {
        console.log("this is ccid" + value);
        let list = [...this.state.selected]
        if (this.state.selected.includes(value)) {
            this.setState({ selected: list.filter(item => item !== value) })
        } else {
            list.push(value)
            this.setState({ selected: list })
        }
    }
    _renderItem = (item, index) => (
        <View key={index} style={styles.item}>
            {this.state.selected.includes(item) ? myIcon1 : null}
            <TouchableOpacity onPress={() => this.selectItem(item)}
                style={[styles.option, { backgroundColor: '#FB3954' }]}>
                <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', marginTop: 10, fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif' }}>{item.name}</Text>
                <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', marginTop: 5 }} >{` $ ${item.price} per month`}</Text>
                {/* <View style={{ flexDirection: 'row', margin: 3, marginTop: 18 }}> */}
                    <View style={{marginTop:8}}>
                        <Text style={{ color: 'white',textAlign:'center', fontSize: 9 }}>SUBSCRIBED ON</Text>
                        <Text style={{ color: 'white',textAlign:'center',marginTop:5, fontSize: 9 }}>{item.subscried_on.substring(0, 10)}</Text>
                    </View>
                    {/* <View style={styles.lineStyle} /> */}
                    {/* <View>
                        <Text style={{ color: 'white', fontSize: 10, textAlign: 'center' }}>END ON</Text>
                        <Text style={{ color: 'white', fontSize: 9 }}>{item.expire_on}</Text>
                    </View> */}
                {/* </View> */}
            </TouchableOpacity>
        </View>
    );
    render() {
        return (
            <View style={styles.container}>
                    <ScrollView bounces={false} >
                    <Spinner size={50}  color="red"
          visible={this.state.spinner}
<<<<<<< HEAD
        //   textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
 <View style={styles.headerView}>
<TouchableOpacity style={{ flex: .10, alignItems: 'center', justifyContent: 'center' }}
                     onPress={() => { this.props.navigation.goBack() }}>

                        <Image source={require('../images/back_icon.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>
                    
                  


                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: .8 }}
                    >

                        <Text style={styles.screentitle}>My Subscription</Text>

                    </View>

                    <TouchableOpacity  onPress={this.createTwoButtonAlert}
                    style={{
                        flex: .10
                    }}
                    >

                        <Image source={require('../images/small-user.png')}
                            style={styles.MenuHomeUserIconStyle} />


                    </TouchableOpacity>
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
                            , marginLeft: 20, marginBottom: 150, marginRight: 20, marginTop: 150,width:320

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

                            <Text style={styles.popupmsgstyle}>Are you Sure you want to Log Out ?</Text>
                              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20}}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={this.logoutcall}>

                                <Text style={styles.fbText}
                                >Yes</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButtonStyle}
                                activeOpacity={.5}
                                onPress={()=>{this.setState({isModalPopupVisible:false})}}>

                                <Text style={styles.fbText}
                                >NO</Text>

                            </TouchableOpacity>
                            </View>


                        </SafeAreaView>


                    </Modal>

                    <Modal
                        isVisible={this.state.isCancelModalPopup}
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
                            , marginLeft: 20, marginBottom: 150, marginRight: 20, marginTop: 150,width:320

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

                            <Text style={styles.popupmsgstyle}>Are you sure you want to cancel this subscription?</Text>
                              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20}}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={this.ApiTocancelSubscription}>
                                <Text style={styles.fbText}
                                >Yes</Text>

                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButtonStyle}
                                activeOpacity={.5}
                                onPress={()=>{this.setState({isCancelModalPopup:false})}}>

                                <Text style={styles.fbText}
                                >NO</Text>

                            </TouchableOpacity>
                            </View>


                        </SafeAreaView>
                    </Modal>
                    <Modal
                        isVisible={this.state.isAlertModalPopup}
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
                            , marginLeft: 20, marginBottom: 150, marginRight: 20, marginTop: 150,width:320

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

                            <Text style={styles.popupmsgstyle}>{this.state.showAlert}</Text>
                              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:20}}>
                            <TouchableOpacity
                                style={styles.SubmitButtonStyle}
                                activeOpacity={.5}
                                onPress={()=>{this.setState({isAlertModalPopup:false})}}>
                                <Text style={styles.fbText}
                                >OK</Text>

                            </TouchableOpacity>
                            {/* <TouchableOpacity
                                style={styles.cancelButtonStyle}
                                activeOpacity={.5}
                                onPress={()=>{this.setState({isCancelModalPopup:false})}}>

                                <Text style={styles.fbText}
                                >NO</Text>

                            </TouchableOpacity> */}
                            </View>


                        </SafeAreaView>


                    </Modal>
=======
          textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />

                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <Icon name="left" size={20} color="black" style={{ marginLeft: 8 }} onPress={() => this.props.navigation.navigate('Settings')} />
                            <Text style={{ marginLeft: 100, fontSize: RFPercentage(3) }}>My Subscription</Text>
                        </View>
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
                        <View style={styles.yogaImage}>
                            <Image source={require('../images/women.png')} style={styles.womenImg} />
                        </View>
                      {this.state.isData?
                        (
                            <View>
                            <View>
                            <Text style={{ fontSize: RFPercentage(2.2), marginLeft: 12 }}>Subscribed Videos</Text>
                        </View>
                        
                            <Grid
                            style={styles.list}
                            renderItem={this._renderItem}
                            data={this.state.userApiData}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={2}
                            
                        />
                       
                       
                            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 40 }}>
                            <TouchableOpacity onPress={this.cancelSubscription} style={styles.cancelSubscription} >
                                <Text style={{ color: '#fff', textAlign: 'center', fontSize:14 }}>Cancel Subscription</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.renewSubscription} style={styles.RenewSubscription} >
<<<<<<< HEAD
                            <Text style={{ color: '#fff', textAlign: 'center', fontSize:14 }}>Renew Subscription {this.state.dollar}</Text>
=======
                                <Text style={{ color: '#fff', textAlign: 'center' }}>Renew Subscription</Text>
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
                            </TouchableOpacity>
                        </View>
                      
                        </View>
                       
                        ):(
                            <View style={{justifyContent:'center',alignItems:'center'}}>
                           <Image  style={{width: 500, height: 375}} source={require('../images/preview.png')}  />
                         </View> 
                        )
                      }
                    </ScrollView>
                    <View style={{
                                flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                                 width: '100%'
                            }}>
                    <View style={styles.tabStyle}>

                    <TouchableOpacity style={styles.tabButtonStyle}
                                    onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                                    <Image source={require('../images/home_inactive.png')}
                                        style={styles.StyleHomeTab} />

                                    <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.Home}</Text>

                                </TouchableOpacity>

                        <TouchableOpacity style={styles.tabButtonStyle}
                            onPress={() => { this.props.navigation.navigate('MyVideos') }}>

                            <Image source={require('../images/video_inactive.png')}
                                style={styles.StyleVideoTab} />

                            <Text style={styles.bottomvideotextstyle}>{stringsoflanguages.my_videos}</Text>

                        </TouchableOpacity>
                        

                            <TouchableOpacity style={[styles.CircleShapeView,{ flex: .20, alignItems: 'center', justifyContent: 'center' }]}
                        onPress={() => { this.props.navigation.navigate('ChooseSubscription')}}
                            >

                                <Image source={require('../images/plus_icon.png')}
                                    style={styles.plusiconstyle}
                                />

                                <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.subscribe}</Text>

                            </TouchableOpacity>
                      
                        <TouchableOpacity style={styles.tabButtonStyle}
                         onPress={() => { this.props.navigation.navigate('Notification')}}
                        >

                            <Image source={require('../images/bell_inactive.png')}
                                style={styles.styleNotificationTab} />

                            <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.notification_small}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabButtonStyle}
                                    onPress={() => { this.props.navigation.navigate('Contactus') }}>

                                    <Image source={require('../images/setting_active.png')}
                                        style={styles.StyleProfileTab} />

                                    <Text style={styles.bottomactivetextstyle}>{stringsoflanguages.settings}</Text>
                                </TouchableOpacity>
                    </View>
                    </View>
                </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#F6F9FE'
        backgroundColor: '#fff'
    },
    lineStyle: {
        borderWidth: 1,
        borderColor: 'lightgray',
        margin: 2,
        height: 25
    },
    item: {
        marginTop: 10,
        padding:2,
        marginLeft:12
       
    },
    option: {
        width: 180,
        height: 125,
        borderRadius: 15,
    },
    yogaImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
<<<<<<< HEAD
    backIconStyle: {
        height: 20,
        width: 20,
        marginLeft: 20,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#FB3954'
    },
=======
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
spinnerTextStyle: {
        color: '#FFF'
      },
    womenImg: {
        width: 200,
        height: 200
    },
    cancelSubscription: {
        width: 170,
        backgroundColor: '#AEB6C3',
        marginLeft: 20,
        padding: 12,
        borderRadius: 8
    },
    RenewSubscription: {
<<<<<<< HEAD
        width: 170,
=======
        width: 160,
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
        backgroundColor: '#FB3954',
        marginLeft: 25,
        padding: 12,
        borderRadius: 8,
    },
    CircleShapeView: {
        width: 66,
        height: 66,
        borderRadius: 66 / 2,
        marginBottom: 50,
        backgroundColor: 'white',
        shadowColor: '#ecf6fb',
        elevation: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    },
    screentitle: {
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: 'center'
    },
    plusiconstyle: {
        height: 21,
        width: 21,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuHomeUserIconStyle: {
        height: 20,
        width: 19,
        margin: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    greyclockiconstyle: {
        tintColor: '#AEB6C1',
        height: 15,
        width: 15,
        padding: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomactivetextstyle: {
        color: "#FB3954",
        fontSize: 8,
        marginTop: 5,
        textAlign: 'center'
    },
    bottominactivetextstyle: {
        color: "#747A82",
        fontSize: 8,
        marginTop: 3,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    StyleHomeTab: {
        marginTop: 5,
        width: 25,
        height: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleVideoTab: {
        marginTop: 11,
        marginRight: 10,
        width: 25,
        height: 16,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomvideotextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginRight: 10,
        marginTop: 3,
        textAlign: 'center',
    },
    styleNotificationTab: {
        marginTop: 9,
        width: 20,
        height: 25,
        marginLeft: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomnotificationtextstyle: {
        color: "#FB3954",
        fontSize: 8,
        marginLeft: 10,
        marginTop: 3,
        textAlign: 'center'
    },
    StyleProfileTab: {
        marginTop: 9,
        width: 25,
        height: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: 60,
        shadowColor: '#ecf6fb',
        elevation: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    },
   
    tabButtonStyle: {
        flex: .25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
   
});
export default Subscription;