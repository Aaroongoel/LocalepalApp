import React from 'react';
import { TextInput, View, Button, KeyboardAvoidingView, ActivityIndicator, Alert, Image } from 'react-native';
import firebase from '../../API/firebase';
import global from '../../Components/global';

class LoginScreen extends React.Component {

  constructor(props){
    super(props);

    this.state={
      email: '',
      password: '',
      loading: false 
    }
  }

  onLoginPress(){
    this.setState({ error: '', loading: true });
     const { email, password } = this.state;
     firebase.auth().signInWithEmailAndPassword(email, password)
         .then(() => {
             this.setState({ error: '', loading: false })
             this.props.navigation.navigate('Bottom')
            Alert.alert('welcome');
         },(error) =>{
           Alert.alert(error.message);
         }
         )
         .catch(() => {
             this.setState({ error: 'Authentication failed', loading: false })
             Alert.alert(error);

         })

  }

  rederButton(){
    const {loading } = this.state;
    if(loading){
      return <ActivityIndicator />;
    }

    return(
      <Button
      onPress={this.onLoginPress.bind(this)}
      title='LogIn'
    />
    );
  }  

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={global.container}>
        <View>
          <TextInput
            placeholder='Enter Your Registered Email'
            style={global.TInput}
            value={this.state.email}
            onChangeText={ (email) => this.setState({email})}
          />
          <TextInput
            placeholder='Enter Your Password'
            style={global.TInput}
            value={this.state.password}
            onChangeText={ (password) => this.setState({password})}
            secureTextEntry= {true}
          />
        </View>
        <View>
          <View>
            {this.rederButton()}
          </View>
          <Button
            onPress={() =>
              this.props.navigation.navigate('SignUp')}
            title='New User? SignUp'
          />
          <Button
            onPress={() =>
              this.props.navigation.navigate('Forgot')}
            title='Forgot Password?'
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;

