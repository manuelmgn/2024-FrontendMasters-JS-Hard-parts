/* CHALLENGE 1 */

function sayHowdy() {
    console.log('Howdy');
  }
  
  function testMe() {
    setTimeout(sayHowdy, 0);
    console.log('Partnah');
  }
  // After thinking it through, uncomment the following line to check your guess!
  //testMe(); // what order should these log out? Howdy or Partnah first?
  
  
  /* CHALLENGE 2 */
  
  function delayedGreet() {
    function greet() {
      console.log('greet');
    }
    setTimeout(greet, 3000)
  }
  // Uncomment the following line to check your work!
   //delayedGreet(); // should log (after 3 seconds): welcome
  
  
  /* CHALLENGE 3 */
  
  function helloGoodbye() {
    function goodbye() {
      console.log('good bye')
    }
    console.log('hello');
    setTimeout(goodbye, 2000);
  }
  // Uncomment the following line to check your work!
  //helloGoodbye(); // should log: hello // should also log (after 3 seconds): good bye
  
  
  /* CHALLENGE 4 */
  
  function brokenRecord() {
    function hiagain() {
      console.log('hi again')
    }
    setInterval(hiagain, 1000);
   }
  // Uncomment the following line to check your work!
  //brokenRecord(); // should log (every second): hi again
  
  
  /* CHALLENGE 5 */
  
  function limitedRepeat() {
    let id;
    function printHi() {
      console.log("hi again");
    }
    function clear() {
      clearInterval(id);
    }
    printHi();
    id = setInterval(printHi, 1000);
    setTimeout(clear, 2000);
  }
  // Uncomment the following line to check your work!
  //limitedRepeat(); // should log (every second, for 5 seconds): hi for now
  
  
  /* CHALLENGE 6 */
  
  function everyXsecsForYsecs(func, interval, duration) {
    let id;
    function clear() {
      clearInterval(id)
    }
    id = setInterval(func, interval*1000)
    setTimeout(clear, duration*1000)
  }
  // Uncomment the following lines to check your work!
  function theEnd() {
     console.log('This is the end!');
  }
  
  //everyXsecsForYsecs(theEnd, 2, 20); // should invoke theEnd function every 2 seconds, for 20 seconds): This is the end!
  
  
  /* CHALLENGE 7 */
  
  function delayCounter(target, wait) {
    
    let i = 1;
    let id;
    
    function showNumber() {
      console.log(i++);
      if (i > target) {
        clearInterval(id);
      }
    }
    function delayedShowing() {
      id = setInterval(showNumber, wait);
    }
    return delayedShowing;
  }
  
  
  // UNCOMMENT THESE TO TEST YOUR WORK!
  const countLogger = delayCounter(3, 1000)
  countLogger();
  // After 1 second, log 1
  // After 2 seconds, log 2
  // After 3 seconds, log 3
  
  /* CHALLENGE 8 */
  
  function promised (val) {
    // ADD CODE HERE
  }
  
  // UNCOMMENT THESE TO TEST YOUR WORK!
  // const createPromise = promised('wait for it...');
  // createPromise.then((val) => console.log(val)); 
  // will log "wait for it..." to the console after 2 seconds
  
  /* CHALLENGE 9 */
  
  class SecondClock {
    constructor(cb) {
      // ADD CODE HERE
    }
    // ADD METHODS HERE
  }
  
  // UNCOMMENT THESE TO TEST YOUR WORK!
  // const clock = new SecondClock((val) => { console.log(val) });
  // console.log("Started Clock.");
  // clock.start();
  // setTimeout(() => {
  //     clock.reset();
  //     console.log("Stopped Clock after 6 seconds.");
  // }, 6000);
  
  /* CHALLENGE 10 */
  
  function debounce(callback, interval) {
    // ADD CODE HERE
  }
  
  // UNCOMMENT THESE TO TEST YOUR WORK!
  // function giveHi() { return 'hi'; }
  // const giveHiSometimes = debounce(giveHi, 3000);
  // console.log(giveHiSometimes()); // -> 'hi'
  // setTimeout(function() { console.log(giveHiSometimes()); }, 2000); // -> undefined
  // setTimeout(function() { console.log(giveHiSometimes()); }, 4000); // -> undefined
  // setTimeout(function() { console.log(giveHiSometimes()); }, 8000); // -> 'hi'
  
  