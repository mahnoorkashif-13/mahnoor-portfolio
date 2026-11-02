// About me: types the paragraph once, the first time it scrolls into view.
// Untyped text stays in place but hidden, so the layout never moves.
(function () {
  var blocks = Array.prototype.slice.call(document.querySelectorAll(".typewriter"));
  if (!blocks.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var CHAR_DELAY = 8;      // milliseconds per character
  var PAUSE_DELAY = 70;    // extra pause after a sentence

  var lines = [];
  blocks.forEach(function (block) {
    Array.prototype.forEach.call(block.childNodes, function (node) {
      if (node.nodeType !== 3) return;
      lines.push({ node: node, text: node.data });
    });
  });
  lines.forEach(function (line) {
    var rest = document.createElement("span");
    rest.className = "typewriter-rest";
    rest.textContent = line.text;
    line.rest = rest;
    line.node.data = "";
    line.node.parentNode.insertBefore(rest, line.node.nextSibling);
  });

  var caret = document.createElement("span");
  caret.className = "typewriter-caret";
  caret.setAttribute("aria-hidden", "true");
  blocks.forEach(function (block) { block.setAttribute("aria-label", block.textContent); });

  function finish() {
    caret.remove();
    lines.forEach(function (line) {
      line.node.data = line.text;
      line.rest.remove();
    });
    blocks.forEach(function (block) { block.removeAttribute("aria-label"); });
  }

  function type(lineIndex, charIndex) {
    var line = lines[lineIndex];
    if (!line) { setTimeout(finish, 900); return; }
    if (charIndex > line.text.length) { type(lineIndex + 1, 1); return; }
    line.node.data = line.text.slice(0, charIndex);
    line.rest.textContent = line.text.slice(charIndex);
    line.node.parentNode.insertBefore(caret, line.rest);
    var typed = line.text.charAt(charIndex - 1);
    setTimeout(function () { type(lineIndex, charIndex + 1); },
      typed === "." ? CHAR_DELAY + PAUSE_DELAY : CHAR_DELAY);
  }

  var observer = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    type(0, 1);
  }, { threshold: 0.25 });
  observer.observe(blocks[0]);
})();

// About me: plays the camera sequence once, the first time the camera scrolls into view.
(function () {
  var rig = document.querySelector(".camera-rig");
  var body = document.querySelector(".camera-body");
  if (!rig || !body || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  rig.classList.add("is-armed");
  var observer = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    observer.disconnect();
    rig.classList.remove("is-armed");
    rig.classList.add("is-playing");
  }, { threshold: 0.3 });
  observer.observe(body);
})();

// Campus Career: keep the screen recordings still for visitors who prefer reduced motion.
(function () {
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  Array.prototype.forEach.call(document.querySelectorAll(".site-video"), function (video) {
    video.removeAttribute("autoplay");
    video.pause();
  });
})();

// Results: counts the 36K + figure up from 0 the first time it scrolls into view.
(function () {
  var count = document.querySelector(".stat-count");
  if (!count || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var TARGET = 36;
  var DURATION = 1800;   // milliseconds

  function start() {
    var began = null;
    function step(now) {
      if (began === null) began = now;
      var progress = Math.min((now - began) / DURATION, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      count.textContent = Math.round(eased * TARGET);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function prepare() {
    // Holds the width of "36" so the line stays centered while the digits change.
    count.style.width = count.offsetWidth + "px";
    count.textContent = "0";
    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      start();
    }, { threshold: 0.5 });
    observer.observe(count);
  }

  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(prepare);
})();

// Results: fades the three post phones in, the first time they scroll into view.
(function () {
  var phones = Array.prototype.slice.call(document.querySelectorAll(".reveal-phone"));
  if (!phones.length || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  phones.forEach(function (phone) { phone.classList.add("is-armed"); });
  var observer = new IntersectionObserver(function (entries) {
    if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
    observer.disconnect();
    phones.forEach(function (phone) {
      phone.classList.remove("is-armed");
      phone.classList.add("is-playing");
    });
  }, { threshold: 0.2 });
  phones.forEach(function (phone) { observer.observe(phone); });
})();
