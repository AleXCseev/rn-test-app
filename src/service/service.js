export default class Service {
  _apiBase = 'https://jsonplaceholder.typicode.com/users/';
  async getResource(url) {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recevied ${res.status}`);
    }

    return await res.json();
  }
  async putResource(url, data, method) {
    const res = await fetch(url, {
      method: method,
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recevied ${res.status}`);
    }

    return await res.json();
  }

  async deleteELResurce(url) {
    const res = await fetch(url, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recevied ${res.status}`);
    }

    return await res.json();
  }
  getAllUsers() {
    return this.getResource(this._apiBase);
  }

  editUser(id, data) {
    return this.putResource(`${this._apiBase}${id}`, data, 'PUT');
  }

  deleteUser(id) {
    return this.deleteELResurce(`${this._apiBase}${id}`);
  }

  postUser(data) {
    return this.putResource(`${this._apiBase}`, data, 'POST');
  }
}
