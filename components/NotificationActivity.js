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
    ImageBackground
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
import ActionButton from 'react-native-circular-action-menu';



function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <View style={styles.listItemStyle}>
                <View style={{ flex: 1, marginLeft: 10, padding: 10 }}>
                    <Text style={{ color: '#887F82', fontSize: RFValue(12, 580) }}>{item.name}</Text>
                    <Text style={{ color: "#767475", alignSelf: 'flex-end', marginTop: 10, fontSize: RFPercentage(1.5) }}>{item.time}</Text>
                </View>

            </View>
        </View>
    );
}


class NotificationActivity extends Component {

    constructor(props) {
        super(props);
        //  this.videoList = this.videoList.bind(this);
        this.state = {
            //    baseUrl: 'https://digimonk.co/fitness/api/Api/videoList',
            data: [
                {
                    "name": "New Video Uploaded",
                    "time": "12:00 AM",
                },
                {
                    "name": "New Video Uploaded",
                    "time": "1:00 AM",
                },
                {
                    "name": "New Video Uploaded",
                    "time": "2:00 AM",
                },
                {
                    "name": "New Video Uploaded",
                    "time": "3:00 AM",
                },
                {
                    "name": "New Video Uploaded",
                    "time": "4:00 AM",
                },
                {
                    "name": "New Video Uploaded",
                    "time": "5:00 AM",
                },
                {
                    "name": "New Video Uploaded",
                    "time": "6:00 AM",
                },
                {
                    "name": "New Video Uploaded",
                    "time": "7:00 AM",
                },
                {
                    "name": "New Video Uploaded",
                    "time": "8:00 AM",
                },
                {
                    "name": "New Video Uploaded",
                    "time": "9:00 AM",
                },
            ]
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
        //  this.videoList();

    }

    // videoList() {

    //     var url = this.state.baseUrl;
    //     console.log('url:' + url);
    //     fetch(url, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     //   body: JSON.stringify({
    //     //     secure_pin: 'digimonk',
    //     //     customer_id: this.state.userId
    //     //   }),
    //     })
    //       .then(response => response.json())
    //       .then(responseData => {
    //         this.hideLoading();
    //         if (responseData.status == '0') {
    //           alert(responseData.message);
    //         } else {
    //           this.setState({ data: responseData.data});
    //         }

    //         console.log('response object:', responseData);
    //       })
    //       .catch(error => {
    //         this.hideLoading();
    //         console.error(error);
    //       })

    //       .done();
    //   }

    actionOnRow(item) {

        // this.props.navigation.navigate('QuestionLogDetail', {
        //   item: item,
        //   question_id: item.question_id
        // })

        // console.log('Selected Item :', item);

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.headerView}>


                    <TouchableOpacity style={{ flex: .10, alignItems: 'center', justifyContent: 'center' }}
                    >

                        {/* <Image source={require('../images/home_menu.png')}
                            style={styles.MenuHomeIconStyle} /> */}

                    </TouchableOpacity>


                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}
                    >

                        <Text style={styles.screentitle}>Notifications</Text>

                    </TouchableOpacity>

                </View>



                {/* 
                <ScrollView
                    refreshControl={
                        <RefreshControl 
                            refreshing={this.state.refresh}
                            onRefresh={() => this.onRefresh()}
                            tintColor='#FFC33B'
                        />
                    }> */}

                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}

                    renderItem={({ item }) => (

                        <TouchableWithoutFeedback onPress={() => this.actionOnRow(item)}>

                            <View>
                                <Item item={item} />
                            </View>

                        </TouchableWithoutFeedback>

                    )}
                    keyExtractor={item => item.time}
                    ListEmptyComponent={this.ListEmpty}
                />

                {/* </ScrollView> */}

                <View style={styles.tabStyle}>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/home_inactive.png')}
                            style={styles.StyleHomeTab} />

                        <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.Home}</Text>

                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Dashboard') }}>

                        <Image source={require('../images/video_inactive.png')}
                            style={styles.StyleVideoTab} />

                        <Text style={styles.bottomvideotextstyle}>{stringsoflanguages.my_videos}</Text>

                    </TouchableOpacity>



                    <View style={{ position: 'absolute', alignSelf: 'center', backgroundColor: '#fffff', width: 70, height: 100, bottom: 5, zIndex: 10 }}>

                        <View style={{ flex: 1 }}>
                            <ActionButton
                                buttonColor="#ffffff"
                                onPress={() => {

                                    this.props.navigation.navigate('ServiceContractScreen1')

                                }}>


                            </ActionButton>
                        </View>
                    </View>


                    <TouchableOpacity style={styles.tabButtonStyle}
                    >

                        <Image source={require('../images/bell_active.png')}
                            style={styles.styleNotificationTab} />

                        <Text style={styles.bottomnotificationtextstyle}>{stringsoflanguages.notification_small}</Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Contactus') }}>

                        <Image source={require('../images/setting_inactive.png')}
                            style={styles.StyleProfileTab} />

                        <Text style={styles.bottominactivetextstyle}>{stringsoflanguages.profile}</Text>


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
        color: "#FB3954",
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
});

export default NotificationActivity;

