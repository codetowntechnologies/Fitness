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
    Alert,
    Button
} from 'react-native';
import Grid from 'react-native-grid-component';
import Icon from 'react-native-vector-icons/AntDesign';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import Modal from 'react-native-modal';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Spinner from 'react-native-loading-spinner-overlay';
const APP_POPUP_LOGO = require('../images/Group.png');
class MakePayment extends Component {
    state = {
        loading: '',
        dollar: '',
        selected: [],
        item: '',
        swipeablePanelActive: false,
        show:false,
        logouturl: 'http://3.25.67.165/api/Api/logout',
        subscribeVideo:'http://3.25.67.165/api/Api/subscriber',
        imageValue:'',
        isModalVisible: false,
            isUsernameVisible: false,
            isModalPopupVisible: false,
            spinner:false
    }
    showLoading() {
        this.setState({ loading: true });
    }
    hideLoading() {
        this.setState({ loading: false });
    }
    loading() {
        this.setState({ spinner: true });
      }
    getData = async () => {
        let dataItem = await AsyncStorage.getItem('@ChooseSubscription');
        let selectedData = JSON.parse(dataItem);
        this.setState({ item: selectedData });
        console.log(this.state.item);
        let price=await AsyncStorage.getItem('@price');
        let priceItem=JSON.parse(price);
        this.setState({dollar:priceItem});
    }
    getUserID=()=>{
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
                //   this.showLoading();
            }
        });
    }
    componentDidMount() {
        this.getData();
        this.openPanel();
        this.getUserID();
    }
    openPanel = () => {
        this.setState({ swipeablePanelActive: true });
    };

    closePanel = () => {
        this.setState({ swipeablePanelActive: false });
    };
    selectItem = (value) => {
        console.log("this is ccid" + value);
        let list = [...this.state.selected];
        if(this.state.selected.includes(value)) {
            this.setState({ selected: list.filter(item => item !== value) })
        } else {
            list.push(value);
            this.setState({ selected: list });
        }
    }
    SubscribeVideo =() => {
        let bar = new Promise((resolve, reject) => {
               this.state.item.forEach(item=>{
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
                subscribed_video_id:item.video_id,
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
    _renderItem = (item, index) => (
        <View key={index} style={styles.item}>
            <TouchableOpacity onPress={() => this.selectItem(item)}
                style={[styles.option, { backgroundColor: '#FB3954' }]}>
                <Text style={{ color: 'white', fontSize: 15, textAlign: 'center', marginTop: 10, fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif' }}>{item.name}</Text>
                <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', marginTop: 15 }} >{`$ ${item.price} per month`}</Text>
            </TouchableOpacity>
        </View>
    );

    createTwoButtonAlert = () =>
    {
        this.setState({isModalPopupVisible:true});
    }
    //  Alert.alert(
    // "Log Out",
    //   "Are you Sure you want to Log Out ?",
    //   [
    //     {
    //       text: "NO",
    //       onPress: () => console.log("Cancel Pressed"),
    //       style: "cancel"
    //     },
    //     { text: "Yes", onPress:()=> this.logoutcall() }
    //   ],
    //   { cancelable: false }
    // )
    getItemLayout = (data, index) =>{
        console.log('index of getItem'+index);
        if(index=='7'){
            console.log('working getlayout');
           return { length: 270, offset: 270 * index, index }
        }else{
          return { length: 270, offset: 270 * index, index }
            
        }  
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
                    this.setState({spinner:false});
                    this.setState({isModalPopupVisible:false});
                } else {
                    AsyncStorage.setItem('@is_login', "");
                    AsyncStorage.setItem('@user_id', "");
                    AsyncStorage.setItem('@email', "");
                    AsyncStorage.setItem('@name', "");
                    this.setState({spinner:false});
                    this.setState({isModalPopupVisible:false});
                    this.props.navigation.navigate('Login')
                }
                console.log(responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
                this.setState({spinner:false});
                this.setState({isModalPopupVisible:false});
            })

            .done();
    }
    showImage=(value)=>{
     this.setState({imageValue:value});
    }
    render() {
        return (
            <View style={styles.container}>
            <Spinner size={50}  color="red"
          visible={this.state.spinner}
        //   textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
                <View style={styles.headerView}>


                    <TouchableOpacity style={{ flex: .10, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('ChooseSubscription') }}>

                        <Image source={require('../images/back_icon.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: .8 }}
                    >

                        <Text style={styles.screentitle}>Make Payment</Text>

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
                              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
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

                    <TouchableOpacity  onPress={this.createTwoButtonAlert}
                    style={{
                        flex: .10
                    }}>
                        <Image source={require('../images/small-user.png')}
                            style={styles.MenuHomeUserIconStyle} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: .5 }}>
                    <ScrollView  >
                        <View>
                            <Text style={{ fontSize: RFPercentage(2.2), marginLeft: 12, marginTop: 12 }}>Selected Videos</Text>
                            <View />
                        </View>
                        <Grid
                            style={styles.list}
                            renderItem={this._renderItem}
                            data={this.state.item}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={3}
                        />
                        <View style={{height:120}}>
                            <View style={{
                                padding: 25,
                                marginTop: 20, marginLeft: 65, zIndex: 1,
                            }}>
                                <Text style={{ backgroundColor: '#fff', width: 23, fontSize: 15, borderColor: 'black', borderWidth: 1, borderRadius:90, textAlign: 'center' }}>{this.state.item.length}</Text>
                            </View>
                            <TouchableOpacity onPress={this.Subscription} style={styles.Subscription} >
                                <Text style={{ color: '#fff', textAlign: 'center', fontSize: RFPercentage(2.7) }}>Subscription {this.state.dollar}</Text>
                            </TouchableOpacity>

                        </View>

                    </ScrollView>
                </View>
                <View style={{
                    backgroundColor: '#ffffff', position: 'absolute', bottom: 0,
                    flex: 5, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30, shadowColor: 'lightgray', shadowRadius: 1, elevation: 25, shadowOffset: { width: 0, height: 4 }
                }}>


                    <View style={{
                        backgroundColor: '#ffffff',
                        flex: .1, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30
                    }}>

                        <View>
                            <Text style={{ fontSize: RFPercentage(3), marginTop: 10, fontWeight: 'bold', textAlign: 'center' }} >Make Payment</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: RFPercentage(2.2), marginLeft: 8, marginTop: 15, marginBottom: 15 }} >Select Payment Mode</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignContent: 'center', marginRight:width*0.04}}>
                                <View style={{   }}>
                                <TouchableOpacity onPress={()=>this.showImage("Visa")} >
                                  <Image source={require('../images/payPalbg.jpg')} alt="Visa Payment" style={styles.paymentMode} />
                                </TouchableOpacity>
                                </View>
                                <View>
                               <TouchableOpacity onPress={()=>this.showImage("master")}  >
                                    <Image source={require('../images/visa.jpg')} alt="Master Payment" style={styles.lastPaymentMode} />

                              
                               </TouchableOpacity>
                               </View>
                               <View>
                               <TouchableOpacity onPress={()=>this.showImage("InternetBanking")}  >
                              
                                <Image source={require('../images/mastercard-png.png')} alt="Visa Payment" style={styles.secondPaymentMode} />
                               
                               
                                </TouchableOpacity>
                                </View>
                                <View>
                                </View>
                                
                            </View>
                            <View>
                                <View style={styles.lineStyle} />
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ marginLeft: 12, fontSize: RFPercentage(2.2),fontWeight:'bold' }} >Total Amount</Text>
                                    <Text style={{ fontSize: RFPercentage(2.6), fontWeight:'bold', position: 'absolute', right: 22, color: '#FB3954' }}> {this.state.dollar}</Text>
                                </View>
                                <View style={styles.lineStyle} />
                            </View>
                            <TouchableOpacity onPress={this.PayNow} onPress={this.SubscribeVideo} style={styles.PayNow} >
                               
                                <Text style={{ color: '#fff', textAlign: 'center', fontSize: RFPercentage(2.4) }}>Pay Now</Text>
                            </TouchableOpacity>
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
        backgroundColor: '#F6F9FE'
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#FB3954'
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
    backIconStyle: {
        height: 20,
        width: 20,
        marginLeft: 20,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screentitle: {
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: 'center'
    },
    outLine: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: 'lightgray',
    },
    paymentMode: {
        width: 95,
        marginLeft: 15,
        height: 62,
    },
    secondPaymentMode: {
        width: 100,
        marginLeft: 15,
        height: 60
    },
    lastPaymentMode: {
        width: 100,
        marginLeft: 15,
        height: 55
    },
    lineStyle: {
        borderWidth: .8,
        borderColor: 'lightgray',
        margin: 10,
        width: width - 30
    },
    item: {
                marginTop: 10,
        padding: 2,
    },
    option: {
        width: 130,
        height: 110,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center'
    },
    yogaImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    womenImg: {
        width: 150,
        height: 150
    },
    Subscription: {
        width: 220,
        backgroundColor: '#FB3954',
        justifyContent: 'center',
        position: 'absolute',
        alignSelf: 'center',
        height: 50,
        borderRadius: 8,
        marginBottom: 50,
        marginTop: 50
    },
    PayNow: {
        width: 150,
        backgroundColor: '#FB3954',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 10,
        padding: 12,
        marginBottom: 20,
        borderRadius: 8,
    },
    mothlySubscription: {
        width: 160,
        backgroundColor: '#FB3954',
        marginLeft: 20,
        padding: 12,
        borderRadius: 8,
    },
    bottomactivetextstyle: {
        color: "#FB3954",
        fontSize: 8,
        marginTop: 5,
        textAlign: 'center'
    },
    bottominactivetextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginTop: 3,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    StyleHomeTab: {
        marginTop: 5,
        width: 30,
        height: 28,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleVideoTab: {
        marginTop: 11,
        marginRight: 40,
        width: 38,
        height: 23,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list:{
        marginRight:width*0.05,
        width:width
    },
    bottomvideotextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginRight: 40,
        marginTop: 3,
        textAlign: 'center',
    },
    styleNotificationTab: {
        marginTop: 9,
        width: 25,
        height: 30,
        marginLeft: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomnotificationtextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginLeft: 40,
        marginTop: 3,
        textAlign: 'center'
    },
    tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: 60,
        margin: 5,
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
    bottomactivetextstyle: {
        color: "#FB3954",
        fontSize: 8,
        marginTop: 5,
        textAlign: 'center'
    },
    bottominactivetextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginTop: 3,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    StyleHomeTab: {
        marginTop: 5,
        width: 30,
        height: 28,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleVideoTab: {
        marginTop: 11,
        marginRight: 40,
        width: 38,
        height: 23,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomvideotextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginRight: 40,
        marginTop: 3,
        textAlign: 'center',
    },
    styleNotificationTab: {
        marginTop: 9,
        width: 25,
        height: 30,
        marginLeft: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonStyle: {
        flex: .25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
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
    plusiconstyle: {
        height: 21,
        width: 21,
        marginTop: 60,
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
        color: "#747A82",
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
    StyleProfileTab: {
        marginTop: 9,
        width: 25,
        height: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default MakePayment;