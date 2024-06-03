const pricesRepository = require('../repositories/PricesRepository');

const increasePriceToFightInflation = async () => {
    const pricesRepositoryInstance = pricesRepository();
    return await pricesRepositoryInstance.updatePriceByOneDollar();
}

module.exports = {
    increasePriceToFightInflation,
}