export const TokenType = {
  // Literals
  NUMBER: 'NUMBER',
  STRING: 'STRING',
  IDENTIFIER: 'IDENTIFIER',
  
  // Operators
  PLUS: 'PLUS',           // +
  MINUS: 'MINUS',         // -
  MULTIPLY: 'MULTIPLY',   // *
  DIVIDE: 'DIVIDE',       // /
  
  // Delimiters
  LEFT_PAREN: 'LEFT_PAREN',     // (
  RIGHT_PAREN: 'RIGHT_PAREN',   // )
  
  // Keywords
  LET: 'LET',
  CONST: 'CONST',
  
  // Special
  EOF: 'EOF'
};

export const KEYWORDS = {
  'let': TokenType.LET,
  'const': TokenType.CONST
};