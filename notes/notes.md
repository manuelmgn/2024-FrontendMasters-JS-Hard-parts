# Notes

## JavaScript Principles

- When JS code runs, it goes through the code **line-by-line** and runs each line - know as the **thread of execution**. JS only can handle 1 thread of execution.
- When JS code runs it saves 'data' like strings and arrays so we can use that data later - **in its memory**.
- Functions: Code we save ('define') functions and can use (call / invoke / execute / run) later with the function's name and ().
- **Execution context**: Created to run the code of a function. Has 2 parts: thread of execution and memory. *We need the thread of execution to call the function and the memory to take the data we're going to use and save new data. The first execution context is the global one, when we run our code. Then, we create new contexts by calling for functions and other pieces of code to execute, so we're creating contexts inside other contexts. We can see the relation between this and the scope*.

> [!NOTE]
> 
> Parameter vs argument 🪙
> 
> For the function `function multiplyBy2(inputNumber) {}`, been the inputNumber 3, `inputNumber` is the parameter, while 3 is the argument.
> 
> The parameter is sort of the placeholder that awaits, it's gonna receive the value when the function it's being run. And that value is the argument.
> 
> Value: anything that is stored.

### Call Stack

![alt text](img/callstack.png)

- JS keeps track of what function is currently running (where's the thread of execution)
- Run a function → add to call stack
- Finish running the function → Removes it from call stack
- Whatever is top of the call stack → That's the function we're currently running.
- When it finishes, it comes back to `global()`.
