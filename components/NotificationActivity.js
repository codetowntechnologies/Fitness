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
    
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import AsyncStorage from '@react-native-community/async-storage';

function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={styles.listItemStyle}>
                <View style={{ flex: 1, marginLeft: 10, padding: 10 }}>
                    <Text style={{ color: '#887F82', fontSize: RFValue(12, 580) }}>{item.description}</Text>
                    <Text style={{ color: "#767475", alignSelf: 'flex-end', marginTop: 10, fontSize: RFPercentage(1.5) }}>{item.created_at}</Text>
                </View>

            </View>
        </View>
    );
}


class NotificationActivity extends Component {

    constructor(props) {
        super(props);
        this.notificationList = this.notificationList.bind(this);
        this.state = {
            baseUrl: 'https://digimonk.co/fitness/api/Api/getNotification',
            userId: '',
            isnoDataVisible: false
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Notification'
    };

    componentDidMount() {
        this.showLoading();
        AsyncStorage.getItem('@user_id').then((userId) => {
            if (userId) {
                this.setState({ userId: userId });
                console.log("user id ====" + this.state.userId);
                this.notificationList();
            }
        });

    }

    notificationList() {

        var url = this.state.baseUrl;
        console.log('url:' + url);
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.state.userId
          }),
        })
          .then(response => response.json())
          .then(responseData => {
            this.hideLoading();
            if (responseData.status == '0') {
             // alert(responseData.message);
              this.setState({ isnoDataVisible: true })
            } else {
                this.setState({ isnoDataVisible: false })
              this.setState({ data: responseData.data});
            }

            console.log('response object:', responseData);
          })
          .catch(error => {
            this.hideLoading();
            console.error(error);
          })

          .done();
      }



      ListEmpty = () => {
        return (
            //View to show when list is empty
            <View style={styles.container}>
                {
                    this.state.isnoDataVisible ?
                        <Text style={{ textAlign: 'center' }}>{stringsoflanguages.no_notification_found}</Text>
                        : null
                }
            </View>
        );
    };



    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.headerView}>


                    <TouchableOpacity style={{ flex: .10, alignItems: 'center', justifyContent: 'center' }}
                    >

                        {/* <Image source={require('../images/home_menu.png')}
                            style={styles.MenuHomeIconStyle} /> */}

                    </TouchableOpacity>


                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: .8 }}
                    >

                        <Text style={styles.screentitle}>Notifications</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={{
                        flex: .10
                    }}
                    >

                        <Image source={require('../images/small-user.png')}
                            style={styles.MenuHomeUserIconStyle} />


                    </TouchableOpacity>




                </View>


                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}

                    renderItem={({ item }) => (

                        <TouchableWithoutFeedback>

                            <View>
                                <Item item={item}
                                />
                            </View>

                        </TouchableWithoutFeedback>

                    )}
                    keyExtractor={item => item.id}
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
                    >

                        <Image source={require('../images/bell_active.png')}
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
    listItem: {
        marginTop: 10,
        flex: 1,
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
        width: 30,
        height: 28,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleVideoTab: {
        marginTop: 11,
        marginRight: 10,
        width: 38,
        height: 23,
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
        width: 25,
        height: 30,
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
    },
    listItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        height: 60,
        margin: 10,
        elevation: 20,
        shadowColor: 'grey',
        borderRadius: 5,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1
    },
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
        width: 70,
        height: 70,
        borderRadius: 70 / 2,
        marginBottom: 50,
        backgroundColor: 'white',
        shadowColor: '#ecf6fb',
        elevation: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1
    },
    plusiconstyle: {
        height: 30,
        width: 30,
        marginTop: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuHomeUserIconStyle: {
        height: 30,
        width: 25,
        margin: 5,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default NotificationActivity;

