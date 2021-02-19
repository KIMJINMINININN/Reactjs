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

function compose(){
    const funcArr = Array.prototype.slice.call(arguments);
    return funcArr.reduce(
        function (prevFunc, nextFunc){
            return function(){
                const args = Array.prototype.slice.call(arguments);
                return nextFunc(prevFunc.apply(null, args))
            }
        },
        function(k) { return k;}
    );
}
const formulaWithCompose = compose(multiplyTwo, multiplyThree, addFour)

function compose(...funcArr){
    return funcArr.reduce(
        function (prevFunc, nextFunc){
            return function(...args){
                return nextFunc(prevFunc(...args));
            }
        },
        function(k) { return k;}
    );
}

const formulaWithCompose = compose(multiplyTwo, multiplyThree, addFour);

const x = 10;
formulaWithCompose(10);

const formulaWithCompose = compose(
    multiplyX(2),
    multiplyX(3),
    addX(4)
);

const formulaWithoutCompose = addX(4)(multiplyX(3))(multiplyX(2))

const formulaWithCompose2 = compose(
    multiplyX(2),
    addX(5),
    multiplyX(3),
    addX(4)
)

const formulaWithoutCompose2 = addX(4)(multiplyX(3)(addX(5)(multiplyX(2))))

//---------------------------------------------------------

function higherOrderComponent(Component){
    return function Enhanced(props){
        return <Component {...props} />
    }
}

function higherOrderComponent(Component){
    return class Enhanced extends React.Component {
        render(){
            return <Component {...this.porps} />;
        }
    }
}