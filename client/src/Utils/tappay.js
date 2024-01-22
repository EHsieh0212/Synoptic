export const getTPDirect = () => {
    return new Promise((resolve, reject) => {
        if (typeof window.TPDirect !== 'undefined') {
            return resolve(window.TPDirect)
        } else {
            const script = window.document.createElement('script');
            script.src = "https://js.tappaysdk.com/tpdirect/v5.7.0";
            script.async = true;
            script.onload = () => {
                if (typeof window.TPDirect !== 'undefined') {
                    resolve(window.TPDirect);
                } else {
                    reject(new Error('failed to load TapPay sdk'));
                }
            }
            script.onerror = reject;
            window.document.body.appendChild(script);
        }
    })
};

