// done to prevent redux-form. Required module not found
// read more here: https://github.com/facebook/flow/issues/2092
// remove whenredux-form resolved this issue

declare module 'redux-form' {
  declare module.exports: any;
}
