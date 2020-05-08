
  
import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SwipeableFlatList } from 'react-native-swipeable-flat-list';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import {DotIndicator} from 'react-native-indicators';
import { SearchBar } from 'react-native-elements';
import NetInfo from "@react-native-community/netinfo";



export default class App extends Component {
  
  constructor()
  {
   
    super();

    this.state = {  TESTDATA : [] , isNetworkConnected:false,tempseachData:[], isDataLoaded:false, activityindicatorStatus:true, visible: false, notAbletoLoadData:false, selectedvalue:{
    "country_name": "USA",
		"cases": "1,237,761",
		"deaths": "72,275",
		"new_deaths": "4",
		"new_cases": "128",
		"active_cases": "964,817",
		"total_cases_per_1m_population": "3,739",
		"deaths_per_1m_population": "218",
		"total_tests": "7,727,938"}};

		this.checkInternerConnection();
  }

  checkInternerConnection =()=>
  {
	NetInfo.fetch().then(state => {
		console.warn("Connection type", state.type);
		console.warn("Is connected?", state.isConnected);

		if(state.isConnected)
		{
				this.setState({
					isNetworkConnected:true
				})
		}

		else{
			this.setState({
				isNetworkConnected:false
			})
		}
	  });
  }

  componentWillMount()
  {
 
   
    fetch('https://akashraj.tech/corona/api')
    .then((response) => response.json())
    .then((json) => {
     //TESTDATA = (json.countries_stat);
      this.setState({TESTDATA: json.countries_stat , tempseachData : json.countries_stat, search: '', activityindicatorStatus:false , isDataLoaded:true, notAbletoLoadData:false});
    })
    .catch((error) => {
	  console.error(error);
	  this.setState({notAbletoLoadData:true})
	  this.checkInternerConnection();

	  if(!isNetworkConnected)
	  {
			Alert.alert("Please connect to internet and try again !!!")
	  }
      Alert.alert("Somthing went wrong please turn on internet or try after somtimes")
    });
  }

  updateSearch = search => {
	this.setState({ search });
	
	
	let text = search;

	 const datatoserach = this.state.TESTDATA;
	const newData = datatoserach.filter(function(item){
		const itemData = item.country_name.toUpperCase()
		const textData = text.toUpperCase()

		return itemData.includes(textData);
	})
	if(newData.length == 0)
	{
		//this.setState({TESTDATA:TESTDATA})
	}
	else{
		this.setState({
			TESTDATA: newData,
			
		})
	}

	if(text.length === 0)
	{
			this.setState({
				TESTDATA:this.state.tempseachData
			})
	}

  };

	render() {


		const { search } = this.state;
    if(this.state.activityindicatorStatus)
    {
        return(
          <View style = {{flex:1, justifyContent:'center'}}>
            <DotIndicator
              />
         </View>
        )
    }

    else if(this.state.isDataLoaded){

    
		return (

     

			<View style={styles.container}>
				<Text style={styles.welcome}>
					Covid 19 tracker
				</Text>

				<SearchBar
        placeholder="Countery Serach"
        onChangeText={this.updateSearch}
        value={search}
      />

				<SwipeableFlatList
					data={this.state.TESTDATA}
					keyExtractor={(item) => `${item.country_name}`}
					renderItem={({ item }) => (
						<TouchableOpacity
              onPress={() => this.setState({visible:true , 
              

                selectedvalue:{
                  "country_name":item.country_name,
                  "cases": item.cases,
                  "deaths": item.deaths,
                  "new_deaths": item.new_deaths,
                  "new_cases": item.new_cases,
                  "active_cases": item.active_cases,
                  "total_cases_per_1m_population": item.total_cases_per_1m_population,
                  "deaths_per_1m_population": item.deaths_per_1m_population,
                  "total_tests":item.total_tests}
              
              
              })}
							style={{
								height: 48,
							}}
						>
							<View
								style={{
									backgroundColor: 'transprent',
									borderColor: 'grey',
									borderWidth: 0.5,
									flex: 1,
									justifyContent: 'center',
									padding: 8,
								}}
							>
                <View
                	style={{
										alignItems:'center'
                
									}}
                >
								<Text
									style={{
										backgroundColor: 'transparent',
										color: 'black',
                    fontSize: 16,
                
									}}
								>

                
									{item.country_name}
								</Text>

                </View>
							</View>
						</TouchableOpacity>
					)}
					renderLeft={({ item }) => (
						<TouchableOpacity
							style={{
								height: 48,
								width: 80,
							}}
						>
							<View
								style={{
									backgroundColor: 'lightgrey',
									borderColor: 'black',
									borderWidth: 1,
									flex: 1,
									justifyContent: 'center',
									padding: 8,
								}}
							>
								<Text
									style={{
										backgroundColor: 'transparent',
										color: 'black',
										fontSize: 16,
									}}
								>
									{item.leftLabel}
								</Text>
							</View>
						</TouchableOpacity>
					)}
					renderRight={({ item }) => (
						<TouchableOpacity
							style={{
								height: 48,
								width: 80,
							}}
						>
							<View
								style={{
									backgroundColor: 'lightgrey',
									borderColor: 'black',
									borderWidth: 1,
									flex: 1,
									justifyContent: 'center',
									padding: 8,
								}}
							>
								<Text
									style={{
										backgroundColor: 'transparent',
										color: 'black',
										fontSize: 16,
									}}
								>
									{item.rightLabel}
								</Text>
							</View>
						</TouchableOpacity>
					)}
				/>

<Dialog
    visible={this.state.visible}
    dialogStyle={{
      backgroundColor: 'white',
      height:150,
      width:270     
    }}
    onTouchOutside={() => {
      this.setState({ visible: false });
    }}
  >
    <DialogContent>
      <View style={{alignItems:'center'}}>
      <Text style={{color:'black'}}>
    Country : {this.state.selectedvalue.country_name} 
  
     </Text>
     <Text style={{color:'blue'}}>
    Total Cases : {this.state.selectedvalue.cases} 
  
     </Text>
     <Text style={{color:'green'}}>
    Active Cases : {this.state.selectedvalue.active_cases} 
  
     </Text>
     <Text style={{color:'red'}}>
    Deaths : {this.state.selectedvalue.deaths} 
  
     </Text>
     <Text style={{color:'orange'}}>
    New Cases : {this.state.selectedvalue.new_cases} 
  
     </Text>

     </View>
    </DialogContent>
  </Dialog>
			</View>


		);
  }

  else if(this.state.notAbletoLoadData)
  {
	  Alert.alert("Somthing went wrong please try after sometime ..")
  }
}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		//alignItems: 'center',
		backgroundColor: 'gray',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: 'gray',
		marginBottom: 5,
	},
});

