import { useEffect, useState } from "react"
import { Product } from "../models/product";

function App() {
  const[products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/Product')
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  function addProduct(){
    setProducts(prevState => [...prevState, 
      { 
        id: prevState.length + 101, 
        name: 'product' + (prevState.length + 1), 
        price: (prevState.length * 100) + 100,
        brand: 'example brand',
        description: 'sample descrition',
        pictureUrl: 'http://picsum.photos/200'
      }])
  }
  
  return (
    <div>
      <h1>Re-Store</h1>
      <table>
        <thead>
          <tr>
            <td>Product Name</td>
            <td>Price</td>
            <td>Brand</td>
            <td>Description</td>
            <td>Picture URL</td>
            <td>Type</td>
            <td>Unit(s) in Stock</td>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.brand}</td>
                <td>{product.description}</td>
                <td>{product.pictureUrl}</td>
                <td>{product.type}</td>
                <td>{product.quantityInStock}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <button onClick={addProduct}>Add product</button>
    </div>
  )
}

export default App
