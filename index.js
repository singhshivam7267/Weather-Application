const APP_ID = '927d680a60df926004f14faf7f2773dc'

const searchButton = document.querySelector('.menu--search')
const locationButton = document.querySelector('.menu--loc')
const input = document.querySelector('.menu__city')
const city = document.querySelector('.name')
const icon = document.querySelector('.icon')
const temp = document.querySelector('.temp')
const hum = document.querySelector('.hum')
const press = document.querySelector('.press')
const windSpeed = document.querySelector('.wind')
const h1 = document.querySelector('.h1')

const getWeathetForLocation = () => {
  const searchForCurrentLacotion = options => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    })
  }

  searchForCurrentLacotion()
    .then((position) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${ position.coords.latitude }&lon=${ position.coords.longitude }&units=metric&appid=${ APP_ID }`
      h1.innerHTML = `Current weather for your location`
      locationButton.style.display = `none`
      getWeathet(url)
    })
    .catch((err) => {
      console.error(err.message)
      alert(err.message)
    })
}

getWeathetForLocation()
locationButton.addEventListener('click', getWeathetForLocation)

searchButton.addEventListener('click', e => {
  const cityName = input.value
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ cityName }&units=metric&appid=${ APP_ID }`
  h1.innerHTML = 'Current weather'
  locationButton.innerHTML = `Get weather for your location`
  locationButton.style.display = `block`
  getWeathet(url)
})

input.addEventListener('keyup', e => {
  e.keyCode === 13 && searchButton.click()
})

const getWeathet = url => (
  fetch(url).then(response => {
    if (response.status !== 200) {
      console.error(`Status Code: ${ response.status }`)
    }
    return response.json()
  }).then(data => {
    const { sys, weather, main, wind } = data
    city.innerHTML = `${ data.name }, ${ sys.country }`
    icon.innerHTML = `<img src= 'https://openweathermap.org/img/w/${ weather[0].icon }.png'>`
    temp.innerHTML = `${ Math.round(main.temp) }&deg;C`
    hum.innerHTML = `Humidity: ${ main.humidity }%`
    press.innerHTML = `Pressure: ${ main.pressure }hPa`
    windSpeed.innerHTML = `Wind speed: ${ wind.speed }m/s`
  }))