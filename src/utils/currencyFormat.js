const currencyFormat = (price) => {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    })

    return formatter.format(price)
}

export default currencyFormat;