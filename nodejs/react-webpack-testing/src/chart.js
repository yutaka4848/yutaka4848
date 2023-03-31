
import Chart from 'chart.js/auto';
const Distribution = require('./distribution.js');

let canvas = document.createElement('canvas');
canvas.setAttribute('id', 'chart');

let dist = new Distribution();
let label, data = [], tmp;
for(let prob=0.0; prob<=0.8; prob+=0.05){
  tmp = [];
  label = [];
  for(let i=0; i<=20; i++){
    label.push(i);
    tmp.push(dist.distPoisson(i, 10, prob));
  }
  data.push({label: `prob=${prob.toFixed(1)}`,data: tmp});
}

try{
  let graph = new Chart(canvas, {
    type: 'line',
    data: {
      labels: label,
      datasets: data
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
} catch(err) {
  console.log(`** ${JSON.stringify(data)}`);
}

document.body.querySelector('main').appendChild(canvas);

