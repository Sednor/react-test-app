const HEADERS = {
  'Content-Type': 'application/json',
  'X-Auth-Token': '123123123123'
};

export default {
  get(path) {
    return fetch(path, { credentials: 'same-origin', headers: HEADERS });
  },

  post(path, data) {
    return fetch(path, {
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(data),
      headers: HEADERS
    });
  },

  put(path, data) {
    return fetch(path, { credentials: 'same-origin', method: 'PUT', body: JSON.stringify(data), headers: HEADERS });
  },

  delete(path, data) {
    return fetch(path, {
      credentials: 'same-origin',
      method: 'DELETE',
      body: JSON.stringify(data),
      headers: HEADERS
    });
  }
};
