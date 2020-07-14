import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import SplashActivity from './components/SplashActivity';
import LoginActivity from './components/LoginActivity';
import SignupActivity from './components/SignupActivity';
import ForgotPasswordActivity from './components/ForgotPasswordActivity';
import DashboardActivity from './components/DashboardActivity';
import NotificationActivity from './components/NotificationActivity';
import MyProfileActivity from './components/MyProfileActivity';
import SettingsActivity from './components/SettingsActivity';
import MyVideosActivity from './components/MyVideosActivity';




const NavStack = createStackNavigator(
    {
        Splash: { screen: SplashActivity },
        Login: { screen: LoginActivity },
        Signup: { screen: SignupActivity },
        ForgotPassword: { screen: ForgotPasswordActivity },
        Dashboard: { screen: DashboardActivity },
        Notification: { screen: NotificationActivity },
        MyProfile: { screen: MyProfileActivity },
        Settings: { screen: SettingsActivity },
        MyVideos : {screen : MyVideosActivity}
        
    },
    {
        initialRouteName: 'Splash',
        headerMode: 'none'

    }

);

const Apps = createAppContainer(NavStack);

export default class App extends React.Component {

    render() {


        return <Apps />;
    }
}