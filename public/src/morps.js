const Timeout = setTimeout(delay, 4000);
window.onload = function () {
  const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2"),
  };

  const texts = [
    { name: "Oshada", color: "rgb(251, 255, 0)" },
    { name: "Bhanuka", color: "#3d8aad" },
    { name: "Ruhini", color: "chartreuse" },
    { name: "Faizul", color: "rgb(255, 85, 0)" },
  ];

  const morphTime = 1;
  const cooldownTime = 0.25;

  let textIndex = 0;
  let time = new Date();
  let morph = 0;
  let cooldown = cooldownTime;

  elts.text1.textContent = texts[textIndex % texts.length].name;
  elts.text1.style.color = texts[textIndex % texts.length].color;
  elts.text2.textContent = texts[(textIndex + 1) % texts.length].name;
  elts.text2.style.color = texts[(textIndex + 1) % texts.length].color;

  function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }

    setMorph(fraction);
  }

  function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length].name;
    elts.text1.style.color = texts[textIndex % texts.length].color;
    elts.text2.textContent = texts[(textIndex + 1) % texts.length].name;
    elts.text2.style.color = texts[(textIndex + 1) % texts.length].color;
  }

  function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
  }

  function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrementIndex) {
        textIndex++;
      }

      if (textIndex >= texts.length) {
        // Stop animation
        return;
      }

      doMorph();
    } else {
      doCooldown();
    }
  }

  animate();
};
