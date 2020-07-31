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
    ScrollView
} from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import stringsoflanguages from '../components/locales/stringsoflanguages';
var videoId;
console.disableYellowBox = true;

function Item({ item }) {
    return (
        <View style={styles.listItem}>


            <View style={styles.similarvideoBottomView}>

                <View style={{ flexDirection: 'row', flex: .60 }}>

                    <Text style={styles.textpinktextstyle}>{item.id}.</Text>

                    <Text style={styles.textpinktextstyle}>{item.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', flex: .40, justifyContent: 'center', alignItems: 'flex-end' }}>

                    <Text style={styles.textpinktextstyle}> ${item.price}/{item.monthname}</Text>

                </View>

            </View>


        </View>
    );
}



class DashboardDetailActivity extends Component {

    constructor(props) {
        super(props);
        this.videoDetail = this.videoDetail.bind(this);
        this.similarvideolist = this.similarvideolist.bind(this);
        this.state = {
            baseUrl: 'https://digimonk.co/fitness/api/Api/videoetailById',
            similarvideourl: 'https://digimonk.co/fitness/api/Api/similarVideoList',
            sr_nu: '',
            name: '',
            image: '',
            description: '',
            price: '',
            monthname: ''
        };
    }


    showLoading() {
        this.setState({ loading: true });
    }

    hideLoading() {
        this.setState({ loading: false });
    }

    static navigationOptions = {
        title: 'Dashboard Detail'
    };

    componentDidMount() {

        const { navigation } = this.props;
        videoId = navigation.getParam('id', 'no-id');

        console.log("VIDEO ID===" + videoId)
        //   this.showLoading();
        this.videoDetail();
        this.similarvideolist();
    }

    ListEmpty = () => {
        return (

            <View style={styles.container}>
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
            body: JSON.stringify({
                id: videoId
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

                    console.log("response data ===" + responseData)

                    this.setState({ sr_nu: responseData.data.sr_nu });
                    this.setState({ name: responseData.data.name });
                    this.setState({ image: responseData.data.image });
                    this.setState({ description: responseData.data.description });

                    this.setState({ price: responseData.data.price });
                    this.setState({ monthname: responseData.data.monthname });





                }

                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
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
                id: videoId
            }),
        })
            .then(response => response.json())
            .then(responseData => {
                this.hideLoading();
                if (responseData.status == '0') {
                    alert(responseData.message);
                } else {

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


    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.headerView}>


                    <TouchableOpacity style={{ flex: .10 }}

                        onPress={() => { this.props.navigation.goBack() }}>


                        <Image source={require('../images/back_icon.png')}
                            style={styles.backIconStyle} />


                    </TouchableOpacity>


                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: .80 }} >

                        <Text style={styles.screentitle}>MENEZES PILATES</Text>

                    </TouchableOpacity>


                    <TouchableOpacity style={{
                        flex: .10
                    }}
                    >

                        <Image source={require('../images/small-user.png')}
                            style={styles.MenuHomeUserIconStyle} />


                    </TouchableOpacity>


                </View>


                <ScrollView>


                    <View style={styles.listItem}>

                        <ImageBackground source={{ uri: 'https://digimonk.co/fitness/uploads/video_logo/' + this.state.image }}
                            style={{ width: 400, height: 300, justifyContent: 'center' }}>
                            <Image source={require('../images/play_icon.png')}
                                style={styles.playiconstyle} />

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

                        <View style={{ flexDirection: 'row', flex: 1 }}>

                            <View style={{
                                flexDirection: 'row', marginTop: 2, padding: 10, backgroundColor: '#FB3954', flex: .5,
                                justifyContent: 'center', alignItems: 'center', margin: 15, borderRadius: 5
                            }}
                            >


                                <Image
                                    style={styles.StylePlayIcon}
                                    source={require('../images/play.png')} />


                                <Text style={{
                                    color: 'white', marginLeft: 5, fontSize: RFPercentage(1.7), textAlign: 'center',
                                    marginRight: 5
                                }}>
                                    {stringsoflanguages.play}</Text>


                            </View>


                            <View style={{
                                flexDirection: 'row', marginTop: 2, padding: 10, flex: .5, backgroundColor: '#ADB6C1',
                                justifyContent: 'center', alignItems: 'center', margin: 15, borderRadius: 5
                            }}>


                                <Image
                                    style={styles.StyleSubscribedVideo}
                                    source={require('../images/my_subscription.png')} />



                                <Text style={{
                                    color: 'white', marginLeft: 5, fontSize: RFPercentage(1.7), textAlign: 'center',
                                    marginRight: 5
                                }}>
                                    {stringsoflanguages.subscribed}</Text>


                            </View>



                        </View>

                        <View style={{ flexDirection: 'row' }}>

                            <Text style={styles.textblacktextstyle}>Description</Text>

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
                        style={{ flex: 1 }}
                        data={this.state.data}

                        renderItem={({ item }) => (

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





                </ScrollView>


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
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textpinktextstyle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FB3954',
        textAlign: 'right',
        marginRight: 3,
        marginTop: 8
    },
    playiconstyle: {
        height: 70,
        width: 70,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    MenuHomeIconStyle: {
        marginTop: 10
    },
    MenuHomeUserIconStyle: {
        height: 30,
        width: 25,
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
        height: 25,
        width: 50,
        marginLeft: 50,
        tintColor: 'white',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    downArrowStyle: {
        height: 15,
        width: 15,
        marginTop: 10,
        marginLeft: 20
    },
    textblacktextstyle: {
        fontSize: 15,
        color: '#06142D',
        marginTop: 8,
        marginLeft: 5,
        marginLeft: 10
    },
    textpinktextstyle: {
        fontSize: 15,
        color: '#FB3954',
        marginTop: 8,
        marginLeft: 5,
        marginLeft: 10
    },
    description_text_color: {
        color: "#999A9A",
        fontSize: 15,
        marginTop: 10,
        marginLeft: 10
    },
    StylePlayIcon: {
        width: 25,
        height: 25,
        marginRight: 15,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    StyleSubscribedVideo: {
        width: 25,
        height: 25,
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
        height: 50,
        width: 400,
        margin: 10,
        padding: 10,
        shadowColor: '#ecf6fb',
        elevation: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        alignItems: 'center'
    },
});

export default DashboardDetailActivity;

