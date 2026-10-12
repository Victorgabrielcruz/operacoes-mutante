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

## Antes e depois

| Métrica | Inicial | Final |
|---|---:|---:|
| Testes aprovados | 50 | 117 |
| Cobertura de linhas | 98,64% | 100% |
| Cobertura de instruções | 85,41% | 100% |
| Cobertura de ramificações | 58,82% | 100% |
| Cobertura de funções | 100% | 100% |
| Pontuação de mutação, sem exclusões | 73,71% | 97,65% |
| Mutantes sobreviventes | 44 | 5 |
| Mutantes sem cobertura | 12 | 0 |

Foram melhorados os testes existentes e adicionados 67 casos. O código de produção permaneceu inalterado. Os cinco sobreviventes finais são equivalentes no domínio de números e arrays numéricos comuns; a justificativa está na análise final. **A meta de pontuação bruta superior a 98% não foi atingida.** Nenhum mutante foi excluído para aumentar a pontuação.

## Análises e evidências

- [Análise inicial e prints](ANALISE_INICIAL.md).
- [Análise final e justificativa dos equivalentes](ANALISE_FINAL.md).
- [Relatório HTML inicial preservado](evidence/initial/mutation/mutation.html).
- [Relatório HTML final preservado](evidence/final/mutation/mutation.html).
- [Comparação dos 213 mutantes](evidence/final/comparacao-mutantes.csv).

As cópias em `evidence/initial/` e `evidence/final/` não são substituídas ao executar os comandos novamente. Pelo GitHub, use **Code → Download ZIP**, extraia e abra o HTML no navegador. O GitHub exibe o código do HTML em vez de executar sua interface.

O PDF acadêmico não está incluído.
