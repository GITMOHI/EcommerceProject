//register user...
export async function signupUser(userInfo) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Signup failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}


//change password...
export async function changePassword(dataPass) {
  
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/change_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPass),
      credentials:'include',

    });
    console.log('data = ', dataPass);
    const resPonsedata = await response.json();
    console.log("pass change response = ",resPonsedata);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Password changed failed");
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
}


//update...
export async function updateUser(userInfo, userId) {
  try {
    console.log(userId);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "update failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

// loginUser.js
export async function loginUser(userInfo) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
    

    const data = await response.json();
    localStorage.setItem('user', JSON.stringify(data));

    return data;
  } catch (error) {
    throw error;
  }
}

//fetch LoggedIn User...
export function fetchLoggedInUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/loggeduser`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log("api", data);
    resolve({ data });
  });
}


//fecth loggedInUsers  activity
export function fetchLoggedInUserActivity(){
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/loggeduserActivity`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log("activities-----> : ", data);
    resolve({ data });
  });
}


//logout user...
export function logoutUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      resolve({ data });
    }
  });
}


//add address for user....
export function addAddress(addressData,userId) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/add-address/`+userId, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addressData),
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      resolve({ data });
    }
  });
}
// //delete address for user....
// export function deleteAddress(addressData,userId) {
//   return new Promise(async (resolve) => {
//     const response = await fetch("${process.env.REACT_APP_API_URL}/users/add-address/"+userId, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(addressData),
//     });
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       resolve({ data });
//     }
//   });
// }


// admin...............
  // login Admin....js
  export async function loginAdmin(userInfo) {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/admin-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Admin Login failed");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
