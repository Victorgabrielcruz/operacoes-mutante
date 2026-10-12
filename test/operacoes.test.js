const {
  soma, subtracao, multiplicacao, divisao, potencia, raizQuadrada, restoDivisao,
  fatorial, mediaArray, somaArray, maximoArray, minimoArray, valorAbsoluto,
  arredondar, isPar, isImpar, calcularPorcentagem, aumentarPorcentagem,
  diminuirPorcentagem, inverterSinal, seno, cosseno, tangente, logaritmoNatural,
  logaritmoBase10, arredondarParaBaixo, arredondarParaCima, hipotenusa,
  grausParaRadianos, radianosParaGraus, mdc, mmc, isPrimo, fibonacci,
  produtoArray, clamp, isDivisivel, celsiusParaFahrenheit, fahrenheitParaCelsius,
  inverso, areaCirculo, areaRetangulo, perimetroRetangulo, isMaiorQue,
  isMenorQue, isEqual, medianaArray, dobro, triplo, metade
} = require('../src/operacoes');

describe('Suíte de testes para 50 operações aritméticas', () => {
  // === Testes para o Bloco 1 (1-10) ===
  test('1. deve somar dois números positivos', () => { expect(soma(2, 3)).toBe(5); });
  test('2. deve subtrair dois números positivos', () => { expect(subtracao(5, 2)).toBe(3); });
  test('3. deve multiplicar dois números positivos', () => { expect(multiplicacao(3, 4)).toBe(12); });
  test('4. deve dividir e lançar erro para divisão por zero', () => {
    expect(divisao(10, 2)).toBe(5);
    expect(() => divisao(5, 0)).toThrow('Divisão por zero não é permitida.');
  });
  test('5. deve calcular a potência com expoente positivo', () => { expect(potencia(2, 3)).toBe(8); });
  test('6. deve calcular a raiz quadrada de um quadrado perfeito', () => { expect(raizQuadrada(16)).toBe(4); });
  test('7. deve retornar o resto da divisão', () => { expect(restoDivisao(10, 3)).toBe(1); });
  test('8. deve calcular o fatorial de um número maior que 1', () => { expect(fatorial(4)).toBe(24); });
  test('9. deve calcular a média de um array com múltiplos elementos', () => { expect(mediaArray([10, 20, 30])).toBe(20); });
  test('10. deve somar um array com múltiplos elementos', () => { expect(somaArray([1, 2, 3])).toBe(6); });

  // === Testes para o Bloco 2 (11-20) ===
  test('11. deve encontrar o valor máximo em um array', () => { expect(maximoArray([1, 50, 10])).toBe(50); });
  test('12. deve encontrar o valor mínimo em um array', () => { expect(minimoArray([10, 2, 100])).toBe(2); });
  test('13. deve retornar o valor absoluto de um número negativo', () => { expect(valorAbsoluto(-5)).toBe(5); });
  test('14. deve arredondar um número para cima', () => { expect(arredondar(9.8)).toBe(10); });
  test('15. deve distinguir números pares e ímpares', () => {
    expect(isPar(100)).toBe(true);
    expect(isPar(7)).toBe(false);
  });
  test('16. deve distinguir números ímpares e pares', () => {
    expect(isImpar(7)).toBe(true);
    expect(isImpar(8)).toBe(false);
  });
  test('17. deve calcular uma porcentagem simples', () => { expect(calcularPorcentagem(50, 200)).toBe(100); });
  test('18. deve aumentar um valor em uma porcentagem', () => { expect(aumentarPorcentagem(100, 10)).toBeCloseTo(110); });
  test('19. deve diminuir um valor em uma porcentagem', () => { expect(diminuirPorcentagem(100, 10)).toBeCloseTo(90); });
  test('20. deve inverter o sinal de um número positivo', () => { expect(inverterSinal(42)).toBe(-42); });
  
  // === Testes para o Bloco 3 (21-30) ===
  test('21. deve calcular o seno de 0', () => { expect(seno(0)).toBe(0); });
  test('22. deve calcular o cosseno de 0', () => { expect(cosseno(0)).toBe(1); });
  test('23. deve calcular a tangente de 0', () => { expect(tangente(0)).toBe(0); });
  test('24. deve calcular o logaritmo natural de Euler', () => { expect(logaritmoNatural(Math.E)).toBe(1); });
  test('25. deve calcular o logaritmo na base 10', () => { expect(logaritmoBase10(100)).toBe(2); });
  test('26. deve arredondar para baixo', () => { expect(arredondarParaBaixo(5.9)).toBe(5); });
  test('27. deve arredondar para cima', () => { expect(arredondarParaCima(5.1)).toBe(6); });
  test('28. deve calcular a hipotenusa de um triângulo retângulo', () => { expect(hipotenusa(3, 4)).toBe(5); });
  test('29. deve converter graus para radianos', () => { expect(grausParaRadianos(180)).toBeCloseTo(Math.PI); });
  test('30. deve converter radianos para graus', () => { expect(radianosParaGraus(Math.PI)).toBeCloseTo(180); });

  // === Testes para o Bloco 4 (31-40) ===
  test('31. deve calcular o MDC de dois números', () => { expect(mdc(10, 5)).toBe(5); });
  test('32. deve calcular o MMC de dois números', () => { expect(mmc(10, 5)).toBe(10); });
  test('33. deve distinguir números primos e compostos', () => {
    expect(isPrimo(7)).toBe(true);
    expect(isPrimo(9)).toBe(false);
  });
  test('34. deve calcular o 10º termo de Fibonacci', () => { expect(fibonacci(10)).toBe(55); });
  test('35. deve calcular o produto de um array', () => { expect(produtoArray([2, 3, 4])).toBe(24); });
  test('36. deve limitar valores abaixo, dentro e acima do intervalo', () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });
  test('37. deve verificar resultados verdadeiros e falsos de divisibilidade', () => {
    expect(isDivisivel(10, 2)).toBe(true);
    expect(isDivisivel(10, 3)).toBe(false);
  });
  test('38. deve converter Celsius para Fahrenheit em dois pontos de referência', () => {
    expect(celsiusParaFahrenheit(0)).toBe(32);
    expect(celsiusParaFahrenheit(100)).toBe(212);
  });
  test('39. deve converter Fahrenheit para Celsius em dois pontos de referência', () => {
    expect(fahrenheitParaCelsius(32)).toBe(0);
    expect(fahrenheitParaCelsius(212)).toBe(100);
  });
  test('40. deve calcular o inverso de um número', () => { expect(inverso(4)).toBe(0.25); });

  // === Testes para o Bloco 5 (41-50) ===
  test('41. deve calcular a área de um círculo', () => { expect(areaCirculo(10)).toBeCloseTo(314.159); });
  test('42. deve calcular a área de um retângulo', () => { expect(areaRetangulo(5, 4)).toBe(20); });
  test('43. deve calcular o perímetro de um retângulo', () => { expect(perimetroRetangulo(5, 4)).toBe(18); });
  test('44. deve distinguir maior, menor e igual na comparação estrita', () => {
    expect(isMaiorQue(10, 5)).toBe(true);
    expect(isMaiorQue(5, 10)).toBe(false);
    expect(isMaiorQue(5, 5)).toBe(false);
  });
  test('45. deve distinguir menor, maior e igual na comparação estrita', () => {
    expect(isMenorQue(5, 10)).toBe(true);
    expect(isMenorQue(10, 5)).toBe(false);
    expect(isMenorQue(5, 5)).toBe(false);
  });
  test('46. deve comparar igualdade sem converter os tipos', () => {
    expect(isEqual(7, 7)).toBe(true);
    expect(isEqual(7, 8)).toBe(false);
    expect(isEqual(7, '7')).toBe(false);
  });
  test('47. deve calcular a mediana de um array ímpar e ordenado', () => { expect(medianaArray([1, 2, 3, 4, 5])).toBe(3); });
  test('48. deve calcular o dobro de um número', () => { expect(dobro(10)).toBe(20); });
  test('49. deve calcular o triplo de um número', () => { expect(triplo(10)).toBe(30); });
  test('50. deve calcular a metade de um número', () => { expect(metade(20)).toBe(10); });
});

