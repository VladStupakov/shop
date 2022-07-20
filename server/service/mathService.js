
class MathService {
    getOrderTotalPrice(products) {
        return products.reduce((sum, product) => {
            sum + product.basketQuantity * product.price
        }, 0);
    }

}

export default new MathService()