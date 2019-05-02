var hello = require('./hello');

test('hello("jest") to be "Hello Jest!!"', function(){
	expect(hello('Jest')).toBe('Hello Jest!!');
})
