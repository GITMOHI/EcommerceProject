
//best selling products 
export function fetchBestSellings() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/products/bestSellers`);
    const data = await response.json();
    resolve({data});
  });
}
