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
import WhoWeAreActivity from './components/WhoWeAreActivity';
import MySubscriptionVideosActivity from './components/MySubscriptionVideosActivity';
import DashboardDetailActivity from './components/DashboardDetailActivity';
import OTPActivity from './components/OTPActivity';
import ForgetOtpActivity from './components/ForgetOtpActivity';
import ResetPasswordActivity from './components/ResetPasswordActivity';
import ChangePasswordActivity from './components/ChangePasswordActivity';





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
        MyVideos : {screen : MyVideosActivity},
        WhoWeAre: {screen : WhoWeAreActivity},
        MySubscriptionVideos: {screen : MySubscriptionVideosActivity},
        DashboardDetail: {screen : DashboardDetailActivity},
        OTP : {screen : OTPActivity},
        ForgetOtp : {screen : ForgetOtpActivity},
        ResetPassword : {screen : ResetPasswordActivity},
        ChangePassword : {screen : ChangePasswordActivity},
        
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