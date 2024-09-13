# Notes

- [Notes](#notes)
  - [JavaScript Principles](#javascript-principles)
    - [Call Stack](#call-stack)
  - [Functions and callbacks](#functions-and-callbacks)
    - [Arrow functions](#arrow-functions)
  - [Closure](#closure)
    - [Functions with memories](#functions-with-memories)
    - [Multiple Closure Instances](#multiple-closure-instances)
  - [Asynchronous JS](#asynchronous-js)
    - [ES 5](#es-5)

## JavaScript Principles

- When JS code runs, it goes through the code **line-by-line** and runs each line - know as the **thread of execution**. JS only can handle 1 thread of execution.
- When JS code runs it saves 'data' like strings and arrays so we can use that data later - **in its memory**.
- Functions: Code we save ('define') functions and can use (call / invoke / execute / run) later with the function's name and ().
- **Execution context**: Created to run the code of a function. Has 2 parts: thread of execution and memory. *We need the thread of execution to call the function and the memory to take the data we're going to use and save new data. The first execution context is the global one, when we run our code. Then, we create new contexts by calling for functions and other pieces of code to execute, so we're creating contexts inside other contexts. We can see the relation between this and the scope*.

> [!NOTE]
>
>- **Parameter VS Argument 🪙**. For the function `function multiplyBy2(inputNumber) {}`, been the inputNumber 3, `inputNumber` is the parameter, while 3 is the argument. The parameter is sort of the placeholder that awaits, it's gonna receive the value when the function it's being run. And that value is the argument.
>
>- **Value**: anything that is stored.

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

>[!NOTE]
>
>**High Order Function**.
>
>The outer function that *takes in* or passes out a function.
>
>It's just a term to describe these functions - any function that does it we call that - but there's nothing different about them inherently.
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

>Anonymous and arrow functions:
>
>- Improve immediate legibility of the code

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
    return incrementCounter;
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
    return incrementCounter;
}

const myNewFunction = outer();
myNewFunction();
myNewFunction();

const anotherFunction = outer();
anotherFunction();
anotherFunction();
```

In this case, if we have had something like `console.log(counter)`, we would have seen 1, 2 (myNewFunction), 1 and 2 (anotherFunction), as they have different backpacks.

**Individual backpacks**. If we run 'outer' again and store the returned 'incrementCounter' function definition in 'anotherFunction', this new incrementCounter function was created in a new execution context and therefore has a brand new independent backpack.

>**Closure gives our functions persistent memories and entirely new toolkit for writing professional code**.
>
>- **Helper functions**: Everyday professional helper functions like ‘once’ and ‘memoize’. *Like in a winning function, which should run only once, or giving our functions persistent memories of their previous input output combinations*.
>
>- **Iterators and generators**: Which use lexical scoping and closure to achieve the most contemporary patterns for handling data in JavaScript
>
>- **Module pattern**: Preserve state for the life of an application without polluting the global namespace
>
>- **Asynchronous JavaScript**: Callbacks and Promises rely on closure to persist state in an asynchronous environment

## Asynchronous JS

### ES 5

- **Promises, Async & the Event Loop**
  - **Promises** - the most signficant ES6 feature
  - **Asynchronicity** - the feature that makes dynamic web applications possible
  - **The event loop** - JavaScript’s triage
  - Microtask queue, Callback queue and Web Browser features (APIs)
- **Asynchronicity is the backbone of modern web development in JavaScript yet..**.
  - JavaScript is:
    - Single threaded (one command runs at a time)
    - Synchronously executed (each line is run in order the code appears)
  - So what if we have a task:
    - Accessing Twitter’s server to get new tweets that takes a long time
    - Code we want to run using those tweets
  - Challenge: We want to wait for the tweets on Twitter (X) to be stored in tweets so that they’re there to run displayTweets on - but no code can run in the meantime.

```js
//Slow function blocks further code running

const tweets = getTweets("http://twitter.com/will/1")

// ⛔350ms wait while a request is sent to Twitter HQ
displayTweets(tweets)

// more code to run
console.log("I want to runnnn!")
```

**What if we try to delay a function directly using setTimeout?** `setTimeout` is a built in function - its first argument is the function to delay followed by ms to delay by.

```js
function printHello(){
 console.log("Hello");
}
setTimeout(printHello,1000);
console.log("Me first!");
```

In what order will our console logs appear? 1º) Me First, 2º) Hello.

```js
function printHello(){
 console.log("Hello");
}
setTimeout(printHello,0);
console.log("Me first!");
```

In what order will our console logs appear? 1º) Me First, 2º) Hello.

**JavaScript is not enough - We need new pieces (some of
which aren’t JavaScript at all)**

- Our core JavaScript engine has 3 main parts:
  - Thread of execution
  - Memory/variable environment
  - Call stack
- We need to add some new components:
  - Web Browser APIs/Node background APIs
  - Promises
  - Event loop, Callback/Task queue and micro task queue.

JS usually runs a in **web browser**, which has features such as the JS engine, dev tools and a console, sockets, network requests (JS cannot *speak* to the internet), HTML DOM, a timer ⌛ and so on. The features can be used using JS through *façade* functions, that fronts the web browser features. `setTimeOut` would be the label for the timer, and `document` would be the label to the DOM, `fetch` for the feature that makes the networks requests, `console` for the console...

```js
// 0 nanoseconds since the start of the execution
function printHello(){ console.log("Hello"); }

// 1 nanoseconds since the start of the execution
/* JS throws that function to the browser, but nothing else, so it can go the next line.
Now this a job for the Timer feature of the browser, so it is going to start counting until 1000 ms. */
setTimeout(printHello,1000);

// 2 nanoseconds since the beginning
/* JS asks the browser's console to print that, and it does */
console.log("Me first!");

// 1 000 000 002 nanoseconds since the start
/* Now the browser prints Hello on the screen */
```

```js
function printHello(){ console.log("Hello"); }

function blockFor1Sec(){ //blocks in the JavaScript thread for 1 sec, we could think of it as a for loop with a bunch of code }

// 0 ms
/* It triggers the browser to start that timer, it will be completed
in 0 ms, BUT it will put that function in a 'Callback Queue'
(a queue of functions) and no mater how time have passed,
functions there wont go to the Call Stack (won't be run) until
the global execution context has finished */
setTimeout(printHello,0);

// 1ms, this code will be executed
blockFor1Sec()

// 1001ms, this code will be executed
console.log("Me first!");

// 1002ms, 'hello' will be printed out.
```

🤯 You could have an infinite while loop of console.log, and the queue would never dequeue printHello. It would never even grab it and put it on the call stack.

That seems insane, but it actually **allows us to be certain of when our code will run out of a queue**.

![alt text](<img/0sms execution context.png>)

*All regular code will run first until I ever touch anything from the queue, until I ever put anything out of the queue. So, how does JavaScript implement that?* → **Event Loop**: tiny JS feature that checks before every single line of code run if the call stack is empty. If there's still further global code to run, then it will not even go look at the queue. But if the call stack's empty or if it heads down to the queue, it grabs the function and it puts it on the call stack.

This was asynchronous JS until ES 6.

- **ES5 Web Browser APIs with callback functions**
  - Problems
    - Our response data is only available in the callback function - Callback hell
    - Maybe it feels a little odd to think of passing a function into another function only for it to run much later
  - Benefits
    - Super explicit once you understand how it works under-the-hood


