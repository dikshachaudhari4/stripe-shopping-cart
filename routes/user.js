const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const contact = require("../models/user");

const Order = require ('../models/order');
const Cart = require ('../models/cart');

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {
    Order.find({user: req.user}, function(err, orders) {
        if(err) {
            return res.write('Error!');
        }
        let cart;

        orders.forEach(function (order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
            order.totalPrice = order.cart.totalPrice;
        });

        res.render('user/profile', { orders: orders });
    });
});

router.get('/logout', isLoggedIn, function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

router.get('/contactus', function (req, res, next) {
    const messages = req.flash('error');
    res.render('user/contactus', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post("/contactus",async(req,res) => {
    try{
        const stdsub = new contact({
            name:req.body.name,
            email:req.body.email,
            message:req.body.message
        })
        const submitted=await stdsub.save();
        res.status(201).render("user/profile");
    }
    catch(error){
        
        res.status(400).send(error);
    }
    
});
// router.post('/contactus', passport.authenticate('local.signup', {
//     failureRedirect: '/user/contactus',
//     failureFlash: true
// }), function (req, res, next) {
//     if(req.session.oldUrl) {
//         const oldUrl = req.session.oldUrl;
//         req.session.oldUrl = null;
//         res.redirect(oldUrl);
//     } else {
//         res.redirect('/user/profile');
//     }
// });

router.get('/signin', function (req, res, next) {
    const messages = req.flash('error');
    res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res, next) {
    if(req.session.oldUrl) {
        const oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
