import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
    TouchableWithoutFeedback,
    ImageBackground,
    Alert
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
const APP_POPUP_LOGO = require('../images/Group.png');

function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <ImageBackground source={{ uri: 'http://3.25.67.165/uploads/video_logo/' + item.image }}
                style={{ width: 375, height: 207, justifyContent: 'center' }}
                imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Image source={require('../images/play_icon.png')}
                    style={styles.playiconstyle} />

            </ImageBackground>

            <View style={styles.videoBottomView}>

                <View style={{ flexDirection: 'row', flex: .60 }}>

                    <Text style={styles.textpinkserialno}>{item.sr_nu}.</Text>

                    <Text style={styles.textblacktextstyle}>{item.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', flex: .40, justifyContent: 'center', alignItems: 'flex-end' }}>

                    <Text style={styles.textpinktextstyle}> ${item.price}/{item.monthname}</Text>

                </View>

            </View>


        </View>
    );
}

class MyVideosActivity extends Component {

    constructor(props) {
        super(props);
        this.videoList = this.videoList.bind(this);
        this.state = {
            logouturl: 'http://3.25.67.165/api/Api/logout',
            baseUrl: 'http://3.25.67.165/api/Api/subscribedVideoList',
            userId: '',
            isnoDataVisible: false,
            spinner: false
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }
    loading() {
        this.setState({ spinner: true });
      }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'My Videos'
    };

    componentDidMount() {
        this.loading();
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
                this.videoList();
            }
        });
    }

    ListEmpty = () => {
        return (
            //View to show when list is empty
            <View style={{
            justifyContent:'center',
            alignItems:'center'}}>
                {
                    this.state.isnoDataVisible ?
                    <Image  style={{width: 500, height: 580}} source={require('../images/preview.png')}  />
                        : null
                }
            </View>
        );
    };
    videoList() {
        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
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
                    this.setState({ isnoDataVisible: true })
                    this.setState({spinner:false})

                } else {
                    this.setState({ isnoDataVisible: false })
                    this.setState({ data: responseData.data });
                    this.setState({spinner:false});
                }

                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }

    actionOnRow(item) {

        console.log("item id ===" + item.subscribed_video_id)
        this.props.navigation.navigate('MyVideosDetail', {
            id: item.subscribed_video_id
        })

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
      
   


    render() {
        return (
            <SafeAreaView style={styles.container}>
               
                    <Spinner size={50}  color="red"
          visible={this.state.spinner}
        //   textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
                <View style={styles.headerView}>


                    <TouchableOpacity style={{ flex: .10, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.goBack() }}>

                        <Image source={require('../images/back_icon.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: .80 }}
                    >

                        <Text style={styles.screentitle}>My Videos</Text>

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

                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}

                    renderItem={({ item }) => (

                        <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                            <View>
                                <Item item={item}
                                />
                            </View>

                        </TouchableWithoutFeedback>

                    )}
                    keyExtractor={item => item.sr_nu}
                    ListEmptyComponent={this.ListEmpty}
                />

                <View style={styles.tabStyle}>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home_inactive.png')}
                            style={styles.StyleHomeTab} />

                        <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.Home}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>
                        <Image source={require('../images/video_active.png')}
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
                        onPress={() => { this.props.navigation.navigate('Notification') }}>

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

            </SafeAreaView>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F6F9FE'
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
    listItem: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        flex: 1,
        alignSelf: "center",
        flexDirection: "column",

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
        color: "#FB3954",
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
        color: "#747A82",
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
    }
    ,
    tabButtonStyle: {
        flex: .25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        backgroundColor: '#FB3954'
    },
    screentitle: {
        color: "white",
        fontSize: 20,
        textAlign: 'center'
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
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoBottomView: {
        height: 50,
        width: 375,
        marginBottom: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        shadowColor: '#ecf6fb',
        elevation: 5,
        color: 'black',
        textAlign: 'center',
        shadowOpacity: 1,
        alignItems: 'center'
    },
    textblacktextstyle: {
        fontSize: 15,
        color: '#06142D'
    },
    textpinkserialno: {
        fontSize: 15,
        color: '#FB3954',
        marginLeft: 15

    },
    textpinktextstyle: {
        fontSize: 15,
        color: '#FB3954',
        textAlign: 'right',

    },
    playiconstyle: {
        height: 36,
        width: 36,
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
    backIconStyle: {
        height: 20,
        width: 20,
        marginLeft: 20,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MyVideosActivity;

