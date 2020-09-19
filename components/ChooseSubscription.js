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
    ImageBackground,
    Alert,
    SafeAreaViewBase
} from 'react-native';
import Grid from 'react-native-grid-component';
import Icon from 'react-native-vector-icons/AntDesign';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import { BackHandler } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Modal from 'react-native-modal';
const APP_POPUP_LOGO = require('../images/Group.png');

class ChooseSubscription extends Component {
    constructor(props){
        super(props);
       this.state = {
            loading: '',
            dollar: '',
            getVideoData: 'http://3.25.67.165/api/Api/videoList',
            getSubscribedVideo: 'http://3.25.67.165/api/Api/subscribedVideoList',
            SubscribedVideo: [],
            selected: [],
            userId: '',
            totalItem: '',
            logouturl: 'http://3.25.67.165/api/Api/logout',
            Subscribed:[],
            spinner: false,
<<<<<<< HEAD
            show:false,
            isModalVisible: false,
            isUsernameVisible: false,
            isModalPopupVisible: false,
            textOnModel:'' ,
            isValidation:''
=======
            show:false
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        console.log('props',this.props);
    }
   
    showLoading() {
        this.setState({ loading: true });
    }
    loading() {
        this.setState({ spinner: true });
      }
<<<<<<< HEAD

=======
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
    getSubscribedData = () => {
        let subscribedData = this.state.getSubscribedVideo;
        fetch(subscribedData, {
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
                    this.setState({ isnoDataVisible: true })

                } else {
                    this.setState({spinner : false})
                    this.setState({ isnoDataVisible: false });
                   this.setState({Subscribed:responseData.data});
                }
                console.log('subscribed videos:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })
            .done();
    }
    subscribe = () => {
        let getData = this.state.getVideoData;
        fetch(getData, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    this.setState({spinner : false})
                    this.setState({ isnoDataVisible: true });
                } else {
                    this.setState({spinner : false});
                    this.setState({show:true});
                    this.setState({ isnoDataVisible: false });
                    this.setState({ totalItem: responseData.data });
                }
                this.setState({ totalItem: responseData.data });
                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })
            .done();
    }
    componentDidMount = async () => {
        this.loading();
        await AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
                this.subscribe();
                this.getSubscribedData();
            }
        });
        if(this.props.navigation.getParam('data') !=null && this.props.navigation.getParam('data') !=''){
            let Arr=this.state.SubscribedVideo;
        let subscribedItem =this.props.navigation.getParam('data') ;
        this.setState({dollar:'$'+subscribedItem.price})
        Arr.push(subscribedItem);
        this.setState({ SubscribedVideo: Arr });
        console.log('data from pervious ', subscribedItem);
        console.log('concat', this.state.SubscribedVideo);
        }
        
    }
    hideLoading() {
        this.setState({ loading: false });
    }
    Subscription = async () => {
        console.log(this.state.SubscribedVideo);
        if (this.state.SubscribedVideo == '' || this.state.SubscribedVideo == null) {
           this.setState({isValidation:true});
              
        } else {
            await AsyncStorage.setItem('@ChooseSubscription', JSON.stringify(this.state.SubscribedVideo));
            await AsyncStorage.setItem('@price', JSON.stringify(this.state.dollar));
            this.props.navigation.navigate('MakePayment');
        }
    }
    cancelSubscription = async () => {
        console.log(this.state.SubscribedVideo);
    }
    selectItem = (value) => {
        console.log(value);
        let list = this.state.SubscribedVideo;
        let alreadyChoosing=this.state.Subscribed;
        let ChoosingFind=alreadyChoosing.some(valueID=>valueID.name==value.name);
        if(!ChoosingFind){
        if (list != null) {
            if (this.state.SubscribedVideo.includes(value)) {
                this.setState({ SubscribedVideo: list.filter(item => item !== value) }, () => {
                    this.getTotalPrice();
                });
            } else {
                list.push(value)
                this.setState({ SubscribedVideo: list }, () => {
                    this.getTotalPrice();
                });
            }
        } else {
            let Arr = [];
            Arr.push(value)
            this.setState({ SubscribedVideo: Arr }, () => {
                this.getTotalPrice(Arr);
            });
        }
    }
    }
    getTotalPrice = (value) => {
        let item = this.state.SubscribedVideo;
        if (typeof (item) == "object") {
            let price = this.state.SubscribedVideo.map((item) => JSON.parse(item.price));
            const sum = price.reduce((a, b) => a + b, 0);
            console.log(sum);
            this.setState({ dollar: '$' + sum });
        } else {
            value.map(item => {
                this.setState({ dollar: '$' + item.price })
            })
        }
    }
    backgroundImage=(name)=>{
        let alreadyChoosing=this.state.Subscribed;
        let ChoosingFind=alreadyChoosing.some(value=>value.name==name);
        if(ChoosingFind){
        return(
            <View>
                <Image source={require('../images/stripe.png')} style={{width:60,height:55,position:'absolute',zIndex:1}}></Image>
            </View>
        )
        }
    }
    backgroundColorfun = (id) => {
        let arra = this.state.SubscribedVideo;
        let alreadySelected=this.state.Subscribed;
        if(alreadySelected!=null){
            let founded=alreadySelected.some(itemed=>itemed.name ===id);
            if (founded) {
                return id = '#AEB6C3'
            } 
        if (arra != null) {
            let found = arra.some(item => item.name === id);
            if (found) {
                return id = '#FB3954'
            } else {
                return id = '#AEB6C3'
            }
        } else {
            return id = '#AEB6C3'
        }
    }else{
        if (arra != null) {
            let found = arra.some(item => item.name === id);
            if (found) {
                return id = '#FB3954'
            } else {
                return id = '#AEB6C3'
            }
        } else {
            return id = '#AEB6C3'
        } 
    }
    

    }


    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
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
                      this.props.navigation.navigate('Login');
                     
                  }
                  console.log(responseData);
              })
              .catch(error => {
                  this.hideLoading();
                  console.error(error);
              })
  
              .done();
      }

  
    

    _renderItem = (item, index) =>
        (
            <View key={index} style={styles.item}>
            {this.backgroundImage(item.name)}
                <TouchableOpacity onPress={() => this.selectItem(item)}
                    style={[styles.option, { backgroundColor: this.backgroundColorfun(item.name) }]}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 10, fontFamily: Platform.OS === 'ios' ? 'Gill Sans' : 'sans-serif' }}>{item.name}</Text>
                    <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', marginTop: 5 }} >{`$ ${item.price} per month`}</Text>
                </TouchableOpacity>
            </View>
        );
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.outLine}>
                    <ScrollView>
                    <View style={styles.headerView}>
                    <Spinner size={50}  color="red"
          visible={this.state.spinner}
