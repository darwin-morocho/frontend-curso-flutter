const axios = require('axios');

export const login = async ({ email, password }) => {
  try {
    const res = await axios({
      url: `${process.env.REACT_APP_API_HOST}/api/v1/login`,
      method: 'post',
      data: {
        email,
        password,
      },
    });
    console.log('login', res.data);
    return res.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.message);
    }
    return null;
  }
};

export const logout = async () => {};
