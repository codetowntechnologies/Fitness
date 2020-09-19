import React, { Component } from 'react';
//Import React
import { Platform, StyleSheet, Text, View,Dimensions } from 'react-native';
//Import Basic React Native Component
import Video from 'react-native-video';
//Import React Native Video to play video
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import FullScreenPlayer from './FullscreenPlayer';
//Media Controls to control Play/Pause/Seek and full screen
let width= Dimensions.get('window').width;
 let height= Dimensions.get('window').height;
class VideoPlayer extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: this.props.pauseData,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'cover',
      land:'landscape',
      fullSize:false,
      fullscreen:false
    };
  }
  static navigationOptions = {
    title: 'Video Player'
};
  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

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

  onBuffer=()=>alert("buffering is going on");
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
    this.videoPlayer.dismissFullscreenPlayer()
  };
  enterFullScreen = () => {
    this.videoPlayer.presentFullscreenPlayer();
  };


  componentDidMount(){
    console.log(this.props.videoUrl);
    console.log(this.props.fullScreen)
  }
  
  onFullScreen = () => {
    this.videoPlayer.presentFullscreenPlayer();
    // let fullScreen=this.props.fullScreen;
    // this.props.navigation.navigate(fullScreen);
    this.setState(prevState=>({fullScreen:!prevState.fullScreen}))
  };
  onSeeking = currentTime => this.setState({ currentTime });

  render() {
    return (
      <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onBuffer={this.onBuffer}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          fullscreen={this.state.fullscreen}
          fullscreenOrientation={this.state.land}
          onFullScreen={this.state.isFullScreen}
          source={{uri:this.props.videoURL}}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          fullscreen={true}
          isFullScreen={true}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
        />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
export default VideoPlayer;