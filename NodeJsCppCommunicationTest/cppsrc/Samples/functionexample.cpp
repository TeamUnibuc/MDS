#include "functionexample.h"
#include <iostream>

std::string functionexample::hello(){
    return "Hello World";
}

int functionexample::add(int a, int b){
  return a + b;
}

std::string functionexample::CountLetters(std::string str){
    return std::to_string(str.size());
}

Napi::String functionexample::CountLettersWrapped(const Napi::CallbackInfo& info){
    Napi::Env env = info.Env();
    if (info.Length() == 0){
        Napi::TypeError::New(env, "No argument passed").ThrowAsJavaScriptException();
    }
    std::string my_arg = info[0].As<Napi::String>().Utf8Value();
    std::string res = functionexample::CountLetters("asd");
    Napi::String returnValue = Napi::String::New(env, res);
    return returnValue;
}

Napi::String functionexample::HelloWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::String returnValue = Napi::String::New(env, functionexample::hello());
    return returnValue;
}


Napi::Number functionexample::AddWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 2 || !info[0].IsNumber() || !info[1].IsNumber()) {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    } 

    Napi::Number first = info[0].As<Napi::Number>();
    Napi::Number second = info[1].As<Napi::Number>();

    int returnValue = functionexample::add(first.Int32Value(), second.Int32Value());
    
    return Napi::Number::New(env, returnValue);
}

Napi::Object functionexample::Init(Napi::Env env, Napi::Object exports) {
    exports.Set("hello", Napi::Function::New(env, functionexample::HelloWrapped));
    exports.Set("add", Napi::Function::New(env, functionexample::AddWrapped));
    exports.Set("CountLetters", Napi::Function::New(env, functionexample::CountLettersWrapped));
    return exports;
}