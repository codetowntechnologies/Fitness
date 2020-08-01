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


function Item({ item }) {
    return (
        <View style={styles.listItem}>
            <ImageBackground source={{ uri: 'https://digimonk.co/fitness/uploads/video_logo/' + item.image }}
                style={{ width: 400, height: 300, justifyContent: 'center' }}
                imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                <Image source={require('../images/play_icon.png')}
                    style={styles.playiconstyle} />

            </ImageBackground>

            <View style={styles.videoBottomView}>

                <View style={{ flexDirection: 'row', flex: .60 }}>

                    <Text style={styles.textpinktextstyle}>{item.sr_nu}.</Text>

                    <Text style={styles.textblacktextstyle}>{item.name}</Text>
                </View>

                <View style={{ flexDirection: 'row', flex: .40, justifyContent: 'center', alignItems: 'flex-end' }}>

                    <Text style={styles.textpinktextstyle}> ${item.price}/{item.monthname}</Text>

                </View>

            </View>


        </View>
    );
}


class DashboardActivity extends Component {

    constructor(props) {
        super(props);
        this.videoList = this.videoList.bind(this);
        this.state = {
            baseUrl: 'https://digimonk.co/fitness/api/Api/videoList',
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
        this.showLoading();
        this.videoList();
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


    videoList() {

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
                } else {
                    this.setState({ data: responseData.data });
                }

                console.log('response object:', responseData);
            })
            .catch(error => {
                this.hideLoading();
                console.error(error);
            })

            .done();
    }

    actionOnRow(item) {

        this.props.navigation.navigate('DashboardDetail', {
          id: item.id
        })

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>

                <View style={styles.headerView}>


                    <TouchableOpacity style={{
                        flex: .10
                    }}>

                        <Image source={require('../images/small-logo.png')}
                            style={styles.MenuHomeIconStyle} />

                    </TouchableOpacity>


                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: .80 }}
                    >

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

                <View style={{ height: 70, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >1</Text>

                            </View>
                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >2</Text>

                            </View>

                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >3</Text>

                            </View>

                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >4</Text>

                            </View>

                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >5</Text>

                            </View>
                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >6</Text>

                            </View>
                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >7</Text>

                            </View>
                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >8</Text>

                            </View>
                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >9</Text>

                            </View>
                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >10</Text>

                            </View>
                            <View style={styles.smallcircleshapeview} >
                                <Text style={styles.smallcircletext} >11</Text>

                            </View>


                        </View>

                    </ScrollView>
                </View>


                <FlatList
                    style={{ flex: 1 }}
                    data={this.state.data}

                    renderItem={({ item, index }) => (

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
        marginRight: 10
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

});

export default DashboardActivity;

