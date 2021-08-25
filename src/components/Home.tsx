import React from 'react';

const Home = () => {

    return (
        <div style={{display: 'flex', flexGrow: 1,}}>
            <div style={{
                backgroundColor: 'red',                
                flexDirection: 'column',
                width: '25%',
                height: '100%'
            }}>
                <div>C1</div>
                <div>C2</div>
                <div>C3</div>
            </div>            

            <div style={{
                backgroundColor: 'blue',
                flexGrow: 1,
                flexDirection: 'row'
            }}>
                <div>R1</div>
                <div>R2</div>
                <div>R3</div>
            </div>
        </div>
    )
}

export default Home;