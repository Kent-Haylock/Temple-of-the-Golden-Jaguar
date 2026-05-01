const storyText = document.getElementById("storyText");
const choiceButtons = document.getElementById("choiceButtons");
const sceneImage = document.getElementById("sceneImage");
const inventoryText = document.getElementById("inventoryText");
const restartBtn = document.getElementById("restartBtn");
const soundToggle = document.getElementById("soundToggle");

let inventory = [];
let soundOn = true;

const bgSound = new Audio("freesound_community-monk-chant-temple-fantasy-23124.mp3");
bgSound.loop = true;
bgSound.volume = 0.4; 

const scenes = {
  entrance: {
    title: "Temple Entrance",
    text: "You stand at the entrance of an ancient jungle temple hidden deep in the Belizean rainforest. Thick vines cover the stone doorway, and carvings of jaguars guard the entrance.",
    image: "images/temple-entrance.jpeg",
    sound: "jungle",
    choices: [
      { text: "Enter the temple", nextScene: "hallway" },
      { text: "Inspect the jaguar carvings", nextScene: "carvings" },
      { text: "Walk around the temple", nextScene: "jungleEncounter" }
    ]
  },

  hallway: {
    title: "Dark Temple Hallway",
    text: "You step inside the temple. The hallway is dark and silent. Torches line the walls, but none are lit. At the end of the hallway, you see two paths.",
    image: "images/dark-hallway.jpeg",
    choices: [
      { text: "Light a torch", nextScene: "symbols", item: "Torch" },
      { text: "Walk forward in darkness", nextScene: "spikeTrap" },
      { text: "Take the left passage", nextScene: "river" }
    ]
  },

  symbols: {
    title: "Hidden Symbols",
    text: "The torch flickers to life. Strange symbols appear on the wall. One symbol shows a jaguar. Another shows a snake. A stone door waits ahead.",
    image: "images/symbols.jpeg",
    choices: [
      { text: "Press the jaguar symbol", nextScene: "treasure" },
      { text: "Press the snake symbol", nextScene: "pitTrap" }
    ]
  },

  treasure: {
    title: "Golden Jaguar Chamber",
    text: "The stone door slides open. In the centre of the chamber sits the Golden Jaguar statue glowing in the darkness. You have found the treasure and survived the temple.",
    image: "images/golden-jaguar.jpeg",
    ending: "Treasure Ending - You Win",
    choices: []
  },

  pitTrap: {
    title: "Trap Room",
    text: "You press the snake symbol. The floor collapses beneath you, and you fall into a deep trap pit hidden below the temple.",
    image: "images/trap-room.jpeg",
    ending: "Trap Ending - Game Over",
    choices: []
  },

  spikeTrap: {
    title: "Spike Trap",
    text: "You move carefully through the darkness. Suddenly, you hear a loud click. Spikes shoot from the walls before you can react.",
    image: "Spike Trap",
    ending: "Spike Trap Ending - Game Over",
    choices: []
  },

  river: {
    title: "Underground River",
    text: "The passage opens into an underground river flowing beneath the temple. A small stone boat is tied to the shore.",
    image: "Underground River",
    choices: [
      { text: "Take the boat", nextScene: "escape" },
      { text: "Follow the river path", nextScene: "hiddenPath" }
    ]
  },

  escape: {
    title: "Hidden River Escape",
    text: "The boat carries you through a narrow tunnel and out into the jungle. You escape safely, but the Golden Jaguar remains hidden.",
    image: "images/river-escape.jpeg",
    ending: "Escape Ending",
    choices: []
  },

  hiddenPath: {
    title: "Hidden Path",
    text: "You follow the river path and find a cracked wall. Behind it, you notice a faint golden glow.",
    image: "images/hidden-path.jpeg",
    choices: [
      { text: "Break through the cracked wall", nextScene: "treasure" },
      { text: "Return to the river", nextScene: "river" }
    ]
  },

  carvings: {
    title: "Jaguar Carvings",
    text: "You study the jaguar carvings closely. Behind one of the stones, you discover a hidden lever.",
    image: "images/jaguar-carvings.jpeg",
    choices: [
      { text: "Pull the hidden lever", nextScene: "secretEntrance" },
      { text: "Ignore it and enter the temple", nextScene: "hallway" }
    ]
  },

  secretEntrance: {
    title: "Secret Entrance",
    text: "A stone doorway opens beside the temple. The passage leads directly into a secret chamber filled with golden light.",
    image: "images/secret-entrance.jpeg",
    choices: [
      { text: "Enter the secret chamber", nextScene: "secretTreasure" }
    ]
  },

  secretTreasure: {
    title: "Secret Treasure Ending",
    text: "You quietly enter the chamber and discover the Golden Jaguar statue. By carefully observing the temple, you found the safest path.",
    image: "images/secret-treasure.jpeg",
    ending: "Secret Treasure Ending - You Win",
    choices: []
  },

  jungleEncounter: {
    title: "Jungle Encounter",
    text: "You walk around the back of the temple. The trees rustle. A jaguar suddenly appears from the bushes and watches you carefully.",
    image: "images/jaguar-encounter.jpeg",
    choices: [
      { text: "Run away", nextScene: "jaguarEnding" },
      { text: "Stay still", nextScene: "safeEnding" }
    ]
  },

  jaguarEnding: {
    title: "Jaguar Ending",
    text: "You panic and run. The jaguar reacts quickly, blocking your path. Your adventure ends in the jungle.",
    image: "images/jaguar-ending.jpeg",
    ending: "Jaguar Ending - Game Over",
    choices: []
  },

  safeEnding: {
    title: "Safe Escape",
    text: "You stay still and avoid threatening the jaguar. After a few tense moments, it disappears into the jungle. You leave safely with a story to tell.",
    image: "images/safe-escape2.jpeg",
    ending: "Safe Escape Ending",
    choices: []
  }
};

function startGame() {
  inventory = [];
  showScene("entrance");
}

function showScene(sceneKey) {
  const scene = scenes[sceneKey];

  storyText.innerHTML = `<strong>${scene.title}</strong><br><br>${scene.text}`;
  sceneImage.style.backgroundImage = `url('${scene.image}')`;
  sceneImage.textContent = "";

  choiceButtons.innerHTML = "";

  if (scene.ending) {
    const endingMessage = document.createElement("p");
    endingMessage.classList.add("ending-message");
    endingMessage.textContent = scene.ending;
    choiceButtons.appendChild(endingMessage);
  }

  scene.choices.forEach(choice => {
    const button = document.createElement("button");
    button.textContent = choice.text;

    button.addEventListener("click", () => {
      if (choice.item && !inventory.includes(choice.item)) {
        inventory.push(choice.item);
      }

      updateInventory();
      showScene(choice.nextScene);
    });

    choiceButtons.appendChild(button);
  });

  updateInventory();
}

function updateInventory() {
  if (inventory.length === 0) {
    inventoryText.textContent = "Inventory: Empty";
  } else {
    inventoryText.textContent = "Inventory: " + inventory.join(", ");
  }
}

restartBtn.addEventListener("click", startGame);

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.textContent = soundOn ? "Sound: On" : "Sound: Off";
});

startGame();
