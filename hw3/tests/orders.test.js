var fs = require('fs');
test('test selectEvent', () => {
    // read data in from orders.js


    var testData = fs.readFileSync('routes/orders.js', 'utf8'); 
    //expect(testData).toEqual(expect.anything()); //any non-null value is okay
    expect(testData).not.toBeNull();
    
});

// const data = require('../routes/orders');
//     test('Check array is not null', () => {
//     expect(data.not.toBeNull());
// });
