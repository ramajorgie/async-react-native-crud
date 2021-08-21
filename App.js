import React, {Component} from 'react';
import {TouchableOpacity, View, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isiPEnyimpanan: [],
      arr: [
        {nama: 'rama', alamat: 'sambong'},
        {nama: 'rama1', alamat: 'sambong1'},
        {nama: 'rama2', alamat: 'sambong2'},
        {nama: 'rama3', alamat: 'sambong3'},
        {nama: 'rama4', alamat: 'sambong4'},
        {nama: 'rama5', alamat: 'sambong5'},
      ],
      isidataotomatis: [],
    };
  }

  saveData = async (data, key) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
      console.log('Data Berhasil Disimpan');
    } catch (err) {
      console.log(err);
    }
  };
  getData = async key => {
    let isiPEnyimpanan = await AsyncStorage.getItem(key);
    isiPEnyimpanan = JSON.parse(isiPEnyimpanan);
    if (isiPEnyimpanan !== null) {
      this.setState({isiPEnyimpanan});
      console.log('Data berhasil disimpan :', isiPEnyimpanan);
    } else {
      console.log('Data Kosong');
    }
  };

  updateData = () => {
    let isiPEnyimpanan = this.state.isiPEnyimpanan;
    isiPEnyimpanan[2].nama = 'rama andika jorgie';
    this.saveData(isiPEnyimpanan, '@dataotomatis');
    this.setState({isiPEnyimpanan});
  };

  deleteData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log('Data berhasil dihapus');
      this.setState({isiPEnyimpanan: []});
    } catch (err) {
      console.log('Data gagal dihapus');
    }
  };

  componentDidMount() {
    this.getData('@dataotomatis');
  }

  render() {
    return (
      <View style={{flex:1 ,justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text>{this.state.isiPEnyimpanan}</Text> */}
        <TouchableOpacity
          onPress={() => this.saveData('DATA TERTULIS', '@datamanual')}>
          <Text>SIMPAN DATA MANUAL</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.saveData(this.state.arr, '@dataotomatis')}>
          <Text>SIMPAN DATA OTOMATIS</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.getData('@dataotomatis')}>
          <Text>AMBIL DATA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateData()}>
          <Text>UPDATE DATA</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.deleteData('@dataotomatis')}>
          <Text>DELETE DATA</Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.isiPEnyimpanan}
          keyExtractor={item => item.nama}
          renderItem={({item}) => (
            <View style={{backgroundColor: 'red'}}>
              <Text>{item.nama}</Text>
              <Text>{item.alamat}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default App;
