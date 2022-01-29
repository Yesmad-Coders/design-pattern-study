function delay(sec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(2);
    }, sec * 1000);
  });
}

let view = new Proxy(
  {
    selected: null,
  },
  {
    set: function (obj, prop, newval) {
      console.log(obj, prop, newval);
      let oldval = obj[prop];

      if (prop === "selected") {
        if (oldval) {
          oldval.setAttribute("aria-selected", "false");
        }
        if (newval) {
          newval.setAttribute("aria-selected", "true");
        }
      }

      // The default behavior to store the value
      obj[prop] = newval;

      // Indicate success
      return true;
    },
  }
);

(async () => {
  await delay(2);
  let i1 = (view.selected = document.getElementById("item-1")); //giving error here, i1 is null
  console.log(i1.getAttribute("aria-selected"));
  //  'true'

  await delay(2);
  let i2 = (view.selected = document.getElementById("item-2"));
  console.log(i1.getAttribute("aria-selected"));
  //  'false'

  await delay(2);
  console.log(i2.getAttribute("aria-selected"));
  //  'true'
  // Note: even if selected: !null, then giving oldval.setAttribute is not a function
})();