<<<<<<< HEAD
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
                    <Modal
                        isVisible={this.state.isValidation}
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

                            <Text style={styles.popupmsgstyle}>Please select atleast one subscription</Text>
                              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
    
                            <TouchableOpacity
                                style={styles.cancelButtonStyle}
                                activeOpacity={.5}
                                onPress={()=>{this.setState({isValidation:false})}}>

                                <Text style={styles.fbText}
                                >OK</Text>

                            </TouchableOpacity>
                            </View>


                        </SafeAreaView>


                    </Modal>
    <TouchableOpacity style={{ flex: .15, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/back_icon.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: .80 }}
                    >

                        <Text style={styles.screentitle}>Choose Subscription</Text>

                    </View>


                    <TouchableOpacity  onPress={this.createTwoButtonAlert} 
                    style={{
                        flex: .10
                    }}
                    >

=======
          textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
    <TouchableOpacity style={{ flex: .10, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/back_icon.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: .80 }}
                    >

                        <Text style={styles.screentitle}>Choose Subscription</Text>

                    </View>


                    <TouchableOpacity  onPress={this.createTwoButtonAlert} 
                    style={{
                        flex: .10
                    }}
                    >

>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
                        <Image source={require('../images/small-user.png')}
                            style={styles.MenuHomeUserIconStyle} />


                    </TouchableOpacity>



