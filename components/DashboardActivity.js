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


function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <ImageBackground source={{ uri: item.photo }}
                style={{ width: 400, height: 300,   justifyContent: 'center' }}
                imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Image source={require('../images/play_icon.png')}
                    style={styles.playiconstyle} />

            </ImageBackground>

            <View style={styles.videoBottomView}>

                <View style={{ flexDirection: 'row', flex: .75 }}>

                    <Text style={styles.textpinktextstyle}>1. </Text>

                    <Text style={styles.textblacktextstyle}>Menezes Pilates Floor 1</Text>
                </View>

                <View style={{ flexDirection: 'row', flex: .25 }}>

                    <Text style={styles.textpinktextstyle}>$10/month</Text>

                </View>

            </View>


        </View>
    );
}


class DashboardActivity extends Component {

    constructor(props) {
        super(props);
        //  this.videoList = this.videoList.bind(this);
        this.state = {
            //    baseUrl: 'https://digimonk.co/fitness/api/Api/videoList',
            data: [
                {
                    "name": "Miyah Myles",
                    "email": "miyah.myles@gmail.com",
                    "position": "Data Entry Clerk",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                },
                {
                    "name": "June Cha",
                    "email": "june.cha@gmail.com",
                    "position": "Sales Manager",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                },
                {
                    "name": "Iida Niskanen",
                    "email": "iida.niskanen@gmail.com",
                    "position": "Sales Manager",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                },
                {
                    "name": "Renee Sims",
                    "email": "renee.sims@gmail.com",
                    "position": "Medical Assistant",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                },
                {
                    "name": "Jonathan Nu\u00f1ez",
                    "email": "jonathan.nu\u00f1ez@gmail.com",
                    "position": "Clerical",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                },
                {
                    "name": "Sasha Ho",
                    "email": "sasha.ho@gmail.com",
                    "position": "Administrative Assistant",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                },
                {
                    "name": "Abdullah Hadley",
                    "email": "abdullah.hadley@gmail.com",
                    "position": "Marketing",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                },
                {
                    "name": "Thomas Stock",
                    "email": "thomas.stock@gmail.com",
                    "position": "Product Designer",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                },
                {
                    "name": "Veeti Seppanen",
                    "email": "veeti.seppanen@gmail.com",
                    "position": "Product Designer",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                },
                {
                    "name": "Bonnie Riley",
                    "email": "bonnie.riley@gmail.com",
                    "position": "Marketing",
                    "photo": "https:\/\/tinyfac.es\/data\/avatars\/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg"
                }
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
        title: 'Dashboard'
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

                        <Text style={styles.screentitle}>MENEZES PILATES</Text>

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
                    keyExtractor={item => item.email}
                    ListEmptyComponent={this.ListEmpty}
                />

                {/* </ScrollView> */}

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
        color: "#887F82",
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
    videoBottomView: {
        height: 50,
        width: 400,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,
        shadowColor: '#ecf6fb',
        elevation: 20,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
    textblacktextstyle: {
        fontSize: 15,
        color: '#1B273E',
        fontWeight: 'bold',
    },
    textpinktextstyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FB3954',
        textAlign: 'right',
        marginRight: 3
    },
    playiconstyle: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },




});

export default DashboardActivity;

