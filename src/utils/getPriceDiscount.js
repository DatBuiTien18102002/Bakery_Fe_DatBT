const getPriceDiscount = (price, discount) => {
    return price - (price * discount) / 100
}

export default getPriceDiscount