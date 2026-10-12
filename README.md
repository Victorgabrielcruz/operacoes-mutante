# Operações Mutante: análise e melhoria dos testes

Biblioteca de 50 operações matemáticas, com testes Jest e StrykerJS.

## Executar

Requer Node.js 22 ou superior. Validado com Node.js 24.19.0.

```bash
npm ci
npm test
npm run coverage
npm run mutate
```

Código: `src/operacoes.js`. Testes: `test/operacoes.test.js`. Configuração: `stryker.config.json`.
Abra `reports/mutation/mutation.html` ou `coverage/lcov-report/index.html` no navegador para explorar as telas.

## Evolução dos resultados

| Métrica | Inicial | Após melhorar os testes | Após simplificar o fatorial |
|---|---:|---:|---:|
| Testes aprovados | 50 | 117 | 117 |
| Cobertura de linhas | 98,64% | 100% | 100% |
| Cobertura de instruções | 85,41% | 100% | 100% |
| Cobertura de ramificações | 58,82% | 100% | 100% |
| Cobertura de funções | 100% | 100% | 100% |
| Mutantes gerados | 213 | 213 | 206 |
| Pontuação de mutação, sem exclusões | 73,71% | 97,65% | **99,51%** |
| Mutantes sobreviventes | 44 | 5 | 1 |
| Mutantes sem cobertura | 12 | 0 | 0 |

**A meta superior a 98% foi atingida após uma simplificação no código de produção.** Os testes existentes foram melhorados e 67 casos adicionados. Depois, o retorno antecipado redundante de `fatorial(0)` e `fatorial(1)` foi removido: nesses casos, o laço não executa e o acumulador já retorna 1. Nenhum mutante foi ignorado ou excluído na configuração.

Os 99,51% usam uma base diferente de mutantes e não devem ser apresentados como ganho causado apenas pelos testes. A comparação dos testes sobre a mesma base é 73,71% → 97,65%. A simplificação reduziu a base de 213 para 206 mutantes. Restou um equivalente em `produtoArray([])`, documentado na análise final.

O Stryker está configurado para falhar se a pontuação ficar abaixo de 98%.

## Análises e evidências

- [Análise inicial e prints](ANALISE_INICIAL.md).
- [Etapa de melhoria dos testes, com código original preservado](ANALISE_TESTES.md).
- [Análise final da meta atingida](ANALISE_FINAL.md).
- [Relatório HTML inicial](evidence/initial/mutation/mutation.html).
- [Relatório após melhorar os testes](evidence/final/mutation/mutation.html).
- [Relatório final de 99,51%](evidence/meta98/mutation/mutation.html).
- [Comparação antes e depois da simplificação](evidence/meta98/comparacao-refatoracao.csv).

As cópias em `evidence/` não são substituídas ao executar os comandos novamente. Pelo GitHub, use **Code → Download ZIP**, extraia e abra o HTML no navegador. O GitHub exibe o código do HTML em vez de executar sua interface.

O PDF acadêmico não está incluído.
