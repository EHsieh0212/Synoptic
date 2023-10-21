console.log("client side javascript file is loaded.");

/////////////////////////////////////////////////////////////////////////////
// get all elements
// for activating listing
const categoryWomen = document.querySelector("#category-women");
const categoryMen = document.querySelector("#category-men");
const categoryAccessories = document.querySelector("#category-accessories");
const categoryWomenNonmobile = document.querySelector("#category-women-nonmobile");
const categoryMenNonmobile = document.querySelector("#category-men-nonmobile");
const categoryAccessoriesNonmobile = document.querySelector("#category-accessories-nonmobile");
const searchBtn = document.querySelector('#search-btn');
const keyword = document.querySelector("#search-keyword");
// for rendering results
const renderProductResults = document.querySelector("#insert-products");



/////////////////////////////////////////////////////////////////////////////
function renderMainpageProducts(bodyInfo){
    renderProductResults.innerHTML =  '';
    try{
        for (let i=0; i<bodyInfo.length; i++){
            const {product_name, product_price, product_img, product_colors} = bodyInfo[i];
            // (1) set color tags
            let colors = document.createElement("div");
            colors.setAttribute("class", "product-color block");
            colors.innerHTML ='';
            for (let j=0; j<product_colors.length; j++){
                colors.innerHTML += `<button class="product-color-btn" style="background-color: ${product_colors[j]}"></button>`
            }
            // (2) set all tags 
            renderProductResults.innerHTML += `
            <div class="product col-6 col-sm-4">
                <img class="product-img" src="${product_img}" />
                ${colors.outerHTML}
                <div class="product-details">
                    <span class="product-name" />${product_name}</span><br>
                    <span class="product-price">TWD.${product_price}</span>
                </div>
            </div>`;
        };
    } catch (error){
        throw error
    }
};

async function fetchCategoryItems(category){
    try{
        await fetch(`/api/v1/products/${category}/?paging=0`, {method: "get", headers:{"Content-Type": "application/json"}})
        .then((res) => (res.json()))
        .then((res) => renderMainpageProducts(res.results));
    } catch(error){
        console.log(error);
        renderProductResults.innerHTML = '';
        renderProductResults.innerHTML += `Error occurred. 404 not found.`
    }
};

async function searchProduct(keyword){    
    const keywordValue = keyword.value;
    try{
        await fetch(`/api/v1/search/?keyword=${keywordValue}`, {method: "get", headers:{"Content-Type": "application/json"}})
        .then((res) => (res.json()))    
        .then((res) => renderMainpageProducts(res.results)); 
    } catch(error){
        console.log(error);
        renderProductResults.innerHTML = '';
        renderProductResults.innerHTML += `Error occurred. 404 not found.`
    }
};


/////////////////////////////////////////////////////////////////////////////
// add event listener
// by default: render all products of page 1
fetchCategoryItems("all");
// by clicking: render counterparts
// note: need to add async / await in front of functions (or js would automatically perform actions)
categoryWomen.addEventListener("click", async() => await fetchCategoryItems("women"));
categoryMen.addEventListener("click", async() => await fetchCategoryItems("men"));
categoryAccessories.addEventListener("click", async() => await fetchCategoryItems("accessories"));
categoryWomenNonmobile.addEventListener("click", async() => await fetchCategoryItems("women"));
categoryMenNonmobile.addEventListener("click", async() => await fetchCategoryItems("men"));
categoryAccessoriesNonmobile.addEventListener("click", async() => await fetchCategoryItems("accessories"));
// search products
searchBtn.addEventListener("click", async(event) => {
    event.preventDefault(); 
    await searchProduct(keyword)});