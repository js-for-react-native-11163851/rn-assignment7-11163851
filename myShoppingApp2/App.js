import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [screen, setScreen] = useState('Home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState('PEE_KAY08');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const loadCart = async () => {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setCart(JSON.parse(cartData));
      }
    };

    fetchProducts();
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = async (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productWrapper} onPress={() => { setSelectedProduct(item); setScreen('ProductDetails'); }}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.addIconContainer} onPress={() => addToCart(item)}>
          <Image source={require('./images/add_circle.png')} style={styles.addIcon} />
          {cart.filter(product => product.id === item.id).length > 0 &&
            <Text style={styles.cartCount}>{cart.filter(product => product.id === item.id).length}</Text>
          }
        </TouchableOpacity>
      </View>
      <Text style={styles.categoryText}>{item.category}</Text>
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productDetails}>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</Text>
    </TouchableOpacity>
  );

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.image }} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.productText}>{item.category}</Text>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productDetails}>{item.description.length > 100 ? `${item.description.substring(0, 100)}...` : item.description}</Text>
      </View>
      <TouchableOpacity style={styles.removeIconContainer} onPress={() => removeFromCart(item)}>
          <Image source={require('./images/remove.png')} style={styles.removeIcon} />
        </TouchableOpacity>
    </View>
  );

  const renderFilterMenu = () => (
    <View style={styles.filterMenu}>
      {['PEE_KAY08', 'Store', 'Locations', 'Blog', 'Jewelry', 'Electronic', 'Clothing'].map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.filterMenuItem, activeFilter === filter && styles.activeFilter]}
          onPress={() => { setActiveFilter(filter); setShowFilterMenu(false); }}
        >
          <Text style={[styles.filterMenuItemText, activeFilter === filter && styles.activeFilterText]}>{filter}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowFilterMenu(!showFilterMenu)}>
          <Image source={require('./images/Menu.png')} style={styles.menu} />
        </TouchableOpacity>
        <Image source={require('./images/Logo.png')} style={styles.logo} />
        <View style={styles.headerIcons}>
          <Image source={require('./images/Search.png')} style={styles.icon} />
          <TouchableOpacity onPress={() => setScreen('Cart')}>
            <Image source={require('./images/shoppingBag.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      {showFilterMenu && renderFilterMenu()}
      {screen === 'Home' ? (
        <ScrollView>
          <View style={styles.productGrid}>
            <FlatList
              data={products}
              numColumns={2}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProduct}
            />
          </View>
          <TouchableOpacity style={styles.viewCartButton} onPress={() => setScreen('Cart')}>
            <Text style={styles.viewCartButtonText}>View Cart</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : screen === 'Cart' ? (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => setScreen('Home')}>
            <Image source={require('./images/navigate.png')} style={styles.navigateIcon} />
          </TouchableOpacity>
          <Image source={require('./images/checkout.png')} style={styles.checkoutimage} />
        <ScrollView>
          <View style={styles.line} />
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCartItem}
          />
        </ScrollView>
        <View style={styles.footer}>
            <Text style={styles.estimatedTotalText}>Est. Total</Text>
            <Text style={styles.totalPriceText}>${cart.reduce((sum, item) => sum + item.price, 0)}</Text>
          </View>
        <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
            <Image source={require('./images/shoppingBag.png')} style={styles.checkoutIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
        <TouchableOpacity onPress={() => setScreen('Home')}>
        <Image source={require('./images/navigate.png')} style={styles.navigateIcon} />
      </TouchableOpacity>
        <ScrollView>
          {selectedProduct && (
            <View style={styles.productDetailsContainer}>
              <Image source={{ uri: selectedProduct.image }} style={styles.productDetailsImage} />
              <View style={styles.productDetailsTextContainer}>
                <Text style={styles.productDetailsName}>{selectedProduct.title}</Text>
                <Image source={require('./images/Export.png')} style={styles.exportIcon} />
              </View>
              <Text style={styles.productDetailsDescription}>{selectedProduct.description}</Text>
              <Text style={styles.productDetailsPrice}>${selectedProduct.price}</Text>
              <Text style={styles.materialTitle}>MATERIALS</Text>
              <Text style={styles.materialDescription}>
                We work with monitoring programmers to ensure compliance with safety, health, and quality standards for our products.
              </Text>
              <View style={styles.instructionsContainer}>
                <Text style={styles.instructionText}><Image source={require('./images/Do_Not_Bleach.png')} style={styles.icon} /> Do not bleach</Text>
                <Text style={styles.instructionText}><Image source={require('./images/Do_not_tumble_dry.png')} style={styles.icon} /> Do not tumble dry</Text>
                <Text style={styles.instructionText}><Image source={require('./images/Do_Not_Wash.png')} style={styles.icon} /> Dry clean with tetrachloroethylene</Text>
                <Text style={styles.instructionText}><Image source={require('./images/Iron_Low_Temperature.png')} style={styles.icon} /> Iron at a maximum of 110°C/230°F</Text>
              </View>
              <View style={styles.borderLine} />
              <View style={styles.shippingInfoContainer}>
                <Image source={require('./images/Shipping.png')} style={styles.shippingInfoIcon} />
                <Text style={styles.shippingInfoText}>Free Flat Rate Shipping</Text>
                <Image source={require('./images/Up.png')} style={styles.upIcon} />
              </View>
              <Text style={styles.deliveryEstimate}>Estimated to be delivered on</Text>
              <Text style={styles.deliveryDates}>09/11/2023 - 14/11/2023</Text>
              <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(selectedProduct)}>
                <Text style={styles.addToCartButtonText}>ADD TO BASKET</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    marginTop: 50,
  },
  menu: {
    width: 30,
    height: 30,
  },
  logo: {
    width: 170,
    height: 70,
    marginLeft: 50,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 10,
  },
  navigateIcon: {
    width: 24,
    height: 24,
    marginTop: -60,
    marginLeft: 70,
  },
  exportIcon: {
    marginRight: 10,
  },
  checkoutimage: {
    width: 190,
    height: 70,
    marginLeft: 130,
  },
  productGrid: {
    padding: 10,
  },
  productWrapper: {
    flex: 1,
    padding: 10,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  addIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    width: 30,
    height: 30,
    marginTop:100,
    
  },
  cartCount: {
    marginLeft: 5,
    backgroundColor: 'black',
    color: 'white',
    borderRadius: 10,
    padding: 5,
    marginTop:100,
    marginRight: -20,
  },
  categoryText: {
    fontSize: 14,
    color: '#000',
    marginVertical: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 18,
    color: 'red',
    marginVertical: 5,
  },
  productDetails: {
    fontSize: 14,
    color: '#000',
    marginVertical: 5,
  },
  cartItemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cartItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productText: {
    fontSize: 14,
    color: '#000',
    marginVertical: 5,
    
  },
  productDetailsName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  productDetailsDescription: {
    fontSize: 18,
    color: '#000',
    marginVertical: 5,
  },
  productDetailsPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 10,
  },
  materialTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  materialDescription: {
    fontSize: 18,
    color: '#000',
    marginVertical: 5,
  },
  instructionsContainer: {
    marginVertical: 10,
  },
  instructionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
  },
  borderLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  shippingInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingInfoIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  upIcon: {
    marginLeft: 180,
  },
  shippingInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: -3,
  },
  deliveryEstimate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
    marginLeft: 30,
  },
  deliveryDates: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 5,
    marginLeft: 30,
  },
  addToCartButton: {
    backgroundColor: '#000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  removeIconContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  removeIcon: {
    width: 24,
    height: 24,
  },
  viewCartButton: {
    backgroundColor: '#000',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  viewCartButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    textAlign: 'center',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  estimatedTotalText: {
    fontSize: 16,
    color: '#000',
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
  },
  checkoutButton: {
    backgroundColor: '#000',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  checkoutIcon: {
    width: 24,
    height: 24,
  },
  productDetailsContainer: {
    padding: 10,
  },
  productDetailsImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  productDetailsTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterMenu: {
    position: 'absolute',
    top: 150,
    left: 0,
    right: 0,
    width: '50%',
    backgroundColor: '#FFF',
    zIndex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  filterMenuItem: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  filterMenuItemText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  activeFilter: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
    borderBottomEndRadius: 50,
  },
});

export default App;

  

