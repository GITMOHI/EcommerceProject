// A mock function to mimic making an async request for data
export function fetchAllProducts(filter) {
    return new Promise(async (resolve) => {

      let queryStr = '';
      for(let key in filter){
        queryStr += `${key}=${filter[key]}&`;
      }
      // for(let key in pagination){
      //   queryStr += `${key}=${pagination[key]}&`;
      // }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/products?`+queryStr);
      const data = await response.json();
      console.log(data);
      resolve({data});
    });
  }


  

  export function fetchProductById(id) {
    return new Promise(async(resolve) =>{
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/`+id);
      const data = await response.json();
      resolve({data})
  
      
    });
  }
  
  export function fetchCategories() {
    return new Promise(async(resolve) =>{
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
      const data = await response.json();
      resolve({data})
  
      
    });
  }

  export function fetchBrands() {
    return new Promise(async(resolve) =>{
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/brands`);
      const data = await response.json();
      resolve({data})
  
      
    });
  }

  export function fetchNewArrivals() {
    return new Promise(async(resolve) =>{
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/new_arrivals`);
      const data = await response.json();
      resolve({data})
  
      
    });
  }

