function multiply(a, b){
    return a * b;
}

const addFour = addX(4);
const multiplyTwo = multiplyX(2)
const multiplyThree = multiplyX(3);

const formula = x => addFour(multiplyThree(multiplyTwo(x)))

[multiplyTwo, multiplyThree, addFour].reduce(
    function(prevFunc, nextFunc){
        return function(value){
            return nextFunc(prevFunc(value));
        }
    },
    function(k) { return k;}
)

