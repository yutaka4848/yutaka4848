const sampleData = {
  "daily":{
    "time":["2023-02-08","2023-02-09","2023-02-10","2023-02-11","2023-02-12","2023-02-13","2023-02-14","2023-02-15"],
    "temperature_2m_max":[11.5,8.1,1.7,13.7,15.5,14.0,8.1,8.2],
    "temperature_2m_min":[4.5,1.6,0.2,2.1,4.8,8.0,4.2,2.4]
  }
};

// Main Method is `run` (search for)
class WeatherPlot {
  constructor(data=sampleData, xdata=null, ydata=null){
    this.data = {x: xdata ? xdata : null, y: ydata ? ydata : null};
    this.data.org = data;
  
    this.opts = {
      whole: {width: 700,height: 430, xm: 50, ym: 50},
      data: {
        type: 'circle', radius: 5, color: ['orangered', 'steelblue']
      },
      vconf: {type: 'number', color: 'black', axisLen: 380,
        ticks: true, tickLen: 10, tickSide: 'center', width: 2, labelArea: 50
      },
      hconf: {type: 'datetime', color: 'black', axisLen: 600,
        ticks: true, tickLen: 10, tickSide: 'under', width: 2, labelArea: 50
      },
      text: {family: null, weight: 'bold', size: 20, degree: 45, color: 'black'}
    };

    this.arrange();
  }

  // utilities
  get getOpts() { return this.opts; }
  get getx() { return this.data.x; }
  get gety() { return this.data.y; }
  get getvdy() { 
    if(!this.opts.vconf.dy) {
      this.opts.vconf.dy = this.opts.vconf.axisLen / this.ylabels.length;
    }
    return this.opts.vconf.dy;
  }
  get gethdx() { 
    if(!this.opts.hconf.dx) {
      this.opts.vconf.dx = this.opts.hconf.axisLen / this.data.x.length;
    }
    return this.opts.vconf.dx;
  }
  set xdata(dataList) { this.data.x = dataList; }
  set ydata(dataList) { this.data.y = dataList; }

  currentTime(){
    let today = {};
    today.day = Intl.DateTimeFormat('en-US', {hour12: false, day: 'numeric'}).format(Date.now());
    today.minute = Intl.DateTimeFormat('en-US', {hour12: false, minute: '2-digit'}).format(Date.now());
    if(today.minute >= 30){
      let tmp = Intl.DateTimeFormat('en-US', {hour12: false, hour: 'numeric'}).format(Date.now());
      tmp = parseInt(tmp) + 1;
      today.hour = tmp.toString();
    } else {
      today.hour = Intl.DateTimeFormat('en-US', {hour12: false, hour: 'numeric'}).format(Date.now());
    }
    return today;
  }

  // -- Not set x, y, call this and expect sampleData form
  arrange(){
    if(this.data.org.daily){
      this.xdata = this.data.org.daily.time;
      this.ydata = [
        this.data.org.daily.temperature_2m_max, 
        this.data.org.daily.temperature_2m_min
      ];
    } else if(this.data.org.hourly){
      this.xdata = this.data.org.hourly.time;
      this.ydata = [
        this.data.org.hourly.temperature_2m
      ];

    }
  }

  // Main
  run(){
    let svg = d3.select('#sample')
      .attr('class', 'border border-2 border-primary')
      .append('svg')
      .attr('class', 'w-100 h-75')
      .attr('transform', 'translate(80 20)')
      
    // Add 1 tick to yticks labels before and after
    let values = this.gety.reduce((arr, val) => arr.concat(val), []).sort((a,b) => a-b);
    this.ymin = Math.floor(values[0]);
    this.ymax = Math.floor(values[values.length-1]+1);
    this.ylabels = [];
    for(let i=this.ymin; i<=this.ymax; i++) this.ylabels.push(parseFloat(i));

    console.log('** Call Create Axis.');
    this.createAxisVertical(svg);
    this.createAxisHorizontal(svg);
    this.createTicksV(svg);
    this.createTicksH(svg);

    this.dataPoints(svg)
  }

  dataPoints(svg){
    for(let i=0; i<this.gety.length; i++){
      svg
        .append('g').attr('id', 'data-points')
        .attr('transform', `translate(${this.opts.whole.xm} ${this.opts.whole.ym})`)
        .selectAll('circle')
        .data(this.gety[i])
        .join(this.opts.data.type)
          .style('fill', this.opts.data.color[i])
          .attr('r', this.opts.data.radius)
          .attr('cx', (d,i) => `${this.opts.hconf.labelArea + i * this.gethdx}px`)
          .attr('cy', (d,i) => `${this.opts.vconf.axisLen * (1 - d / (this.ymax + 1)) - this.opts.hconf.labelArea}px`);
    }
  }

