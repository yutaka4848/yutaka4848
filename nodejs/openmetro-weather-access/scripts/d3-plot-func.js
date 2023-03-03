
const sampleData = {
  "daily":{
    "time":["2023-02-08","2023-02-09","2023-02-10","2023-02-11","2023-02-12","2023-02-13","2023-02-14","2023-02-15"],
    "temperature_2m_max":[11.5,8.1,1.7,13.7,15.5,14.0,8.1,8.2],
    "temperature_2m_min":[4.5,1.6,0.2,2.1,4.8,8.0,4.2,2.4]
  }
};

const optsDefault = {
  radius: 5, dx: 60, dy: 15, xmargin: 50, ymargin: 50
};

const optsAxisV = {
  x1: 0, x2: 0, y1: 350, y2: 0, 
  color: 'black', width: 3.5,
  addyticks: false, tickside: 'center'
};

const optsAxisH = {
  x1: 0, x2: 600, y1: 350, y2: 350, 
  color: 'black', width: 2.5, 
  addxticks: false, tickside: 'center'
};

// for ticks of vertival axis, type: number or datetime
const optsTicksV = {
  type: 'number',
  length: 10, width: 1,
  color: optsAxisV.color, width: optsAxisV.width,
  dytick: optsDefault.dy, 
  start: 0, end: 'auto', interval: 0.5,
  marginStart: 10,
  fonts: {fontSize: 20},
  axis: optsAxisV
}

const optsTicksH = {
  type: 'datetime',
  length: 10, width: 1,
  color: optsAxisH.color, width: optsAxisH.width,
  dxtick: optsDefault.dx, 
  start: 'auto', end: 'auto', interval: 0.5,
  marginStart: optsDefault.xmargin,
  fonts: {fontSize: 20},
  axis: optsAxisH
}

// for outer ticks
optsAxisV.length = optsTicksV.length;
optsAxisH.length = optsTicksH.length;

function WeatherPlots(opts=optsDefault){
  let svg = d3.select('#sample')
    .attr('class', 'border border-2 border-primary')
    .style('width', '840px')
    .style('height', '480px')
    .append('svg')
    .attr('class', 'w-100 h-100')
    .attr('transform', 'translate(80 20)')
    
  console.log('** Call Create Axis.');
  createAxisVertical(svg);
  createAxisHorizontal(svg);
  createTicksV(svg, sampleData.daily.temperature_2m_max);
  createTicksH(svg, sampleData.daily.time);

  svg
    .append('g').attr('id', 'data-points')
    .attr('transform', `translate(${opts.xmargin} ${opts.ymargin})`)
    .selectAll('circle')
    .data(sampleData.daily.temperature_2m_max)
    .join('circle')
      .style('fill', 'steelblue')
      .attr('r', opts.radius)
      .attr('cx', (d,i) => `${i * opts.dx}px`)
      .attr('cy', (d,i) => `${d * opts.dy}px`);

  svg.attr('transform', 'translate(50 0)')
}

function createAxisVertical(svg, opts=optsAxisV){
  svg
    .append('g').attr('id', 'axis-v')
    .attr('transform', `translate(${opts.length/2} 0)`)
    .append('line')
    .attr('x1', opts.x1)
    .attr('x2', opts.x2)
    .attr('y1', opts.y1)
    .attr('y2', opts.y2)
    .attr('stroke', opts.color)
    .attr('stroke-width', opts.width);
}

function createAxisHorizontal(svg, opts=optsAxisH){
  svg
    .append('g').attr('id', 'axis-h')
    .attr('transform', `translate(${opts.length/2} 0)`)
    .append('line')
    .attr('x1', opts.x1)
    .attr('x2', opts.x2)
    .attr('y1', opts.y1)
    .attr('y2', opts.y2)
    .attr('stroke', opts.color)
    .attr('stroke-width', opts.width);
}

// ticks for vertical axis
function createTicksV(svg, labels, opts=optsTicksV){
  if(opts.type === 'number'){
    const end = opts.end === 'auto' ? labels.sort((a, b) => b-a)[0] : opts.end;
    const nticks = parseInt((end - opts.start)/opts.interval);
    
    let modLabels = (new Array(nticks + 1)).fill(0);
    modLabels = modLabels.map((val, idx) => idx*opts.interval);

    gr = svg.append('g').attr('id', 'ticks-v')
            .attr('transform', 'translate(100 0)');

    gr
      .selectAll('text')
      .data(modLabels)
      .join('text')
        .text(d => d)
        .attr('x', opts.axis.x1 - 40)
        .attr('y', (d, i) => `${opts.axis.y1 - opts.marginStart - opts.dytick*i}`)
        .attr('font-size', opts.fonts.fontSize)
        .attr('fill', 'black')
        .attr('class', 'fw-bold');

    gr
      .selectAll('line')
      .data(modLabels)
      .join('line')
        .attr('x1', opts.axis.x1)
        .attr('x2', opts.axis.x1 + opts.length)
        .attr('y1', (d,i) => `${opts.axis.y1 - opts.marginStart - opts.dytick*i}`)
        .attr('y2', (d,i) => `${opts.axis.y1 - opts.marginStart - opts.dytick*i}`)
        .attr('stroke', opts.color)
        .attr('stroke-width', opts.width);
    }
}

// ticks for horizontal axis
function createTicksH(svg, labels, opts=optsTicksH){
  if(opts.type === 'datetime'){
    // simplifying year
    let modLabels = labels.map((date) => {
      d = new Date(date);
      console.log(d.getMonth(), typeof d.getMonth());
      return `${d.getMonth().toString().padStart(2, 0)}/${d.getDate().toString().padStart(2, 0)}`
      // return Intl.DateTimeFormat('ja-JP', {month: '2-digit', day: '2-digit'}).format(today)
    });
    let gr = svg.append('g').attr('id', 'ticks-h');
    
    gr
      .selectAll('text')
      .data(modLabels)
      .join('text')
        .text(d => d)
        .attr('x', (d, i) => `${opts.marginStart + opts.axis.x1 + opts.dxtick*i}`)
        .attr('y', opts.axis.y1 + opts.length + 10)
        .attr('font-size', opts.fonts.fontSize)
        .attr('fill', 'black')
        .attr('transform', (d, i) => `rotate(45 ${opts.marginStart + opts.axis.x1 + opts.dxtick*i} ${opts.axis.y1 + opts.length + 10})`)
        .attr('class', 'fw-bold');

    gr
      .selectAll('line')
      .data(modLabels)
      .join('line')
        .attr('x1', (d, i) => `${opts.marginStart + opts.axis.x1 + opts.dxtick*i}`)
        .attr('x2', (d, i) => `${opts.marginStart + opts.axis.x1 + opts.dxtick*i}`)
        .attr('y1', opts.axis.y1)
        .attr('y2', opts.axis.y1 + opts.length)
        .attr('stroke', opts.color)
        .attr('stroke-width', opts.width);
    }
}