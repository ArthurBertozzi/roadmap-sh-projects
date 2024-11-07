// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  // Configurações para cobertura de código
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "lcov"],

  // Opcional: Definir padrões para incluir ou excluir arquivos da cobertura
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts", // Excluir arquivos de definição de tipos
    "!src/**/types.ts", // Excluir outros arquivos específicos, se necessário
    "!src/**/*.{test,spec}.ts", // Excluir arquivos de teste
  ],
};
