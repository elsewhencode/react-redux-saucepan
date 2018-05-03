// @flow

export default function log(info: {} | string = 'Empty message') {
  const messageToLog =
    typeof info === 'object' ? JSON.stringify(info, null, 2) : info;

  // server and in production or staging maybe you want a propper logging here
  // https://blog.risingstack.com/node-js-logging-tutorial/
  if (__SERVER__ && !__DEVELOP__) {
    // eslint-disable-next-line no-console
    console.log(messageToLog);
  }
  // eslint-disable-next-line no-console
  console.log(messageToLog);
}
