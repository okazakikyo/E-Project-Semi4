<template>
    <div id="paypal-button" />
</template>

<script lang="js">

export default {
    mounted() {
        function loadScript(url, callback) {
            const el = document.querySelector(`script[src="${url}"]`);
            if (!el) {
                const s = document.createElement('script');
                s.setAttribute('src', url); s.onload = callback;
                document.head.insertBefore(s, document.head.firstElementChild);
            }
        }

        // loadScript('https://www.paypal.com/sdk/js?client-id=sb&currency=USD', () => {
        loadScript('https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=USD', () => {
            paypal.Buttons({
                // Set up the transaction
                createOrder(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '0.01',
                            },
                        }],
                    });
                },

                // Finalize the transaction
                onApprove(data, actions) {
                    return actions.order.capture().then(details => {
                        // Show a success message to the buyer
                        alert(`Transaction completed by ${details.payer.name.given_name}`);
                    });
                },

            }).render('#paypal-button');
        });
    },
};
</script>