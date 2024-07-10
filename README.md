# rn-assignment7-11163851
rn-assignment7-11163851 project

React Native Shopping App

This is a React Native shopping app that showcases a product list and a shopping cart functionality. The app fetches product data from an API, displays products in a grid, and allows users to add products to their cart. The cart data is persisted using AsyncStorage.

Features
Home Screen: Displays a list of products fetched from the API.

Product Details Screen: Shows detailed information about a selected product.

Cart Screen: Displays the products added to the cart and allows users to remove items.

Persistent Cart: Uses AsyncStorage to persist cart data between app sessions.

Filter Menu: Allows users to filter products by category (sample filter categories included).

Navigation: Navigate between Home, Product Details, and Cart screens.

Design Choices
User Interface
Grid Layout: The Home screen uses a grid layout to display products, making efficient use of screen space and providing a visually appealing interface.

Product Cards: Each product is displayed as a card with an image, title, category, price, and description. The "Add to Cart" icon is prominently placed to facilitate easy addition to the cart.

Navigation Icons: Included navigation icons to allow users to move between screens easily.

Data Fetching
API Integration: Used axios to fetch product data from a sample API. This demonstrates how to integrate external data sources into the app.

Data Storage
AsyncStorage: Implemented AsyncStorage to persist cart data. This ensures that the cart contents are saved even if the app is closed or the device is restarted.

Implementation Details
Screens and Navigation
Home Screen: Displays a list of products in a grid. Each product can be clicked to navigate to the Product Details screen. A button to view the cart navigates to the Cart screen.
Product Details Screen: Shows detailed information about the selected product, including an option to add the product to the cart.
Cart Screen: Displays the items added to the cart, along with their details and the total price. Users can remove items from the cart.
Adding and Removing Items from Cart
Add to Cart: When a user clicks the "Add to Cart" icon on a product card or the "Add to Basket" button on the Product Details screen, the product is added to the cart. The cart is then saved to AsyncStorage.
Remove from Cart: Users can remove items from the cart by clicking the remove icon. The cart is updated and saved to AsyncStorage.
Persisting Cart Data
Loading Cart: When the app initializes, it loads the cart data from AsyncStorage to maintain the user's cart across sessions.
Saving Cart: Whenever the cart is updated (item added or removed), the new cart state is saved to AsyncStorage.


Conclusion:
This app provides a basic structure for a Shopping application with product listing, detailed product view, and cart functionality. It demonstrates how to fetch data from an API, manage state with React hooks, and persist data using AsyncStorage. The design focuses on a clean and intuitive user experience, with easy navigation and seamless cart management.

![homepage](https://github.com/js-for-react-native-11163851/rn-assignment7-11163851/assets/170243660/55b4dbca-a342-4b3c-bf41-d5d39cea6f5c)

![homepage1](https://github.com/js-for-react-native-11163851/rn-assignment7-11163851/assets/170243660/afe932da-dddf-44fa-a03d-2cd73c3fe29d)

![productdetails](https://github.com/js-for-react-native-11163851/rn-assignment7-11163851/assets/170243660/2021e618-0269-4641-921d-12c2e698c587)

![productdetails1](https://github.com/js-for-react-native-11163851/rn-assignment7-11163851/assets/170243660/e7266095-9f22-4c6f-93c9-c11eac8880f7)

![cartpage](https://github.com/js-for-react-native-11163851/rn-assignment7-11163851/assets/170243660/3cac3499-6f5c-427e-9b06-2878b4b64a2e)


