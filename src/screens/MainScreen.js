import React from 'react';
import {View, StyleSheet, FlatList, Button} from 'react-native';
import Card from '../components/Card';
import {connect} from 'react-redux';
import Loader from '../components/Loader';

const MainScreen = (props) => {
  const {users, navigation} = props;
  const goToEdit = (params) => navigation.navigate('New user', params);
  navigation.setOptions({
    headerRight: () => (
      <Button
        onPress={() =>
          navigation.navigate('New user', (params = {edit: false}))
        }
        title="New user"
        color="#000"
      />
    ),
  });

  if (users.loading) {
    return <Loader></Loader>;
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={users.data}
          renderItem={({item}) => {
            return <Card info={item} goToEdit={goToEdit}></Card>;
          }}></FlatList>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.user,
  };
};

export default connect(mapStateToProps)(MainScreen);
