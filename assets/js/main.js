// Lava Jato Beira Rio — script global (nav mobile, ano do rodapé, gotinhas e destaque do dia)
(function () {
  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  // Ano no rodapé
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // Gotinhas decorativas em qualquer .drops presente na página
  document.querySelectorAll('.drops').forEach(function (container) {
    var count = 20;
    for (var i = 0; i < count; i++) {
      var d = document.createElement('span');
      var left = Math.random() * 100;
      var duration = 6 + Math.random() * 8;
      var delay = Math.random() * 10;
      var size = 4 + Math.random() * 6;
      d.style.left = left + 'vw';
      d.style.width = size + 'px';
      d.style.height = size + 'px';
      d.style.animationDuration = duration + 's';
      d.style.animationDelay = delay + 's';
      container.appendChild(d);
    }
  });

  // Destaca o dia atual na tabela de horários (se presente)
  var todayRow = document.querySelector('[data-day="' + new Date().getDay() + '"]');
  if (todayRow) { todayRow.classList.add('today'); }
})();
