document.addEventListener('DOMContentLoaded',async ()=>{
    const stripe = Stripe('', {
        apiVersion: '2020-08-27',
      });
    
      const elements = stripe.elements();
      const card = elements.create('card');
      card.mount('#card-element');

      const form = document.getElementById('payment-form');
      let submitted = false;

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
    
        // Disable double submission of the form
        if(submitted) { return; }
        submitted = true;
        form.querySelector('button').disabled = true;
    
        // Make a call to the server to create a new
        // payment intent and store its client_secret.
        const {clientSecret} = await fetch(
          '/create-payment-intent',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              currency: 'usd',
              paymentMethodType: 'card',
            }),
          }
        ).then((r) => r.json());
        
        console.log(clientSecret)
    
          
          submitted = false;
          form.querySelector('button').disabled = false;
          const {paymentIntent} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: "Rahul Kumar"
                },
              },
            }
          );
          console.log('paymentIntent',paymentIntent)
        })
})