  createAxisVertical(svg){
    const length = this.opts.vconf.tickLen / (this.opts.vconf.tickSide === 'center' ? 2.0 : 1);

    svg
      .append('g').attr('id', 'axis-v')
      .attr('transform', `translate(${this.opts.hconf.labelArea + length} 0)`)
      .append('line')
      .attr('x1', 0)
      .attr('x2', 0)
      .attr('y1', this.opts.vconf.axisLen)
      .attr('y2', 0)
      .attr('stroke', this.opts.vconf.color)
      .attr('stroke-width', this.opts.vconf.width);
  }

  createAxisHorizontal(svg){
    const length = this.opts.vconf.tickLen/(this.opts.vconf.tickSide === 'center' ? 2.0 : 1.0);

    svg
      .append('g').attr('id', 'axis-h')
      .attr('transform', `translate(${this.opts.hconf.labelArea + length} 0)`)
      .append('line')
      .attr('x1', 0)
      .attr('x2', this.opts.hconf.axisLen)
      .attr('y1', this.opts.vconf.axisLen)
      .attr('y2', this.opts.vconf.axisLen)
      .attr('stroke', this.opts.hconf.color)
      .attr('stroke-width', this.opts.hconf.width);
  }

  // ticks for vertical axis
  createTicksV(svg){
    if(this.opts.vconf.type === 'number'){
      let gr = svg.append('g').attr('id', 'ticks-v')
                  .attr('transform', `translate(${this.opts.hconf.labelArea} 0)`);

      gr
        .selectAll('text')
        .data(this.ylabels)
        .join('text')
          .text(d => d)
          .attr('x', - this.opts.vconf.tickLen * 2)
          .attr('y', (d, i) => `${this.opts.vconf.axisLen - this.getvdy*i + this.opts.text.size / 3}`)
          .attr('font-size', this.opts.text.fontSize)
          .attr('fill', this.opts.text.color)
          .attr('class', this.opts.text.weight);

      gr
        .selectAll('line')
        .data(this.ylabels)
        .join('line')
          .attr('x1', 0)
          .attr('x2', this.opts.vconf.tickLen)
          .attr('y1', (d,i) => `${this.opts.vconf.axisLen - this.getvdy*i}`)
          .attr('y2', (d,i) => `${this.opts.vconf.axisLen - this.getvdy*i}`)
          .attr('stroke', this.opts.vconf.color)
          .attr('stroke-width', this.opts.vconf.width);
      }
  }

  // ticks for horizontal axis
  createTicksH(svg){
    if(this.opts.hconf.type === 'datetime'){
      // simplifying to only days or hours
      let modLabels;
      if(this.data.org.daily){
        modLabels = this.getx.map((date) => {
          const d = new Date(date);
          return Intl.DateTimeFormat('ja-JP', {month: '2-digit', day: '2-digit'}).format(d)
        });
      } else if(this.data.org.hourly) {
        let styleHours = Intl.DateTimeFormat('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'});
        let styleDays = Intl.DateTimeFormat('ja-JP', {hour12: false, day: 'numeric'});
        let days = new Set();
        modLabels = this.getx.reduce((arr, date, idx) => {
          if(idx%4==0){
            const d = new Date(date);
            if(days.has(styleDays.format(d))){
              arr.push(styleHours.format(d));
            } else {
              days.add(styleDays.format(d));
              arr.push(styleHours.format(d) + `\n${styleDays.format(d)}`);
            }
          } else {
            arr.push('');
          }
          return arr;
        }, []);
      }

      let gr = svg.append('g').attr('id', 'ticks-h')
                  .attr('transform', `translate(${this.opts.hconf.labelArea} 0)`);
      
      gr
        .selectAll('text')
        .data(modLabels)
        .join('text')
          .text(d => d)
          .attr('x', (d, i) => `${this.opts.vconf.labelArea + this.gethdx*i}`)
          .attr('y', this.opts.vconf.axisLen + this.opts.whole.ym - this.opts.vconf.labelArea + this.opts.hconf.tickLen*2)
          .attr('font-size', this.opts.text.size)
          .attr('fill', this.opts.text.color)
          .attr('transform', (d, i) => `rotate(45 ${this.opts.hconf.labelArea + this.gethdx*i} ${this.opts.vconf.axisLen + this.opts.vconf.tickLen})`)
          .attr('class', this.opts.text.weight);

      gr
        .selectAll('line')
        .data(modLabels)
        .join('line')
          .attr('x1', (d, i) => `${this.opts.hconf.labelArea + this.gethdx*i}`)
          .attr('x2', (d, i) => `${this.opts.hconf.labelArea + this.gethdx*i}`)
          .attr('y1', this.opts.vconf.axisLen)
          .attr('y2', (d, i) => d ? this.opts.vconf.axisLen + this.opts.hconf.tickLen : this.opts.vconf.axisLen)
          .attr('stroke', this.opts.text.color)
          .attr('stroke-width', this.opts.text.width);
      }
  }

  createTodayLine(svg){
    let today = new Date();

  }
}