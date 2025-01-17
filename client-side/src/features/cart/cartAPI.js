export function addToCart(item) {
    return new Promise(async (resolve) => {
      console.log("item = ", item);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        method: "POST",
        body: JSON.stringify(item),
        headers: { "content-type": "application/json" },
      });
  
      const data = await response.json();
      console.log(data);
      resolve({ data });
    });
  }
  
  export function fetchItemsByUserId(userId) {
    return new Promise(async (resolve) => {
      console.log("userId = ", userId);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/` + userId);
      const data = await response.json();
      console.log("users cart", data);
      resolve({ data });
    });
  }
  
  export function updateItem(update) {
    return new Promise(async (resolve) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/` + update.id, {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data });
    });
  }
  
  //deleting single item from cart...
  export function deleteItemFromCart(ItemId) {
    return new Promise(async (resolve) => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/cart/` + ItemId, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });
      const data = await response.json();
      resolve({ data: { id: ItemId } });
    });
  }
  
  //when order is placed,,then we need to remove items form the cart...
  export function resetCart(userId) {
    return new Promise(async (resolve) => {
      //get all the cart items of the user..
      const response = await fetchItemsByUserId(userId);
      const items = response.data;
      console.log("at cart",items);
  
      for(let idx in items){
         deleteItemFromCart(items[idx].id);    
      }
  
      resolve({status:'ResetSuccess'})
    });
  }
  