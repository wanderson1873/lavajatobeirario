# Tag Manager e Clarity — o que falta fazer no painel

O site já está publicado com o **Google Tag Manager `GTM-PXQNS4SG`** e com o **Microsoft
Clarity `ykiggfw89n`**.

- **Clarity:** pronto, não precisa mexer em nada. Ele é carregado pelo próprio site, só
  depois que o visitante clica em "Aceitar" no aviso de cookies.
- **Google Analytics:** **parado até você terminar os passos abaixo.** O código antigo do
  GA4 saiu das páginas; agora quem carrega o Analytics é o Tag Manager, e o contêiner ainda
  está vazio. Enquanto não publicar, o site não registra visita nenhuma.

Leva uns 20 minutos em [tagmanager.google.com](https://tagmanager.google.com), no contêiner
`GTM-PXQNS4SG`.

---

## 1. Criar as três variáveis (3 min)

Menu **Variáveis** → em *Variáveis definidas pelo usuário*, clique em **Nova** → **Variável
da camada de dados**. Faça três vezes:

| Nome da variável na camada de dados | Nome que você dá à variável |
|---|---|
| `local` | `dlv - local` |
| `pagina` | `dlv - pagina` |
| `porte` | `dlv - porte` |

## 2. Criar a tag do Google Analytics (3 min)

**Tags → Nova → Configuração da tag → Tag do Google**

- **ID da tag:** `G-ZM7JJXZCMG`
- **Acionamento:** *Consentimento inicializado - Todas as páginas* (Consent Initialization).
  Se não aparecer, use *Inicialização - Todas as páginas*.
- **Nome da tag:** `GA4 - Tag do Google`
- Não mexa em "Configurações de consentimento": a tag do Google já entende sozinha o
  bloqueio que o site envia antes dela.

## 3. Criar os quatro acionadores (5 min)

**Acionadores → Novo → Evento personalizado.** O nome do evento precisa ser escrito
exatamente assim (minúsculo, com underline):

| Nome do evento | Nome do acionador |
|---|---|
| `clique_whatsapp` | `Evento - clique_whatsapp` |
| `clique_telefone` | `Evento - clique_telefone` |
| `clique_rota` | `Evento - clique_rota` |
| `selecionou_porte` | `Evento - selecionou_porte` |

## 4. Criar as quatro tags de evento do GA4 (7 min)

**Tags → Nova → Configuração da tag → Google Analytics: evento do GA4.** Em todas, o ID de
medição é `G-ZM7JJXZCMG`.

| Nome da tag | Nome do evento | Parâmetros | Acionador |
|---|---|---|---|
| `GA4 - clique_whatsapp` | `clique_whatsapp` | `local` = `{{dlv - local}}` · `pagina` = `{{dlv - pagina}}` | Evento - clique_whatsapp |
| `GA4 - clique_telefone` | `clique_telefone` | `local` = `{{dlv - local}}` · `pagina` = `{{dlv - pagina}}` | Evento - clique_telefone |
| `GA4 - clique_rota` | `clique_rota` | `local` = `{{dlv - local}}` · `pagina` = `{{dlv - pagina}}` | Evento - clique_rota |
| `GA4 - selecionou_porte` | `selecionou_porte` | `porte` = `{{dlv - porte}}` · `pagina` = `{{dlv - pagina}}` | Evento - selecionou_porte |

O parâmetro `local` diz de qual botão veio o clique: `menu-topo`, `topo-da-pagina`,
`botao-flutuante`, `chamada-final`, `faixa-vonixx`, `cartao-contato`, `cartao-servico`,
`quem-somos` ou `rodape`.

## 5. Testar antes de publicar (3 min)

Clique em **Visualizar**, digite `https://lavajatobeirario.com.br` e continue. O site abre
com a barra do Tag Assistant embaixo.

1. Clique em **Aceitar** no aviso de cookies.
2. Clique em **Chamar no WhatsApp** (pode fechar a aba do WhatsApp em seguida).
3. Na janela do Tag Assistant, o evento `clique_whatsapp` deve aparecer na lista da
   esquerda e a tag `GA4 - clique_whatsapp` em *Tags disparadas*.

## 6. Publicar (1 min)

Botão **Enviar** → **Publicar**. **Nada funciona antes disso** — em visualização, só você vê.

## 7. Depois de publicar

- **GA4 → Relatórios → Tempo real:** abra o site no celular, aceite os cookies e veja se a
  visita aparece em um ou dois minutos.
- **GA4 → Administrador → Eventos principais:** marque `clique_whatsapp` como evento
  principal. Ele só aparece na lista depois do primeiro clique real (pode levar 24h).
- **GA4 → Administrador → Definições personalizadas:** crie a dimensão personalizada
  `local` (escopo de evento, parâmetro `local`). Sem isso os relatórios não deixam separar
  por botão.
- **GA4 → Administrador → Tráfego interno:** cadastre o seu IP, para as suas visitas não
  entrarem na conta.
- **Clarity → Settings → Integrations:** dá para ligar o Clarity ao GA4 e ver as gravações
  a partir dos relatórios do Analytics.

---

## Duas coisas para não fazer

1. **Não crie uma tag do Clarity no Tag Manager.** O Clarity já está no código do site; se
   entrar também pelo Tag Manager, cada visita é gravada duas vezes.
2. **Não cole nenhum código de GA4 ou gtag direto no site.** Toda a medição passa pelo Tag
   Manager agora; dois códigos ao mesmo tempo contam cada visita em dobro.
