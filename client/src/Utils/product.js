export const parseColors = stock => {
  const colors = stock.map((v) => v.color);
  return [...new Set(colors)].sort();
}

export const parseStock = stock => {
  const stockObj = {};
  for (const variant of stock) {
    if (!stockObj[variant.color]) {
      stockObj[variant.color] = {};
    }
    stockObj[variant.color][variant.size] = variant.quantity;
  }
  return stockObj;
}

export const getColorNameByCode = colorCode => {
  const mappingDict = {
    '#000000': "Black",
    '#ACE1AF': "Green",
    '#89CFF0': "Blue",
  };
  return mappingDict[colorCode];
};

export const DEFAULTSIZES = ["XS", "S", "M", "L", "XL"];
export const CART_API_URL = `${process.env.REACT_APP_SYNOPTIC_URL}/api/v1/cart`;