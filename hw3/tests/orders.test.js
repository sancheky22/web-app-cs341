var fs = require('fs');
test('test selectEvent', () => {
    // read data in from orders.js
    var testData = fs.readFileSync('routes/orders.js'); 

    // expect array to not be empty
    expect(testData).not.toBeNull();
    
});

// const data = require('../routes/orders');
//     test('Check array is not null', () => {
//     expect(data.not.toBeNull());
// });
