//fetch all users..
export function fetchTotalUsers(filter) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4040/admin/totalUsers");
    const data = await response.json();
    console.log(data);
    resolve({ data });
  });
}

export function fetchAllOrders() {
  console.log('here')
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4040/admin/AllOrders");

    const data = await response.json();
    resolve({ data });
  });
}
export function fetchMonthlyUsers() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4040/admin/getMonthlyUsers");

    const data = await response.json();
    resolve({ data });
  });
}
export function fetchMonthlyRevenue() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4040/admin/getMonthlyRevenue");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchOrdersByCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4040/admin/getOrdersByCategory");
    const data = await response.json();
    resolve({ data });
  });
}