describe('Casos de limite, entradas negativas e caminhos alternativos', () => {
  test.each([
    ['soma com negativo', soma, -2, 3, 1],
    ['subtração com resultado negativo', subtracao, 2, 5, -3],
    ['multiplicação por zero', multiplicacao, 4, 0, 0],
    ['multiplicação por negativo', multiplicacao, -3, 4, -12],
    ['divisão com negativo', divisao, -9, 3, -3],
    ['divisão com resultado fracionário', divisao, 1, 4, 0.25],
    ['potência com expoente zero', potencia, 5, 0, 1],
    ['potência com expoente negativo', potencia, 2, -2, 0.25],
    ['resto de divisão exata', restoDivisao, 12, 3, 0],
    ['MDC com mais de uma iteração', mdc, 48, 18, 6],
    ['MDC com segundo operando zero', mdc, 5, 0, 5],
    ['MMC de números coprimos', mmc, 3, 5, 15],
    ['MMC com zero', mmc, 0, 5, 0],
  ])('%s', (_nome, operacao, a, b, esperado) => {
    expect(operacao(a, b)).toBe(esperado);
  });

  test.each([0, 1, 25])('raiz quadrada de %s inclui o limite zero', n => {
    expect(raizQuadrada(n)).toBe(Math.sqrt(n));
  });

  test('raiz quadrada rejeita negativos com a mensagem esperada', () => {
    expect(() => raizQuadrada(-1)).toThrow(
      'Não é possível calcular a raiz quadrada de um número negativo.'
    );
  });

  test.each([[0, 1], [1, 1], [2, 2], [5, 120]])('fatorial(%s) = %s', (n, esperado) => {
    expect(fatorial(n)).toBe(esperado);
  });

  test('fatorial rejeita negativos com a mensagem esperada', () => {
    expect(() => fatorial(-1)).toThrow('Fatorial não é definido para números negativos.');
  });

  test.each([
    ['soma vazia', somaArray, [], 0],
    ['soma com único elemento', somaArray, [-3], -3],
    ['soma com positivos e negativos', somaArray, [-5, 2, 3], 0],
    ['média vazia', mediaArray, [], 0],
    ['média com único elemento', mediaArray, [7], 7],
    ['média fracionária', mediaArray, [1, 2], 1.5],
    ['produto vazio', produtoArray, [], 1],
    ['produto com único elemento', produtoArray, [-3], -3],
    ['produto com zero', produtoArray, [2, 0, 4], 0],
    ['produto com negativos', produtoArray, [-2, 3], -6],
    ['máximo entre negativos', maximoArray, [-9, -2, -5], -2],
    ['mínimo entre negativos', minimoArray, [-9, -2, -5], -9],
  ])('%s', (_nome, operacao, valores, esperado) => {
    expect(operacao(valores)).toBe(esperado);
  });

  test.each([
    ['máximo', maximoArray, 'Array vazio не possui valor máximo.'],
    ['mínimo', minimoArray, 'Array vazio не possui valor mínimo.'],
    ['mediana', medianaArray, 'Array vazio не possui mediana.'],
  ])('%s rejeita array vazio com a mensagem esperada', (_nome, operacao, mensagem) => {
    expect(() => operacao([])).toThrow(mensagem);
  });

  test.each([[-2, true, false], [-1, false, true], [0, true, false], [1, false, true]])(
    'paridade de %s: par=%s, ímpar=%s', (n, par, impar) => {
      expect(isPar(n)).toBe(par);
      expect(isImpar(n)).toBe(impar);
    }
  );

  test.each([[-3, false], [0, false], [1, false], [2, true], [4, false], [11, true]])(
    'isPrimo(%s) = %s', (n, esperado) => {
      expect(isPrimo(n)).toBe(esperado);
    }
  );

  test.each([[0, 0], [1, 1], [2, 1], [3, 2]])('fibonacci(%s) = %s', (n, esperado) => {
    expect(fibonacci(n)).toBe(esperado);
  });

  test.each([[0, 0, 10, 0], [10, 0, 10, 10], [-5, -3, -1, -3], [2, -3, -1, -1]])(
    'clamp(%s, %s, %s) = %s', (valor, min, max, esperado) => {
      expect(clamp(valor, min, max)).toBe(esperado);
    }
  );

  test('clamp preserva o sinal do zero quando o valor já está no intervalo', () => {
    // Em JavaScript, -0 e +0 são iguais nas comparações, mas Object.is os distingue.
    expect(clamp(-0, 0, 10)).toBe(-0);
    expect(clamp(0, -10, -0)).toBe(0);
  });

  test.each([[-40, -40], [37, 98.6]])('converte %s °C para %s °F', (c, f) => {
    expect(celsiusParaFahrenheit(c)).toBeCloseTo(f, 10);
    expect(fahrenheitParaCelsius(f)).toBeCloseTo(c, 10);
  });

  test('inverso rejeita zero com a mensagem esperada', () => {
    expect(() => inverso(0)).toThrow('Não é possível inverter o número zero.');
  });

  test('inverso de número negativo', () => {
    expect(inverso(-2)).toBe(-0.5);
  });

  test.each([
    [[3, 1, 2], 2],
    [[10, 2, 1], 2],
    [[4, 1, 3, 2], 2.5],
    [[9, 1], 5],
    [[-1, -5, -3], -3],
    [[7], 7],
  ])('mediana de %j é %s', (valores, esperado) => {
    expect(medianaArray(valores)).toBe(esperado);
  });

  test('mediana não altera o array recebido', () => {
    const valores = [8, 1, 3, 2];
    expect(medianaArray(valores)).toBe(2.5);
    expect(valores).toEqual([8, 1, 3, 2]);
  });
});
