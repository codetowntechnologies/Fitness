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
            <Image source={{ uri: item.photo }} 
            style={{ width:400, height: 300 , borderTopLeftRadius:20, borderTopRightRadius:20}} />
            {/* <View style={{ alignItems: "center", flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
                <Text>{item.position}</Text>
            </View>
            <TouchableOpacity style={{ height: 50, width: 50, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ color: "green" }}>Call</Text>
            </TouchableOpacity> */}
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

                        <Text style={styles.bottomactivetextstyle}>{stringsoflanguages.home_menu}</Text>

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
                                    this.props.navigation.navigate('Login')

                                }}>


                            </ActionButton>
                        </View>
                    </View>


                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('Notification') }}>

                        <Image source={require('../images/bell_inactive.png')}
                            style={styles.styleNotificationTab} />

                        <Text style={styles.bottomnotificationtextstyle}>{stringsoflanguages.notification_small}</Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={styles.tabButtonStyle}
                        onPress={() => { this.props.navigation.navigate('MyProfile') }}>

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
      
       marginTop:10,
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
       
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
    }

});

export default DashboardActivity;

