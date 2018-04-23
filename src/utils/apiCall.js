// @flow
import request from 'superagent';

// TODO: all review this

export async function post(url: string, data: {}) {
  return new Promise((resolve, reject) => {
    request
      .post(url)
      .send(data)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        if (err || !res.ok) {
          let message = 'Unknown server error';
          if (err.response) {
            message = `${err.status} server error. ${err.response.text || ''}`;
            console.log(message);
            reject(message);
          } else {
            console.log(err);
            reject(message);
          }
        } else {
          resolve(res);
        }
      });
  });
}
export default async function get(url: string) {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.ok) {
          let message = 'Unknown server error';
          if (err.response) {
            message = `${err.status} server error. ${err.response.text || ''}`;
            // eslint-disable-next-line no-console
            console.log(message);
            reject(message);
          } else {
            // eslint-disable-next-line no-console
            console.log(err.response);
            reject(message);
          }
        } else {
          resolve(res);
        }
      });
  });
}
