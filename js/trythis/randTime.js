console.log('연습문제 294p');
const randTime = (val) =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000 * Math.random(), val);
  });
console.log(new Date());
randTime(100).then((res) => console.log(res, new Date()));
[1, 2, 3, 4, 5].forEach((a) => randTime(a).then(console.log(res, new Date())));

console.log('연습문제 295p');
const depthTime = (sec) =>
  new Promise((resolve, reject) => {
    console.log(`depth${sec}`, new Date());
    setTimeout(() => {
      if (sec >= 3) reject(new Error('Already 3-depth'));
    });
  });
