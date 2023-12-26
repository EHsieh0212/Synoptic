export function parseColors(stock) {
    const colors = stock.map((v) => v.color);
    return [...new Set(colors)].sort();
  }
  
  export function parseStock(stock) {
    const stockObj = {};
    for (const variant of stock) {
      if (!stockObj[variant.color]) {
        stockObj[variant.color] = {};
      }
      stockObj[variant.color][variant.size] = variant.number;
    }
    return stockObj;
  }