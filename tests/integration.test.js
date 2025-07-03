import { Lexer } from '../src/lexer/index.js';
import { Parser } from '../src/parser/index.js';
import { Interpreter } from '../src/interpreter/index.js';

describe('JavaScript Engine Integration', () => {
  let lexer;
  let parser;
  let interpreter;

  beforeEach(() => {
    lexer = new Lexer();
    parser = new Parser();
    interpreter = new Interpreter();
  });

  const evaluate = (input) => {
    const tokens = lexer.tokenize(input);
    const ast = parser.parse(tokens);
    return interpreter.evaluate(ast);
  };

  test('should evaluate simple arithmetic expressions', () => {
    expect(evaluate('1 + 1')).toBe(2);
    expect(evaluate('2 * 3')).toBe(6);
    expect(evaluate('10 - 5')).toBe(5);
    expect(evaluate('15 / 3')).toBe(5);
  });

  test('should handle operator precedence correctly', () => {
    expect(evaluate('1 + 2 * 3')).toBe(7);
    expect(evaluate('(1 + 2) * 3')).toBe(9);
    expect(evaluate('10 - 2 * 3 + 5')).toBe(9);
  });

  test('should handle complex expressions', () => {
    expect(evaluate('2 * 3 + 4 * 5')).toBe(26);
    expect(evaluate('10 / 2 + 3 * 4')).toBe(17);
    expect(evaluate('(5 + 3) * (2 + 4)')).toBe(48);
  });
});