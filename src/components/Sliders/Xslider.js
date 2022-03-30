import React from 'react';
import '../Context/GV';

export default class Xslider extends React.Component {
    constructor() {
      super()
      this.state = {value: 0}
      this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
      this.setState({value: event.target.value});
      global.axis0 = event.target.value;
      console.log(global.axis0);
    }
  
    render() {
      return (
        <div>
          <label>
            <input 
              id="typeinp" 
              type="range" 
              min="0" max="180" 
              value={this.state.value} 
              onChange={this.handleChange}
              step="1"/>
            {this.state.value}
          </label>
        </div>
      );
    }
  }
  
//   ReactDOM.render(
//     <Xslider/>, document.getElementById('app'));