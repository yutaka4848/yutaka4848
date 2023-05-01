

let React = require('react');
let ReactDOM = require('react-dom/client');

import Chart from 'chart.js/auto';

let nonceElem = document.currentScript.getAttribute('nonce')

class MicStream extends React.Component {
  constructor(props){
    super(props);
    this.muteSwitch = this.muteSwitch.bind(this);
    this.showChart = this.showChart.bind(this);
    this.getMicInput = this.getMicInput.bind(this);
    this.callUntilStop = this.callUntilStop.bind(this);
    this.state = {stream: '', last_call: 'constructor', until: false};
    // See componentDidMount
  }

  get getBinCount(){ return this.analyser.frequencyBinCount;}
  get getSettings(){ return this.settings};

  get getSupported(){ return this.supported;}
  get getMuteState(){ return !(this.state.stream.getAudioTracks()[0]).enabled;} // return: true => muted, false => input

  toArray(iter){
    let result = []
    let tmp = iter.next();
    while(!tmp.done){
      result.push(tmp.value);
      tmp = iter.next();
    }
    return result;
  }

  showChart(){
    this.getMicInput();
    console.log('** time: ', this.audioContext.getOutputTimestamp());
    let values = this.state.freqData ? this.toArray(this.state.domainData.values()) : (new Array(this.getBinCount)).fill(0);

    if(!this.getMuteState){
      this.chartFreq.data.datasets = [];
      this.chartFreq.data.labels = values.map((v, idx) => `${idx}`);
      this.chartFreq.options = {
        animation: false,
        scales: {
          y: {
            max: 0.4,
            min: -0.4
            // max: -50,
            // min: -120
          }
        }
      }
      
      this.chartFreq.data.datasets.push({
        label: `Frequency(${this.getBinCount})`,
        data: values
      });
      this.chartFreq.update();
    }

    this.setState({last_call: 'showChart'});
  }

  getMicInput(){
    if(!this.getMuteState){
      this.setState((state) => {
        state.last_call = 'getMicInput';
        this.analyser.getFloatFrequencyData(state.freqData);
        this.analyser.getFloatTimeDomainData(state.domainData);
        return state;
      })
    }
  }

  callUntilStop(elem){
    if(this.state.until){
      console.log(`** settings: ${this.getBinCount / this.getSettings.sampleRate + this.getSettings.latency}`);
      let interval = parseInt(1000 * (this.getBinCount / this.getSettings.sampleRate + this.getSettings.latency)) + 1;
      console.log(`** interval: ${interval}`);
      this.clock = setInterval(() => {
        this.showChart(elem)
      }, interval);
      this.setState({until: false});
    } else {
      clearInterval(this.clock);
      this.setState({until: true});
    }
  }

  muteSwitch(){ 
    this.setState((state) => {
      state.last_call = 'muteSwitch';
      const muted = this.getMuteState;
      state.stream.getTrackById(this.audioId).enabled = muted;
      this.audio.controls = !this.audio.controls;
      // this.audio.volume = this.audio.controls ? 1.0 : 0.0;
      this.audioContext.suspend();
      return state;
    });
  }

  async componentDidMount(elem='#frequency'){
    let stream = await navigator.mediaDevices.getUserMedia({audio: {channelCount: 1}});

    this.audioId = stream.getAudioTracks()[0].id;
    this.settings = (stream.getAudioTracks()[0]).getSettings();

    this.audioContext = new AudioContext();
    this.streamNode = this.audioContext.createMediaStreamSource(stream);
    this.analyser = this.audioContext.createAnalyser();

    this.streamNode.connect(this.analyser);

    let freqData = new Float32Array(this.getBinCount);
    let domainData = new Float32Array(this.getBinCount);

    this.supported = navigator.mediaDevices.getSupportedConstraints();

    this.chartFreq = new Chart(document.querySelector(elem), {
      type: 'line',
      data: []
    });

    console.log('** Audio Context: ', this.audioContext);
    console.log('** Complete preparation.');
    this.setState((state) => {
      state = Object.assign(state, {stream, freqData, domainData});
      this.audio = document.querySelector('#micPlay');
      this.audio.controls = true;
      this.audio.srcObject = state.stream;
      return state;
    });
  }

  componentDidUpdate(){
    console.log('** log: Mute-> ', this.getMuteState);
  }

  componentWillUnmount(){
    this.audioContext.close();
    this.state.stream.stop();
  }

  render(){
    return (
      <div id='mic_container' className='container text-center'>
        <h3>{this.state.last_call}</h3>
        <form id='micForm'>
          <button type='button' id='switch' className='btn btn-primary' name='mic_switch' onClick={this.muteSwitch} value='switch'>MIC {this.state.stream && !this.getMuteState ? "OFF" : "ON"}</button>
          <button type='button' id='mic_show' className='btn btn-primary' name='mic_show' onClick={() => this.callUntilStop('#frequency')} value='mic_show' disabled={!this.state.stream || this.getMuteState}>SHOW</button>
        </form>
        <audio id='micPlay' control={true}></audio>
        <canvas id='frequency'></canvas>
      </div>
    );
  }
}

let div = document.createElement('div');

let micRoot = ReactDOM.createRoot(div);
micRoot.render(<MicStream />);
document.querySelector('#microphone').append(div);

