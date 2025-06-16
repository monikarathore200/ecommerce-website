import React, { useContext, useEffect, useState } from 'react';
// import { CommonContext } from '../ContextAPI/Context';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CommonContext } from '../ContextApi/Context';


export default function ViewCart() {
    const { cartItems, setCartItems, isLogin } = useContext(CommonContext);
    const [totalAmount, setTotalAmount] = useState(0);


    

    useEffect(() => {
        let sum = 0;
        cartItems.forEach((v) => {
            sum += v.price * v.quantity;
        });
        setTotalAmount(sum);
    }, [cartItems]);

    const updateCart = (id, type) => {
        if (!isLogin) {
            toast.error("User not logged in");
            return;
        }

        const updatedCart = cartItems.map((v) => {
            if (v.id === id) {
                if (type === 'minus') {
                    if (v.quantity > 1) {
                        v.quantity--;
                        toast.success('Cart updated successfully!');
                    } else {
                        toast.error('Minimum 1 qty required!');
                    }
                } else {
                    if (v.quantity < 10) {
                        v.quantity++;
                        toast.success('Cart updated successfully!');
                    } else {
                        toast.error('Maximum qty reached!');
                    }
                }
            }
            return v;
        });

        setCartItems([...updatedCart]);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        const db = getDatabase(app);
        set(ref(db, 'user_carts/' + isLogin), updatedCart);
    };

    const cartDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete?')) {
            const filteredCart = cartItems.filter((v) => v.id !== productId);
            setCartItems(filteredCart);
            localStorage.setItem('cartItems', JSON.stringify(filteredCart));
            const db = getDatabase(app);
            set(ref(db, 'user_carts/' + isLogin), filteredCart);
        }
    };

    const shipping = totalAmount > 0 ? 5 : 0;

    return (
        <div className='container-fluid p-5'>
            <div className='container'>
                <div className='row'>
                    <div className="col-sm-12 col-md-12">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Description</th>
                                    <th>Quantity</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Total</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.length > 0 ? cartItems.map((cart, index) => (
                                    <tr key={cart.id}>
                                        <td className="col-sm-8 col-md-3">
                                            <div className="media">
                                                <a href="#" onClick={(e) => e.preventDefault()} className="thumbnail pull-left">
                                                    <img className="media-object" src={cart.image} width={150} />
                                                </a>
                                                <div className="media-body ps-3">
                                                    <h4 className="media-heading">
                                                        <Link to={`/product-details/${cart.id}`} className="text-decoration-none text-black">
                                                            {cart.name}
                                                        </Link>
                                                    </h4>
                                                    <h5 className="media-heading">Category: {cart.category_name}</h5>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="col-md-3 text-left">
                                            <strong className="label label-danger">{cart.description ?? 'N/A'}</strong>
                                        </td>
                                        <td className="text-center d-flex justify-content-between align-items-center">
                                            <button onClick={() => updateCart(cart.id, 'minus')}>-</button>
                                            <div>{cart.quantity}</div>
                                            <button onClick={() => updateCart(cart.id, 'plus')}>+</button>
                                        </td>
                                        <td className="text-center"><strong>${cart.price}</strong></td>
                                        <td className="text-center"><strong>${(cart.price * cart.quantity).toFixed(2)}</strong></td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => cartDelete(cart.id)}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-danger">Cart is empty.</td>
                                    </tr>
                                )}

                                <tr>
                                    <td colSpan="3"></td>
                                    <td><h5>Subtotal</h5></td>
                                    <td className="text-right"><h5><strong>${totalAmount.toFixed(2)}</strong></h5></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <td><h5>Estimated shipping</h5></td>
                                    <td className="text-right"><h5><strong>${shipping.toFixed(2)}</strong></h5></td>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <td><h3>Total</h3></td>
                                    <td className="text-right">
                                        <h3><strong>${(totalAmount + shipping).toFixed(2)}</strong></h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3"></td>
                                    <td>
                                        <Link to="/product">
                                            <button type="button" className="btn btn-secondary">
                                                <span className="fa fa-shopping-cart"></span> Continue Shopping
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-success">
                                            Checkout <span className="fa fa-play"></span>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}





