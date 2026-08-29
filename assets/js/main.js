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

  /* ---------- consentimento de cookies (LGPD) ----------
     O Google Analytics entra com analytics_storage: 'denied' no <head>.
     Só depois do "Aceitar" a permissão é liberada. A escolha fica no
     navegador do visitante, em localStorage, e não é enviada a lugar nenhum. */

  var CHAVE = 'ljbr-cookies';
  var aviso = document.querySelector('[data-cookies]');

  function guardar(valor) {
    try { localStorage.setItem(CHAVE, valor); } catch (e) { /* modo anônimo: só não lembra */ }
  }

  function lerEscolha() {
    try { return localStorage.getItem(CHAVE); } catch (e) { return null; }
  }

  function liberarAnalytics() {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }

  function esconderAviso() {
    if (!aviso) return;
    aviso.hidden = true;
    document.body.classList.remove('com-cookies');
  }

  if (aviso) {
    var escolha = lerEscolha();

    if (escolha === 'aceito') {
      liberarAnalytics();
    } else if (escolha !== 'recusado') {
      aviso.hidden = false;
      document.body.classList.add('com-cookies');
    }

    var btnAceitar = aviso.querySelector('[data-cookies-aceitar]');
    var btnRecusar = aviso.querySelector('[data-cookies-recusar]');

    if (btnAceitar) btnAceitar.addEventListener('click', function () {
      guardar('aceito');
      liberarAnalytics();
      esconderAviso();
    });

    if (btnRecusar) btnRecusar.addEventListener('click', function () {
      guardar('recusado');
      esconderAviso();
    });
  }

  /* ---------- medição de contato ----------
     Visita não é o número que importa aqui: o que vale é quanta gente
     clicou para falar com o lava jato. Cada clique vira um evento no GA4. */

  function ondeEsta(el) {
    if (el.closest('.wa-flutuante')) return 'botao-flutuante';
    if (el.closest('.topo')) return 'menu-topo';
    if (el.closest('.hero')) return 'topo-da-pagina';
    if (el.closest('.faixa-cta')) return 'chamada-final';
    if (el.closest('.faixa-premium')) return 'faixa-vonixx';
    if (el.closest('.card-contato')) return 'cartao-contato';
    if (el.closest('.rodape')) return 'rodape';
    return 'outro';
  }

  function medir(evento, parametros) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', evento, parametros);
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
