import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    SafeAreaView,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const width=Dimensions.get('window').width;
class SettingsActivity extends Component {

    constructor(props) {
        super(props);
        this.logoutcall = this.logoutcall.bind(this);
        this.state = {
            logouturl: 'http://3.25.67.165/api/Api/logout',
            profileData: 'http://3.25.67.165/api/Api/profileInfo',
            userId: '',
            name:'',
            named:'',
            profilePic:''
        };
    }

    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Settings'
    };

    componentDidMount() {
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
               
            }
        });
        this.focusListener= this.props.navigation.addListener('didFocus', () => {
            this.ProfileData();
    });
    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }
    logout = () => {

        this.showLoading();
        this.logoutcall();

    };
    ProfileData = () => {
        let ProfileAPI = this.state.profileData;
        fetch(ProfileAPI, {
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
                    this.setState({ isnoDataVisible: true })

                } else {
                    this.setState({ isnoDataVisible: false });
                    this.setState({ named: responseData.data.name,profilePic:responseData.data.profilepic });
                    
                }
                this.setState({ name: responseData.data.name,profilePic:responseData.data.profilepic });
                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })
            .done();
    }

 logoutcall() {

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
                } else {
                    AsyncStorage.setItem('@is_login', "");
                    AsyncStorage.setItem('@user_id', "");
                    AsyncStorage.setItem('@email', "");
                    AsyncStorage.setItem('@name', "");
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


    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.insideContainer}>


                <LinearGradient
                        colors={['#FB3954', '#FA564C', '#F78E3C']}
                        style={styles.linearGradient}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}>

                        <View style={{
                            alignItems: 'center', justifyContent: 'center',
                            alignContent: 'center'
                        }}
                            onPress={() => { }} >

                            <Image
                                source={this.state.profilePic!==null?{uri:'http://3.25.67.165/uploads/profile_image/'+this.state.profilePic}:require('../images/avatar.png')}
                                style={{ width: 100, height: 100, borderRadius: 100 / 2, borderWidth: 10, borderColor: '#FF9165' }}
                            />

                        </View>
                    <Text style={styles.profileNameStyle}>{this.state.named}</Text>
                 </LinearGradient>

                    <View style={{
                        flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                        flex: .84, width: '100%'
                    }}>


                        <View style={{
                            flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff', flex: 1, marginTop: 20,marginRight:width*0.3                      }}>


                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}>

                                <Image source={require('../images/editProfile.png')}
                                    style={styles.StyleProfileIcon} />

                                <View style={styles.second_half_view}>
                                   <TouchableOpacity  onPress={() => { this.props.navigation.navigate('MyProfile') }} >
                                    <Text style={styles.labeltextstyle}>{stringsoflanguages.Edit_Profile}</Text>
                                 </TouchableOpacity>
                                </View>

                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
                            onPress={() => { this.props.navigation.navigate('MySubscription') }}
                              >

                                <Image source={require('../images/Mysubscription.png')}
                                    style={styles.StyleMySubscribeVideo} />


                                <View style={styles.second_half_view}>

                                    <Text style={styles.labeltextstyle}>{stringsoflanguages.my_subscription}</Text>

                                </View>

                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
                                onPress={() => { this.props.navigation.navigate('MyVideos') }}>

                                <Image source={require('../images/subscribedVideo.png')}
                                    style={styles.StyleSubscribedVideo} />


                                <View style={styles.second_half_view}>
                                    <Text style={styles.labeltextstyle}>{stringsoflanguages.subscribed_videos}</Text>
                                </View>
                            </TouchableOpacity>


                            

                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
                             onPress={() => { this.props.navigation.navigate('ChangePassword') }}>

                                <Image source={require('../images/setting_active.png')}
                                    style={styles.StyleChangePassword} />


                                <View style={styles.second_half_view}>
                                    <Text style={styles.labeltextstyle}>{stringsoflanguages.change_password}</Text>
                                </View>
                            </TouchableOpacity>



                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
                                onPress={() => { this.props.navigation.navigate('Notification') }}>

                                <Image source={require('../images/bell_active.png')}
                                    style={styles.StyleNotificationIcon} />


                                <View style={styles.second_half_view}>
                                    <Text style={styles.labeltextstyle}>{stringsoflanguages.notification}</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
                                onPress={() => this.props.navigation.navigate('WhoWeAre')}>

                                <Image source={require('../images/whoweare.png')}
                                    style={styles.StyleWhoWeAre} />

                                <View style={styles.second_half_view}>
                                    <Text style={styles.labeltextstyle}>{stringsoflanguages.who_we_are}</Text>

                                </View>

                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
                                onPress={this.logout}>
                              

                                <Image source={require('../images/logout.png')}
                                    style={styles.StyleLogoutIcon} />

                                <View style={styles.second_half_view}>
                                    <Text style={styles.labeltextstyle}>{stringsoflanguages.Logout}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                            flex: .16, width:"100%"
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
                                     onPress={()=>{ this.props.navigation.navigate('ChooseSubscription')}}>
                                    
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
                                    onPress={() => { this.props.navigation.navigate('Contactus') }}>

                                    <Image source={require('../images/setting_active.png')}
                                        style={styles.StyleProfileTab} />

                                    <Text style={styles.bottomactivetextstyle}>{stringsoflanguages.settings}</Text>


                                </TouchableOpacity>


                                {this.state.loading && (
                        <View style={styles.loading}>
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    )}



                            </View>


                        </View>


                    </View>

                </View>

            </SafeAreaView>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    insideContainer: {
        flex: 1,
        backgroundColor: '#FB3954'
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
        height: 50,
        padding: 10,
        flex: .5,
        textAlign: 'left',
        backgroundColor: 'transparent'
    },
    labeltextstyle: {
        color: '#06142D',
        marginLeft: 21,
        fontSize: 15,
        textAlign: 'left'
    },

    subscribe_level_text: {
        color: '#4D4D4D',
        marginLeft: 10,
        marginTop: 10,
        fontSize: RFPercentage(2),
        textAlign: 'left'
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
        margin: 5,
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
    lineStyle: {
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        width: 300
    },
    StyleWhoWeAre: {
        width: 16,
        height: 19,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleMenuIcon: {
        width: 30,
        height: 35,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleLogoutIcon: {
        width: 20,
        height: 19,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleProfileIcon: {
        width: 19,
        height: 22,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleNotificationIcon: {
        width: 20,
        height: 25,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleChangePassword: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleMySubscribeVideo: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleSubscribedVideo: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    second_half_view: {
        flex: .80,
        justifyContent: 'center',
        marginLeft: 5,
        alignSelf: 'center'
    },
    profileNameStyle: {
        color: 'white',
        marginLeft: 10,
        marginTop: 20,
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
        justifyContent: 'center'
    },
    linearGradient: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: .4,
        width: '100%'

    },

});

export default SettingsActivity;

