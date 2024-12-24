const isHighSurrogate = s => s && (s.charCodeAt(0) | 0x3ff) === 0xdfff;
const lastCodepoint = s => {
  const c = s[s.length - 1];
  return isHighSurrogate(c) ? s[s.length - 2] + c : c
}

const d1 = '';
const d2 = '\u0301';
const d3 = '\u0308';
const d4 = '\u0302';
const underdot = '\u0323';
const isMac = /Mac/.test(navigator.platform);

if (isMac) {
  for (const e of document.getElementsByClassName("ctrl-plus")) {
    e.innerText = "⌘";
  }
}

const toneKeys = new Map([
  ['2', d2],
  ['3', d3],
  ['4', d4],
]);

const compose = new Map([
  ['i', 'ı'],
  ['w', 'ꝡ'],
  ['W', 'Ꝡ'],
  ['ı0', 'i'],
  ['ꝡ0', 'w'],
  ['<<', '«'],
  ['<:', '‹'],
  ['>>', '»'],
  ['>:', '›'],
  ['[[', '⟦'],
  [']]', '⟧'],
]);

const deraniLayout = new Map([
  ["q", "󱛂"],
  ["w", "󱛁"],
  ["e", "󱚴"],
  ["r", "󱚻"],
  ["t", "󱚷"],
  ["y", "󱚱"],
  ["u", "󱚲"],
  ["i", "󱚹"],
  ["o", "󱛃"],
  ["p", "󱚳"],
  ["a", "󱚺"],
  ["s", "󱚺"],
  ["d", "󱚶"],
  ["f", "󱚴"],
  ["g", "󱛃"],
  ["h", "󱛆"],
  ["j", "󱚾"],
  ["k", "󱛄"],
  ["l", "󱚼"],
  [";", "󱛅"],
  ["z", "󱚸"],
  ["x", "󱚽"],
  ["c", "󱚹"],
  ["v", "󱚿"],
  ["b", "󱚲"],
  ["n", "󱚵"],
  ["m", "󱚰"],
  ["-", "󱛒"],
  ["'", "󱛓"],
  [",", "󱛔"],
  [".", "󱛕"],
  ["!", "󱛖"],
  ["?", "󱛗"],
  ["[", "󱛘"],
  ["]", "󱛙"],
  ["=", "󱛚"],
]);

const fallingDiphthongs = new Map([
  ["ai", "󱚶"],
  ["ao", "󱚳"],
  ["ei", "󱚸"],
  ["oi", "󱚽"],
])

const toneToDerani = {
  '\u0301': "\u{f16ca}",
  '\u0308': "\u{f16cb}",
  '\u0302': "\u{f16cc}",
};

const qwertyKeyboard = [
  [
    { code: "Backquote", key: "`", width: 1 },
    { code: "Digit1", key: "1", width: 1 },
    { code: "Digit2", key: "2", width: 1 },
    { code: "Digit3", key: "3", width: 1 },
    { code: "Digit4", key: "4", width: 1 },
    { code: "Digit5", key: "5", width: 1 },
    { code: "Digit6", key: "6", width: 1 },
    { code: "Digit7", key: "7", width: 1 },
    { code: "Digit8", key: "8", width: 1 },
    { code: "Digit9", key: "9", width: 1 },
    { code: "Digit0", key: "0", width: 1 },
    { code: "Minus", key: "-", width: 1 },
    { code: "Equal", key: "=", width: 1 },
    { code: "Backspace", key: "Backspace", width: 2 },
  ],
  [
    { code: "Tab", key: "Tab", width: 1.5 },
    { code: "KeyQ", key: "q", width: 1 },
    { code: "KeyW", key: "w", width: 1 },
    { code: "KeyE", key: "e", width: 1 },
    { code: "KeyR", key: "r", width: 1 },
    { code: "KeyT", key: "t", width: 1 },
    { code: "KeyY", key: "y", width: 1 },
    { code: "KeyU", key: "u", width: 1 },
    { code: "KeyI", key: "i", width: 1 },
    { code: "KeyO", key: "o", width: 1 },
    { code: "KeyP", key: "p", width: 1 },
    { code: "BracketLeft", key: "[", width: 1 },
    { code: "BracketRight", key: "]", width: 1 },
    { code: "Backslash", key: "\\", width: 1.5 },
  ],
  [
    { code: "CapsLock", key: "CapsLock", width: 1.75 },
    { code: "KeyA", key: "a", width: 1 },
    { code: "KeyS", key: "s", width: 1 },
    { code: "KeyD", key: "d", width: 1 },
    { code: "KeyF", key: "f", width: 1 },
    { code: "KeyG", key: "g", width: 1 },
    { code: "KeyH", key: "h", width: 1 },
    { code: "KeyJ", key: "j", width: 1 },
    { code: "KeyK", key: "k", width: 1 },
    { code: "KeyL", key: "l", width: 1 },
    { code: "Semicolon", key: ";", width: 1 },
    { code: "Quote", key: "'", width: 1 },
    { code: "Enter", key: "Enter", width: 2.25 },
  ],
  [
    { code: "ShiftLeft", key: "Shift", width: 2.25 },
    { code: "KeyZ", key: "z", width: 1 },
    { code: "KeyX", key: "x", width: 1 },
    { code: "KeyC", key: "c", width: 1 },
    { code: "KeyV", key: "v", width: 1 },
    { code: "KeyB", key: "b", width: 1 },
    { code: "KeyN", key: "n", width: 1 },
    { code: "KeyM", key: "m", width: 1 },
    { code: "Comma", key: ",", width: 1 },
    { code: "Period", key: ".", width: 1 },
    { code: "Slash", key: "/", width: 1 },
    { code: "ShiftRight", key: "Shift", width: 2.25 },
  ],
]

