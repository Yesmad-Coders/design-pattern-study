import Counter from "./counter";

const button = document.getElementById("red");
button.addEventListener("click", () => {
  console.log("Counter total: ", Counter.increment());
});
