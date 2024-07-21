import { Product } from "../../app/models/product";

interface Props {
  products: Product[];
  addProduct: () => void;
}

const Catalog = ({products, addProduct}: Props) => {
  return (
    <>
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
            products.map((product) => (
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
  </>
  )
};

export default Catalog;
