// Custom Error classes
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

// Function to evaluate the expression
function evalString(expr) {
    try {
        // Remove spaces from the expression
        expr = expr.replace(/\s/g, '');

        // Check for invalid characters
        if (/[^0-9+\-*/]/.test(expr)) {
            throw new OutOfRangeError(expr.match(/[^0-9+\-*/]/)[0]);
        }

        // Check for invalid operator combinations
        if (/\+\+|\-\-|\*\/|\/\+|\*\+|\+\*|\/\*|\-\+|\+\-|\*\-|\/\-/.test(expr)) {
            throw new InvalidExprError();
        }

        // Check if expression starts with an invalid operator
        if (/^[\+\/\*]/.test(expr)) {
            throw new SyntaxError('Expression should not start with invalid operator');
        }

        // Check if expression ends with an invalid operator
        if (/[\+\/\*]$/.test(expr)) {
            throw new SyntaxError('Expression should not end with invalid operator');
        }

        // Evaluate the expression
        let result = eval(expr);
        return result;
    } catch (error) {
        return error.message;
    }
}

// Event listener for the evaluate button
document.getElementById('evaluate').addEventListener('click', () => {
    const expression = document.getElementById('expression').value.trim();
    const result = evalString(expression);
    document.getElementById('result').textContent = result;
});