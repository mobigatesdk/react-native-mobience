/**
 * Sample React Native App
 *
 * adapted from App.js generated by the following command:
 *
 * react-native init example
 *
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Button, View } from 'react-native';
import Mobience from 'react-native-mobience';

export default class App extends Component {
  state = {
    status: 'not started',
  };


  runMobience = () => {
    this.initLibrary()
  }

  initLibrary = () => {
    if (Platform.OS === 'android') {
      Mobience.init("V0K6jhiIfem6CRWHYZ59Nmj3oFBBKbJsnSsWfR2JNq7ktblOUXwbJoBQTpWnw2uSwW76gpiu2kun50jweTY69B",
        {
          /*custom options, check docs for more details
           appIdentifier: 'customUserAppIdentifier',
           appInstallationSource: "customAppInstallationSourcexyz",
           email: 'testemail@gmail.com',
           userAgent: 'customUserAgent',
           customUserId: 'customUserId',*/
        }, (success) => {
          /* You can configure custom collectors after init 
          Mobience.disableAllDataCollector()
          Mobience.configureDataCollectors(true, [Mobience.DATA_COLLECTOR_APPS_LIST,
          Mobience.DATA_COLLECTOR_BATTERY,
          Mobience.DATA_COLLECTOR_PHONE_INFO])*/

          Mobience.startSDK((result) => {
            this.setState({
              status: 'started',
            });

          }, (errorResult) => {
            this.setState({
              status: errorResult,
            });
          })
        }, (initError) => {
          this.setState({
            status: initError,
          });
        })
    }else{
      this.setState({
        status: 'Mobience SDK supports only Android'
      })
    }
  }

  sendTrackEvent = () => {
    if (Platform.OS === 'android') {
      Mobience.trackEvent({
        name: Mobience.CATEGORY_PURCHASE,
        parameters: {
          [Mobience.PARAMETER_CONTENT_ID]: 42313532,
          [Mobience.PARAMETER_PRICE]: 43.23,
          [Mobience.PARAMETER_QUANTITY]: 2
        },
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>☆Mobience example☆</Text>
        <Text style={styles.instructions}>Library STATUS: {this.state.status}</Text>
        <Button
          onPress={this.runMobience}
          title="Run Mobience"
          color="#FF6347" />
        <View
          style={styles.layoutMargin}>
          <Button
            onPress={this.sendTrackEvent}
            title="Track event"
            color="#FF6347" />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  layoutMargin: {
    marginTop: 20,
    marginBottom: 20
  }
});