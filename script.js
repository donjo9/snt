let evne = null;
window.addEventListener("load", function () {
  evne = document.getElementById("evne");
});

function toggleRed() {
  evne.classList.toggle("red");
}

function changeHistory(historyButton) {
  const historyId = historyButton.getAttribute("data-history-id");
  const base = document.getElementById(historyId + "Base");
  const change = document.getElementById(historyId + "Change");
  const historyField = document.getElementById(historyId + "History");
  let value = 0;
  if (historyField.childElementCount > 0) {
    const oldValue = Number(historyField.lastChild.textContent);
    if (oldValue < 0) {
      return;
    }
    value = oldValue + Number(change.value);
  } else {
    value = Number(base.value) + Number(change.value);
  }
  const span = document.createElement("span");
  span.innerText = value;
  historyField.appendChild(span);
}
