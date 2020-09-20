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
import AsyncStorage from '@react-native-community/async-storage';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Slider from '@react-native-community/slider';
import  ProgressBar from 'react-native-progress/Bar';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import Orientation from 'react-native-orientation-locker';
import Modal from 'react-native-modal';
const APP_POPUP_LOGO = require('../images/Group.png');
import Fontisto from 'react-native-vector-icons/Fontisto';
import {  PortalDestination,PortalOrigin } from "rn-native-portals";

let width= Dimensions.get('window').width;
 let height= Dimensions.get('window').height;
let videoId;
console.disableYellowBox = true;

function Item({ item,props }) {
    return (
        <View style={styles.listItem}>


            <View style={styles.similarvideoBottomView}> 
            

                <View style={{ flexDirection: 'row', flex: .50 }}>

                    <ImageBackground source={{ uri: 'http://3.25.67.165/uploads/video_logo/' + item.image }}
                        style={{ width: 104, height: 80, justifyContent: 'center' }}
                        >
                      
                    </ImageBackground>

                </View>

                <View style={{ flexDirection: 'column',  justifyContent: 'center' }}>


<View style={{ flexDirection: 'row' }}>

    <Text style={styles.Notextstyle}>{item.sr_nu}. </Text>
   

    <Text style={styles.pinktextstyle}>{item.name}</Text>
   
</View>
<Text style={styles.SimilerRstyle}> ${item.price}/{item.monthname}</Text>


</View>


            </View>


        </View>
    );
}



class MyVideosDetailActivity extends Component {

