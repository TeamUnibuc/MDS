import { sampleFunction, closeServer } from '../../src';

describe("This is a simple test", () => {
  it("Check the sampleFunction function", () => {
    expect(sampleFunction("hello")).toEqual("hellohello");
  });
});

afterAll(() => {
  closeServer();
})
