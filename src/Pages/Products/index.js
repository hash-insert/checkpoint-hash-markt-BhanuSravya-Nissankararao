import React, { useEffect } from "react";
import { useProduct } from "../../Context/ProductContext";
import styles from "./styles.module.css";
import Spinner from "../../Components/Spinner";
import { useParams } from "react-router-dom";
import { useCart } from '../../Context/CartContext'
import { useFavorite } from '../../Context/FavoriteContext'
import Card from "../../Components/Card";

const Products = () => {
  const { addToCart, items } = useCart()
  const { addToFavorite, favoriteItems } = useFavorite()

  const { productList, loading, setProductID, setCategory } = useProduct();

  const { category_id } = useParams()

  useEffect(() => {
    setCategory(category_id)
  }, [category_id])

  return (
    <div className={styles.cardGroup}>
      {!loading ? (
        productList.length > 0 ? productList.map((product) => {
          const findCartItem = items.find((item) => item.id === product.id);
          const findFavoriteItem = favoriteItems.find((item) => item.id === product.id);
          return (
            <Card
              key={product.id}
              item={product}
              addToCart={() => addToCart(product, findCartItem)}
              addToFavorite={() => addToFavorite(product, findFavoriteItem)}
              findCartItem={Boolean(findCartItem)}
              findFavoriteItem={Boolean(findFavoriteItem)}
            />
          );
        }) : <p>No products available</p>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Products;