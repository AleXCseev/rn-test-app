import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import {deleteUser} from '../store/actions/user-actions';

const Card = props => {
  const {info, goToEdit, deleteUsers} = props;
  const {name, username, phone, email, id, dateBD} = info;
  const d = new Date();
  const curr_date = d.getDate();
  const curr_month = d.getMonth() + 1;
  const curr_year = d.getFullYear();
  const curr_hours = d.getHours();
  const curr_minutes = d.getMinutes();
  const dateUpd = `${curr_date}.${curr_month}.${curr_year} ${curr_hours}:${curr_minutes}`;
  const data = {...info, edit: true};

  const renderDateBD = () => {
    if (dateBD) {
      return <Text style={styles.name}>Date birthday: {dateBD}</Text>;
    } else {
      return <Text style={styles.name}>Date bd: -------</Text>;
    }
  };
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => goToEdit(data)}>
      <View style={styles.container}>
        <Text style={styles.name}>Name: {name}</Text>
        <Text style={styles.name}>User name: {username}</Text>
        <Text style={styles.name}>Phone {phone}</Text>
        <Text style={styles.name}>Email: {email}</Text>
        <Text style={styles.name}>Date upd: {dateUpd}</Text>
        {renderDateBD()}
        <View style={styles.button}>
          <Button title="Go to edit" onPress={() => goToEdit(data)} />
          <Button title="Delete" onPress={() => deleteUsers(id)} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#95a5a6',
    shadowColor: '#2c3e50',
    shadowOpacity: 0.7,
    shadowRadius: 5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  name: {
    fontSize: 16,
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    deleteUsers: id => dispatch(deleteUser(id)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Card);