const learnedCodeToKeyMapping = new Map(qwertyKeyboard.flatMap(row => row.map(key => [key.code, key.key])));

// "" | "official" | "reform";
let deraniMode = "";

function keyboardLabel(key) {
  const keyName = learnedCodeToKeyMapping.get(key.code) ?? key.key;
  const label = deraniMode ? (deraniLayout.get(keyName) ?? keyName) : compose.get(keyName) ?? keyName;
  switch (label) {
    case "CapsLock": return "Caps";
    case "Backspace": return "⌫";
    case "Control": return "Ctrl";
    case "󱛘": return "󱛘󱛅";
    case "󱛙": return "󱛘󱛅󱛙";
    case " ": return "Space";
    default: return label;
  }
}

function renderKeyboard() {
  const rowDivs = []
  for (const row of qwertyKeyboard) {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";
    for (const key of row) {
      const keyDiv = document.createElement("div");
      keyDiv.className = "keyboard-key";
      if (key.key.length !== 1) keyDiv.className += " key-wide";
      if (["2", "3", "4"].includes(key.key)) keyDiv.className += " key-tone";
      if (key.key === "-" && !deraniMode) keyDiv.className += " key-tone";
      if (!learnedCodeToKeyMapping.has(key.code)) keyDiv.className += " key-unlearned";
      keyDiv.innerText = keyboardLabel(key);
      keyDiv.style.flex = key.width;
      rowDiv.appendChild(keyDiv);
    }
    rowDivs.push(rowDiv);
  }
  document.getElementById("keyboard").replaceChildren(...rowDivs);
}

const
  QUOTE_MARKERS = "mı shu mo 󱚰󱚹 󱛀󱚲 󱚰󱛃".split(/ /),
  DETERMINERS = "ló ké sá sía tú túq báq já hí ní hú 󱚼󱛃 󱛄󱚴 󱚺󱚺 󱚺󱚹󱛍󱚺 󱚷󱚲 󱚷󱚲󱛂 󱚲󱚺󱛂 󱚾󱚺 󱛆󱚹 󱚵󱚹 󱛆󱚲".split(/ /),
  CONJUNCTIONS = "róı rú rá ró rí kéo 󱚻󱛃󱛎󱚹 󱚻󱛊 󱚻󱚲 󱚻󱚺 󱚻󱛃 󱚻󱚹 󱛄󱚴󱛍󱛃".split(/ /),
  RISING_TONE_ILLOCUTIONS = "móq 󱚰󱛃󱛂".split(/ /),
  FOCUS_MARKERS = "kú tó béı máo júaq 󱛄󱚲 󱚷󱛃 󱚲󱚴󱛎󱚹 󱚲󱚸 󱚰󱚺󱛎󱛃 󱚰󱚳 󱚾󱚲󱛍󱚺󱛂".split(/ /),
  CLEFT_CONSTRUCTIONS = "bï nä gö 󱚲󱚹 󱚵󱚺 󱛃󱛃".split(/ /),
  PARENTHETICALS = "kïo 󱛄󱚹󱛍󱛃".split(/ /),
  VOCATIVES = "hóı 󱛆󱛃󱛎󱚹".split(/ /),
  EXOPHORIC_PRONOUNS = "jí súq nháo súna nhána úmo íme súho áma há 󱚾󱚹 󱚺󱚲󱛂 󱚽󱚺󱛎󱛃 󱚽󱚳 󱚺󱚲󱚵󱚺 󱚽󱚺󱚵󱚺 󱚲󱚰󱛃 󱚹󱚰󱚴 󱚺󱚲󱛆󱛃 󱚺󱚰󱚺 󱛆󱚺".split(/ /),
  ENDOPHORIC_PRONOUNS = "hó máq tá hóq áq chéq hóa 󱛆󱛃 󱚰󱚺󱛂 󱚷󱚺 󱛆󱛃󱛂 󱚺󱛂 󱚿󱚴󱛂 󱛆󱛃󱛍󱚺".split(/ /),
  PRONOUNS = [].concat(EXOPHORIC_PRONOUNS, ENDOPHORIC_PRONOUNS);

