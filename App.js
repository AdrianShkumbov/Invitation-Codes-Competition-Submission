
import { useReferralCodes } from './use-referral-codes'
import React, { useState, PureComponent } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, Modal, Image, Linking } from 'react-native';


export default function App() {
  const { data, error, isLoading } = useReferralCodes()
  
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  
  const [search, setSearch]  = useState('');
  
  const [desc, setDesc]  = useState('');
  const [code, setCode]  = useState('');
  const [app, setApp]  = useState('');

  const [descs, setDescs] = useState([]);
  const [codes, setCodes] = useState([]);
  const [apps, setApps] = useState([]);
  
  const [message, setMessage] = useState('');

  if (error) return <Text style={{marginTop: 50}}>Error! {error}</Text>

  if (isLoading) return <Text style={{marginTop: 50}}>Loading...</Text>


  const searchHandler = (enteredText) => {
    setSearch(enteredText)
  };

  const DescInputHandler = (enteredText) =>{
    setDesc(enteredText)
  };

  const CodeInputHandler = (enteredText) =>{
    setCode(enteredText)
  };

  const AppInputHandler = (enteredText) => {
    setApp(enteredText)
  };

  const addHandler = () => {
    if(desc.length > 0 && code.length > 0 && app.length > 0){
      setIsVisible(false)

      setDescs(descs => [...descs, desc]);
      setCodes(codes => [...codes, code]);
      setApps(apps => [...apps, app]);
    }

    else{
      setMessage("*Please fill in all fields*");
    }
  }

  function Merge () {
    var DummyCodesList = Array(descs.length);

    for(let i = 0; i < descs.length; i++){
      
      DummyCodesList[i] = Array(3);

      DummyCodesList[i][0] = descs[i]
      DummyCodesList[i][1] = codes[i]
      DummyCodesList[i][2] = apps[i]
    }
  
    console.log(DummyCodesList);
    return(DummyCodesList);
  }

  function searchFilter() {
    var listOfCodes = Object.values(data.prods)

    if(search == '' || search == ' '){
      return listOfCodes
    }

    else{
      var filteredData = [];
      
      for(let i = 0; i < listOfCodes.length; i++){
        if((listOfCodes[i].slug).includes(search.toLowerCase())){
          filteredData.push(listOfCodes[i]);
        }
      }
      
      return filteredData
    }
  }

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.title}>
          <Image style={styles.logo} source={{ uri: 'https://www.saashub.com/images/app/service_logos/137/uw6iibl4ic2m/large.png?1582599970' }}/>
          <View style={styles.menu}>
            <View style={styles.menuBtn}>
              <Button color="#2d579c" title="Add a Code" onPress={() => {setIsVisible(true); setMessage('')}}/>
            </View>
            
            <View style={styles.menuBtn}>
              <Button color="#2d579c" title="My Codes" onPress={() => {setIsVisible2(true)}}/>
            </View>
          </View>
        </View>
        
        <View>
          <TextInput style={styles.searchBar} placeholder="Enter a Business..." onChangeText={searchHandler} value={search} />
        </View>

        <Modal visible={isVisible} animationType="slide">
          <Button color="red" title="Go Back" onPress={() => {setIsVisible(false)}}/>
          <Text style={styles.info}>{message}</Text>
          <TextInput placeholder="Brief Description" style={styles.inputField} onChangeText={DescInputHandler} value={desc}/>
          <TextInput placeholder="URL" style={styles.inputField} onChangeText={CodeInputHandler} value={code}/>
          <TextInput placeholder="Added Via // App or Website" style={styles.inputField} onChangeText={AppInputHandler} value={app} />
          <View style={styles.addBtn}>
            <Button color="green" title="Add" onPress={addHandler}/>
          </View>
        </Modal>
        
        <Modal visible={isVisible2} animationType="slide">
          <View style={styles.background}>
            <Button color="red" title="Go Back" onPress={() => {setIsVisible2(false)}}/>
            <FlatList
              data = {Merge()}
              keyExtractor={(item) => item[0]}
              renderItem={({item}) => {
                return (
                  <View style={styles.dummyFeedEntry}>
                    <Text>{item[2]}</Text>
                    <Text style={styles.reward}>You can get: {item[0]}</Text>
                    <Text style={styles.link} onPress={() => Linking.openURL(item[1])} >See More</Text>
                  </View>
                )
              }}
            />
          </View>
        </Modal>

        <FlatList
          data={searchFilter()}
          keyExtractor={(item) => item.slug}
          
          renderItem={({item}) => {
            return (
              <View style={styles.feedEntry}>
                <Text>{item.name}</Text>
                <Text style={styles.reward}>You can get: {item.theyGet}</Text>
                <Text style={styles.link} onPress={() => Linking.openURL(item.urlAbsolute)}>See More</Text>
                <Image resizeMode="contain" style={styles.feedlogo} source={{ uri: item.icon }}/>
              </View>
            )
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  background:{
    backgroundColor: '#87ceeb',
    height: '100%',
  },

  container:{
    marginHorizontal: 20,
  },

  title: {
    marginTop: 50,
    backgroundColor: 'orange',
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  sideText: {
    fontSize: 19,
  },

  searchBar: {
    paddingVertical: 5,
    paddingLeft: 15,
    width: "100%",
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    backgroundColor: "white"
  },

  feedEntry:{
    marginBottom: 10,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },

  dummyFeedEntry:{
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
  },

  logo: {
    height: 100,
    width: 100,
  },

  reward: {
    textAlign: "center",
    marginVertical: 20,
  },

  link: {
    color: "#0645AD",
    borderBottomColor: "#0645AD",
    borderBottomWidth: 2,
  },

  feedlogo: {
    width: 55,
    height: 55,
    position: "absolute",
    top: 2,
    right: 15,
  },

  menu: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
    width: "50%"
  },

  menuBtn: {
    width: "100%",
    marginVertical: 5,
    borderRadius: 10,
    padding: 5,
    backgroundColor: "#121275",
  },

  inputField: {
    paddingLeft: 10,
    paddingBottom: 70,
    borderWidth: 2,
    borderColor: 'grey',
    borderStyle: "dotted",
    marginHorizontal: 30,
    marginTop: 50,
    borderRadius: 10,
  },

  addBtn: {
    marginTop: 40,
    marginHorizontal: 30,
    justifyContent: "center",
  },

  info: {
    textAlign: "center",
    marginTop: 10,
    color: "red",
  },

});
