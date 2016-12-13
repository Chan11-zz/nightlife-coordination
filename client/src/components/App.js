import React from 'react';
//import '../../public/mdl/material.min.css';
//import '../../public/mdl/material.min.js';
//import '../../public/css/style.css';

class App extends React.Component{

    render(){
        return (
            <div>
          {this.props.children}
         </div>
    );
    }
}

export default App;
