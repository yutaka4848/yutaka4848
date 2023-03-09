// WMO weather codes
// 0	Clear sky
// 1,: '' 2,: '' 3	Mainly clear, partly cloudy, and overcast
// 45: '', 48: ''	Fog and depositing rime fog
// 51: '', 53: '', 55: ''	Drizzle: Light, moderate, and dense intensity
// 56: '', 57: ''	Freezing Drizzle: Light and dense intensity
// 61: '', 63: '', 65: ''	Rain: Slight, moderate and heavy intensity
// 66: '', 67: ''	Freezing Rain: Light and heavy intensity
// 71: '', 73: '', 75: ''	Snow fall: Slight, moderate, and heavy intensity
// 77: ''	Snow grains
// 80: '', 81: '', 82: ''	Rain showers: Slight, moderate, and violent
// 85: '', 86: ''	Snow showers slight and heavy
// 95: '' *	Thunderstorm: Slight or moderate
// 96: '', 99: '' *	Thunderstorm with slight and heavy hail
// (*) Thunderstorm forecast with hail is only available in Central Europe

// https://www.jodc.go.jp/data_format/weather-code_j.html

// module.exports = {
//   0: 'Clear sky',
//   1: 'Mainly clear', 2: 'partly cloudy', 3: 'overcast',
//   45: 'Fog', 48: 'depositing rime fog',
//   51: 'Drizzle: Light', 53: 'Drizzle:　moderate', 55: 'Drizzle:　dense intensity', 
//   56: 'Freezing Drizzle: Light', 57: 'Freezing Drizzle: dense intensity',
//   61: 'Rain: Slight', 63: 'Rain: moderate', 65: 'Rain: heavy intensity',
//   66: 'Freezing Rain: Light', 67: ' heavy intensity', 
//   71: 'Snow fall: Slight', 73: 'moderate', 75: ' heavy intensity', 
//   77: 'Snow grains',
//   80: 'Rain showers: Slight', 81: 'moderate', 82: 'violent',
//   85: 'Snow showers slight', 86: ' heavy',
//   95: 'Thunderstorm: Slight or moderate',
//   96: 'Thunderstorm with slight', 99: ' heavy hail'
// }


// https://www.jodc.go.jp/data_format/weather-code_j.html
module.exports = {
  0: {strict: 'Clear(No cloud at any level)', abst: 'sunny'},
  1: {strict: 'Partly cloudy(Scattered or broken)', abst: 'cloudy'},
  2: {strict: 'Continuous layer(s) of blowing snow', abst: 'snowy'},
  3: {strict: 'Sandstorm, duststorm, or blowing snow', abst: 'stormy'},
  4: {strict: 'Fog, thick dust or haze', abst: 'fog'},
  5: {strict: 'Drizzle', abst: 'rainy'},
  6: {strict: 'Rain', abst: 'rainy'},
  7: {strict: 'Snow, or rain and snow mixed', abst: 'sleet'},
  8: {strict: 'Shower(s)', abst: 'rainy'},
  9: {strict: 'Thunderstorm(s)', abst: 'thunder'},
}
// const jp = {
//   fog: '霧',
//   drizzle: '少雨',
// }