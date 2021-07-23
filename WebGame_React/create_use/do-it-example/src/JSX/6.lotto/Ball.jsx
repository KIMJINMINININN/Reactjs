import React, {memo} from 'react';

const Ball = memo(({number}) => {
    let background;
    if(number <= 10){

    }else if (number <= 20){
        background = 'orange';
    }else if (number <= 30){
        background = 'orange';
    }else if (number <= 40){
        background = 'orange';
    }else {
        background = 'green';
    }
    return (
        <div className="ball" style={{ background }}></div>
    );
})

export default Ball