const stripe = require('stripe')('sk_test_51JIDLQSB6qziA908V1QjLNtaueXjt8y6DJ9jOGQXGZBGcP5i6MOMJDj39TV4u0tcyC69t5Fv4imfr20ZC7HpfVh600Mtx9hXni')
(async () => {
    const customers = await stripe.customers.list();
    console.log(customers);
})()