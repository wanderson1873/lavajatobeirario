# Site — Lava Jato Beira Rio

Site estático (HTML + CSS + um arquivo JS). Sem build, sem dependências: dá para abrir
`index.html` direto no navegador e publicar em qualquer hospedagem (GitHub Pages, Netlify,
Vercel, Hostinger, cPanel).

## Estrutura

```
index.html          Início
servicos.html       Serviços e preços (tabela completa)
vonixx.html         Cera líquida Vonixx (serviço premium)
fotos.html          Galeria
contato.html        Contato, horários e mapa
robots.txt
sitemap.xml
assets/css/styles.css
assets/js/main.js
assets/img/         favicon + fotos do lava jato
```

## Deploy

O `Dockerfile` serve os arquivos estáticos com Nginx — é o que a VPS (Easypanel) builda.
O `.dockerignore` mantém fora da imagem o README, o `.git` e os arquivos de design.

O site inteiro aponta para **`https://lavajatobeirario.com.br`** (sem `www`) nas URLs
canônicas, no `sitemap.xml`, no `robots.txt` e nos dados estruturados. Se a VPS redirecionar
o domínio raiz para `www`, troque para a versão com `www` nesses arquivos — canonical que
não bate com a URL servida confunde o Google.

## Ainda pendente

1. **Trocar as fotos pelas suas.** Só `interior-real.webp` é foto do próprio box (painel
   do Fiat Uno, recortada e tratada a partir da foto de celular). Todas as outras são do
   Unsplash, de licença livre para uso comercial e sem exigência de crédito: ilustram os
   serviços, mas não são carros atendidos aqui — por isso a galeria traz a linha "Parte
   das imagens ainda é ilustrativa". Assim que tiver fotos suas, sobrescreva os arquivos
   mantendo o mesmo nome (e apague aquela linha em `fotos.html`).

   | Arquivo | Onde aparece |
   | --- | --- |
   | `lavagem-completa.webp` | home + galeria |
   | `rodas-e-pneus.webp` | home + galeria |
   | `acabamento-vonixx.webp` | home + galeria + Vonixx "Aplicação caprichada" |
   | `higienizacao-interna.webp` | home + galeria |
   | `lavagem-externa.webp` | galeria |
   | `lavagem-de-motor.webp` | galeria |
   | `secagem-acabamento.webp` | galeria |
   | `interior-real.webp` | galeria — **foto real do box** |
   | `lavagem-de-moto.webp` | galeria |
   | `roda-detalhe.webp` | fundo do topo da página Fotos |
   | `vonixx-carro-brilhando.webp` | banner da página Vonixx (1600×900) |
   | `vonixx-brilho.webp` | Vonixx — "Brilho profundo" |
   | `vonixx-hidrorrepelencia.webp` | Vonixx — "Água que escorre" |
   | `og-lava-jato-beira-rio.jpg` | compartilhamento no WhatsApp/Facebook (1200×630) |
   | `og-vonixx.jpg` | compartilhamento da página Vonixx (1200×630) |
   | `logo-lava-jato-beira-rio.png` | logo no JSON-LD (Google usa no painel da empresa) |
   | `apple-touch-icon.png` | ícone ao salvar o site na tela do iPhone |

   As fotos exibidas no site estão em **WebP**, 44% mais leves que JPG — isso conta como
   nota de velocidade no Google. As duas de compartilhamento seguem em JPG de propósito:
   alguns leitores de link ainda engasgam com WebP.

   Para converter uma foto sua (Python com Pillow instalado):

   ```bash
   python -c "from PIL import Image; im=Image.open('minha-foto.jpg'); im.thumbnail((1200,1200)); im.save('assets/img/lavagem-completa.webp','WEBP',quality=82)"
   ```

   Use 1200×900px (4:3) para a galeria. Ao trocar, atualize também o `alt` da
   imagem descrevendo a cena — o texto alternativo conta para a busca de imagens do Google.
   Foto de celular bem tirada (carro seco, luz do dia, mesmo ângulo no antes e depois)
   rende mais que imagem de banco.

3. **Imagem de compartilhamento.** `assets/img/og-lava-jato-beira-rio.jpg` (1200×630px) é
   o que aparece quando alguém manda o link no WhatsApp, Instagram ou Facebook. Vale muito
   trocar por uma foto real do seu lava jato.

## Fotos que valem a pena tirar

Das 6 fotos do celular que você mandou, só a do painel aguentou o recorte — as outras
tinham fundo de zinco, mancha no chão, placa do cliente à mostra ou porta-malas escuro
demais. Para substituir as ilustrativas, o que rende foto boa:

- **Luz do dia, na sombra** (nunca sol a pino em cima do carro nem contraluz).
- **Carro seco e finalizado**, nunca no meio do serviço com a sujeira aparecendo.
- **Fundo limpo**: encoste o carro numa parede lisa ou enquadre só a parte do carro —
  zinco, entulho, placa de outra loja e mancha de óleo no chão estragam a foto.
- **Deitada (horizontal)**, agachado na altura do farol, a uns 3 passos do carro.
- **Antes e depois no mesmo ângulo**, mesma distância e mesma hora do dia.
- Evite a placa do cliente no enquadramento.

## SEO já configurado

- `<title>` e `<meta name="description">` próprios em cada página, escritos com as buscas
  reais ("lava jato Coronel Fabriciano", "higienização interna", "cera Vonixx").
