/* HELLO WORLD*/
//Suite - that will contain group of specs
describe("hello world module", function(){
	//first spec
	it("should be equal to Hello World", function(){
		expect(helloWorld()).toEqual("Hello World !");
	});

	it("should hello world be string", function(){
		expect(helloWorld()).tobe(string);
	})

});