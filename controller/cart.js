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
            // cart.totalQuantity=1;
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
                    selected: true,
                });
            }
            // cart.totalQuantity=1;
            // cart.total += product.price;
        }
        // console.log("ber holam");
        await cart.save();
        // console.log("asolei");
        return res.status(200).json({ message: 'Item added to cart successfully', cart: req.cart });
        // res.redirect('back');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewCart = async (req, res) => {
    try {
        // Checkout logic
        // ...

        const cart = req.cart;

        const updatedProducts = await Promise.all(cart.items.map(async (item) => {
            const productDetails = await Product.findById(item.product);

            if (productDetails) {
                return {
                    ...item.toObject(),
                    productName: productDetails.name,
                    productPrice: productDetails.price,
                    productPhoto:productDetails.photo,
                    
                };
            }

            return item;
        }));
        console.log(updatedProducts);
        // const totalAmount = updatedProducts.reduce((total, item) => total + item.subtotal, 0);
        // Add the user's name to the existing req.order object
        req.cart = {
            ...req.cart.toObject(), // Convert Mongoose document to plain JavaScript object
            items: updatedProducts,
        };

        // Now req.order includes the user's name
        return res.json(req.cart);

        // Send the updated cart as JSON response
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
            // req.cart.totalQuantity+=(quantity - temp);
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
        
        if (hasSelectedItems.length>0) {
            const order = new Order({
                products: hasSelectedItems,
                amount: req.cart.total, // Replace with the actual amount
                user: req.cart.user, // Replace with the actual user ID
                // Other fields of the order
            });
            req.body = order;
            console.log(req.body);
            // res.status(200).json({ message: 'Checkout successful'});
            next();
            // res.redirect('/order/create/:userId');
            // console.log('At least one item is selected.');
        } else {
            return res.status(400).json({ message: 'Checkout not successful' });
            // console.log('No selected items in the cart.');
        }
        // res.redirect('/cart/checkout');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getQuantity = async (req, res) => {
    try {
        // Checkout logic
        // ...
        const productId = req.params.productId;
        // Find the cart item by productId
        const cartItem = req.cart.items.find(item => item.product.toString() === productId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Product not found in the cart' });
        }
        res.json({quantity: cartItem.quantity});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};