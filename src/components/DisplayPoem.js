import React from 'react'
import {TypeAnimation} from "react-type-animation";

const DisplayPoem = ({data = ""}) => {
    if(!data) return null;
    return (
        <div className='w-50'>
            <TypeAnimation
                className='type-animation-poem'
                splitter={(str) => str.split(/(?= )/)} 
                sequence={[data,3000]}
                speed={{ type: 'keyStrokeDelayInMs', value: 100 }}
                omitDeletionAnimation={true}
                style={{ whiteSpace: "pre-line",display: 'block', fontSize: '1em'}}
            />
        </div>
    );
}

export default DisplayPoem