    constructor(props) {
        super(props);
        this.videoDetail = this.videoDetail.bind(this);
        this.similarvideolist = this.similarvideolist.bind(this);
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
        });
        this.setState(state=>{
            return{
                showPause:!state.showPause
            }
        });
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
    handleProgressPress=(e)=>{
        const position=e.nativeEvent.locationX;
        const progress=(position/250)*this.state.duration;
        this.videoPlayer.seek(progress);
    }
    handleEnd=()=>{
        this.setState({paused:true})
    }
    handleProgress=(progress)=>{
        //   console.log('thr progress',this.state.duration);
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
    handleOrientation=(orientation: string)=> {
        orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
          ? (this.setState(s => ({...s, fullscreen: true})), StatusBar.setHidden(true))
          : (this.setState(s => ({...s, fullscreen: false})),
            StatusBar.setHidden(false));
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
      showControls=()=> {
        this.state.showControls
          ? this.setState({ showControls: false})
          : this.setState({ showControls: true});
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
        this.loading();

        const { navigation } = this.props;
        videoId = navigation.getParam('id', 'no-id');
        Orientation.addOrientationListener(this.handleOrientation);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
                console.log("VIDEO ID===" + videoId)
                this.videoDetail();
                this.similarvideolist();
            }
        });
    }
    ListEmpty = () => {
        return (
            <View style={{marginTop:'60%',
            justifyContent:'center',
            alignItems:'center'}}>
                {
                    this.state.isnoDataVisible ?
                        <Text style={{ textAlign: 'center' }}>{stringsoflanguages.no_videos_found}</Text>
                        : null
                }
            </View>
        );
    };
    videoDetail() {
        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                id: videoId,
                user_id: this.state.userId
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                    this.setState({spinner:false})
                } else {
                    this.setState({spinner:false})
                    this.setState({ sr_nu: responseData.data.sr_nu });
                    this.setState({ name: responseData.data.name });
                    this.setState({ image: responseData.data.image });
                    this.setState({ description: responseData.data.description });
                    this.setState({ price: responseData.data.price });
                    this.setState({ monthname: responseData.data.monthname });
                    this.setState({videoLink:responseData.data.link});
                }
                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })   
    }
    similarvideolist() {
        var url = this.state.similarvideourl;
        console.log('url:' + url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: videoId,
                user_id: this.state.userId
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                    this.setState({spinner:false})
                } else {
                    this.setState({spinner:false})
                    this.setState({ data: responseData.data });
                    console.log("response data ===" + responseData)
                }
                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })
            .done();
    }
    getMinutesFromSeconds=(time: number)=> {
        const minutes = time >= 60 ? Math.floor(time / 60) : 0;
        const seconds = Math.floor(time - minutes * 60);
    
        return `${minutes >= 10 ? minutes : '0' + minutes}:${
          seconds >= 10 ? seconds : '0' + seconds
        }`;
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
              }).done();
      }
      handleOnSlide=(time: number)=> {
        this.onSlideCapture(time);
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
     onSlideCapture=(data)=> {
        // 
        this.videoPlayer.seek(data);
        this.setState({currentTime: data});
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
        //   controls
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
        />
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
                <TouchableOpacity style={{ flex: .10, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => { this.props.navigation.goBack() }}>

                        <Image source={require('../images/back_icon.png')}
                            style={styles.backIconStyle} />

                    </TouchableOpacity>


                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: .80 }}
                    >

                        <Text style={styles.screentitle}>MENEZES PILATES</Text>

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
                        <ImageBackground source={{ uri: 'http://3.25.67.165/uploads/video_logo/' + this.state.image }}
                            style={{ width: 411, height: 300, justifyContent: 'center' }}>
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
        //   controls
        // source={require('../images/play.mp4')}
          style={styles.mediaPlayer}
          onLoadStart={this.handleLoadStart}
          onBuffer={this.onBuffer}
        //   bufferConfig={{
        //     minBufferMs: 15000,
        //     maxBufferMs: 50000,
        //     bufferForPlaybackMs: 2500,
        //     bufferForPlaybackAfterRebufferMs: 5000
        //   }}
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
                     

                        <View style={styles.videoBottomView}>

                            <View style={{ flexDirection: 'row', flex: .60 }}>

                                <Text style={styles.textpinktextstyle}>{this.state.sr_nu}. </Text>

                                <Text style={styles.textblacktextstyle}>{this.state.name}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', flex: .40, justifyContent: 'center', alignItems: 'flex-end' }}>

                                <Text style={styles.textpinktextstyle}> ${this.state.price}/{this.state.monthname}</Text>

                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', flex: 1,marginTop:15 }}>
                        <TouchableOpacity style={{
                                flexDirection: 'row', backgroundColor: this.state.showPause?'#AEB6C1':'#FB3954', flex: .5, padding: 5,
                                justifyContent: 'center', alignItems: 'center', marginLeft: width*0.05, marginRight:width*0.05, height: 35, borderRadius: 5
                            }} onPress={this.showVideo}>
                            {this.state.showPause==false?
                                <Image
                                    style={styles.StylePlayIcon}
                                    source={require('../images/play.png')}
                                     />:
                                <AntDesign name="pause" color="white" size={25} />
                                
                                      }
                                 {this.state.showPause?
                                <Text style={{
                                    color: 'white', fontSize: 15, textAlign: 'center',
                                    marginRight: 5
                                }}>
                                    {stringsoflanguages.Pause}</Text>: <Text style={{
                                    color: 'white', fontSize: 15, textAlign: 'center',
                                    marginRight: 5
                                }}>
                                    {stringsoflanguages.play}</Text>}
                            </TouchableOpacity>
                            <View style={{
                                flexDirection: 'row', flex: .5, backgroundColor:  '#AEB6C1' , padding: 5,
                                justifyContent: 'center', alignItems: 'center', height: 35, borderRadius: 5, marginRight: 15
                            }}>
                                <Image
                                    style={styles.StyleSubscribedVideo}
                                    source={require('../images/my_subscription.png')} />

                              
                                        <Text style={{
                                            color: 'white', marginLeft: 5, fontSize: 15, textAlign: 'center',
                                            marginRight: 5
                                        }}>
                                            {stringsoflanguages.subscribed}</Text>



                            </View>



                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <Text style={styles.vide_discription_style}>Description</Text>

                            <Image source={require('../images/down_arrow.png')}
                                style={styles.downArrowStyle} />

                        </View>



                        <Text style={styles.description_text_color}>{this.state.description}</Text>


                        <View style={{ flexDirection: 'row', padding: 5, marginLeft: 5, marginRight: 5 }}>

                            <Text style={{ color: '#FB3954', fontSize: RFPercentage(1.9), flex: .5, marginLeft: 5, textAlign: 'left', marginTop: 10 }}>{stringsoflanguages.similar} </Text>

                        </View>

                        <View style={styles.hairline} />

                    </View>
                    <FlatList
                        style={{ flex: 1}}
                        data={this.state.data}

                        renderItem={({ item }) => (

                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('MyVideos')}}>

                                <View >
                                    <Item item={item} 
                                    />
                                </View>

                            </TouchableOpacity>

                        )}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={this.ListEmpty}
                    />





                </ScrollView>


                <View style={styles.tabStyle}>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home_inactive.png')}
                            style={styles.StyleHomeTab} />

                        <Text style={styles.bottomactivetextstyle}>{stringsoflanguages.Home}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('MyVideos') }}>

                        <Image source={require('../images/video_active.png')}
                            style={styles.StyleVideoTab} />

                        <Text style={styles.bottomvideotextstyle}>{stringsoflanguages.my_videos}</Text>

                    </TouchableOpacity>



                   

                        <TouchableOpacity style={[{ flex: .20, alignItems: 'center', justifyContent: 'center' },styles.CircleShapeView]}
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
      },
      VideoContainer:{
        flex:1
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
    containerActivity: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      },
    mediaPlayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'black',
      },
      videoCover:{
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        left:0,
        top:0,
        right:0,
        bottom:0,
           backgroundColor:'transparent'
        },
        buffering:{
         backgroundColor:'#000'
        },
    bottomactivetextstyle: {
        color: "#887F82",
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

export default MyVideosDetailActivity;

