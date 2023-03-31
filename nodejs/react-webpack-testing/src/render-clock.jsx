
const React = require('react');
const ReactDOM = require('react-dom/client');
const ReactDOMServer = require('react-dom/server');

class AnalogueClock extends React.Component{
  constructor(props){
    super(props);
    let today = new Date();
    this.state = {
      hour: today.getHours(), min: today.getMinutes(), sec: today.getSeconds()
    };
  }

  get getOffsetX(){
    return this.props.cx - this.props.radius;
  };

  get getOffsetY(){
    return this.props.cy - this.props.radius;
  };

  componentDidMount(){
    this.timer = setInterval(() => {
      let sec, min, hour;
      sec = (this.state.sec + 1) % 60;
      min = sec == 0 ? (this.state.min + 1) % 60 : this.state.min;
      hour = min == 0 ? (this.state.hour + 1) % 12 + 1 : this.state.hour;
      this.setState({sec, min, hour});
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  clockHours(){
    let result = [];
    for(let idx=1; idx<=12; idx++){
      result.push(
        <text key={'label' + idx}
              x={(this.props.cx ? this.props.cx : 100) - (this.props.fontSize ? (idx >= 10 ? this.props.fontSize/2 : this.props.fontSize/4) : (idx >= 10 ? 5 : 2.5))} 
              y={this.props.cy ? this.props.cy : 100} 
              fontFamily='Liberation Mono'
              fontSize={this.props.fontSize ? this.props.fontSize : 10}
              transform={`translate(${(this.props.radius - 8) * Math.cos((idx-3)*Math.PI/6)} ${(this.props.radius - 8) * Math.sin((idx-3)*Math.PI/6) + 2})`}>
                {idx}
        </text>
      );
    }
    return result;
  }

  clockTicks(){
    let result = [];
    for(let idx=0; idx<12; idx++){
      result.push(<line key={'tick' + idx}
                        x1={this.props.cx ? this.props.cx : 100} 
                        y1='35' 
                        x2={this.props.cx ? this.props.cx : 100}
                        y2='45' 
                        transform={`rotate(${30*idx} ${this.props.cx ? this.props.cx : 100} ${this.props.cx ? this.props.cx : 100})`}/>);
    }
    return result;
  }

  hoursLine(){
    return (<line 
          x1={this.props.cx + this.props.radius*Math.cos(2*Math.PI*(this.state.hour-3)/12)*2/3}
          y1={this.props.cy + this.props.radius*Math.sin(2*Math.PI*(this.state.hour-3)/12)*2/3}
          x2={this.props.cx}
          y2={this.props.cy}
          key='hours'
    />);
  }

  minutesLine(){
    return (<line 
          x1={this.props.cx + this.props.radius*Math.cos(2*Math.PI*(this.state.min-15)/60)*3/4}
          y1={this.props.cy + this.props.radius*Math.sin(2*Math.PI*(this.state.min-15)/60)*3/4}
          x2={this.props.cx}
          y2={this.props.cy}
          key='minutes'
    />);
  }

  secondsLine(){
    return (<line 
          x1={this.props.cx + this.props.radius*Math.cos(2*Math.PI*(this.state.sec-15)/60)*3/4}
          y1={this.props.cy + this.props.radius*Math.sin(2*Math.PI*(this.state.sec-15)/60)*3/4}
          x2={this.props.cx}
          y2={this.props.cy}
          key='seconds'
    />);
  }

  render(){
    return (
      <div>
        <svg viewBox="0 0 480.000000 480.000000">
          <g fill='#8999ff' stroke='black' strokeWidth="2">
            <circle cx={this.props.cx ? this.props.cx : 100} 
                    cy={this.props.cy ? this.props.cy : 100}
                    r={this.props.radius ? this.props.radius : 80} />
            {this.clockTicks()}
            {this.clockHours()}
            {this.hoursLine()}
            {this.minutesLine()}
            {this.secondsLine()}
          </g>
        </svg>
      </div>
    )
  }
}


// let root = ReactDOM.createRoot(document.body.appendChild(document.createElement("main")));
let root = ReactDOM.createRoot(document.querySelector('#clock'));
root.render(<AnalogueClock cx={100} cy={100} radius={80} />);
// module.exports = AnalogueClock;