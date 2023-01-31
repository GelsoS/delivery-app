import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestLogin = async (email, password) => {
  const { data } = await axios.post('http://localhost:3001/login', {
    email,
    password,
  });

  console.log('LOGIN', data);
  return data;
};

export const requestCreate = async (body) => {
  let data;
  try {
    data = await axios.post('http://localhost:3001/register', body);
    return data;
  } catch (error) {
    return { data, message: 'usuario cadastrado', status: 409 };
  }
};

export const requestProducts = async () => {
  const { data } = await axios.get('http://localhost:3001/customer/products');
  return data;
};

export const requestSalesID = async (token, body) => {
  let data;
  try {
    data = await axios.post(
      'http://localhost:3001/sales',
      {
        userId: body.userId,
        total_price: body.totalPrice,
        delivery_address: body.addressCustomer,
        delivery_number: body.numberAddress,
      },
      { headers: { Authorization: token } },
    );
    return data;
  } catch (error) {
    return { data, message: 'venda falhou', status: 409 };
  }
};
export const requestUserData = async () => {
  let data;
  try {
    data = await axios.get('http://localhost:3001/register');
    return data;
  } catch (error) {
    return { message: 'falou a requisição', status: 409 };
  }
};

export default api;