const wordTones = new Map([
  ...[...PRONOUNS,
  ...QUOTE_MARKERS,
  ...FOCUS_MARKERS,
  ...DETERMINERS,
  ...CONJUNCTIONS,
  ...VOCATIVES,
  ...RISING_TONE_ILLOCUTIONS]
    .map(w => [adorn(w, ''), d2]),
  ...[..."ꝡe ju la 󱛁󱚴 󱚾󱚲 󱚼󱚺".split(/ /), // d3-only complementizers
  ...CLEFT_CONSTRUCTIONS,
  ...PARENTHETICALS]
    .map(w => [adorn(w, ''), d3])
]);

const reWordAtEnd = /[\p{L}'’\u{f16b0}-\u{f16cf}]+1?$/iu;
const reConvertKey = /^([ ,.;:?!…>»"'“”‘’]|Enter)$/iu;

// Add a tone to a vowel, syllable, or word.
// adorn('u',       t3) === 'ü'       (normalized)
// adorn('fıeq',    t2) === 'fíeq'    (normalized)
// adorn('Ruqshua', t4) === 'Rûqshua' (normalized)
function adorn(text, tone) {
  // console.log(text, tone);
  text = text
    .normalize("NFKD").replace(/[\u0300-\u030f\u{f16ca}-\u{f16cc}]/gu, '');
  if (deraniMode) {
    return text.replace(/[󱚰-󱛀󱛂󱛃󱛄󱛆]/iu, v => v + toneToDerani[tone]);
  } else {
    return normalizeToaq(text.replace(/[aeıiou]/iu, v => v.replace('ı', 'i') + tone));
  }
}

// Add an underdot to the last position in a word, and remove all others
// (assuming the user will continue typing without calling this fn again)
//
// adornUnderdot('bọhạbuq') === 'bohabụq' (normalized)
function adornUnderdot(text) {
  text = text.normalize("NFKD").replace(/\u0323/g, '');
  // is there seriously no better way to do this?
  let match, lastMatch;
  let re = /(?:[aeıiou]\p{Mn}*)+/giu;
  while (match = re.exec(text)) {
    lastMatch = match;
  }
  // add 1 to skip past the first vowel, that's where we insert the diacritic
  let i = lastMatch.index + 1;
  text = text.slice(0, i) + underdot + text.slice(i);
  return normalizeToaq(text);
}

// Unicode NFC normalization will normalize ị̂ as ị+◌̂, which looks bad; switch those cases out for î+◌̣
// Also, swap `i` for `ı`
function normalizeToaq(text) {
  return text
    .normalize()
    .replace(
      /([ạẹịọụ])(\p{Mn}+)/giu,
      (_, v, ds) => (v.normalize("NFD")[0] + ds).normalize() + underdot
    )
    .replace('i', 'ı');
}

// Add automatic diacritics to an input word.
function convert(word) {
  // trailing 1: force no tone marker
  if (/1$/.test(word)) {
    return adorn(word.slice(0, -1), '');
  }
  // otherwise: insert default tone if we have one
  let wordTone = wordTones.get(word.toLowerCase());
  if (wordTone) word = adorn(word, wordTone);
  word = word.replace(/󱚰$/u, "󱚱");
  return word;
}

let lastKey = '';
const vowels = ["a", "e", "i", "o", "u"];
const reLetter = /\p{L}|[\u{f16b0}-\u{f16cf}]/iu;

function onKaiInput(e) {
  let ch, tone;
  const size = (e.data ?? "").length;
  if (/delete/.test(e.inputType)) lastKey = '';
  // document.getElementById("help-summary").innerText = `d:${e.data} c:${e.isComposing}`;

  let buf = kai.value.substring(0, kai.selectionStart - size);
  const post = kai.value.substring(kai.selectionEnd);

  for (const key of [...e.data ?? ""]) {
    const previous = lastCodepoint(buf) || "";
    const previousWasLetter = reLetter.test(previous);
    let letter = deraniMode ? deraniLayout.get(key.toLowerCase()) ?? key : key;

    // Attach underdot.
    if (previous === '-' && reLetter.test(letter)) {
      buf = buf.substring(0, buf.length - 1).replace(reWordAtEnd, adornUnderdot)
        + ("aeıiou".includes(letter) ? "'" : '');
    }

    if (deraniMode && letter === " " && /󱛘[^󱛙]*$/u.test(buf)) {
      // DERANI COMPATIBILITY NON-BREAKING SPACE
      letter = "\u{f16db}";
    }

    // Compose characters.
    if (ch = compose.get(letter)) {
      buf = buf + ch;
    } else if (ch = compose.get(previous + letter)) {
      buf = buf.replace(/.$/u, ch);

      // Attach tones.
    } else if ((tone = toneKeys.get(letter))
      // Digits only act as tone converters right after a letter:
      && previousWasLetter
    ) {
      // Manually add a tone to the last word.
      buf = buf.replace(reWordAtEnd, word => adorn(word, tone));
    } else if (reConvertKey.test(letter)) {
      // Automatically add tones to the last word.
      buf = buf.replace(reWordAtEnd, convert) + letter;

    } else if (deraniMode && lastKey === "s" && key === "h") {
      buf = buf.replace(/.$/u, "󱛀");
    } else if (deraniMode && lastKey === "c" && key === "h") {
      buf = buf.replace(/.$/u, "󱚿");
    } else if (deraniMode && lastKey === "n" && key === "h") {
      buf = buf.replace(/.$/u, "󱚽");
    } else if (deraniMode && vowels.includes(lastKey) && vowels.includes(key)) {
      const falling = fallingDiphthongs.get(lastKey + key)
      if (deraniMode === "reform" && falling) {
        buf = buf.replace(/.$/u, falling);
      } else {
        buf += falling ? "󱛎" : "󱛍";
        buf += letter;
      }
    } else {

      buf += letter;
    }
    lastKey = key;
  }

  kai.value = buf + post;
  kai.selectionStart = kai.selectionEnd = buf.length;
  localStorage.setItem('kai', kai.value);
  // document.getElementById('derani').innerText = deranı_from_latin_cs(buf.trim(), []);
  renderKeyboard();
}

function onKaiKeydown(e) {
  if ((isMac ? e.metaKey : e.ctrlKey) && e.key === "/") {
    e.preventDefault();
    toggleDeraniMode();
    return;
  }
  if (e.ctrlKey || e.metaKey) return;
  renderKeyboard();
  if (e.shiftKey || e.altKey) return;
  const old = learnedCodeToKeyMapping.get(e.code);
  if (old && e.key !== old) {
    learnedCodeToKeyMapping.clear();
  }
  learnedCodeToKeyMapping.set(e.code, e.key);
}

renderKeyboard();

function toggleDeraniMode() {
  deraniMode = deraniMode === "official" ? "reform" : deraniMode === "reform" ? "" : "official";
  document.getElementById("derani-mode").value = deraniMode;
  renderKeyboard();
}

function setDeraniMode(element) {
  deraniMode = element.value;
  renderKeyboard();
}

function clearTextbox() {
  const kai = document.getElementById('kai');
  if (kai.value.length < 50 || confirm("Iu sheaja há káıtıaı bá? / Really clear the textbox?")) kai.value = '';
}

function copyToClipboard(contents) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(contents);
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = contents;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("copyToClipboard failed:", { description, err, contents });
    }
    document.body.removeChild(textArea);
  }
}

function copyTextbox() {
  const kai = document.getElementById('kai');
  if (!kai.value) return;
  copyToClipboard(kai.value);
  document.getElementById('kopinua').innerHTML = `<i class="far fa-copy" style="transform:rotate(20deg)"></i> Hao ka~`;
  kai.selectionStart = 0;
  kai.selectionEnd = kai.value.length;
  kai.focus();
  setTimeout(() => {
    document.getElementById('kopinua').innerHTML = `<i class="far fa-copy"></i> Kopınua`;
  }, 800);
}


