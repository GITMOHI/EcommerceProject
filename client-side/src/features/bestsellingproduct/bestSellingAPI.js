
//best selling products 
export function fetchBestSellings() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:4040/products/bestSellers");
    const data = await response.json();
    resolve({data});
  });
}
