import "./Card.css";
export default function Card({
  from,
  item,
  addOrRemoveFromList,
  addOrRemovefromCart,
  removeProduct,
  editProduct
}) {
  return (
    <div className="card-container">
      <h3 className="price-tag">Rs:{item.price}</h3>
      {from == "home" && (
        <div className="card-footer">
          <div className="pl pr icons" onClick={() => editProduct(item)}>
            <img src="./assets/edit.png" alt="editbtn" />
          </div>
          <div
            className="pl icons"
            onClick={() => {
              removeProduct(item);
            }}
          >
            <img src="./assets/delete.png" alt="delete" />
          </div>
        </div>
      )}
      <h3>{item.name}</h3>
      <div className="image-container">
        <img src={item.image} alt="product-image" />
      </div>

      <div className="card-footer mt">
        <div className="pr pl flex rating"> Rating: {item.rating} </div>
        <div className="pr pl flex">
          {item.cartCount > 0 && (
            <div
              className="icons"
              onClick={() => addOrRemovefromCart(item, "remove")}
            >
              <img src="./assets/minus.png" alt="minusbtn" />
            </div>
          )}
          <div className="icons">
            <img src="./assets/shopping-cart.png" alt="cartbtn" />
          </div>
          {item.cartCount > 0 && (
            <div className="item-count">{item.cartCount}</div>
          )}
          <div
            className="icons"
            onClick={() => addOrRemovefromCart(item, "add")}
          >
            <img src="./assets/plus.png" alt="plusbtn" />
          </div>
        </div>
        <div className=" pl flex" onClick={() => addOrRemoveFromList(item)}>
          {item.isWishlist ? (
            <div className="icons">
              <img src="./assets/heart.png" alt="wishlistbtn" />
            </div>
          ) : (
            <div className="icons">
              <img src="./assets/wishlist.png" alt="wishlistbtn" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
