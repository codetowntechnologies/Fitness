import React, { Component } from 'react';
import { AppRegistry, StyleSheet, FlatList, Text, View, Alert, Platform, Dimensions } from 'react-native';

const width= Dimensions.get('window').width;
const height=Dimensions.get('window').height;
import { Container, Content, Picker,Header,Button,Title } from 'native-base';

const Item = Picker.Item;
class MySubscriptionVideosActivity extends Component {
 
 constructor(props)
 {
   super(props);
 
   this.state = {
    selected1: '',
    results: {
        items: []
    }
}
 
 }
 onValueChange (value: string) {
  this.setState({
      selected1 : value
  });
  this.props.navigation.navigate('MyProfile',{select:value});
}
 
 render() {
   return (
 
<Container>
                <Content>
                    <Picker
                        headerComponent={
                            <Header>
                                <Button transparent>
                                    Custom Back
                                </Button>
                                <Title>Custom Header</Title>
                            </Header>
                        }
                        mode='dropdown'
                        // placeholder="select gender"
                        style={{marginTop:10}}
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this)}>
                        <Item label="Select your gender" />
                        <Item label='Male' value='Male' />
                        <Item label='Female' value='Female' />
                        <Item label='Other' value='Other' />
                   </Picker>
                </Content>
            </Container>
     
   
           
   );
 }
}
 
const styles = StyleSheet.create({
 
MainContainer :{
 
justifyContent: 'center',
flex:1,
margin: width*0.05,
paddingTop: (Platform.OS) === 'ios' ? 20 : 0
 
},
 
GridViewBlockStyle: {
 
  justifyContent: 'center',
  flex:1,
  alignItems: 'center',
  height: 100,
  margin: 5,
  backgroundColor: '#00BCD4'
 
}
,
 
GridViewInsideTextItemStyle: {
 
   color: '#fff',
   padding: 10,
   fontSize: 18,
   justifyContent: 'center',
   
 },
 
});
 
export default MySubscriptionVideosActivity;
