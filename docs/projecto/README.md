# Quadro de Recordações de Viagem — Professor Hwang Jorge

Projecto de execução de um quadro de parede para expor uma nota de cada país
visitado, com o nome do país. Preparado a partir da publicação do Professor
Hwang Jorge e da fotografia que a acompanha.

## O que entregar

| Ficheiro | Para quem |
| --- | --- |
| `Projecto-Quadro-Recordacoes.pdf` | O documento a enviar ao Professor e ao carpinteiro (13 páginas, A4). |
| `quadro-recordacoes.html` | A mesma coisa em HTML, auto-contido (imagens embutidas). Só para consulta no ecrã. |

O carpinteiro precisa das páginas 6 (alçado cotado), 8 (corte e camadas),
9 (mapa de furação), 10 (lista de corte), 11 (ferragens) e 12 (montagem).

## Medidas principais

| | |
| --- | --- |
| Exterior | 886 × 716 mm |
| Painel (acrílico, máscara, fundo) | 820 × 650 mm |
| Vão visível | 796 × 626 mm |
| Perfil da moldura | 45 × 38 mm, rebaixo 12 × 20 mm |
| Janelas | 16 × (166 × 86 mm) |
| Peso estimado | ≈ 10,3 kg |

A janela de 166 × 86 mm é única para todos os países: serve a nota mais larga
da colecção (1 Dólar, 156 mm), a mais alta (100 Pula, 75 mm) e praticamente
qualquer nota do mundo.

## Sobre as imagens das notas

As imagens em `public/projecto/notas/` são **recortes da fotografia enviada
pelo cliente** (`public/projecto/coleccao-original.jpg`), rectificados por
transformação de perspectiva. Não foram produzidas nem reproduzidas imagens de
moeda para este dossier — o que se vê são as notas reais do Professor.

As dimensões de cada nota são as oficiais dos bancos emissores e estão citadas
na última página do PDF.

## Como voltar a gerar

```bash
node scripts/projecto/build-pdf.mjs   # ou: npm run projecto
```

Precisa de Chromium. O script usa `/opt/pw-browsers/chromium` por omissão;
noutra máquina, indicar o caminho em `CHROME_BIN`.

Toda a geometria, a lista de corte e as ferragens vêm de
`scripts/projecto/spec.mjs` — é o único sítio a alterar. Os desenhos, as
tabelas e os totais recalculam-se a partir daí.
