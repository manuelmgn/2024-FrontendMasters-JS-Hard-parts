# Notes



## JavaScript Principles

- When JS code runs, it goes through the code **line-by-line** and runs each line - know as the **thread of execution**. JS only can handle 1 thread of execution.
- When JS code runs it saves 'data' like strings and arrays so we can use that data later - **in its memory**.
- Functions: Code we save ('define') functions and can use (call / invoke / execute / run) later with the function's name and ().
- **Execution context**: Created to run the code of a function. Has 2 parts: thread of execution and memory. *We need the thread of execution to call the function and the memory to take the data we're going to use and save new data. The first execution context is the global one, when we run our code. Then, we create new contexts by calling for functions and other pieces of code to execute, so we're creating contexts inside other contexts. We can see the relation between this and the scope*.

> [!NOTE]
> 
> **Parameter VS Argument 🪙**. For the function `function multiplyBy2(inputNumber) {}`, been the inputNumber 3, `inputNumber` is the parameter, while 3 is the argument. The parameter is sort of the placeholder that awaits, it's gonna receive the value when the function it's being run. And that value is the argument.
 
> **Value**: anything that is stored.

### Call Stack

![alt text](img/callstack.png)

- JS keeps track of what function is currently running (where's the thread of execution)
- Run a function → add to call stack
- Finish running the function → Removes it from call stack
- Whatever is top of the call stack → That's the function we're currently running.
- When it finishes, it comes back to `global()`.

## Functions and callbacks

DRY principle: Don't Repeat Yourself

In JS **functions are First Class Objects** (meaning that everything that objects have, functions have too; they're full features of objects, meaning they can be treated just like objects). So we can assign functions to variables and properties of other objects (methods), pass them as arguments into functions and also return functions as values from other functions.

> [!NOTE]
> 
> **High Order Function**
> 
> The outer function that *takes in* or passes out a function.
>
> It's just a term to describe these functions - any function that does it we call that - but there's nothing different about them inherently.
>
> **Callback Function**
> 
> The function we insert.

```js
//High Order Function
function copyArrayAndManipulate(array, instructions) {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        // Callback
        output.push(instructions(array[i]))
    }
    return output;
}

function multiplyBy2(input) { return input * 2 }

const result = copyArrayAndManipulate([1,2,3], multiplyBy2);
```

**High Order Functions and Callback simplify our code and keep it DRY**. This ensures that we can write more declarative, more readable code as well. Callbacks are a core aspect of async JavaScript, and are under-the-hood of promises, async/await.

### Arrow functions

![Arrow functions](<img/CleanShot 2024-08-15 at 13.32.01.png>)

```js
//High Order Function
function copyArrayAndManipulate(array, instructions) {
    const output = [];
    for (let i = 0; i < array.length; i++) {
        // Callback
        output.push(instructions(array[i]))
    }
    return output;
}

const result = copyArrayAndManipulate([1,2,3], input => input*2);
```

> Anonymous and arrow functions:
> 
> - Improve immediate legibility of the code

## Closure

- Is the most esoteric of JS concepts.
- Enables powerful pro-level functions like 'once' and 'memoize'.
  - Once: Function that can turn other functions into functions that are gonna run once. If they run them again, they don't work.
  - We can achieve memoization, a core performance optimizer in.
- Many JS design patterns including the module pattern use closure.
- Build iterator, handle partial application and maintain state in an asynchronous world.

### Functions with memories

- When our functions get called, we create a live store of data (called local memory, variable environment or just state) for that function's execution context. When the function finishes executing, its local memory is deleted, except the returned value.
- *But what if our functions could hold on to live data between executions?*
- This would let our function definitions have an associated cache/persistent memory.
- But it all starts with us **returning a function from another function**.

Functions can be returned from other functions is JavaScript:

```js
function createFunction() {
    function multiplyBy2(num) {
        return num*2;
    }
    return multiplyBy2;
}
const generatedFunc = createFunction();
const result = generatedFunc(3); //6
```

`createFunction()` only runs to assign `generatedFunc` `multiplyBy2` as its value. Then the label 'multiplyBy2' *disappears* and if we want to use that function we might call it by `generatedFunc()`. But why are we doing this? Let's see.

```js
function outer() {
    let counter = 0;
    function incrementCounter() {
        counter++;
    }
    incrementCounter();
}
outer();
```

incrementCounter() is running inside of outer's execution context and creating a new one. As there it don't find counter in its local memory, it goes to outer's local memory inside its execution context. It finds the value of counter and increments it by one.

> Where you define your functions determines what data it has access to when you call it.

```js
function outer() {
    let counter = 0;
    function incrementCounter() { counter++; }
    return incrementCounter();
}
const myNewFunction = outer();
myNewFunction();
myNewFunction();
```

We could say that this code is not well written. Because when we execute myNewFunction(), it wouldn't find counter, so it couldn't add 1 to it. Because counter won't be in its local memory. BUT when we did `const myNewFunction = outer();`, the `return incrementCounter();` didn't just return the body of incrementCounter(), the function also carried with it the local memory of its execution context, so it had attached counter = 0, like a backpack 🎒.

So when myNewFunction() first run, it looked for counter in its local memory, and it didn't find it. But then, it looked for it in its backpack 🎒, and then it found it and incremented its value. So counter = 1.

The execution context of the first myNewFunction() gets deleted. But now we run it again and we have a new execution context. So now, again, it will look for counter in the local memory of this execution context, but nothing will be found. We go to the backpack, and now its value its 2.

![alt text](<img/CleanShot 2024-08-15 at 17.45.46.png>)

It stored in a hidden property `[[scope]]`. However, we cannot access that property. We cannot go to `myNewFunction.scope.counter`. The only way to get to that data is by running this function,having it refer to something not in local memory of it, and going out to the function's definition looking in its backpack and finding counter there.

With this example, we could say that if counter is bigger than 1, the function will return "sorry, you only can run me once".

If we have had another variable next to counter, but this one is never called by other functions, it wouldn't be stored at memory, as it would be a memory leak, storing things that won't be used. 

JavaScript has a very particular scope rule, called lexical or static scoping. That is to say that where I save my function determines for the rest of that life, for the life of that function, whenever it gets run under whatever new label it gets, what data it will have access to when that function runs.

One (official) name for this backpack is "Closed Over Variable Environment" (Variable Environment = Local memory).
This data is persistent, is referenced (linked) by a scope property, and the rule is a lexical scope. So another name is PLSRD (Persistent Lexical Static Referenced Data). But the industry name for this is Function's **closure**. The problem is that they use the term to refer the overall concept, the notion of lexical scoping. So that's the closure, but we could say that we also have the 'backpack closure', meaning just the result of JavaScript being a lexically scoped language.

Extra note: If the outer function returned an array of functions or an object with various methods, all those functions would have access to the same backpack.

### Multiple Closure Instances

```js
function outer() {
    let counter = 0;
    function incrementCounter() {
        counter++;
    }
    return incrementCounter();
}

const myNewFunction = outer();
myNewFunction();
myNewFunction();

const anotherFunction = outer();
anotherFunction();
anotherFunction();
```

In this case, if we have had something like `console.log(counter)`, we would have seen 1, 2 (myNewFunction), 1 and 2 (anotherFunction), as they have different backpacks. 
