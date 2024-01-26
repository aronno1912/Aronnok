const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require("../models/order");
exports.getCartById = (req, res, next, id) => {
    Cart.findOne({ user: id })
        .exec()
        .then((cart) => {
            req.cart = cart;
            // pass control to the next middleware or route handler in the sequence
            next();
        })
        .catch((err) => {
            // Handle errors here
            console.error(err);
            res.status(500).json({
                error: "Internal Server Error",
            });
        });
};

exports.addToCart = async (req, res) => {
    try {
        // Add to cart logic
        // ...
        const userId = req.params.userId;
        const productId = req.params.productId;
        const product = await Product.findById(productId);
        var cart = req.cart;
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        if (!cart) {
            cart = new Cart({
                user: userId,
                // other required fields if any
            });
            cart.items.push({
                product: productId,
                quantity: 1,
                selected: false,
            });
            // cart.total += product.price;
            console.log(cart);
        }
        else {
            const existingItem = cart.items.find((item) => item.product.equals(product._id));
            if (existingItem) {
                // If the product is already in the cart, update the quantity
                existingItem.quantity += 1;
            } else {
                // If the product is not in the cart, add a new item
                cart.items.push({
                    product: product._id,
                    quantity: 1,
                    selected: false,
                });
            }
            // cart.total += product.price;
        }
        console.log("ber holam");
        await cart.save();
        console.log("asolei");
        return res.status(200).json({ message: 'Item added to cart successfully', cart: req.cart });
        // res.redirect('back');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
// const calculateTotalsAndAddToCart = async (order, cart) => {
//     try {
//       for (const item of order.products) {
//         const productDetails = await Product.findById(item.product);
//         const subtotal = productDetails.price * item.quantity;
  
//         const newItem = {
//           product: item.product,
//           quantity: item.quantity,
//           selected: item.selected,
//           subtotal: subtotal,
//         };
  
//         cart.items.push(newItem);
//       }
  
//       cart.total = cart.items.reduce((total, item) => total + item.subtotal, 0);
  
//       await cart.save();
//     } catch (error) {
//       console.error(error);
//     }
//   };
exports.viewCart = async (req, res) => {
    try {
        // Checkout logic
        // ...
      
        // // Assuming req.cart is already available
        // await calculateTotalsAndAddToCart(req.order, req.cart);
      
        // // Assuming you have User model to fetch username
        // const user = await User.findOne({ _id: req.cart.user });
        // const username = user.username;
      
        // // Update req.cart with the username
        // req.cart = {
        //   ...req.cart.toObject(),
        //   username,
        // };
      
        // Send the updated cart as JSON response
        res.json(req.cart);
        // Or, if you are rendering a page
        // res.render('checkout', { title: 'CheckOut', cart: req.cart });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
};

exports.updateCartItem = async (req, res) => {
    try {
        // Update cart item logic
        // ...
        const productId = req.params.productId;
        const { quantity, selected } = req.body;
        const product = await Product.findById(productId);
        // Find the cart item by productId
        const cartItem = req.cart.items.find(item => item.product.toString() === productId);

        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in the cart' });
        }

        // Update the quantity
        if (quantity !== undefined) {
            console.log(quantity);
            const temp = cartItem.quantity;
            cartItem.quantity = quantity;
            if (cartItem.selected === true) {
                req.cart.total = req.cart.total + product.price * (quantity - temp);
            }
        }

        if (selected !== undefined) {
            const temp = cartItem.selected;
            cartItem.selected = selected;
            // Recalculate the total based on updated quantities
            if (temp === false & selected === true) {
                req.cart.total = req.cart.total + product.price * cartItem.quantity;
            }
            if (temp === true & selected === false) {
                req.cart.total = req.cart.total - product.price * cartItem.quantity;
            }
        }



        // Save the updated cart
        await req.cart.save();

        res.status(200).json({ message: 'Cart item updated successfully', cart: req.cart });
        // res.redirect('/cart/checkout');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.deleteCartItem = async (req, res) => {
    // Update cart item logic
    // ...
    const productId = req.params.productId;
    Cart.findOneAndUpdate(
        { user: req.params.userId },
        { $pull: { items: { product: productId } } },
        { new: true }
    )
        .then((cartItem) => {
            if (!cartItem) {
                return res.status(404).json({
                    error: 'Cart item not found for the user',
                });
            }
            res.json(cartItem);
        })
        .catch((err) => {
            res.status(400).json({
                error: 'Error deleting cart product',
            });
        });
    // res.redirect('/cart/checkout');
};
exports.removeCart = async (req, res) => {
    // Clear cart logic
    // ...
    try {
        const userId = req.params.userId; // Assuming you have the user ID in the request parameters
        console.log(userId);
        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items: [], total: 0 } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        res.json(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    // res.redirect('/cart/checkout');
};
//buyNow is not done
exports.buyNow = async (req, res, next) => {
    try {
        // Update cart item logic
        // ...
        //goto create order, but how? after processing
        const hasSelectedItems = req.cart.items.filter(item => item.selected);
        // console.log(hasSelectedItems);
        if (hasSelectedItems) {
            const order = new Order({
                products: hasSelectedItems,
                amount: req.cart.total, // Replace with the actual amount
                address: 'Sample Address',
                user: req.cart.user, // Replace with the actual user ID
                // Other fields of the order
            });
            req.body = order;
            // res.status(200).json({ message: 'Checkout successful'});
            next();
            // res.redirect('/order/create/:userId');
            // console.log('At least one item is selected.');
        } else {
            res.status(400).json({ message: 'Checkout not successful' });
            // console.log('No selected items in the cart.');
        }
        // res.redirect('/cart/checkout');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
