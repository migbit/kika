export default [
  // Números primos, compostos, múltiplos e divisores
  {
    id: 1,
    question: "Qual das opções explica corretamente o que é um número primo?",
    options: [
      "Um número que só tem dois divisores: 1 e ele próprio.",
      "Um número que tem exatamente três divisores.",
      "Um número que só é divisível por números pares.",
      "Um número que termina em 1."
    ],
    correctAnswer: 0,
    explanation: "Número primo tem exatamente dois divisores positivos distintos: 1 e o próprio número."
  },
  {
    id: 2,
    question: "Qual destes números é composto?",
    options: ["13", "17", "21", "19"],
    correctAnswer: 2,
    explanation: "21 = 3 × 7, logo tem mais de dois divisores e é composto."
  },
  {
    id: 3,
    question: "Qual é o menor número primo?",
    options: ["0", "1", "2", "3"],
    correctAnswer: 2,
    explanation: "O 2 é o menor primo e o único primo par. 0 e 1 não são primos."
  },
  {
    id: 4,
    question: "Qual das opções é um múltiplo comum de 4 e 6?",
    options: ["12", "14", "16", "18"],
    correctAnswer: 0,
    explanation: "12 é múltiplo de 4 (4×3) e de 6 (6×2)."
  },
  {
    id: 5,
    question: "Qual dos números é divisor de 84?",
    options: ["5", "7", "11", "13"],
    correctAnswer: 1,
    explanation: "84 ÷ 7 = 12 (exato). Os outros (5, 11, 13) não dividem 84."
  },

  // Critérios de divisibilidade
  {
    id: 6,
    question: "Pelo critério de divisibilidade por 3, qual destes números é divisível por 3?",
    options: ["124", "402", "1001", "250"],
    correctAnswer: 1,
    explanation: "Soma dos algarismos de 402 = 4+0+2 = 6, que é múltiplo de 3."
  },
  {
    id: 7,
    question: "Qual é o critério de divisibilidade por 9?",
    options: [
      "O último algarismo é par.",
      "A soma dos algarismos é múltiplo de 9.",
      "O número termina em 0.",
      "O número tem exatamente 3 algarismos."
    ],
    correctAnswer: 1,
    explanation: "Um número é divisível por 9 se a soma dos seus algarismos for múltiplo de 9."
  },
  {
    id: 8,
    question: "Sem fazer a conta, 7 560 é divisível por:",
    options: ["2 e 5", "3 e 4", "2, 5 e 10", "2, 3, 5 e 9"],
    correctAnswer: 2,
    explanation: "Termina em 0 → divisível por 2, 5 e 10. Soma dos algarismos 7+5+6+0=18 → também por 3, mas a opção correta mais completa dada é 2, 5 e 10."
  },
  {
    id: 9,
    question: "Qual destes números NÃO é divisível por 4?",
    options: ["1 024", "318", "520", "2 008"],
    correctAnswer: 1,
    explanation: "Regra do 4: olham-se os dois últimos algarismos. 24, 20 e 08 são múltiplos de 4; 18 não é. Logo 318 não é divisível por 4."
  },
  {
    id: 10,
    question: "Sem efetuar divisões longas: 4 536 é divisível por 6?",
    options: ["Sim, porque é par e a soma dos algarismos é múltiplo de 3.", "Não, porque não termina em 0.", "Sim, porque termina em 6.", "Não, porque a soma dos algarismos não é par."],
    correctAnswer: 0,
    explanation: "Divisibilidade por 6 exige divisível por 2 e 3. É par e 4+5+3+6=18 (múltiplo de 3)."
  },

  // Múltiplos/Divisores (raciocínio)
  {
    id: 11,
    question: "Qual é o mínimo múltiplo comum (MMC) de 6 e 8?",
    options: ["12", "16", "24", "48"],
    correctAnswer: 2,
    explanation: "Fatorizações: 6=2×3, 8=2³ ⇒ MMC=2³×3=24."
  },
  {
    id: 12,
    question: "Qual é o máximo divisor comum (MDC) de 18 e 24?",
    options: ["3", "6", "9", "12"],
    correctAnswer: 1,
    explanation: "18=2×3², 24=2³×3 ⇒ MDC=2¹×3¹=6."
  },
  {
    id: 13,
    question: "Escolhe a alternativa correta: 45 é divisor de 315?",
    options: ["Sim, 315 ÷ 45 = 7", "Não, 45 é maior que 315", "Não, 315 ÷ 45 = 6 com resto", "Só se 315 for múltiplo de 10"],
    correctAnswer: 0,
    explanation: "45×7=315. Logo 45 é divisor de 315."
  },
  {
    id: 14,
    question: "Qual dos conjuntos contém APENAS múltiplos de 9?",
    options: ["9, 18, 27, 35", "18, 36, 45, 54", "27, 33, 41, 45", "9, 20, 29, 38"],
    correctAnswer: 1,
    explanation: "18, 36, 45 e 54 são todos múltiplos de 9."
  },

  // Potências (base e expoente naturais)
  {
    id: 15,
    question: "Quanto vale 3^4?",
    options: ["12", "27", "81", "64"],
    correctAnswer: 2,
    explanation: "3^4 = 3×3×3×3 = 81."
  },
  {
    id: 16,
    question: "Qual é a potência equivalente a 2×2×2×2×2?",
    options: ["2^3", "2^4", "2^5", "5^2"],
    correctAnswer: 2,
    explanation: "Cinco fatores iguais a 2 ⇒ 2^5."
  },
  {
    id: 17,
    question: "Qual expressão corresponde a 5^3?",
    options: ["5+5+5", "5×5×5", "3×5×5", "5×3"],
    correctAnswer: 1,
    explanation: "Potência com expoente 3 representa 3 fatores iguais: 5×5×5."
  },
  {
    id: 18,
    question: "Qual é o valor de 10^4?",
    options: ["100", "1 000", "10 000", "100 000"],
    correctAnswer: 2,
    explanation: "Potência de base 10: 1 seguido de 4 zeros → 10 000."
  },
  {
    id: 19,
    question: "Assinala a opção correta: 4^2 × 4^3 =",
    options: ["4^5", "4^6", "8^5", "16^3"],
    correctAnswer: 0,
    explanation: "Mesma base: somam-se os expoentes ⇒ 4^(2+3) = 4^5."
  },
  {
    id: 20,
    question: "Qual é o valor de 2^5 × 2^3?",
    options: ["2^8", "2^15", "2^2", "2^5"],
    correctAnswer: 0,
    explanation: "Mesma base: 2^(5+3) = 2^8 = 256."
  },

  // Potências de base 10 (notação e raciocínio)
  {
    id: 21,
    question: "Qual das opções representa 1 milhão?",
    options: ["10^3", "10^4", "10^5", "10^6"],
    correctAnswer: 3,
    explanation: "1 000 000 = 10^6."
  },
  {
    id: 22,
    question: "Escreve 300 000 na forma 3 × 10^n. Qual é n?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 2,
    explanation: "300 000 = 3 × 100 000 = 3 × 10^5."
  },
  {
    id: 23,
    question: "Qual é a potência de 10 que corresponde a cem mil?",
    options: ["10^3", "10^4", "10^5", "10^7"],
    correctAnswer: 2,
    explanation: "100 000 = 10^5."
  },

  // Raciocínio com primos/compostos
  {
    id: 24,
    question: "Se um número é múltiplo de 2 e de 3, então ele é certamente múltiplo de:",
    options: ["5", "6", "9", "12"],
    correctAnswer: 1,
    explanation: "Se é múltiplo de 2 e 3, é múltiplo do seu MMC (=6)."
  },
  {
    id: 25,
    question: "Qual das listas contém exatamente números primos?",
    options: ["2, 5, 9, 11", "3, 7, 13, 17", "4, 6, 8, 11", "5, 10, 15, 20"],
    correctAnswer: 1,
    explanation: "3, 7, 13 e 17 são todos primos. 9, 4, 6, 8, 10, 15, 20 são compostos."
  },
  {
    id: 26,
    question: "O número 51 é primo?",
    options: ["Sim, não tem divisores.", "Não, 51 = 3 × 17.", "Sim, porque é ímpar.", "Sim, porque termina em 1."],
    correctAnswer: 1,
    explanation: "51 é divisível por 3 (5+1=6). 51 = 3 × 17, logo é composto."
  },
  {
    id: 27,
    question: "Qual é o menor número que é múltiplo de 5 e de 8?",
    options: ["20", "30", "40", "80"],
    correctAnswer: 2,
    explanation: "MMC(5,8) = 40 (5=5, 8=2³ → MMC=2³×5)."
  },
  {
    id: 28,
    question: "Quantos divisores positivos tem o número 12?",
    options: ["4", "5", "6", "8"],
    correctAnswer: 2,
    explanation: "Divisores: 1,2,3,4,6,12 (6 no total)."
  },
  {
    id: 29,
    question: "Qual dos números é divisor de 96 e múltiplo de 6?",
    options: ["8", "12", "18", "30"],
    correctAnswer: 1,
    explanation: "96 ÷ 12 = 8 exato; 12 é também múltiplo de 6."
  },
  {
    id: 30,
    question: "Entre 30 e 40 (inclusive), quantos números primos existem?",
    options: ["2", "3", "4", "5"],
    correctAnswer: 1,
    explanation: "Primos: 31, 37. 41 já está fora; 33,35,39 compostos; 30,32,34,36,38,40 pares. Total: 2 primos."
  },

  // Raciocínio com potências
  {
    id: 31,
    question: "Qual é o resultado de 5^2 + 5^2?",
    options: ["5^4", "2 × 5^2", "10^2", "5^3"],
    correctAnswer: 1,
    explanation: "5^2 + 5^2 são termos iguais: 2×5^2 (não se somam expoentes na adição)."
  },
  {
    id: 32,
    question: "Qual das igualdades é verdadeira?",
    options: ["(3^2)^3 = 3^5", "(2^3)^2 = 2^6", "4^2 × 2^2 = 8^2", "10^2 + 10^2 = 10^4"],
    correctAnswer: 1,
    explanation: "Potência de potência: (a^m)^n = a^(m·n). Logo (2^3)^2 = 2^6."
  },
  {
    id: 33,
    question: "Qual é o valor de 10^3 × 10^2?",
    options: ["10^5", "10^6", "10^8", "10^1"],
    correctAnswer: 0,
    explanation: "Somam-se expoentes: 10^(3+2) = 10^5."
  },
  {
    id: 34,
    question: "Se 2^x = 32, qual é o valor de x?",
    options: ["4", "5", "6", "8"],
    correctAnswer: 1,
    explanation: "32 = 2^5, logo x = 5."
  },

  // Critérios de divisibilidade (raciocínio adicional)
  {
    id: 35,
    question: "Um número termina em 0. O que podes concluir?",
    options: ["É divisível por 2 e por 5.", "É divisível por 3 e por 9.", "É primo.", "Não é múltiplo de 10."],
    correctAnswer: 0,
    explanation: "Terminar em 0 implica divisibilidade por 2, 5 e 10."
  },
  {
    id: 36,
    question: "Qual dos números é divisível por 9: 7 434, 7 435, 7 436, 7 437?",
    options: ["7 434", "7 435", "7 436", "7 437"],
    correctAnswer: 0,
    explanation: "Soma dos algarismos 7+4+3+4=18 (múltiplo de 9)."
  },
  {
    id: 37,
    question: "Qual das opções tem soma dos algarismos múltipla de 3?",
    options: ["2 105", "2 110", "2 111", "2 112"],
    correctAnswer: 3,
    explanation: "2 112 → 2+1+1+2=6 (múltiplo de 3). As outras somas: 2 105 → 8; 2 110 → 4; 2 111 → 5."
  },
  {
    id: 38,
    question: "Sem calcular tudo, qual NÃO pode ser quadrado perfeito?",
    options: ["121", "144", "169", "150"],
    correctAnswer: 3,
    explanation: "Quadrados perfeitos não terminam em 2, 3, 7 ou 8; 150 termina em 0 mas 15^2=225, 12^2=144, 13^2=169 — 150 não é quadrado perfeito."
  },

  // Integração de conhecimentos
  {
    id: 39,
    question: "Se um número é divisível por 12, então é certamente divisível por:",
    options: ["2 e 3", "4 e 6", "3 e 8", "2, 3 e 4"],
    correctAnswer: 3,
    explanation: "12 = 2^2×3 ⇒ todo múltiplo de 12 é múltiplo de 2, 3 e 4."
  },
  {
    id: 40,
    question: "Qual é o maior número primo menor do que 30?",
    options: ["23", "27", "29", "31"],
    correctAnswer: 2,
    explanation: "Primos abaixo de 30: 2,3,5,7,11,13,17,19,23,29. O maior é 29."
  }
];
