// gtmEvents.js

// Ensure dataLayer exists
window.dataLayer = window.dataLayer || [];

/**
 * Push a user login event
 * @param {string} userId
 */
export const pushUserLogin = (userId) => {
    window.dataLayer.push({
        event: 'user_login',
        user_id: userId,
    });
};

/**
 * Push an add to cart event
 * @param {object} product - {id, name, price, category, quantity}
 */
export const pushAddToCart = (product) => {
    window.dataLayer.push({
        event: 'add_to_cart',
        ecommerce: {
            items: [{
                item_id: product.id,
                item_name: product.name,
                price: product.price,
                category: product.category,
                quantity: product.quantity || 1
            }]
        }
    });
};

/**
 * Push a remove from cart event
 * @param {object} product - {id, name, price, category, quantity}
 */
export const pushRemoveFromCart = (product) => {
    window.dataLayer.push({
        event: 'remove_from_cart',
        ecommerce: {
            items: [{
                item_id: product.id,
                item_name: product.name,
                price: product.price,
                category: product.category,
                quantity: product.quantity || 1
            }]
        }
    });
};

/**
 * Push a purchase event
 * @param {object} order - {order_id, total, currency, items: [{id,name,price,quantity,category}]}
 */
export const pushPurchase = (order) => {
    window.dataLayer.push({
        event: 'purchase',
        ecommerce: {
            transaction_id: order.order_id,
            value: order.total,
            currency: order.currency || 'INR',
            items: order.items.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                category: item.category
            }))
        }
    });
};
