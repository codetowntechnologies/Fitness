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
    
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import ActionButton from 'react-native-circular-action-menu';
import DropDownPicker from 'react-native-dropdown-picker';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';
import _ from 'lodash';
import {
    Picker,
    KeyboardAwareScrollView,
    TextField,
    Colors,
  } from 'react-native-ui-lib';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
const optionValue = [
    {label: 'Male', value: 'Male'},
    {label: 'Female', value: 'Female'},
    {label: 'Other', value: 'Other'},
  ];

class MyProfileActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'Test Name',
            profileData: 'http://3.25.67.165/api/Api/profileInfo',
            editProfileData: 'http://3.25.67.165/api/Api/profileUpdate',
            profilePicUpdate: 'http://3.25.67.165/api/Api/profileImageUpdate',
            userId: '',
            userProData: '',
            editable: true,
            myName: '',
            gender: [{value:'',label:''}],
            avatarSource: require('../images/avatar.png'),
            email: '',
            location: '',
            responseData: '',
            spinner: false,
            swipeablePanelActive:false,
            selectedItem: undefined,
            selected1: 'key1',
            languages: [],
            results: {
                items: []
            }
        };
    }
    onValueChange (value: string) {
        this.setState({
            selected1 : value
        });
    }
    openPanel = () => {
        this.setState({ swipeablePanelActive: true });
    };

    closePanel = () => {
        this.setState({ swipeablePanelActive: false });
        setTimeout(() => {
        	this.openPanel();
        }, 1000);
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
    onEditMode = () => {
        this.setState({ editable: true });
    }
    _handleMultiInput = (name) => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }
    static navigationOptions = {
        title: 'Dashboard'
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
                    this.state.gender[0].label= responseData.data.gender;
                    this.setState({ isnoDataVisible: false });
                    this.setState({ userProData: responseData.data });
                    this.setState({
                        myName: responseData.data.name, email: responseData.data.email,
                        location: responseData.data.location,profilePic:responseData.data.profilepic
                    });
                    // GobalgenderName=responseData.data.gender

                }
                this.setState({ userProData: responseData.data });
              
                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })
            .done();
    }
    ChooseImage = () => {
        let source;
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                this.UpdatImg(response.data)
                this.setState({
                    avatarSource: source,
                });
            }
        });
    }
    UpdatImg = (data) => {
        console.log("hi");
        let ProfilePic = this.state.profilePicUpdate;
        fetch(ProfilePic, {
            method: 'POST',
            body: JSON.stringify({
                id: this.state.userId,
                profilepic: data
            }),
        })
            .then(responseData => {
                this.hideLoading();
                console.log('data', responseData);
                console.log(this.state.userId);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })
    }
    UpdateProfileData = () => {
        this.loading();
        let ProfileAPI = this.state.editProfileData;
        fetch(ProfileAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                id: this.state.userId,
                name: this.state.myName,
                email: this.state.email,
                gender: this.state.gender.value,
                location: this.state.location,
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
                    this.props.navigation.navigate('Settings')
                }
                this.props.navigation.navigate('Settings')
                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }
    
    componentDidMount() {
        this.focusListener= this.props.navigation.addListener('didFocus', () => {
            console.log('props',this.props.navigation.state.params);
            if(this.props.navigation.state.params!==undefined){
                this.setState({gender:this.props.navigation.state.params.select});
            }
    });
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
                this.ProfileData();
                
            }
        });
    }
    componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
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
                        <View style={{ flexDirection: 'row', padding: 12 }}>
                            <Icon name="left" size={20} color="#fff" onPress={() => { this.props.navigation.navigate('Settings') }} />
                            <Text style={styles.titleStyle} >Edit Profile</Text>
                        </View>
                        <View style={{
                            alignItems: 'center', justifyContent: 'center',
                            alignContent: 'center'
                        }}
                        >
                            <View>
                                <Image
                                     source={this.state.profilePic!==null?{uri:'http://3.25.67.165/uploads/profile_image/'+this.state.profilePic}:this.state.avatarSource}
                                    style={{ width: 100, height: 100, borderRadius: 100 / 2, borderWidth: 10, borderColor: '#FF9165' }}
                                />
                             <Icon name="camerao" onPress={this.ChooseImage} size={22} style={{ color: '#fff', borderRadius: 5, position: 'absolute', zIndex: 1, right: 8, bottom: 6 }} /> 
                                   
                                
                            </View>
                        </View>
                        <Text style={styles.profileNameStyle}>{this.state.userProData.name}</Text>
                        <View style={{
                            flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                            flex: 1, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30
                        }}>


                            <View style={{
                                flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                                flex: .90, width: '100%', borderTopRightRadius: 30, borderTopLeftRadius: 30
                            }}>
                                <ScrollView>

                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center', marginTop: 15, justifyContent: 'center'
                                    }}>


                                        <Text style={styles.labeltextstyle}>{stringsoflanguages.name}</Text>

                                        <TextInput
                                            placeholder="Enter Name"
                                            placeholderTextColor="#101D35"
                                            underlineColorAndroid="transparent"
                                            style={styles.input}
                                            value={this.state.myName}
                                            editable={this.state.editable}
                                            onChangeText={this._handleMultiInput('myName')}
                                        />
                                    </View>

                                    <View style={styles.lineStyle} />

                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                                    }}>


                                        <Text style={styles.labeltextstyle}>{stringsoflanguages.phone_Number}</Text>

                                        <TextInput
                                            placeholder="Enter Phone Number"
                                            placeholderTextColor="#101D35"
                                            underlineColorAndroid="transparent"
                                            style={styles.input}
                                            value={this.state.userProData.phone}
                                            editable={false}
                                        />
                                    </View>
                                    <View style={styles.lineStyle} />
                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center',height:35
                                    }}>
                                        <Text style={styles.gendertextstyle}>{stringsoflanguages.gender}</Text>
                                       {/* <View style={{alignSelf:'center',position:'absolut'}}> */}
                                       <View style={{marginTop:20,flex:.45}}>
                                       <Picker
              enableModalBlur={false}
            //  placeholder="Select your gender"
              placeholderTextColor="black"
              value={this.state.gender}
              style={{fontSize:RFPercentage(2)}}
              hideUnderline={true}
              onChange={items => this.setState({gender: items})}
            //   mode={Picker.modes.MULTI}
            //   rightIconSource={require('../images/down-arrow.png')}
            >
              {_.map(optionValue, option => (
                <Picker.Item  key={option.value} value={option} disabled={option.disabled}/>
              ))}
            </Picker>
            </View>
                                    {/* </View> */}
                                    </View>

                                    <View style={styles.lineStyle} />

                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                                    }}>


                                        <Text style={styles.labeltextstyle}>{stringsoflanguages.email}</Text>

                                        <TextInput
                                            placeholder="Enter Email"
                                            placeholderTextColor="#101D35"
                                            underlineColorAndroid="transparent"
                                            style={styles.input}
                                            value={this.state.email}
                                            editable={this.state.editable}
                                            onChangeText={this._handleMultiInput('email')}
                                        />
                                    </View>

                                    <View style={styles.lineStyle} />

                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
                                    }}>


                                        <Text style={styles.labeltextstyle}>{stringsoflanguages.location}</Text>

                                        <TextInput
                                            placeholder="Enter Location"
                                            placeholderTextColor="#101D35"
                                            underlineColorAndroid="transparent"
                                            style={styles.input}
                                            value={this.state.location}
                                            editable={this.state.editable}
                                            onChangeText={this._handleMultiInput('location')}
                                        />
                                    </View>

                                    <View >
                                    <Spinner size={50}  color="red"
          visible={this.state.spinner}
        //   textContent={'Please Wait...'}
          textStyle={styles.spinnerTextStyle}
        />
                                        <TouchableOpacity
                                            style={styles.updateButtonStyle}
                                            activeOpacity={.5}
                                            onPress={this.UpdateProfileData}
                                        >

                                            <Text style={styles.buttonWhiteTextStyle}>Update</Text>

                                        </TouchableOpacity>
                                    </View>

                                </ScrollView>
                            </View>
                            <View style={{
                                flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff',
                                flex: .13, width: '100%'
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





                                    <TouchableOpacity style={[styles.CircleShapeView, { flex: .20, alignItems: 'center', justifyContent: 'center' }]}
                                        onPress={() => { this.props.navigation.navigate('ChooseSubscription') }}
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
                    </LinearGradient>
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
    profileNameStyle: {
        color: 'white',
        marginTop: 20,
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    },
    buttonWhiteTextStyle: {
        textAlign: 'center',
        fontSize: 16,
        color: 'white',
        alignContent: 'center',
    },
    updateButtonStyle: {
        marginTop: 10,
        marginBottom: 30,
        width: 190,
        height: 40,
        padding: 10,
        backgroundColor: '#FB3954',
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    titleStyle: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        flex: 10

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
        color: '#4D4D4D',
        marginLeft: 18,
        flex: .5,
        fontSize: RFPercentage(2),
        textAlign: 'left'

    },
    gendertextstyle: {
        color: '#4D4D4D',
        flex: .5,
        marginLeft: 4,
        fontSize: RFPercentage(2),
        textAlign: 'left',

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
    spinnerTextStyle: {
        color: '#FFF'
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
    bottomnotificationtextstyle: {
        color: "#887F82",
        fontSize: 8,
        marginLeft: 40,
        marginTop: 3,
        textAlign: 'center'
    },
    StyleProfileTab: {
        marginTop: 9,
        width: 30,
        height: 30,
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
        borderWidth: .8,
        borderColor: 'lightgray',
        margin: 10,
        width: width - 30
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
    linearGradient: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        flex: 1

    },


});

export default MyProfileActivity;

