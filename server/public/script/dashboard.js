// total revenue
const postTotalRevenue = (num) => {
    const totalRv = document.querySelector(".insertedRevenue");
    totalRv.innerHTML = num;
}
fetch(`/api/v1/products/getTotalRevenue`, { method: "get", headers: { "Content-Type": "application/json" } })
    .then((res) => (res.json()))
    .then((res) => postTotalRevenue(res.totalRevenue));


// p_color sold percentage
const plotColorQty = (dbData) => {
    values = dbData.map(e => e.p_count);
    labels = dbData.map(e => e.p_name);
    let data = [{
        values: values,
        labels: labels,
        type: 'pie'
    }];
    let layout = {
        title: "Product sold percentage in different colors",
        height: 400,
        width: 500
    };
    Plotly.newPlot('gd', data, layout);
}
fetch(`/api/v1/products/getColorQty`, { method: "get", headers: { "Content-Type": "application/json" } })
    .then((res) => (res.json()))
    .then((res) => plotColorQty(res));



// p_price sold range dist
const plotPriceQty = (dbData) => {
    const x = dbData.map(e => e.p_price);
    let data = [{
        x: x,
        type: 'histogram'
    }];
    let layout = {
        title: "Product sold quantity in different price range",
        xaxis: { title: "Price Range" },
        yaxis: { title: "Quantity" }
    };
    Plotly.newPlot('gb', data, layout);
}
fetch(`/api/v1/products/getPriceQty`, { method: "get", headers: { "Content-Type": "application/json" } })
    .then((res) => (res.json()))
    .then((res) => plotPriceQty(res));


// p top5 sold in size
const plotSoldTop5 = (dbData) => {
    const top5Order = dbData[0];
    const numArray = top5Order.sort(function (a, b) {  return a - b;  });
    const newLabel = []
    for (let i in numArray){
        const t = `product ${numArray[i]}`
        newLabel.push(t);
    }

    const sizeInfo = dbData[1];
    const traces = [];
    for (let i in sizeInfo){
        const a = Object.keys(sizeInfo[i]).map(e => sizeInfo[i])[0];
        const name = Object.keys(a)[0];
        const c = Object.keys(sizeInfo[i]).map(e => sizeInfo[i][e])[0];
        
        const counts = c.map(e => e.count);
        let trace = {
            x: newLabel,
            y: counts,
            name: name,
            type: 'bar'
        };
        traces.push(trace)
    }
    let layout = {
        title: "Quantity of top 5 sold products in different sizes (ordered by product id)",
        barmode: 'stack', 
        };


    Plotly.newPlot('gc', traces, layout);
}
fetch(`/api/v1/products/getTop5ProductsAndSize`, { method: "get", headers: { "Content-Type": "application/json" } })
    .then((res) => (res.json()))
    .then((res) => plotSoldTop5(res));










