# Lava Jato Beira Rio

Site oficial do Lava Jato Beira Rio — Coronel Fabriciano, MG.

## Estrutura

Site estático multi-página, sem build (HTML + CSS + JS puro):

```
index.html        # Início
servicos.html      # Serviços e preços
vonixx.html         # Serviço premium — cera líquida Vonixx
fotos.html          # Galeria de fotos
contato.html        # Contato, endereço e horários
assets/
  css/style.css    # Estilos globais
  js/main.js       # Menu mobile, rodapé, gotinhas decorativas, destaque do dia
  img/             # Logo e fotos (ver assets/img/README.md)
robots.txt
sitemap.xml
```

## Fluxo de branches

- `main` — produção (o que está publicado).
- `dev` — desenvolvimento e testes de novos recursos. Todo trabalho novo começa aqui; quando validado, é mesclado para `main`.

## Rodar localmente

Basta abrir o `index.html` no navegador, ou servir com qualquer servidor estático:

```bash
npx serve .
```

## Adicionar fotos e logo

Veja [`assets/img/README.md`](assets/img/README.md) — basta salvar os arquivos com os nomes indicados que eles substituem os espaços reservados automaticamente.

## Deploy

Este projeto inclui um `Dockerfile` que serve os arquivos estáticos com Nginx — pronto para deploy no Easypanel (ou qualquer plataforma que builde a partir de um Dockerfile).
