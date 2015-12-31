'use strict';

export function login(username, password) {
  let valid;

  if (username !== 'admin' || password !== 'radical') {
    valid = false;
    console.log(`incorrect login for: ${username}`);
  } else {
    console.log(`successful login for: ${username}`);
    valid = true;
  }
}
