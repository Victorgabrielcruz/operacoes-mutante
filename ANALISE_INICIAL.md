# Análise inicial de testes e mutação

Análise realizada em 12/10/2026, sem modificar `src/operacoes.js` nem `test/operacoes.test.js`.

- Repositório: https://github.com/Victorgabrielcruz/operacoes-mutante
- Commit analisado: `c10621a4fe20f8332e783e06cad0e1b98449aad2`
- Ambiente: Windows, Node.js 24.19.0, npm 11.17.0, Jest 29.7.0 e StrykerJS 10.0.0.
- Escopo da mutação: `src/**/*.js`, executado com o runner Jest e análise de cobertura por teste.

## Resultados iniciais

`npm test`: **50 testes aprovados**, em uma suíte, sem falhas.

`npm test -- --coverage`:

| Métrica | Cobertura |
|---|---:|
| Linhas | 98,64% |
| Instruções (statements) | 85,41% |
| Ramificações (branches) | 58,82% |
| Funções | 100% |

`npx stryker run`:

| Resultado | Quantidade |
|---|---:|
| Mutantes gerados | 213 |
| Mortos (Killed) | 154 |
| Detectados por tempo limite (Timeout) | 3 |
| Sobreviventes (Survived) | 44 |
| Sem cobertura (NoCoverage) | 12 |
| Erros de execução ou compilação de mutantes | 0 |

**Pontuação de mutação total: 73,71%.** O Stryker considera mortos e timeouts como detectados: `(154 + 3) / 213 × 100`. A pontuação apenas dos mutantes cobertos é 78,11%; a referência principal desta análise é a pontuação total.

A cobertura de linhas indica que quase todas as linhas são executadas. Contudo, há 44 alterações executadas que não provocam falhas nos testes, além de 12 mutantes sem cobertura. Portanto, executar as linhas não garante verificar todos os comportamentos e resultados. A cobertura de ramificações de 58,82% também revela que várias decisões e casos alternativos não são exercitados.

## Três mutantes sobreviventes documentados

### 1. Comparação sem teste de igualdade

- ID do mutante: `183`; tipo: `EqualityOperator`; linha 104.
- Original: `isMaiorQue(a, b)` retorna `a > b`.
- Mutação: retorna `a >= b`.
- O teste existente verifica apenas `isMaiorQue(10, 5)`, cujo resultado é `true` nas duas versões. Ele não distingue os operadores quando os argumentos são iguais.
- Print: [mutante 183](evidence/initial/02-isMaiorQue-mutante-183.png).

### 2. Verificação de paridade que aceita sempre verdadeiro

- ID do mutante: `68`; tipo: `ConditionalExpression`; linha 43.
- Original: `isPar(n)` retorna `n % 2 === 0`.
- Mutação: retorna sempre `true`.
- O teste existente verifica apenas `isPar(100)`. Como 100 é par, ambas as versões retornam `true`; falta um caso cujo resultado esperado seja `false`.
- Print: [mutante 68](evidence/initial/03-isPar-mutante-68.png).

### 3. Conversão de temperatura testada somente com zero

- ID do mutante: `160`; tipo: `ArithmeticOperator`; linha 93.
- Original: `(celsius * 9 / 5) + 32`.
- Mutação: `(celsius * 9 * 5) + 32`.
- O teste existente usa somente `celsiusParaFahrenheit(0)`. Multiplicar zero por qualquer um desses fatores mantém o resultado 32; assim, o teste não verifica corretamente o fator de conversão.
- Print: [mutante 160](evidence/initial/04-celsius-mutante-160.png).

Os exemplos acima são análises dos testes existentes. Nenhum teste de melhoria foi implementado nesta etapa. Nem todo sobrevivente representa necessariamente uma lacuna corrigível: existem candidatos a mutantes equivalentes, como a troca de `<` por `<=` em `clamp`, que pode manter o mesmo valor retornado no limite. Eles exigem avaliação individual em uma etapa posterior.

## Evidências preservadas

- [Relatório HTML inicial do Stryker](evidence/initial/mutation/mutation.html), independente de futuras execuções.
- [Relatório JSON inicial](evidence/initial/mutation/mutation.json).
- [Painel geral em PNG](evidence/initial/01-painel-stryker.png).
- [Relatório HTML de cobertura](evidence/initial/coverage/lcov-report/index.html).
- [Saída de npm test](evidence/initial/npm-test.txt).
- [Saída da cobertura](evidence/initial/coverage.txt).
- [Saída da execução concluída do Stryker](evidence/initial/stryker-run.txt).
- [Lista de mutantes não detectados](evidence/initial/mutantes-nao-detectados.csv).
- [Configuração usada](evidence/initial/stryker.config.initial.json).
- [Versões exatas das dependências](evidence/initial/package-lock.initial.json).

## Como executar novamente

Na pasta deste projeto:

```bash
npm install
npm test
npm test -- --coverage
npx stryker run
```

A configuração do Stryker já foi criada por `npx stryker init` e ajustada para analisar apenas os arquivos de produção, gerar HTML e JSON e usar dois processos. Não é necessário executar o assistente novamente. As novas execuções escrevem em `reports/mutation/`; a cópia inicial permanece em `evidence/initial/mutation/`.

O `package-lock.json` é ignorado pelo `.gitignore` original. Sua cópia em `evidence/initial/package-lock.initial.json` preserva as versões instaladas; para reproduzir exatamente a instalação, copie esse arquivo para `package-lock.json` na raiz e execute `npm ci`.

## Observações de execução

A primeira tentativa no ambiente restrito gerou o relatório, mas terminou com acesso negado ao encerrar processos auxiliares do Stryker. A análise foi repetida com a permissão necessária e terminou com código de saída 0, reproduzindo as mesmas contagens. A saída da tentativa anterior está em `evidence/initial/stryker-run-restricted.txt`.

O npm informou 35 vulnerabilidades nas dependências após a instalação do Stryker (7 moderadas e 28 altas). As dependências existentes não foram atualizadas automaticamente, para preservar a base da análise.

Ao término da etapa inicial, as alterações e evidências estavam apenas locais, sem commit ou push. A continuação está documentada em [ANALISE_FINAL.md](ANALISE_FINAL.md).