</View>
                        <View style={styles.yogaImage}>
                            <Image source={require('../images/women.png')} style={styles.womenImg} />
                        </View>
                        <View>
                            <Text style={{ fontSize: RFPercentage(2.2), marginLeft: 12 }}>Choose Single or Multiple Video</Text>
                            <View />
                        </View>
                        <Grid
                            style={styles.list}
                            renderItem={this._renderItem}
                            data={this.state.totalItem}
                            keyExtractor={(item, index) => index.toString()}
                            numColumns={3}
                        />
                        {this.state.show==true?
                        <View>
                        
                        <View>
                            <Text style={{ fontSize: RFPercentage(2.2), marginLeft: 12, marginTop: 8 }}>Choose Duration</Text>
                            <View style={styles.lineStyle} />
                            
                            <TouchableOpacity onPress={this.cancelSubscription} style={styles.mothlySubscription} >
                                <Text style={{ color: '#fff', textAlign: 'center' }}>1 month</Text>
                            </TouchableOpacity>
                            
                        </View>
                        <View>
                            <TouchableOpacity onPress={this.Subscription} style={styles.Subscription} >
                                <Text style={{ color: '#fff', textAlign: 'center', fontSize: RFPercentage(2.4) }}>Subscription  {this.state.dollar}</Text>
                            </TouchableOpacity>
                        </View>
                        
                        </View>
                        :null}
                    </ScrollView>
                    <View style={styles.tabStyle}>

                        <TouchableOpacity style={styles.tabButtonStyle}
                            onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                            <Image source={require('../images/home_active.png')}
                                style={styles.StyleHomeTab} />

                            <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.Home}</Text>

                        </TouchableOpacity>

                        <TouchableOpacity style={styles.tabButtonStyle}
                            onPress={() => { this.props.navigation.navigate('MyVideos') }}>

                            <Image source={require('../images/video_inactive.png')}
                                style={styles.StyleVideoTab} />

                            <Text style={styles.bottomvideotextstyle}>{stringsoflanguages.my_videos}</Text>

                        </TouchableOpacity>



                        <View style={styles.CircleShapeView}>

                            <TouchableOpacity style={{ flex: .20, alignItems: 'center', justifyContent: 'center' }}
                            >

                                <Image source={require('../images/plus_icon.png')}
                                    style={styles.plusiconstyle}
                                />

                                <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.subscribe}</Text>

                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={()=>{this.props.navigation.navigate('Notification')}}
                        >

                            <Image source={require('../images/bell_inactive.png')}
                                style={styles.styleNotificationTab} />

                            <Text style={styles.bottomnotificationtextstyle}>{stringsoflanguages.notification_small}</Text>

                        </TouchableOpacity>


                        <TouchableOpacity style={styles.tabButtonStyle}
                            onPress={() => { this.props.navigation.navigate('Settings') }}>


                            <Image source={require('../images/setting_inactive.png')}
                                style={styles.StyleProfileTab} />

                            <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.settings}</Text>
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
        backgroundColor: '#F6F9FE'
    },
    outLine: {
        flex: 1,
    },
    lineStyle: {
        borderWidth: .8,
        borderColor: 'lightgray',
        margin: 10,
        width: width - 30
    },
    list: {
        marginRight: 5
    },
    item: {
        marginTop: 10,
        padding: 3,

    },
    option: {
<<<<<<< HEAD
        width: width*0.47,
=======
        width: 122,
>>>>>>> 95be5027a77c6e45f3c3c40099701e7faa5b8255
        height: 110,
        marginLeft: 2,
        marginRight: 3,
        borderRadius: 15,
        justifyContent: 'center',
        alignContent: 'center'
    },
    spinnerTextStyle: {
        color: '#FFF'
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
        width: 250,
        backgroundColor: '#FB3954',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 12,
        marginTop: 60,
        marginBottom: 50,
        borderRadius: 8,

    },
    MenuHomeUserIconStyle: {
        height: 20,
        width: 19,
        margin: 5,
        marginRight:12,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
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
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#FB3954'
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
    backIconStyle: {
        height: 20,
        width: 20,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screentitle: {
        color: "white",
        fontSize: 20,
        textAlign: 'center'
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
        marginTop: 3,
        textAlign: 'center'
    },
    tabStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: 60,
        width: width,
        shadowColor: '#ecf6fb',
        elevation: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    }
    ,
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
        width: 20,
        height: 25,
        marginLeft: 10,
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
export default ChooseSubscription;