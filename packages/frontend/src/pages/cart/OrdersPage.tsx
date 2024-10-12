import React from 'react';
import { useFetchOrdersQuery } from '../../services/cart/cartSliceAPI';   
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import "../../styles/OrdersPage.css";  
import { BASE_URL } from '../../constants';

const OrdersPage = () => {
    const { data: orders, error, isLoading } = useFetchOrdersQuery();
    if (isLoading) {
        return (
            <div className="loading"> 
               Loading your orders 
            </div>
        );
    }
    if (error) {
        return <div className="error">Error loading orders: {error?.message }.</div>;
    }
    return (
        <>
            <Header />
            <div className="orders-page">
                <h1>Your Orders</h1>

                {/* Handle loading state */}
                {isLoading && <div>Loading...</div>}

                {/* Handle error state */}
                {error && <div>Error loading orders: {error.message}</div>}

                {/* Display orders when available */}
                {!isLoading && !error && (
                    orders.length === 0 ? (
                        <p>You have no orders yet.</p>
                    ) : (
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>
                                            {order.orderItems.map((item) => (
                                                <div key={item.productId}>
                                                    <img
                                                        src={`${BASE_URL}/uploads/${item.imageUrl}`}
                                                        alt={item.name}
                                                        className="cart-item-image"
                                                    />
                                                    {item.name}
                                                </div>
                                            ))}
                                        </td>
                                        <td>
                                            {order.orderItems.map((item) => (
                                                <div key={item.productId}>{item.order_quantity}</div>
                                            ))}
                                        </td>
                                        <td>${order.totalAmount.toFixed(2)}</td>
                                        <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
            <Footer />
        </>
    );
};

export default OrdersPage;
