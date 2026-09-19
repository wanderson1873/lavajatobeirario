# Search Console — o que fazer depois das páginas novas

O site subiu de 5 para 12 endereços. O `sitemap.xml` já está no ar, atualizado, com as 12
páginas e a data de hoje. O que falta é tudo dentro de
[search.google.com/search-console](https://search.google.com/search-console).

---

## 1. Conferir qual propriedade você usa (1 min)

No canto superior esquerdo aparece o nome da propriedade.

- Se for **`lavajatobeirario.com.br`** (tipo *Domínio*), está ótimo: cobre com e sem `www`.
- Se for **`https://lavajatobeirario.com.br`** (tipo *Prefixo do URL*), funciona, mas vale
  criar também a de *Domínio* — ela pega tudo de uma vez. A verificação é por um registro
  TXT no painel onde o domínio está registrado.

Se a propriedade for `http://` ou com `www`, crie a correta: o site inteiro responde em
`https://lavajatobeirario.com.br`, sem `www`.

## 2. Reenviar o sitemap (2 min)

Menu **Sitemaps** → em *Adicionar novo sitemap*, digite:

```
sitemap.xml
```

→ **Enviar**. Se já houver um enviado antes, pode deixar: o Google relê o arquivo. O status
vira "Êxito" em alguns minutos, e o número de páginas descobertas (12) aparece em 1 a 3 dias.

## 3. Pedir indexação das 8 páginas novas ou alteradas (10 min)

Cole cada endereço na **barra de inspeção de URL** (a lupa no topo), espere o resultado e
clique em **Solicitar indexação**. Dá para fazer umas 10 por dia.

Na ordem de importância:

```
https://lavajatobeirario.com.br/lavagem-interna-e-externa
https://lavajatobeirario.com.br/lavagem-geral
https://lavajatobeirario.com.br/limpeza-interna
https://lavajatobeirario.com.br/ducha
https://lavajatobeirario.com.br/lavagem-de-motor
https://lavajatobeirario.com.br/lavagem-de-chassi
https://lavajatobeirario.com.br/lavagem-de-moto
https://lavajatobeirario.com.br/
```

A home entra porque ganhou a seção "Quem somos" e o endereço completo.

## 4. O que é normal aparecer no relatório (e não é erro)

Menu **Páginas**:

- **"Página com redirecionamento"** — os endereços antigos terminados em `.html`
  (`/servicos.html`, `/contato.html`…). É o comportamento certo: eles levam para o endereço
  novo. Some sozinho com o tempo.
- **"Excluída por tag noindex"** — `/privacidade` e a página de erro 404. De propósito.
- **"Rastreada, mas não indexada no momento"** — página nova esperando a vez. Normal por
  algumas semanas em site recente; só vira problema se ficar assim por mais de 2 meses.
- **"Descoberta, não indexada"** — idem, o Google achou e ainda não visitou.

## 5. Ligar o Search Console ao Analytics (2 min)

No **GA4** (não aqui): *Administrador → Links do Search Console → Vincular*. Depois disso
você vê, dentro do Analytics, quais buscas trouxeram gente ao site.

## 6. Acompanhar as buscas que interessam (todo mês)

Menu **Desempenho** → *Nova* → **Consulta** → *Contém* → digite `lava jato`. Marque também
**Posição média** no topo. As buscas para acompanhar:

- lava jato coronel fabriciano
- lava jato perto de mim
- lavagem interna e externa coronel fabriciano
- lavagem de motor coronel fabriciano
- limpeza interna de carro coronel fabriciano

Anote a posição no dia 1º de cada mês, junto com os outros números do relatório mensal.

## 7. De brinde: o mesmo sitemap no Bing (3 min)

Em [bing.com/webmasters](https://www.bing.com/webmasters), escolha **Importar do Google
Search Console** — ele traz o site e o sitemap prontos. Como o Bing Places já está feito,
isso fecha o lado da Microsoft.

---

## Conferido em 18/09/2026 (não precisa mexer)

- As 12 páginas respondem com código 200.
- Cada uma aponta para si mesma na tag canônica, no endereço sem `.html`.
- Todas liberadas para indexação, menos `/privacidade` e a 404, que são `noindex` de propósito.
- `robots.txt` libera tudo e indica o sitemap.
- `sitemap.xml` com 12 endereços e data de 18/09/2026.
