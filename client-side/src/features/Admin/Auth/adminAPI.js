//fetch all users..
export function fetchTotalUsers(filter) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/totalUsers`);
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchAllOrders() {
  console.log('here')
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/AllOrders`);

    const data = await response.json();
    resolve({ data });
  });
}
export function fetchMonthlyUsers() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/getMonthlyUsers`);

    const data = await response.json();
    resolve({ data });
  });
}
export function fetchMonthlyRevenue() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/getMonthlyRevenue`);
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchOrdersByCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/getOrdersByCategory`);
    const data = await response.json();
    resolve({ data });
  });
}
