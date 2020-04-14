// import Service from '../../service/service';

// const service = Service();

export const deleteUser = (id) => {
  // const res = service.deleteUser(id);
  return {
    type: 'DELETE_USER',
    payload: id,
  };
};

export const editUser = ({name, nik, phone, email, id, dateBD}) => {
  const data = {
    id: id,
    name: name,
    username: nik,
    email: email,
    phone: phone,
    dateBD
  };
  // const res = service.editUser(id, data);

  return {
    type: 'EDIT_USER',
    payload: data,
  };
};

export const newUser = ({name, nik, phone, email, dateBD}) => {
  const newUser = {
    name: name,
    username: nik,
    phone: phone,
    email: email,
    id: Date.now().toString(),
    dateBD,
  };

  // const res = this.service.postUser(newUser);

  return {
    type: 'NEW_USER',
    payload: newUser,
  };
};
