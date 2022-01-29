function delay(sec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, sec * 1000);
  });
}
