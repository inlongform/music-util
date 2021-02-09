const fetch = require('isomorphic-unfetch');

const getData = async (url, params) => {
  console.log(`getData = ${url} ${params}`);
  try {
    const response = await fetch(url, params);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return {
      error: {
        msg: 'error retrieving data',
      },
    };
  }
};

module.exports = getData;
