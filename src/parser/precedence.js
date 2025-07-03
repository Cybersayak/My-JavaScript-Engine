export const Precedence = {
  LOWEST: 1,      // Used as default
  SUM: 2,         // + -
  PRODUCT: 3,     // * /
  PREFIX: 4,      // -x or !x
  CALL: 5,        // myFunction(x)
};

export const getOperatorPrecedence = (tokenType) => {
  switch (tokenType) {
    case 'PLUS':
    case 'MINUS':
      return Precedence.SUM;
    case 'MULTIPLY':
    case 'DIVIDE':
      return Precedence.PRODUCT;
    default:
      return Precedence.LOWEST;
  }
};