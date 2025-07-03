import { Parser } from '../src/parser/index.js';
import { Lexer } from '../src/lexer/index.js';

describe('Parser', () => {
  let parser;
  let lexer;

  beforeEach(() => {
    lexer = new Lexer();
    parser = new Parser();
  });

  test('should parse numeric literals', () => {
    const input = '42';
    const tokens = lexer.tokenize(input);
    const ast = parser.parse(tokens);
    
    expect(ast).toEqual({
      type: 'Program',
      body: [{
        type: 'NumericLiteral',
        value: 42
      }]
    });
  });

  test('should parse binary expressions', () => {
    const input = '1 + 2';
    const tokens = lexer.tokenize(input);
    const ast = parser.parse(tokens);
    
    expect(ast).toEqual({
      type: 'Program',
      body: [{
        type: 'BinaryExpression',
        operator: '+',
        left: {
          type: 'NumericLiteral',
          value: 1
        },
        right: {
          type: 'NumericLiteral',
          value: 2
        }
      }]
    });
  });

  test('should handle operator precedence', () => {
    const input = '1 + 2 * 3';
    const tokens = lexer.tokenize(input);
    const ast = parser.parse(tokens);
    
    expect(ast).toEqual({
      type: 'Program',
      body: [{
        type: 'BinaryExpression',
        operator: '+',
        left: {
          type: 'NumericLiteral',
          value: 1
        },
        right: {
          type: 'BinaryExpression',
          operator: '*',
          left: {
            type: 'NumericLiteral',
            value: 2
          },
          right: {
            type: 'NumericLiteral',
            value: 3
          }
        }
      }]
    });
  });
});