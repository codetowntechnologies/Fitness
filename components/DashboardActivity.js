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
    ScrollView,
    SectionList,
    Platform,
    Dimensions,
    Alert
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';

console.disableYellowBox = true;
const APP_POPUP_LOGO = require('../images/Group.png');

const width=Dimensions.get('window').width;
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


class DashboardActivity extends Component {

    constructor(props) {
        super(props);
        this.videoList = this.videoList.bind(this);
        this.state = {
            baseUrl: 'http://3.25.67.165/api/Api/videoList',
            logouturl: 'http://3.25.67.165/api/Api/logout',
            valueArr:['1','2','3','4','5','6','7','8','9','10','11'],
            userId: '',
            scrollNo:'',
            spinner:false,
                textOnModel:'',
                isModalVisible: false,
            isUsernameVisible: false,
            isModalPopupVisible: false,  
           
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
        title: 'Dashboard'
    };
    getUserID=()=>{
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
                console.log("VIDEO ID===" + videoId)
                //   this.showLoading();
            }
        });
    }

    componentDidMount() {
        this.loading();
        this.showLoading();
        this.videoList();
        this.getUserID();

    }

    ListEmpty = () => {
        return (

            <View style={styles.container}>
                {
                    this.state.isnoDataVisible ?
                        <Text style={{ textAlign: 'center',fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif' }}>{stringsoflanguages.no_videos_found}</Text>
                        : null
                }
            </View>

        );
    };


    videoList() {
    this.loading();
        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {
                    this.setState({ data: responseData.data });
                    this.setState({spinner:false})
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

        console.log("item id ===" +  item.id)
        this.props.navigation.navigate('DashboardDetail', {
          id: item.id
        })

    }
    scrollToIndex = (valueID) => {
        this.setState({scrollNo:valueID})
        let randomIndex =valueID-1;
        this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
      }
      
    getItemLayout = (data, index) =>{
        console.log('index of getItem'+index);
        if(index=='7'){
            console.log('working getlayout');
           return { length: 270, offset: 270 * index, index }
        }else{
          return { length: 270, offset: 270 * index, index }
            
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


                    <TouchableOpacity style={{
                        flex: .10
                    }}>

                        <Image source={require('../images/Group.png')}
                            style={styles.MenuHomeIconStyle} />

                    </TouchableOpacity>

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
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: .80 }}
                    >

                        <Text style={styles.screentitle}>MENEZES PILATES</Text>

                    </View>


                    <TouchableOpacity onPress={this.createTwoButtonAlert} style={{
                        flex: .10 
                    }} >
                        <Image source={require('../images/small-user.png')}
                            style={styles.MenuHomeUserIconStyle} />
                    </TouchableOpacity>
                </View>

                <View style={{ height: 70, justifyContent: 'center', alignItems: 'center', alignSelf: 'center'  }} >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal 
                        >
                        
                        {this.state.valueArr.map((item,index)=>{    
                            console.log(item);
                          return(  <View style={{ flex: 1, flexDirection: 'row',backgroundColor:'#F7F9FF' }}>
                            <TouchableOpacity onPress={()=>{this.scrollToIndex(item)}} style={[styles.smallcircleshapeview,{backgroundColor:this.state.scrollNo==item?'#FB3954':'#F7F9FF'}]} key={index} >
                                <Text style={[styles.smallcircletext,{color: this.state.scrollNo==item?'#fff':'black'}]} >{item}</Text>
                            </TouchableOpacity>
                            </View>
                          );
                        })}

                    </ScrollView>
                </View>

                 <View style={{flex:1}}>
                <FlatList
                    style={{ flex: 1,fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif' }}
                    data={this.state.data}
                    ref={(ref) => { this.flatListRef = ref; }}
                    getItemLayout={this.getItemLayout}
                    initialNumToRender={0}
                    renderItem={({ item, index }) => (

                        <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                            <View>
                                <Item item={item}
                                />
                            </View>

                        </TouchableWithoutFeedback>

                    )}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={this.ListEmpty}
                />
                </View>


                <View style={styles.tabStyle}>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home_active.png')}
                            style={styles.StyleHomeTab} />

                        <Text style={styles.bottomactivetextstyle}>{stringsoflanguages.Home}</Text>

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F7F9FF'
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
    listItem: {
        marginTop: 10,
        flex: 1,
        flexDirection: "column",
        backgroundColor:'#F7F9FF'

    },
    spinnerTextStyle: {
        color: '#FFF'
      },
    bottomactivetextstyle: {
        color: "#FB3954",
        fontSize: 8,
        marginTop: 5,
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif'
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
    bottominactivetextstyle: {
        color: "#747A82",
        fontSize: 8,
        marginTop: 3,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif'
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
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif'
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
        justifyContent: 'center'
    },
    videoBottomView: {
        height: 50,
        width: 375,
        marginBottom:20,
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
       marginLeft:15
      
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
    MenuHomeIconStyle: {
        // marginTop: 10,
        height: 37,
        width: 35,
        marginLeft: 15
    },
    MenuHomeUserIconStyle: {
        height: 20,
        width: 19,
        margin: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallcircleshapeview: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 30,
        shadowColor:'gray',
        elevation:10,
        backgroundColor:'#fff',
        color: 'black',
        textAlign: 'center',
        alignItems: 'center'
    },
    smallcircletext: {
        shadowColor:'gray',
        margin: 15,
        textAlign: 'center',
        alignItems: 'center'
    }

});

export default DashboardActivity;

