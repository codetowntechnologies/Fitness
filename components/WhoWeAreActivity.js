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
    Dimensions,
    BackHandler,
    StatusBar,
    Animated,
    ActivityIndicator
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import Orientation from 'react-native-orientation-locker';
import Modal from 'react-native-modal';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Slider from '@react-native-community/slider';
import {  PortalDestination,PortalOrigin } from "rn-native-portals";
const APP_POPUP_LOGO = require('../images/Group.png');

let width= Dimensions.get('window').width;
 let height= Dimensions.get('window').height;
let videoId;
console.disableYellowBox = true;

class WhoWeAreActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            baseUrl: 'http://3.25.67.165/api/Api/videoetailById',
            similarvideourl: 'http://3.25.67.165/api/Api/similarVideoList',
            sr_nu: '',
            name: '',
            image: '',
            description: '',
            price: '',
            monthname: '',
            userId: '',
            videoLink:'',
            showVideo:false,
            showPause:false,
            currentTime: 0,
            duration: 0,
            isFullScreen: false,
            isLoading: true,
            paused: false,
            playerState: PLAYER_STATES.PLAYING,
            screenType: 'cover',
            land:'landscape',
            fullSize:false,
            fullscreen:false,
            spinner: false,
            playerButton:false,
            progress:0,
            baseUrl: 'http://3.25.67.165/api/Api/aboutus',
            image: '',
            description: '',
            logouturl: 'http://3.25.67.165/api/Api/logout',
            userId: '',
            isModalVisible: false,
    isUsernameVisible: false,
    isModalPopupVisible: false,
    buffering:true,
    animated:new Animated.Value(0),
    showControls: true,
    backTime:''

                    //   subscribe_status: ''
        };
        
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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

    static navigationOptions = {
        title: 'Dashboard Detail'
    };
    onSeek = seek => {
        //Handler for change in seekbar
        this.videoPlayer.seek(seek);
      };
      static navigationOptions = {
        title: 'WhoWeAre'
    };
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
    
      onPaused = playerState => {
        //Handler for Video Pause
        this.setState({showVideo:true})
        this.setState(prevState=>({
            showPause:!this.state.showPause,
        }));
        this.setState({
          paused: !this.state.paused,
          playerState,
        });
      };
      handleMainButtonTouch=()=>{
        if(this.state.progress>=1){
            this.videoPlayer.seek(0);
        }
        this.setState(state=>{
            return{
                paused:!state.paused
            }
        })
    }
    handleOnSlide=(time)=> {
        this.onSlideCapture(time);
      }
      onSlideCapture=(data)=> {
        this.videoPlayer.seek(data);
        this.setState({currentTime: data});
      }
      componentWillMount () {
        this.blurSubscription =
          this.props.navigation.addListener(
            'willBlur',
            () => {
                if (this.videoPlayer && !this.videoPlayer.state.paused) {
                    console.log(this.videoPlayer);
                    this.setState({paused:true});
                    }
            }
          )
      }
      FullhandleLoad=(meta)=>{
        // onSeek = seek => {
            //Handler for change in seekbar
            this.videoPlayer.seek(this.state.currentTime);
            this.setState({backTime:this.state.currentTime});
        //   };
        // this.setState({
        //     duration:this.state.duration
        // })
    }
      handlePlayPause=() =>{
        // If playing, pause and show controls immediately.
        if (this.state.play) {
         this.setState({ play: false, showControls: true});
          return;
        }
    
        this.setState({ play: true});
        setTimeout(() => this.setState(s => ({ showControls: false})), 2000);
      }
    handleProgressPress=(e)=>{
        const position=e.nativeEvent.locationX;
        const progress=(position/250)*this.state.duration;
        this.videoPlayer.seek(progress);
    }
    handleEnd=()=>{
        this.setState({paused:true})
    }
    handleProgress=(progress)=>{
        this.setState({progress:progress.currentTime/this.state.duration});
        this.setState({lastProgress: this.state.currentTime});
this.setState({currentTime: progress.currentTime});
if(this.state.lastProgress == progress.currentTime){
this.setState({buffering: true});
this.triggerBufferAnimation();
}else{
this.setState({buffering: false});
}
    }
    handleLoad=(meta)=>{
        this.setState({
            duration:meta.duration
        });
        if(this.state.backTime){
            this.videoPlayer.seek(this.state.backTime);
        //    this.setState({duration:this.state.backTime});
          }
        // this.setState({buffering:false})
    }
  
      onReplay = () => {
        //Handler for Replay
        this.setState({ playerState: PLAYER_STATES.PLAYING });
        this.videoPlayer.seek(0);
      };
      ScreenCall=()=>{
        this.props.navigation.navigate('Dashboard');
      }
    
      onProgress = data => {
        const { isLoading, playerState } = this.state;
        // Video Player will continue progress even if the video already ended
        if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
          this.setState({ currentTime: data.currentTime });
        }
      };
      onLoad = data => this.setState({ duration: data.duration, isLoading: false });
      
      onLoadStart = data => this.setState({ isLoading: true });
      
      onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });
    
      
      onError = () => alert('Oh! ', error);
      
      exitFullScreen = () => {
        alert('Exit full screen');
      };
      enterFullScreen = () => {
        this.videoPlayer.presentFullscreenPlayer();
      };
      onFullScreen = () => {
        this.videoPlayer.presentFullscreenPlayer();
          console.log("working");
        this.setState({fullscreen:!this.state.fullscreen});
        this.handleFullscreen();
        if(this.state.fullscreen==true){
            Orientation.lockToPortrait();
            StatusBar.setHidden(false);
        }
      };
      onSeeking = currentTime => this.setState({ currentTime });

      showVideo=(playerState)=>{
        this.setState({showVideo:true})
        this.setState(prevState=>({
            showPause:!prevState.showPause,
        }));
        if(this.state.showVideo==true){
        this.setState({
            paused: !this.state.paused,
          });
        }
        //   this.videoPlayer.seek(seek);
    }
    showControls=()=> {
        this.state.showControls
          ? this.setState({ showControls: false})
          : this.setState({ showControls: true});
      }
    handleOrientation=(orientation: string)=> {
        orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
          ? (this.setState(s => ({...s, fullscreen: true})), StatusBar.setHidden(true))
          : (this.setState(s => ({...s, fullscreen: false})),
            StatusBar.setHidden(false));
      }
    componentWillUnmount=()=>{
        Orientation.removeOrientationListener(this.handleOrientation);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        Orientation.lockToPortrait();
        this.blurSubscription.remove()
        this.setState({paused:true});
      }
       handleFullscreen=() =>{
        this.state.fullscreen
          ? Orientation.unlockAllOrientations()
          : Orientation.lockToLandscapeLeft();
      }
      handleBackButtonClick() {
        Orientation.lockToPortrait();
        StatusBar.setHidden(false)
        this.props.navigation.goBack();
        return true;
    }
    componentDidMount() {
        Orientation.addOrientationListener(this.handleOrientation);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
      this.loading();
        this.aboutus();
        this.getUserID();
    
    }
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
        aboutus() {
    
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
                        
                        setTimeout(() => {
                            this.setState({spinner:false});
                        }, 1000);
                    } else {
                        console.log("response data ===" + responseData)
    
                        this.setState({ image: responseData.data.image });
                        this.setState({ description: responseData.data.description });
                        this.setState({videoLink:responseData.data.videourl});
                        setTimeout(() => {
                            this.setState({spinner:false});
                        }, 1000);
                
                    }
    
                    console.log('response object:', responseData);
                })
                .catch(error => {
                    this.setState({spinner:false});
                    this.hideLoading();
                    console.error(error);
                })
    
                .done();
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
        handleLoadStart=()=>{
            console.log('loading started');
            this.triggerBufferAnimation();
            // this.loading();
        }
        triggerBufferAnimation=()=>{
            this.loopingAnimation && this.loopingAnimation.stopAnimation();
            this.loopingAnimation=Animated.loop(
                Animated.timing(this.state.animated,{
                    toValue:1,
                    duration:350,
                    useNativeDriver:false
                })
            ).start();
  
        }
        onBuffer=({isBuffering})=>{
            // this.setState({spinner:false});
            this.setState({ buffering: isBuffering })
    if (isBuffering) {
      this.triggerBufferAnimation();
    }
    if (this.loopingAnimation && isBuffering) {
      this.loopingAnimation.stopAnimation();
    }
         }
        getMinutesFromSeconds=(time: number)=> {
            const minutes = time >= 60 ? Math.floor(time / 60) : 0;
            const seconds = Math.floor(time - minutes * 60);
        
            return `${minutes >= 10 ? minutes : '0' + minutes}:${
              seconds >= 10 ? seconds : '0' + seconds
            }`;
          }
    
    render() {
        const videoURL=this.state.videoLink;
        const {buffering}=this.state;
        const interpolatedAnimation=this.state.animated.interpolate({
            inputRange:[0,1],
            outputRange:["0deg","360deg"]
        });
        const rotateStyle={
            transform:[
                {
                    rotate:interpolatedAnimation
                }
            ]
        }
        return (
            <SafeAreaView style={styles.container}>
             <Spinner size={50}  color="red"
          visible={this.state.spinner}
        //   textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
            {this.state.fullscreen?
                <PortalDestination name="targetOfTeleportation" >
                <View style={{width:height,height:width}}>
                <TouchableWithoutFeedback onPress={this.showControls}>
                <View style={styles.VideoContainer}>  
                <Video
         paused={this.state.paused}
         onLoad={this.FullhandleLoad}
         onProgress={this.handleProgress}
         onEnd={this.handleEnd}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          fullscreenOrientation="landscape"
          onFullScreen={this.state.isFullScreen}
          source={{uri:videoURL}}
        // source={require('../images/play.mp4')}
          style={styles.mediaPlayer}
          onLoadStart={this.handleLoadStart}
          onBuffer={this.onBuffer}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000
          }}
        //   onVideoBuffer={this.handleBuffer}
          volume={10}
        >
        </Video>
      
        <View style={styles.videoCover}>
            {buffering&&<View  style={[styles.horizontal,{backgroundColor:'rgba(0,0,0,0.5)'}]}><ActivityIndicator size="large" color="#fff" /></View>}
        </View>
        {this.state.showControls&&(
<View style={styles.controls}>
    <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
    <AntDesign name={!this.state.paused?"pause":"play"} size={30} color="#FFF"></AntDesign>
    </TouchableWithoutFeedback>
  {/* <TouchableWithoutFeedback onPress={this.handleProgressPress}> */}
  <Slider
        value={this.state.currentTime}
        minimumValue={0}
        maximumValue={this.state.duration}
        step={1}
        style={{width:590,height:10}}
        onValueChange={this.handleOnSlide}
        onSlidingStart={this.handlePlayPause}
        onSlidingComplete={this.handlePlayPause}
        minimumTrackTintColor={'#F44336'}
        maximumTrackTintColor={'#FFFFFF'}
        thumbTintColor={'#F44336'}
      />
  {/* </TouchableWithoutFeedback> */}
  <Text style={styles.duration}>
      {this.getMinutesFromSeconds(Math.floor(this.state.progress*this.state.duration))}
  </Text>
  <FontAwesome5 name="expand" color="#FFF" style={{marginLeft:10}} size={20} onPress={this.onFullScreen}></FontAwesome5>
</View>)}
        
        </View>
        </TouchableWithoutFeedback>
</View>
</PortalDestination>:
<View>
<PortalOrigin destination={ this.state.fullscreen ? 'targetOfTeleportation' : null }>
                <View style={styles.headerView}>
                
<TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 0.3 }}
    onPress={() => { this.props.navigation.goBack() }}>

    <Image source={require('../images/back_icon.png')}
        style={styles.backIconStyle} />

