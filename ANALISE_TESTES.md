# Análise da etapa de melhoria dos testes

Etapa histórica anterior à simplificação do fatorial. O resultado mais recente está em [ANALISE_FINAL.md](ANALISE_FINAL.md).

Data: 12/10/2026. Base inicial: commit `c10621a4fe20f8332e783e06cad0e1b98449aad2`.

## Mudanças realizadas

Os 50 testes iniciais foram mantidos e 67 casos foram adicionados, totalizando **117 testes aprovados**. Foram fortalecidas as asserções existentes de divisão por zero, paridade, primalidade, clamp, divisibilidade, temperatura e comparações. O arquivo `src/operacoes.js` permaneceu idêntico à base.

Novos casos exercitam zero, valores negativos, limites, mensagens de erro, arrays vazios, mediana com dados desordenados e quantidade par de elementos, Fibonacci de 0 e 1 e preservação do array recebido. Em `clamp`, a distinção entre `-0` e `+0` também foi verificada: são iguais nas comparações numéricas, mas `Object.is`, usado por `toBe`, diferencia o sinal. Isso detectou os dois mutantes que substituíam comparações estritas por inclusivas nos limites de zero.

O Jest foi limitado a `src/` e `test/`, com cobertura apenas de `src/**/*.js`. Isso impede que resíduos das pastas temporárias do Stryker sejam coletados como testes e código de produção. Foram adicionados o script `npm run mutate` e o versionamento do `package-lock.json` para reproduzir as dependências.

## Comparação dos resultados

| Métrica | Inicial | Final |
|---|---:|---:|
| Testes aprovados | 50 | 117 |
| Cobertura de linhas | 98,64% | 100% |
| Cobertura de instruções | 85,41% | 100% |
| Cobertura de ramificações | 58,82% | 100% |
| Cobertura de funções | 100% | 100% |
| Mutantes gerados | 213 | 213 |
| Killed | 154 | 202 |
| Timeout | 3 | 6 |
| Survived | 44 | 5 |
| NoCoverage | 12 | 0 |
| Erros de mutantes | 0 | 0 |
| Pontuação de mutação total | 73,71% | **97,65%** |

Ganho de **23,94 pontos percentuais**, com a mesma base de 213 mutantes e sem exclusões. O Stryker conta timeouts como detectados: `(202 + 6) / 213 × 100 = 97,65%`. Um timeout indica que a execução excedeu o limite, como ocorre com alterações que provocam laços infinitos; não é uma falha de asserção.

## Solução dos três mutantes documentados na etapa inicial

| ID | Alteração simulada | Fraqueza original | Verificação adicionada ou melhorada | Resultado final |
|---|---|---|---|---|
| 183 | `a > b` passa a `a >= b` | Apenas `10 > 5` era verificado | `isMaiorQue(5, 5)` deve ser `false`, além das ordens crescente e decrescente | Killed |
| 68 | `isPar` retorna sempre `true` | Só havia entrada par | `isPar(7)` deve ser `false`; também foram adicionados zero e negativos | Killed |
| 160 | `(celsius * 9 / 5) + 32` passa a `(celsius * 9 * 5) + 32` | A única entrada era 0 °C | `celsiusParaFahrenheit(100)` deve ser 212; também há -40 e 37 °C | Killed |

Esses testes têm resultados esperados concretos que diferenciam a implementação correta da mutada. Os prints da execução inicial continuam disponíveis em `evidence/initial/`. O relatório final permite selecionar os mesmos IDs com o filtro **Killed** ativado.

## Cinco sobreviventes equivalentes

A equivalência abaixo considera o domínio da biblioteca: números para fatorial e arrays numéricos comuns para produto, sem redefinir métodos ou usar proxies com efeitos colaterais. A conclusão decorre da leitura do fluxo do código, não apenas de executar alguns exemplos.

| ID | Local | Mutação | Justificativa |
|---|---|---|---|
| 31 | Fatorial, linha 19 | Condição inteira vira `false` | Para 0 ou 1, o laço começa em 2 e não executa; `resultado` continua 1, exatamente como no retorno antecipado. Nas demais entradas, o retorno antecipado já não ocorria. |
| 32 | Fatorial, linha 19 | `n === 0 || n === 1` vira `n === 0 && n === 1` | A conjunção nunca é verdadeira para um número; tem o mesmo efeito de remover o retorno antecipado, mantendo o resultado como explicado no ID 31. |
| 33 | Fatorial, linha 19 | `n === 0` vira `false` | Para 0, o laço não executa e retorna 1; para 1, o outro termo ainda retorna 1; demais entradas não mudam. |
| 35 | Fatorial, linha 19 | `n === 1` vira `false` | Para 1, o laço não executa e retorna 1; para 0, o outro termo ainda retorna 1; demais entradas não mudam. |
| 140 | Produto de array, linha 84 | Verificação de array vazio vira `false` | `[].reduce((acc, val) => acc * val, 1)` retorna o acumulador inicial 1. Para arrays não vazios, o mesmo `reduce` já era executado. |

**A pontuação bruta não supera 98%.** Com esses cinco sobreviventes, o teto da pontuação para esse conjunto de mutantes é `208 / 213 × 100 = 97,65%`, preservando o código e considerando o domínio acima. Escrever novos testes de resultados não distingue implementações equivalentes.

Uma análise manual que desconsidere esses cinco equivalentes resulta em `208 / (213 - 5) × 100 = 100%` dos mutantes não equivalentes detectados. **Esse valor é uma métrica ajustada manualmente, não a pontuação exibida pelo Stryker**, e não deve substituir os 97,65% na apresentação dos resultados brutos. Se a disciplina exigir estritamente mais de 98% na ferramenta, a aceitação dos equivalentes deve ser discutida com o professor.

O Stryker documenta a existência de mutantes equivalentes e mecanismos para ignorá-los: [documentação oficial](https://stryker-mutator.io/docs/stryker-js/disable-mutants/). Nesta entrega nenhum mecanismo de exclusão foi aplicado.

## Evidências finais

- [Relatório HTML final](evidence/final/mutation/mutation.html).
- [Relatório JSON final](evidence/final/mutation/mutation.json).
- [Comparação dos 213 mutantes, com status inicial e final](evidence/final/comparacao-mutantes.csv).
- [Saída de npm test](evidence/final/npm-test.txt).
- [Saída dos testes com cobertura](evidence/final/coverage.txt).
- [Relatório HTML de cobertura](evidence/final/coverage/lcov-report/index.html).
- [Saída completa do Stryker](evidence/final/stryker-run.txt).
- [Configuração usada](evidence/final/stryker.config.final.json).

Validação: `npm test`, `npm test -- --coverage` e `npx stryker run` concluíram com código de saída 0. O relatório JSON confirma que os IDs 68, 160 e 183 passaram de Survived para Killed e que não restam mutantes sem cobertura.

Os prints iniciais foram preservados. Não foram gerados novos prints da tela final: a automação do navegador bloqueou a navegação a relatórios locais por sua política de URLs. O HTML final está salvo e pode ser aberto manualmente para capturar essas telas.

## Conclusão

Os testes passaram a verificar caminhos alternativos e valores capazes de revelar erros, além de executar as linhas. A cobertura chegou a 100%, e o teste de mutação confirmou a detecção de todas as alterações não equivalentes do conjunto analisado. Os sobreviventes remanescentes mostram por que a pontuação deve ser interpretada com a análise do código e do domínio, além do percentual.

O PDF não foi montado, conforme solicitado.
