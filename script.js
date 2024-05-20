class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
        this.name = 'OutOfRangeError';
    }
}

class InvalidExprError extends Error {
    constructor() {
        super('Expression should not have an invalid combination of expression');
        this.name = 'InvalidExprError';
    }
}

function evalString(expression) {
    try {
        // Remove spaces from the expression
        expression = expression.replace(/\s+/g, '');

        // Check for invalid characters
        if (/[^0-9+\-*/]/.test(expression)) {
            const invalidChar = expression.match(/[^0-9+\-*/]/)[0];
            throw new OutOfRangeError(invalidChar);
        }

        // Check for invalid combinations of operators
        if (/[+\-*/]{2,}/.test(expression)) {
            throw new InvalidExprError();
        }

        // Check for invalid starting operator
        if (/^[+\-*/]/.test(expression)) {
            throw new SyntaxError('Expression should not start with invalid operator');
        }

        // Check for invalid ending operator
        if (/[+\-*/]$/.test(expression)) {
            throw new SyntaxError('Expression should not end with invalid operator');
        }

        // Evaluate the expression
        return eval(expression);
    } catch (error) {
        return error.message;
    }
}

function evaluateExpression() {
    const expressionInput = document.getElementById('expression').value;
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = evalString(expressionInput);
}
