import {Provider} from 'react-redux';
import store from './src/redux/store';
import AppViewContainer from './src/modules/AppViewContainer';
import React, {Component} from 'react';
import 'expo';

import {
  Alert,
  AppRegistry,
  Button,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Auth0 from 'react-native-auth0';

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);
//const auth0 = new Auth0({ domain: 'charlietable.auth0.com', clientId: 'ZfTfzLIi6jmr1y4kpPVdh8EkYUtQN10N' });

export default class hicharlie extends Component {

	constructor(props) {
	    super(props);
	    this.state = { accessToken: null };
  	}

	_onLogin = () => {
		auth0
		.webAuth
		.authorize({
			scope: 'openid profile',
			audience: 'https://' + credentials.domain + '/userinfo'
		})
		.then(credentials => {
		    Alert.alert(
				'Success',
				'AccessToken: ' + credentials.accessToken,
				[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
				{ cancelable: false }
		    );
		    this.setState({ accessToken: credentials.accessToken });
		    console.log(credentials)
		})
		.catch(error => console.log(error));
	};

	_onLogout = () => {
	    if (Platform.OS === 'android') {
	      this.setState({ accessToken: null });
	    } else {
	      auth0.webAuth
	        .clearSession({})
	        .then(success => {
	          this.setState({ accessToken: null });
	        })
	        .catch(error => console.log(error));
	    }
	};	
	render() {
		let loggedIn = this.state.accessToken === null ? false : true;
		return (
		  <View style={styles.container}>
		    <Text style={styles.header}>Hi Charlie - Login</Text>
		    <Text>
		      You are {loggedIn ? '' : 'not '}logged in.
		    </Text>
		    <Button
		      onPress={loggedIn ? this._onLogout : this._onLogin}
		      title={loggedIn ? 'Log Out' : 'Log In'}
		    />
		  </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});

AppRegistry.registerComponent('main', () => hicharlie);
