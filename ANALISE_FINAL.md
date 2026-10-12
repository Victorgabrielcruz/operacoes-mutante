# Análise final: meta superior a 98%

Validação realizada em 12/10/2026 com Node.js 24.19.0, Jest 29.7.0 e StrykerJS 10.0.0.

**Pontuação final exibida pelo Stryker: 99,51%, sem mutantes ignorados ou exclusões de mutadores.** A etapa anterior, com apenas alterações nos testes, permanece documentada em [ANALISE_TESTES.md](ANALISE_TESTES.md).

## Mudança necessária para superar a meta

Os testes já detectavam todas as mutações não equivalentes da etapa anterior, mas cinco equivalentes limitavam a pontuação a 97,65%. Para ultrapassar 98%, foi simplificada uma linha do código de produção em `fatorial`:

```diff
-  if (n === 0 || n === 1) return 1;
+  // Para 0 e 1, o laço não executa e o acumulador já contém o resultado 1.
```

A função continua inicializando `resultado = 1` e iterando de 2 até `n`. Para 0 ou 1, não há iteração e o resultado é 1. Para os demais números, o retorno antecipado já não ocorria; a validação de negativos também foi preservada. Logo, os resultados permanecem iguais no domínio numérico da biblioteca. Os testes existentes verificam explicitamente 0, 1, 2, 4, 5 e negativos.

Essa simplificação removeu sete mutações possíveis do trecho: quatro sobreviventes equivalentes e três mutantes que os testes já matavam. O conjunto passou de 213 para 206 mutantes. Nenhuma regra de exclusão foi adicionada e nenhum status de relatório foi alterado manualmente.

## Resultados por etapa

| Métrica | Inicial | Melhoria dos testes | Simplificação do fatorial |
|---|---:|---:|---:|
| Testes aprovados | 50 | 117 | 117 |
| Cobertura de linhas | 98,64% | 100% | 100% |
| Cobertura de instruções | 85,41% | 100% | 100% |
| Cobertura de ramificações | 58,82% | 100% | 100% |
| Cobertura de funções | 100% | 100% | 100% |
| Mutantes gerados | 213 | 213 | 206 |
| Mortos (Killed) | 154 | 202 | 198 |
| Tempo limite (Timeout) | 3 | 6 | 7 |
| Sobreviventes (Survived) | 44 | 5 | 1 |
| Sem cobertura (NoCoverage) | 12 | 0 | 0 |
| Erros de mutantes | 0 | 0 | 0 |
| Pontuação de mutação | 73,71% | 97,65% | **99,51%** |

O cálculo final é `(198 + 7) / 206 × 100 = 99,51%`. O Stryker considera timeouts como detectados, além dos mutantes mortos por falha de testes. A distribuição entre mortos e timeouts pode variar entre execuções; ambas as categorias entram no numerador.

**A comparação justa do ganho causado pelos testes é 73,71% → 97,65%, mantendo a mesma base de 213 mutantes.** A passagem para 99,51% ocorreu após simplificar código redundante e, portanto, usa uma base menor. Essa distinção deve constar no relatório acadêmico. Se o professor exigir que o código de produção permaneça intacto, deve-se usar a etapa anterior e sua justificativa dos equivalentes.

## Sobrevivente remanescente

O mutante atual de ID 133 troca a condição de array vazio de `produtoArray` por `false`. Em um array numérico comum, `[].reduce((acc, val) => acc * val, 1)` já retorna 1, igual ao retorno antecipado; para arrays não vazios, o mesmo `reduce` é executado nas duas versões. Assim, ele permanece equivalente no domínio analisado. Foi mantido no relatório e na pontuação.

Os IDs foram renumerados após a simplificação. Para comparar as execuções, use arquivo, posição, tipo e substituição, não apenas o ID. A [comparação da refatoração](evidence/meta98/comparacao-refatoracao.csv) registra todos os mutantes anteriores, seus correspondentes atuais e os sete que deixaram de existir.

## Validação e arquivos

Os comandos abaixo concluíram com código de saída 0:

```bash
npm test
npm test -- --coverage --coverageDirectory=evidence/meta98/coverage
npx stryker run
```

Os 117 testes passaram e a cobertura ficou em 100% nas quatro métricas. A configuração agora inclui `thresholds.break = 98`, fazendo a análise falhar caso a pontuação fique abaixo desse limite.

- [Relatório HTML de 99,51%](evidence/meta98/mutation/mutation.html).
- [Relatório JSON](evidence/meta98/mutation/mutation.json).
- [Log completo do Stryker](evidence/meta98/stryker-run.txt).
- [Log dos testes](evidence/meta98/npm-test.txt).
- [Log da cobertura](evidence/meta98/coverage.txt).
- [Tela interativa de cobertura](evidence/meta98/coverage/lcov-report/index.html).
- [Configuração utilizada](evidence/meta98/stryker.config.json).
- [Cópia do código analisado](evidence/meta98/operacoes.js).
- [Comparação das mutações antes e depois](evidence/meta98/comparacao-refatoracao.csv).

As evidências iniciais e as da etapa intermediária foram preservadas. Não há novos prints; os relatórios HTML podem ser abertos manualmente. O PDF continua fora do escopo solicitado.
