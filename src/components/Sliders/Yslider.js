import React from 'react';

export default class Yslider extends React.Component {
    constructor() {
      super()
      this.state = {value: 0}
      this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
      this.setState({value: event.target.value});
      global.axis1 = event.target.value;
      console.log(global.axis1);
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