</TouchableOpacity>


<View style={{ alignItems: 'center', justifyContent: 'center', flex: 1.8 }}
>

    <Text style={styles.screentitle}>WHO WE ARE</Text>

</View>

<TouchableOpacity onPress={this.createTwoButtonAlert} 
style={{ alignItems: 'center', justifyContent: 'center', flex: .20 }}>

<Image source={require('../images/small-user.png')}
        style={styles.MenuHomeUserIconStyle} />

</TouchableOpacity>

</View>
                <ScrollView>
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

                    <View style={styles.listItem}>

                    <ImageBackground source={{ uri: 'http://3.25.67.165/uploads/cms_logo/'+this.state.image
                }}
                            style={{ width: 411, height: 375, justifyContent: 'center' }}>
                              {this.state.showVideo?(<View style={StyleSheet.absoluteFill}>
                                <TouchableWithoutFeedback onPress={this.showControls}>
                                <View style={styles.VideoContainer}>          
                                <Video
         paused={this.state.paused}
         onLoad={this.handleLoad}
         onProgress={this.handleProgress}
         onEnd={this.handleEnd}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          fullscreenOrientation="landscape"
          onFullScreen={this.state.isFullScreen}
          source={{uri:videoURL}}
        // source={require('../images/play.mp4')}
          style={styles.mediaPlayer}
          onLoadStart={this.handleLoadStart}
          onBuffer={this.onBuffer}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 5000
          }}
        //   onVideoBuffer={this.handleBuffer}
          volume={10}
        >
        </Video>
      
        <View style={styles.videoCover}>
            {buffering&&<View  style={[styles.horizontal,{backgroundColor:'rgba(0,0,0,0.5)'}]}><ActivityIndicator size="large" color="#fff" /></View>}
        </View>
        {this.state.showControls&&(
<View style={styles.controls}>
    <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
    <AntDesign name={!this.state.paused?"pause":"play"} size={30} color="#FFF"></AntDesign>
    </TouchableWithoutFeedback>
  {/* <TouchableWithoutFeedback onPress={this.handleProgressPress}> */}
  <Slider
        value={this.state.currentTime}
        minimumValue={0}
        maximumValue={this.state.duration}
        step={1}
        style={{width:290,height:10}}
        onValueChange={this.handleOnSlide}
        onSlidingStart={this.handlePlayPause}
        onSlidingComplete={this.handlePlayPause}
        minimumTrackTintColor={'#F44336'}
        maximumTrackTintColor={'#FFFFFF'}
        thumbTintColor={'#F44336'}
      />
  {/* </TouchableWithoutFeedback> */}
  <Text style={styles.duration}>
      {this.getMinutesFromSeconds(Math.floor(this.state.progress*this.state.duration))}
  </Text>
  <FontAwesome5 name="expand" color="#FFF" style={{marginLeft:10}} size={20} onPress={this.onFullScreen}></FontAwesome5>
</View>)}
</View>
</TouchableWithoutFeedback>
     
                            </View>):
                            (
                            <TouchableOpacity onPress={this.showVideo}>
                            <Image source={require('../images/play_icon.png')} style={styles.playiconstyle} /> 
                                </TouchableOpacity>
                            )
                              }
                        </ImageBackground>
                     

                        <View style={{ flexDirection: 'row', marginTop:20 }}>

