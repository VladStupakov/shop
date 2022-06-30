
class MathService {
    getOrderTotalPrice(products) {
        let sum = 0
        products.forEach(product => {
            sum += product.basketQuantity * product.productId.price
        });
        return sum
    }    

}

export default new MathService()