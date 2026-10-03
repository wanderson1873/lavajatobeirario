/* Lava Jato Beira Rio — comportamentos da interface */
(function () {
  'use strict';

  /* ---------- menu no celular ---------- */
  var menuBtn = document.querySelector('[data-menu-btn]');
  var nav = document.querySelector('[data-nav]');

  function fecharMenu() {
    if (!nav || !nav.classList.contains('aberto')) return;
    nav.classList.remove('aberto');
    menuBtn.setAttribute('aria-expanded', 'false');
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function (evento) {
      evento.stopPropagation();
      var aberto = nav.classList.toggle('aberto');
      menuBtn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && nav.classList.contains('aberto')) {
        fecharMenu();
        menuBtn.focus();
      }
    });

    document.addEventListener('click', function (evento) {
      if (!nav.contains(evento.target)) fecharMenu();
    });
  }

  /* ---------- seletor carro pequeno / carro grande ---------- */
  var seletores = document.querySelectorAll('[data-seletor-porte]');

  function aplicarPorte(porte) {
    document.querySelectorAll('[data-preco-pequeno]').forEach(function (el) {
      var valor = el.getAttribute('data-preco-' + porte);
      if (valor) el.innerHTML = valor;
    });

    document.querySelectorAll('[data-seletor-porte] button').forEach(function (btn) {
      var ativo = btn.getAttribute('data-porte') === porte;
      btn.classList.toggle('ativo', ativo);
      btn.setAttribute('aria-pressed', ativo ? 'true' : 'false');
    });
  }

  seletores.forEach(function (seletor) {
    seletor.addEventListener('click', function (evento) {
      var btn = evento.target.closest('button[data-porte]');
      if (btn) aplicarPorte(btn.getAttribute('data-porte'));
    });
  });

  /* ---------- horário: aberto ou fechado agora ---------- */
  // 0 = domingo ... 6 = sábado. null = fechado o dia inteiro.
  var HORARIOS = {
    0: null,
    1: [7, 17],
    2: [7, 17],
    3: [7, 17],
    4: [7, 17],
    5: [7, 17],
    6: [7, 17]
  };

  var selo = document.querySelector('[data-status-horario]');
  var linhasDia = document.querySelectorAll('[data-dia]');

  function agoraEmMinutos(data) {
    return data.getHours() * 60 + data.getMinutes();
  }

  function proximoDiaAberto(diaAtual) {
    for (var i = 1; i <= 7; i++) {
      var dia = (diaAtual + i) % 7;
      if (HORARIOS[dia]) return { dia: dia, abre: HORARIOS[dia][0] };
    }
    return null;
  }

  function atualizarStatus() {
    var agora = new Date();
    var dia = agora.getDay();
    var faixa = HORARIOS[dia];
    var minutos = agoraEmMinutos(agora);

    linhasDia.forEach(function (linha) {
      linha.classList.toggle('hoje', Number(linha.getAttribute('data-dia')) === dia);
    });

    if (!selo) return;

    var aberto = !!faixa && minutos >= faixa[0] * 60 && minutos < faixa[1] * 60;
    selo.classList.remove('selo-status--neutro');
    selo.classList.toggle('selo-status--aberto', aberto);
    selo.classList.toggle('selo-status--fechado', !aberto);

    var texto;
    if (aberto) {
      texto = 'Aberto agora · fecha às ' + faixa[1] + 'h';
    } else if (faixa && minutos < faixa[0] * 60) {
      texto = 'Fechado · abre hoje às ' + faixa[0] + 'h';
    } else {
      var proximo = proximoDiaAberto(dia);
      var nomes = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
      texto = proximo
        ? 'Fechado · abre ' + nomes[proximo.dia] + ' às ' + proximo.abre + 'h'
        : 'Fechado';
    }

    selo.innerHTML = '<span class="ponto" aria-hidden="true"></span>' + texto;
  }

  atualizarStatus();
  setInterval(atualizarStatus, 60000);

  /* ---------- ano no rodapé ---------- */
  document.querySelectorAll('[data-ano]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- medição: Google Analytics e Microsoft Clarity (LGPD) ----------
     Não há aviso de cookies: a base é o legítimo interesse, explicado em
     /privacidade. O <head> já entra com analytics_storage: 'granted' (Consent
     Mode v2) e o Clarity é carregado aqui, para todo visitante.
     Quem toca em "Parar de medir este aparelho" fica com ljbr-medicao = 'parado'
     no localStorage: o <head> deixa de carregar o Tag Manager e o Clarity não é
     baixado. O contador próprio tem a saída dele, logo abaixo. */

  var CLARITY_ID = 'ykiggfw89n';
  var medicaoParada = window.ljbrMedicaoParada === true;

  // escolha do aviso antigo (Aceitar/Recusar): não vale mais
  try { localStorage.removeItem('ljbr-cookies'); } catch (e) { /* modo anônimo */ }

  /* Microsoft Clarity (mapa de calor e gravação da navegação). */
  function carregarClarity() {
    if (window.clarity || document.getElementById('clarity-ljbr')) return;
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    var tag = document.createElement('script');
    tag.id = 'clarity-ljbr';
    tag.async = true;
    tag.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
    document.head.appendChild(tag);
  }

  if (!medicaoParada) carregarClarity();

  /* ---------- "Parar de medir este aparelho" (página de privacidade) ---------- */
  document.querySelectorAll('[data-medicao-parar]').forEach(function (btn) {
    if (medicaoParada) { btn.textContent = 'Este aparelho já não é medido'; btn.disabled = true; }
    btn.addEventListener('click', function () {
      try { localStorage.setItem('ljbr-medicao', 'parado'); } catch (e) { /* modo anônimo: só não lembra */ }
      window.ljbrMedicaoParada = true;
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { analytics_storage: 'denied' });
      }
      // apaga os cookies do Analytics (_ga, _ga_XXXX), gravados no domínio principal
      var dominio = location.hostname.replace(/^www\./, '');
      document.cookie.split(';').forEach(function (par) {
        var nome = par.split('=')[0].trim();
        if (nome.indexOf('_ga') !== 0) return;
        ['', '; domain=' + dominio, '; domain=.' + dominio].forEach(function (d) {
          document.cookie = nome + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      });
      if (typeof window.clarity === 'function') {
        window.clarity('consent', false); // apaga os cookies do Clarity
        window.clarity('stop');
      }
      btn.textContent = 'Pronto: este aparelho não é mais medido';
      btn.disabled = true;
    });
  });

  /* ---------- medição de contato ----------
     Visita não é o número que importa aqui: o que vale é quanta gente
     clicou para falar com o lava jato. Cada clique é empurrado para o
     dataLayer; quem transforma isso em evento do GA4 é o Tag Manager. */

  function ondeEsta(el) {
    if (el.closest('.wa-flutuante')) return 'botao-flutuante';
    if (el.closest('.topo')) return 'menu-topo';
    if (el.closest('.hero')) return 'topo-da-pagina';
    if (el.closest('.faixa-cta')) return 'chamada-final';
    if (el.closest('.faixa-premium')) return 'faixa-vonixx';
    if (el.closest('.card-contato')) return 'cartao-contato';
    if (el.closest('.card-resumo')) return 'cartao-servico';
    if (el.closest('.quem-somos')) return 'quem-somos';
    if (el.closest('.rodape')) return 'rodape';
    return 'outro';
  }

  // o contador próprio (s.derson.cloud/s.js) usa os mesmos nomes de botão
  window.ptgOndeEsta = ondeEsta;

  /* ---------- "Não contar minhas visitas" (página de privacidade) ---------- */
  document.querySelectorAll('[data-contador-sair]').forEach(function (btn) {
    var parado = false;
    try { parado = localStorage.getItem('ptg_ignorar') === '1'; } catch (e) { /* modo anônimo */ }
    if (parado) { btn.textContent = 'Suas visitas já não são contadas'; btn.disabled = true; }
    btn.addEventListener('click', function () {
      try { localStorage.setItem('ptg_ignorar', '1'); } catch (e) { /* modo anônimo */ }
      btn.textContent = 'Pronto: suas visitas não são mais contadas';
      btn.disabled = true;
    });
  });

  function medir(evento, parametros) {
    if (!window.dataLayer) return;
    var dados = { event: evento };
    for (var chave in parametros) {
      if (Object.prototype.hasOwnProperty.call(parametros, chave)) dados[chave] = parametros[chave];
    }
    window.dataLayer.push(dados);
  }

  document.addEventListener('click', function (evento) {
    var link = evento.target.closest('a[href]');
    if (!link) return;

    var destino = link.getAttribute('href') || '';
    var base = { local: ondeEsta(link), pagina: document.title };

    if (destino.indexOf('wa.me') !== -1) medir('clique_whatsapp', base);
    else if (destino.indexOf('tel:') === 0) medir('clique_telefone', base);
    else if (destino.indexOf('maps.app.goo.gl') !== -1) medir('clique_rota', base);
  });

  document.querySelectorAll('[data-seletor-porte]').forEach(function (seletor) {
    seletor.addEventListener('click', function (evento) {
      var btn = evento.target.closest('button[data-porte]');
      if (btn) medir('selecionou_porte', { porte: btn.getAttribute('data-porte'), pagina: document.title });
    });
  });
})();
