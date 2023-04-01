import React, {Component} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {SearchBar, Button, ListItem} from 'react-native-elements';
import {styles, primaryColor} from '../assets/styles/Style';

class HomeScreen extends Component {
    
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      data: [],
      error: null,
      loading: false,
    };
  }

  search = async () => {
    const url = `${BASE_URL}/auth/dis-info?pwdCode=` + this.state.search;
    this.setState({loading: true});
    fetch(url, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.country,
          error: res.error || null,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({error, loading: false});
      });
  };

  renderSearch = () => {
    return this.state.data.map(item => {
      return (
        <View>
          <Text>{item.name}</Text>
        </View>
      );
    });
  };

  renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        requestAnimationFrame(() =>
          this.props.navigation.navigate('Description', {
            title: item.title,
            imageName: item.image_url,
            synopsis: item.synopsis,
            episodes: item.episodes,
            rated: item.rated,
          }),
        )
      }>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>{item.title}</ListItem.Title>
          <ListItem.Subtitle
            style={{color: '#000', textTransform: 'uppercase'}}>
            country: {item.country_id}
          </ListItem.Subtitle>
          <ListItem.Subtitle
            style={{color: '#9D7463', textTransform: 'capitalize'}}>
            probability: {item.probability}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.searchContainer}>
        <StatusBar barStyle="light-content" backgroundColor={primaryColor} />
        <View style={styles.search}>
          <SearchBar
            containerStyle={{width: '70%', height: 80, backgroundColor: '#fff'}}
            placeholder="Search name"
            lightTheme
            platform="ios"
            autoFocus={true}
            showLoading={false}
            autoCorrect={false}
            value={this.state.search}
            onChangeText={search => this.setState({search})}
          />
          <Button
            buttonStyle={{backgroundColor: primaryColor, padding: 5}}
            title="search"
            onPress={() => this.search()}
          />
        </View>

        {this.state.loading ? (
          <ActivityIndicator
            style={{
              position: 'absolute',
              flexDirection: 'row',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              marginTop: 0,
            }}
            size="large"
            color="#0275d8"
          />
        ) : (
          <FlatList
            style={{flex: 1}}
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.country_id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        )}

      </View>
    );
  }
}

export default HomeScreen;