<Text style={styles.textblacktextstyle}>ABOUT US</Text>

<Image source={require('../images/down_arrow.png')}
    style={styles.downArrowStyle} />

</View>
<Text style={styles.description_text_color}>{this.state.description}</Text>      
                    </View>
                </ScrollView>
                </PortalOrigin>
                </View>
            }
            </SafeAreaView>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F6F9FE'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor:'black'
      },
      VideoContainer:{
        flex:1
       },
       videoCover:{
       alignItems:'center',
       justifyContent:'center',
       position:'absolute',
       left:0,
       top:0,
       right:0,
       bottom:0,
    //    backgroundColor:"transparent"
       },
       buffering:{
        backgroundColor:'#000'
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
    appnamestyle: {
        marginTop: 50,
        color: "#626262",
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: RFPercentage(4)
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
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
    loading_text: {
        fontSize: RFValue(10, 580),
        textAlign: 'center',
        color: '#FFC33B',
        fontWeight: 'bold'
    },
    listItem: {
        flex: 1,
        alignSelf: "center",
        flexDirection: "column",
        width:width

    },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
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
    pinktextstyle: {
        fontSize: 16.7,
        color: '#FB3954',
        width: 230,
        fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif',
         flexWrap : 'wrap'
    },
    Notextstyle: {
        fontSize: 15,
        color: '#FB3954',
        //color: '#06142D',
        marginLeft:90,
        fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif'

    },
    SimilerRstyle: {
        fontSize: 13,
        //color: '#FB3954',
        color: '#06142D',
        marginTop: 8,
       marginLeft: 250,
        fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'sans-serif'

    },
    controls:{
        backgroundColor:'rgba(0,0,0,0.5)',
        height:48,
        left:0,
        bottom:0,
        right:0,
        position:'absolute',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        paddingHorizontal:10
        },
        mainButton:{
    marginRight:15
        },
        duration:{
        color:'#fff',
        marginLeft:15
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
        flexDirection: 'row',
        alignItems: 'center'
    },

    playiconstyle: {
        height: 36,
        width: 36,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuHomeIconStyle: {
        marginTop: 10
    },
    MenuHomeUserIconStyle: {
        height: 20,
        width: 19,
        margin: 5,
        alignSelf: 'center',
        alignItems: 'center',
    },
    smallcircleshapeview: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 30,
        backgroundColor: 'white',
        shadowColor: '#ecf6fb',
        elevation: 20,
        color: 'black',
        textAlign: 'center',
        shadowColor: 'grey',
        shadowOpacity: 1,
        alignItems: 'center'


    },

    smallcircletext: {
        shadowColor: '#ecf6fb',
        elevation: 20,
        margin: 15,
        color: 'black',
        textAlign: 'center',
        shadowColor: 'grey',
        shadowOpacity: 1,
        alignItems: 'center'
    },
    backIconStyle: {
        height: 20,
        width: 20,
        marginLeft: 30,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    downArrowStyle: {
        height: 9,
        width: 9,
        marginTop: 16,
        marginLeft: 10
    },
    textblacktextstyle: {
        fontSize: 15,
        color: '#06142D',
        marginTop: 8,
        marginLeft:20
    },
    vide_discription_style: {
        fontSize: 16,
        color: '#06142D',
        marginTop: 8,
        marginLeft: 10
    },
    textpinktextstyle: {
        fontSize: 15,
        color: '#FB3954',
        marginTop: 8,
        marginLeft: 5,
        marginLeft: 10,

    },
    description_text_color: {
        color: "#919191",
        fontSize: 14,
        marginTop: 10,
        marginLeft: 10
    },
    StylePlayIcon: {
        width: 14,
        height: 18,
        marginRight: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleSubscribedVideo: {
        width: 24,
        height: 22,
        marginLeft: 20,
        marginRight: 15,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    hairline: {
        borderBottomColor: '#AFB8C3',
        borderBottomWidth: 1,
    },
    similarvideoBottomView: {
        height: 100,
        width: 400,
        margin: 10,
        padding: 10,
        shadowColor: '#ecf6fb',
        elevation: 5,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
});

export default WhoWeAreActivity;

