// Taken from https://reactjs.org/docs/testing-recipes.html

// user.test.js

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
// import User from "./user";
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
    const fakeResponse = {
        "OK": "fake response from server"
    };
  
    jest.spyOn(global, "fetch").mockImplementation(() => 
        Promise.resolve({
            json: () => Promise.resolve(fakeResponse)
        })
    );

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<App/>, container);
    });

    // expect(container.querySelector("summary").textContent).toBe(fakeUser.name);
    // expect(container.querySelector("strong").textContent).toBe(fakeUser.age);
    // expect(container.textContent).toContain(fakeUser.address);
    // expect(container.querySelector("strong").textContent).toContain(fakeResponse["OK"]);

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
});