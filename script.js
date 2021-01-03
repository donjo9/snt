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
  if (Number(change.value) === 0 || Number(base.value) === 0) {
    return;
  }
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

function dmgMonster(monsterId) {
  const monster = document.getElementById(monsterId);
  const change = Number(document.getElementById(monsterId + "Change").value);
  if (change == 0) {
    return;
  }
  const history = document.getElementById(monsterId + "History");
  const currentUdh = Number(history.lastChild.textContent);
  if (currentUdh <= 0) {
    return;
  }
  const newValue = currentUdh + change;
  const newUdh = document.createElement("span");
  newUdh.textContent = newValue;
  if (Number(newValue) <= 0) {
    monster.classList.add("dead");
  }
  history.appendChild(newUdh);
}

function addMonster() {
  const monsterName = document.getElementById("monsterName");
  const monsterEvne = document.getElementById("monsterEvne");
  const monsterUdh = document.getElementById("monsterUdh");

  if (
    monsterName.value == "" ||
    monsterEvne.value == "" ||
    monsterUdh.value == ""
  ) {
    return;
  }

  const monsterContainer = document.getElementById("monsterContainer");
  const monsterId = "monster" + monsterContainer.childElementCount;
  const monster = document.createElement("div");
  monster.classList.add("monster");

  monster.setAttribute("id", monsterId);

  const name = document.createElement("span");
  name.textContent = monsterName.value;

  const dmgControl = document.createElement("div");
  const dmgInput = document.createElement("input");
  dmgInput.classList.add("numbers", "inputBox", "box");
  dmgInput.setAttribute("type", "number");
  dmgInput.setAttribute("value", -2);
  dmgInput.setAttribute("id", monsterId + "Change");

  const dmgButton = document.createElement("button");
  dmgButton.textContent = "Dmg";
  const evne = document.createTextNode("Evne ");
  dmgButton.onclick = () => dmgMonster(monsterId);

  const evneValue = document.createElement("span");
  evneValue.textContent = monsterEvne.value;

  const nl = document.createElement("br");
  const udholdenhed = document.createTextNode("Udholdenhed");

  const udholdenhedHistory = document.createElement("div");
  udholdenhedHistory.classList.add("history");
  udholdenhedHistory.setAttribute("id", monsterId + "History");

  const initialUdh = document.createElement("span");
  initialUdh.textContent = monsterUdh.value;

  dmgControl.appendChild(dmgInput);
  dmgControl.appendChild(dmgButton);

  udholdenhedHistory.appendChild(initialUdh);

  monster.appendChild(name);
  monster.appendChild(dmgControl);
  monster.appendChild(evne);
  monster.appendChild(evneValue);
  monster.appendChild(nl);
  monster.appendChild(udholdenhed);
  monster.appendChild(udholdenhedHistory);

  monsterContainer.appendChild(monster);
}
