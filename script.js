let lastSave = "";

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
  delayedSave();
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

  monsterName.value = "";
  monsterEvne.value = "";
  monsterUdh.value = "";
}

function saveGame() {
  console.log("saving");
  const udstyr = document
    .getElementById("udstyr")
    .getElementsByTagName("textarea")[0].value;
  const proviant = document
    .getElementById("proviant")
    .getElementsByTagName("textarea")[0].value;

  const skatte = document
    .getElementById("skatte")
    .getElementsByTagName("textarea")[0].value;

  const evneBase = document.getElementById("evneBase").value;
  const evneHistory = document.getElementById("evneHistory");
  let evneCurrent = "0";
  if (evneHistory.childElementCount) {
    evneCurrent = evneHistory.lastChild.innerText;
  }

  const udholdenhedBase = document.getElementById("udholdenhedBase").value;
  const udholdenhedHistory = document.getElementById("udholdenhedHistory");
  let udholdenhedCurrent = "0";
  if (udholdenhedHistory.childElementCount) {
    udholdenhedCurrent = udholdenhedHistory.lastChild.innerText;
  }

  const heldBase = document.getElementById("heldBase").value;
  const heldHistory = document.getElementById("heldHistory");
  let heldCurrent = "0";
  if (heldHistory.childElementCount) {
    heldCurrent = heldHistory.lastChild.innerText;
  }

  const guld = document.getElementById("guld").getElementsByTagName("input")[0]
    .value;
  const noter = document
    .getElementById("noter")
    .getElementsByTagName("textarea")[0].value;
  const data = {
    udstyr,
    proviant,
    skatte,
    evneBase,
    udholdenhedBase,
    heldBase,
    evneCurrent,
    udholdenhedCurrent,
    heldCurrent,
    guld,
    noter,
  };
  let save = "hello";
  if (lastSave) {
    save = lastSave;
  }
  localStorage.setItem(save, JSON.stringify(data));
  localStorage.setItem("lastSave", save);
}

function init() {
  const lastSave = localStorage.getItem("lastSave");
  if (lastSave) {
    load(lastSave);
  } else {
    console.log("No last save found");
  }
  const textareas = document.getElementsByTagName("textarea");
  if (textareas) {
    for (i = 0; i < textareas.length; i++) {
      textareas[i].addEventListener("input", delayedSave);
    }
  }
}

let saveDelay = null;

function delayedSave() {
  if (saveDelay) {
    clearTimeout(saveDelay);
  }
  saveDelay = setTimeout(saveGame, 1000);
}

function load(saveGame) {
  lastSave = saveGame;
  const load = localStorage.getItem(lastSave);
  if (load) {
    const save = JSON.parse(load);

    const udstyr = document
      .getElementById("udstyr")
      .getElementsByTagName("textarea")[0];
    udstyr.value = save.udstyr;

    const proviant = document
      .getElementById("proviant")
      .getElementsByTagName("textarea")[0];

    proviant.value = save.proviant;

    const skatte = document
      .getElementById("skatte")
      .getElementsByTagName("textarea")[0];
    skatte.value = save.skatte;

    const evneBase = document.getElementById("evneBase");
    evneBase.value = save.evneBase;

    const evneHistory = document.getElementById("evneHistory");
    if (save.evneCurrent > 0) {
      const span = document.createElement("span");
      span.textContent = save.evneCurrent;
      evneHistory.appendChild(span);
    }

    const udholdenhedBase = document.getElementById("udholdenhedBase");
    udholdenhedBase.value = save.udholdenhedBase;

    const udholdenhedHistory = document.getElementById("udholdenhedHistory");
    if (save.udholdenhedCurrent > 0) {
      const span = document.createElement("span");
      span.textContent = save.udholdenhedCurrent;
      udholdenhedHistory.appendChild(span);
    }

    const heldBase = document.getElementById("heldBase");
    heldBase.value = save.heldBase;

    const heldHistory = document.getElementById("heldHistory");
    if (save.heldCurrent > 0) {
      const span = document.createElement("span");
      span.textContent = save.heldCurrent;
      heldHistory.appendChild(span);
    }

    const guld = document
      .getElementById("guld")
      .getElementsByTagName("input")[0];
    guld.value = save.guld;

    const noter = document
      .getElementById("noter")
      .getElementsByTagName("textarea")[0];
    noter.value = save.noter;
  }
}

window.onload = init;
