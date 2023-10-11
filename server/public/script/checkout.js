console.log("client side javascript file is loaded.");

////////////////////////////////////////////////////////////////////////
// get elements
const submitBtn = document.querySelector(".submit-btn");
const orderResult = document.querySelector(".order-result");


////////////////////////////////////////////////////////////////////////
// TapPay related functions
// 1. Make TapPay inputs available
function initTapPay() {
    // Setup Testing SDK
    TPDirect.setupSDK(11327, "app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC", "sandbox"); //Appworks School data failed, use global testing data instead.
    // Setup Card
    TPDirect.card.setup({
        fields: {
            number: {
                element: '#card-number',
                placeholder: '**** **** **** ****'
            },
            expirationDate: {
                element: '#card-expiration-date',
                placeholder: 'MM / YY'
            },
            ccv: {
                element: '#card-ccv',
                placeholder: 'CCV'
            }
        },
        // if input card numer valid: only show no.6~11 numbers
        isMaskCreditCardNumber: true,
        maskCreditCardNumberRange: {
            beginIndex: 6, 
            endIndex: 11
        }
    })
    // Get Prime
    TPDirect.card.onUpdate(update => {
        // enable Submit btn
        // test data: 4242424242424242 01/23 123
        if (update.canGetPrime) {
            submitBtn.removeAttribute('disabled');
        } else {
            submitBtn.setAttribute('disabled', true);
        }
        // secure TapPay infos
        if (update.status.number === 2) {
           alert("Error: number has error")
            return;
        }
        if (update.status.expiry === 2) {
            alert("Error: expiry has error")
            return;
        }
        if (update.status.ccv === 2) {
            alert("Error: ccv has error")
            return;
        }
    });
}

///////////////////////////////////////////////////////////////
// main functions
// 1.
initTapPay();
// 2.
submitBtn.addEventListener("submit", submitForm);
// 3. Get Prime, triggers send form
    // note: getPrime func has time gap, therefore needs to be put below (if I put it ontop of addEventListener it would fail to retrieve form data)
function submitForm(event) {
    event.preventDefault();
    const tappayStatus = TPDirect.card.getTappayFieldsStatus();
    // Reassure prime availability
    if (!tappayStatus.canGetPrime) {
        alert('Error: Cannot get prime.');
        return;
    }
    // Get Prime
    TPDirect.card.getPrime (result => {
        if (result.status !== 0) {
            alert(`Error: ${result.msg}`);
            return;
        }
        const prime = result.card.prime;
        const form = document.getElementById("aform")
        const formData = new FormData(form);
        formData.append("prime", prime);
        let formResult = {};
        formData.forEach((value, key) => formResult[key] = value);

        // Send Data to backend and 
        fetch(form.action, {                                // normally fetch form.action error occurrs bc backend api crashes
            method: "post", 
            headers: {'Content-Type': 'application/json'},   
            body: JSON.stringify(formResult)
        })
        .then((res) => (res.json()))                       // watch out: res.json() not res.json
        .then((paymentStatus) => {
            if (Number(paymentStatus.paymentStatus) == 0){
                alert('Success Payment');
            } else{
                alert('Failed Payment: Please check if you fulfilled the required columns.');
            }
        })
        .catch((error => (console.log(error))))
    });  
}
