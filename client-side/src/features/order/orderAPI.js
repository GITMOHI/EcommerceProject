
export function createOrder(order){
    return new Promise(async(resolve)=>{
        const response = await fetch('http://localhost:8080/orders',{
            method:'POST',
            body: JSON.stringify(order),
            headers:{'content-Type': 'application/json'}
        });
        const data = await response.json();
        resolve({data});
    })
}



// export function fetchAllOrders(pagination){
//     return new Promise(async(resolve)=>{
        
//         let queryStr = "";
//         for(let key in pagination){
//             queryStr += `${key}=${pagination[key]}&`;
//           }
         
//           console.log(String, "=   ", queryStr);
//           console.log('http://localhost:8080/orders?'+queryStr);
    
//           const response = await fetch('http://localhost:8080/orders?'+queryStr);
//           const totalOrders = await response.headers.get('X-Total-Count');

//           const data = await response.json();
//           console.log(response);
//           console.log(data);

//           resolve({data:{orders:data,totalOrders:+totalOrders}});

//     })
// }
export function fetchOrdersById(id){
    return new Promise(async(resolve)=>{
          
        console.log("Fetching",id);
          const response = await fetch('http://localhost:4040/orders/'+id);

          const data = await response.json();
          console.log(response);
          console.log(data);

          resolve({data});

    })
}

//update order...
export function updateOrder(order){
    return new Promise(async(resolve)=>{
        const response = await fetch('http://localhost:8080/orders/'+order.id,{
            method:'PATCH',
            body: JSON.stringify(order),
            headers:{'content-Type': 'application/json'}
        });
        const data = await response.json();
        resolve({data});
    })
}