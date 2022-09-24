const filterBy = [
  { id: 1, value: "High Price" },
  { id: 2, value: "Low Price" },
  { id: 3, value: "Highest Rating" }
];

const category = [
  { id: 1, value: "Beauty" },
  { id: 2, value: "Kitchen" },
  { id: 3, value: "Electronics" }
];

const product = [
  {
    key: 2,
    name: "Shampoo",
    image:
      "https://thumbs.dreamstime.com/b/jakarta-indonesia-august-white-pantene-shampoo-bottle-isolated-background-226032259.jpg",
    category: "Beauty",
    rating: 5,
    description:
      "It is the best organic shampoo that promotes hair growth and makes hair strong and shiny. Holy Cow’s 100% Natural Shampoo is made with a blend of different Indian herbs",
    isWishlist: false,
    cartCount: 0,
    price: 10
  }
];
export { filterBy, category, product };
