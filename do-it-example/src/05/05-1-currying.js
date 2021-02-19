// function multiply(a, b){
//     return a * b;
// }

// function multiplyTwo(a){
//     return multiply(a, 2);
// }

// function multiplyX(x){
//     return function(a){
//         return multiply(a, x);
//     }
    
// const multiplyX = x => a => multiply(a, x);

// const multiplyThree = multiplyX(3);
// const multiplyFour = multiplyX(4);

// const result1 = multiplyThree(3);
// const result2 = multiplyFour(3);

// const result1 = multiply(3)(3);
// const result2 = multiply(4)(3)

// const equation = (a, b, c) => x => ((x * a) * b) + c;
// const formula = equation(2, 3, 4);
// const x = 10;
// const result = formula(x);

// const a = function (a, b, c){
//     return function (x){
//         return ((x * a) * b) + c;
//     }
// }

const multiply = (a, b) => a * b;
const add = (a, b) => a + b;

const multiplyX = x => a => multiply(a, 2);
const addX = x => a => add(x, a)

const addFour = addX(4);
const multiplyTwo = multiplyX(2)
const multiplyThree = multiplyX(3);

const formula = x => addFour(multiplyThree(multiplyTwo(x)))

[multiplyTwo, multiplyThree, addFour].reduce(
    function(prevFunc, nextFunc){
        return function(value){
            return nextFunc(prevFunc(value))
        };
    },
    function(k) { return k;}
)

function(value){
    return multiplyTwo((k => k)(value));
}

function(value){
    return multiplyThree(
        function(value){
            return multiplyTwo((k => k)(value))
        }
    )
}

function(value){
    return addFour(
        function(value){
            return multiplyThree(
                function(value){
                    return multiplyTwo((k => k)(value))
                }(value)
            )
        }(value)
    )
}

function compose(funcArr){
    return funcArry.reduce(
        function(prevFunc, nextFunc){
            return function(value){
                return newFunc(prevFun(value));
            }
        },
        function(k) { return k;}
    )
}

const formulaWithCompose = compose([multiplyTwo, multiplyThree, addFour]);