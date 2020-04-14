import React from 'react';
import {View, StyleSheet, Text, TextInput, Button} from 'react-native';
import DatePicker from '../components/DatePicker';
import {TextInputMask} from 'react-native-masked-text';
import ValidationComponent from 'react-native-form-validator';
import {connect} from 'react-redux';
import {newUser, editUser} from '../store/actions/user-actions';

class NewUserScreen extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nik: '',
      phone: '',
      email: '',
      id: null,
      show: false,
      dateBD: null,
    };
  }

  componentDidMount() {
    if (this.props.route.params.edit) {
      this.props.navigation.setOptions({
        title: 'Edit',
      });
      const {
        name,
        username,
        phone,
        email,
        id,
        dateBD,
      } = this.props.route.params;
      this.setState({
        name: name,
        nik: username,
        phone: phone,
        email: email,
        id: id,
        dateBD,
      });
    }
  }

  _onPressButton() {
    this.validate({
      name: {minlength: 3, maxlength: 60, required: true},
      nik: {minlength: 3, maxlength: 60, required: true},
      email: {email: true},
    });
  }

  getDate = date => {
    return this.setState({dateBD: date});
  };

  showDatepicker() {
    this.setState({
      show: !this.state.show,
    });
  }

  renderForm() {
    return (
      <>
        <Text style={styles.text}>Name</Text>
        <TextInput
          ref="name"
          style={styles.input}
          multiline
          editable
          textContentType={'name'}
          onChangeText={text => this.setState({name: text})}
          value={this.state.name}
        />
        <Text style={styles.text}>User name</Text>
        <TextInput
          ref="user name"
          style={styles.input}
          multiline
          editable
          textContentType={'username'}
          onChangeText={text => this.setState({nik: text})}
          value={this.state.nik}
        />
        <Text style={styles.text}>Phone</Text>
        <TextInputMask
          style={styles.input}
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '0',
          }}
          value={this.state.phone}
          onChangeText={text => {
            this.setState({
              phone: text,
            });
          }}
        />

        <Text style={styles.text}>Email</Text>
        <TextInput
          ref="email"
          style={styles.input}
          multiline
          editable
          textContentType={'emailAddress'}
          onChangeText={mail => this.setState({email: mail})}
          value={this.state.email}
        />
        <Text style={styles.text}>Date birthday</Text>
        <View style={styles.birthday}>
          <Text style={styles.inputBirthday}>{this.state.dateBD}</Text>
          <Button
            onPress={() => this.showDatepicker()}
            title="Show date picker!"
          />
        </View>
        <Text>{this.getErrorMessages()}</Text>
        <DatePicker getDate={this.getDate} show={this.state.show} />
      </>
    );
  }

  render() {
    const {name, nik, phone, email, id, dateBD} = this.state;
    if (this.props.route.params.edit) {
      return (
        <View style={styles.container}>
          {this.renderForm()}
          <Button
            title="Edit"
            onPress={() => {
              this._onPressButton();
              if (this.isFormValid() === true) {
                this.props.editUser({name, nik, phone, email, id, dateBD});
                this.props.navigation.navigate('Home');
              }
            }}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.renderForm()}
          <Button
            title="Create"
            onPress={() => {
              this._onPressButton();
              if (this.isFormValid() === true) {
                this.props.addUser({name, nik, phone, email, dateBD});
                this.props.navigation.navigate('Home');
              }
            }}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.95,
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 20,
  },
  input: {
    width: '95%',
    height: 'auto',
    padding: 5,
    margin: 5,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
  },
  birthday: {
    flex: 0.35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBirthday: {
    width: '50%',
    height: 30,
    padding: 5,
    margin: 5,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#000',
  },
});

const mapDispatchToProps = dispatch => {
  return {
    addUser: data => dispatch(newUser(data)),
    editUser: data => dispatch(editUser(data)),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(NewUserScreen);
