# Site — Lava Jato Beira Rio

Site estático (HTML + CSS + um arquivo JS). Sem build, sem dependências. Os links internos
são endereços sem extensão (`/servicos`), que o `nginx.conf` resolve — por isso, para
conferir no computador, rode o mesmo Nginx da VPS em vez de abrir o arquivo direto:

```bash
docker build -t lavajato . && docker run --rm -p 8080:80 lavajato
```

e abra <http://localhost:8080>.

## Estrutura

```
index.html          Início
servicos.html       Serviços e preços (tabela completa)
vonixx.html         Cera líquida Vonixx (serviço premium)
fotos.html          Galeria
contato.html        Contato, horários e mapa
privacidade.html    Política de privacidade (noindex, fora do sitemap)
ducha.html                      Ducha                              ┐
lavagem-interna-e-externa.html  Meia Sola                          │ páginas de serviço:
limpeza-interna.html            Limpeza interna                    │
lavagem-geral.html              Lavagem geral                      │ uma busca por página
lavagem-de-chassi.html          Lavagem de chassi                  │ ("<serviço> coronel fabriciano")
lavagem-de-moto.html            Lavagem de moto                    │
lavagem-de-motor.html           Lavagem de motor                   ┘
marketing/          Material de apoio (questionário dos donos etc.) — fora da imagem Docker
robots.txt
sitemap.xml
assets/css/styles.css
assets/js/main.js
assets/img/         favicon + fotos do lava jato
```

## Deploy

O `Dockerfile` serve os arquivos estáticos com Nginx — é o que a VPS (Easypanel) builda.
O `.dockerignore` mantém fora da imagem o README, o `.git` e os arquivos de design.

### Uma URL só para cada página

O site inteiro aponta para **`https://lavajatobeirario.com.br`** (sem `www`) nas URLs
canônicas, no `sitemap.xml`, no `robots.txt` e nos dados estruturados. Página que responde
em dois endereços diferentes o Google trata como duplicada e deixa uma delas fora do
índice, então o `nginx.conf` fecha os dois caminhos alternativos:

- `www.lavajatobeirario.com.br/...` → 301 para o mesmo caminho sem `www`.
- `/index.html` → 301 para `/`. Os links internos também apontam para `/`, não para
  `index.html` — era isso que fazia o Search Console listar a home como
  *"Página alternativa com tag canônica adequada"*.
- `/servicos.html` → 301 para `/servicos` (vale para toda página). O arquivo continua se
  chamando `servicos.html`; o Nginx é que serve `/servicos` a partir dele. Link novo,
  canonical e sitemap usam sempre o endereço sem `.html`.

O redirecionamento `http://` → `https://` é do proxy da VPS (Easypanel/Traefik) e é
esperado: é ele que aparece no relatório como *"Página com redirecionamento"*.

**No painel da VPS:** cadastre também o domínio `www.lavajatobeirario.com.br` e emita
certificado para ele. Sem isso o `www` responde com erro de certificado antes de o Nginx
conseguir redirecionar.

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
   | `higienizacao-interna.webp` | home + galeria + página Limpeza interna (o nome do arquivo ficou do nome antigo do serviço) |
   | `lavagem-externa.webp` | galeria |
   | `lavagem-de-motor.webp` | galeria |
   | `secagem-acabamento.webp` | galeria |
   | `interior-real.webp` | galeria — **foto real do box** |
   | `fachada-lava-jato-beira-rio.webp` | home, seção "Quem somos" + JSON-LD — **foto real da fachada** (placas dos clientes desfocadas) |
   | `lavagem-de-moto.webp` | galeria |
   | `roda-detalhe.webp` | fundo do topo da página Fotos |
   | `vonixx-carro-brilhando.webp` | banner da página Vonixx (1600×900) |
   | `vonixx-brilho.webp` | Vonixx — "Brilho profundo" |
   | `vonixx-hidrorrepelencia.webp` | Vonixx — "Água que escorre" |
   | `og-lava-jato-beira-rio.jpg` | compartilhamento no WhatsApp/Facebook (1200×630) |
   | `og-vonixx.jpg` | compartilhamento da página Vonixx (1200×630) |
   | `logo-icone-carro-frente.png` | logo no JSON-LD (Google usa no painel da empresa) — ver seção Marca |
   | `logo-icones-referencia.png` | folha de referência com variações de ícone; não é usada em nenhuma página |
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
  reais ("lava jato Coronel Fabriciano", "limpeza interna", "cera Vonixx").
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

A **política de privacidade** está em `/privacidade`, com link no aviso de cookies e no
rodapé de todas as páginas. O botão "Mudar minha escolha de cookies" reabre o aviso, para o
visitante revogar o consentimento. Ao adicionar qualquer ferramenta de medição nova
(Clarity, por exemplo), atualize a página **antes** de publicar a ferramenta. O CNPJ entra
na seção "Quem é o responsável" quando houver.

## Conferir se está tudo certo

- Dados estruturados: <https://search.google.com/test/rich-results>
- Velocidade e boas práticas: <https://pagespeed.web.dev/>

## Páginas de serviço

Cada serviço tem página própria, com a mesma estrutura: topo com WhatsApp, "o que inclui",
cartão de preço e prazo, perguntas frequentes (visíveis e em `FAQPage` no JSON-LD), outros
serviços e chamada final. O texto saiu das respostas dos donos em
`marketing/questionario-donos.md` — **nada de tempo ou preço inventado**.

Ao mudar um preço, atualize em três lugares: a página do serviço (cartão + JSON-LD
`Service`), a tabela em `servicos.html` e o `hasOfferCatalog` da home.

## O que é dinâmico no site

`assets/js/main.js` cuida de três coisas:

- menu no celular;
- seletor **Carro Pequeno / Carro Grande**, que troca os preços marcados com
  `data-preco-pequeno` e `data-preco-grande`;
- selo **Aberto agora / Fechado**, calculado pelo horário real do visitante. Os horários
  ficam na constante `HORARIOS` no topo do arquivo — mude ali se o funcionamento mudar.

## Marca

O logo oficial é o **carro de frente saindo da água**: carro azul-marinho, duas gotas azuis,
duas ondas verde-água e o brilho amarelo. Não redesenhe — use os arquivos abaixo, todos
gerados a partir do mesmo desenho (fundo transparente de verdade, bordas limpas):

| Arquivo | Uso |
|---|---|
| `logo-icone-carro-frente.png` | logo 512×512 transparente — JSON-LD e perfil do Google Empresas |
| `logo-cabecalho.png` | logo no topo de cada página — sem fundo, carro em **branco** (112px, exibido a 52px) |
| `favicon-48.png` | ícone da aba do navegador — sem fundo, carro branco com **contorno azul-marinho** |
| `apple-touch-icon.png` | ícone ao salvar o site na tela do iPhone (180×180, fundo branco) |

No topo o carro é branco porque o cabeçalho é escuro e o azul-marinho some sobre ele. No
favicon o contorno é o que garante leitura nos dois temas: na aba clara aparece o contorno,
na aba escura aparece o branco — nenhuma cor sozinha passa bem nos dois.

## Dados do negócio usados no site

- Telefone / WhatsApp: (31) 98718-8203 — links `wa.me/5531987188203`
- Endereço: R. Juscelino Kubitscheck, 126 — Mangueiras, Coronel Fabriciano - MG, 35171-291
  (grafia igual à do Perfil da Empresa no Google — use exatamente esta em todo cadastro externo)
- Horário: segunda a sábado, 7h às 17h · domingo fechado

Se algum desses mudar, atualize também o JSON-LD no `<head>` das páginas.
