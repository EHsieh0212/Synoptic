console.log("client side javascript file is loaded.");

////////////////////////////////////////////////////////////////////////
// get all elements
const form = document.querySelector("form");
const title = form.querySelector("#title");
const category = form.querySelector("#category");  // **
const price = form.querySelector("#price");
const image = form.querySelector("#image");
const description = form.querySelector("#description");
const origin = form.querySelector("#origin");
const color = form.querySelector("#color");
const number = form.querySelector("#number");
const size = form.querySelector("#size");      // **
const addStock = form.querySelector("#add-stock");
let entry = form.querySelector("#entry-msg");
const submitBtn = form.querySelector("#submit");
let details = form.querySelector("#details");

////////////////////////////////////////////////////////////////////////
// delete a stock entry
function deleteTag(elem) {
    // 1. delete from result panel
    elem.parentNode.remove();
    // 2. delete from entryArray
    let position = Number(elem.value);
    console.log(position)
    console.log(entryArray);
    entryArray = entryArray.filter((ele) => ele.cid !== position-1);
    console.log(entryArray);
    if (entryArray.length == 0) {
        entryArray = [];
        counted = 0;
    }
    // 3. alter form border
    if (entryArray.length == 0 & show == 1){
        entry.setAttribute("style", "border: none;");
        show = 0;
    }
}

// collect product entries
let entryArray = [];
let counted = 0;
let show = 0;
addStock.addEventListener("click", () => {
    // cannot accept no value
    if (Number(number.value) == 0 || size.value == "") {
        alert("just enter sth if you want to add stock entry.")
        return;
    }
    // cannot accept duplicate quantity-size-color entries
    if (entryArray.length >= 1) {
        let previousTag = entryArray.filter((el) => Number(el.cid) === Number(counted) - 1);
        if (previousTag[0].product_color == color.value && previousTag[0].product_size == size.value && previousTag[0].product_quantity == Number(number.value)) {
            alert("we cannot accept duplicated entries.")
            return;
        }
    }
    entryArray.push({
        cid: counted,
        product_color: color.value,
        product_quantity: Number(number.value),
        product_size: size.value
    })
    counted += 1;

    // add new html tags on click
    if (show == 0){
        entry.setAttribute("style", "border: dashed;");
        show = 1;
    }
    // 1. add new div
    let newDiv = document.createElement("div");
    newDiv.setAttribute("class", "newDiv");

    // 2. add new li
    let newEntry = document.createElement("li");
    let target = entryArray.filter((el) => el.cid === counted - 1)[0];
    newEntry.innerHTML = `entry-  product color: ${target.product_color} / product quantity: ${target.product_quantity} / product size: ${target.product_size}`;
    newEntry.setAttribute("class", "newEntry");
    
    // 3. add delete btn
    let deleteEntry = document.createElement("button");
    deleteEntry.setAttribute("onclick", "deleteTag(this)");
    deleteEntry.setAttribute("class", "deleteTag");
    deleteEntry.setAttribute("type", "click");
    deleteEntry.setAttribute("value", `${counted}`);
    deleteEntry.innerHTML = `Delete`;

    // 4. association
    entry.appendChild(newDiv);
    newDiv.appendChild(newEntry);
    newDiv.appendChild(deleteEntry);
});

// submit product
submitBtn.addEventListener("click", () => {
    details.setAttribute("value", JSON.stringify(entryArray));
    form.appendChild(details);
})