- URL canônica, Open Graph e Twitter Card em todas as páginas.
- Dados estruturados JSON-LD: `AutoWash` com endereço, telefone, coordenadas, horários,
  faixa de preço e catálogo de serviços na home; `Service` + `FAQPage` em serviços;
  `Service` com os dois preços no Vonixx; `BreadcrumbList` nas páginas internas.
- HTML semântico (`header`, `main`, `section`, `h1` único por página), `lang="pt-BR"`,
  fontes com `preconnect` e `display=swap`.
- `robots.txt` e `sitemap.xml` prontos.

**Depois de publicar:** cadastre o site no [Google Search Console](https://search.google.com/search-console),
envie o `sitemap.xml` e coloque o endereço do site no seu **perfil do Google Empresas** —
para lava jato, o perfil do Google é o que mais traz cliente, e o site reforça o ranqueamento local.

## Google Analytics

A tag do GA4 (`G-ZM7JJXZCMG`) está no `<head>` das 6 páginas, incluindo a 404. Se um dia
trocar de propriedade, é localizar e substituir esse ID.

Três coisas para acertar no painel do Analytics depois de publicar:

- **Excluir seu próprio acesso.** Em *Administrador → Streams de dados → Configurar
  definições da tag → Definir tráfego interno*, cadastre seu IP. Sem isso, cada vez que
  você abre o site para conferir vira "visita".
- **Só conta com o site no ar.** Abrindo por `file://` ou `localhost` o número não vale —
  o GA precisa do domínio real.
- **Ligue o Search Console ao Analytics** (*Administrador → Links do Search Console*),
  para ver quais buscas trouxeram gente.

### Eventos que o site já envia

Visita não é o número que importa aqui — o que vale é quanta gente clicou para falar com
o lava jato. O `main.js` envia quatro eventos, todos com o parâmetro `local`, que diz de
qual botão da página veio o clique (`menu-topo`, `topo-da-pagina`, `botao-flutuante`,
`chamada-final`, `faixa-vonixx`, `cartao-contato`, `rodape`):

| Evento | Quando dispara |
| --- | --- |
| `clique_whatsapp` | qualquer link do WhatsApp, em qualquer página |
| `clique_telefone` | clique no telefone (celular disca direto) |
| `clique_rota` | clique em "Como chegar" / Google Maps |
| `selecionou_porte` | trocou entre Carro Pequeno e Carro Grande |

**Transforme `clique_whatsapp` em conversão:** no GA4, *Administrador → Eventos principais
→ Marcar como evento principal*. O evento aparece na lista depois do primeiro clique real
(pode levar até 24h). A partir daí você vê quantos orçamentos o site gerou por mês, e o
`local` mostra qual botão puxa mais — dá para cortar os que ninguém usa.

### Aviso de cookies (LGPD)

O site entra com o Analytics **bloqueado** (Consent Mode v2, `analytics_storage: denied`).
Nenhum cookie é gravado antes do visitante clicar em "Aceitar" no aviso que aparece no
rodapé. Se ele recusar, o site funciona igual e o Analytics continua sem gravar nada —
só os eventos acima seguem sendo contados de forma anônima, sem identificar quem é.

A escolha fica no `localStorage` do navegador dele (chave `ljbr-cookies`) e o aviso não
volta a aparecer. Enquanto o aviso está na tela, o botão flutuante do WhatsApp fica
escondido, para os dois não se sobreporem no celular.

Para tirar o aviso, apague o bloco `<div class="cookies">` das 6 páginas — mas aí o certo
é liberar o consentimento por padrão no `<head>`, ou você fica medindo nada.

Falta uma **página de política de privacidade** para fechar o requisito da LGPD por
completo. Se quiser, eu escrevo.

## Conferir se está tudo certo

- Dados estruturados: <https://search.google.com/test/rich-results>
- Velocidade e boas práticas: <https://pagespeed.web.dev/>

## O que é dinâmico no site

`assets/js/main.js` cuida de três coisas:

- menu no celular;
- seletor **Carro Pequeno / Carro Grande**, que troca os preços marcados com
  `data-preco-pequeno` e `data-preco-grande`;
- selo **Aberto agora / Fechado**, calculado pelo horário real do visitante. Os horários
  ficam na constante `HORARIOS` no topo do arquivo — mude ali se o funcionamento mudar.

## Marca

O símbolo no topo e o favicon são SVG desenhados direto no HTML — em `assets/img/favicon.svg`
e no `<svg>` dentro do `<a class="marca">` de cada página. É um redesenho do logo original,
mantendo o conceito: carro, onda e o brilho. Traço mais grosso e formas mais fechadas, para
continuar legível a 16px na aba do navegador — tamanho em que o logo original vira borrão.

O logo original está em `Downloads/lavajatobeirario/img/lava-jato-beira-rio-logo.png`
(1774×887). Use ele em papel, adesivo e fachada; no site fica o SVG, que não pixeliza em
tela nenhuma e pesa menos de 1 KB.

Se quiser o SVG novo como arquivo solto (para adesivo, camiseta ou o perfil do Google
Empresas), é só pedir que eu exporto.

## Dados do negócio usados no site

- Telefone / WhatsApp: (31) 98718-8203 — links `wa.me/5531987188203`
- Endereço: R. Juscelino Kubitscheck, 126 — Coronel Fabriciano, MG
- Horário: segunda a sábado, 7h às 17h · domingo fechado

Se algum desses mudar, atualize também o JSON-LD no `<head>` das páginas.
