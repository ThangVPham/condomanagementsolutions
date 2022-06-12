const searchInput = document.querySelector('.citySearch');
const description = document.querySelector('.desc');
const currentTemp = document.querySelector('.currentTemp');
const windSpeed = document.querySelector('.windSpeed');
const locat = document.querySelector('.location');
const minTemp = document.querySelector('.tempMin');
const maxTemp = document.querySelector('.tempMax');

getWeatherData();
searchInput.addEventListener('keypress',(event)=>{
    if(event.key == "Enter"){
        if(searchInput.value==''){
            return
        }
        currentTemp.innerHTML='CURRENT TEMP: ';
        description.innerHTML='';
        locat.innerHTML='';
        windSpeed.innerHTML='WIND SPEED: ';
        minTemp.innerHTML = 'MIN: ';
        maxTemp.innerHTML = 'MAX: ';
        
        
        getWeatherData(searchInput.value)
    }
})

function getWeatherData(city){
    
    if(city==null){
        city='toronto'
    }
 
    $.getJSON(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=82b4f0f4d84768ff85d0be9a4be2ee39`,function(data){
        console.log(data)
        var icon = data.weather[0].icon;
        $('.icon').attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);
       
       
        var currentTemp = data.main.temp;
        $('.currentTemp').append(Math.round(currentTemp)+"°C");
    
    
        var desc = data.weather[0].description.toUpperCase();
        $('.desc').append(desc);
    
        var location = data.name.toUpperCase();
        $('.location').append(location);

        var tempMax = data.main.temp_max;
        $('.tempMax').append(Math.round(tempMax)+"°C");

        var tempMin = data.main.temp_min;
        $('.tempMin').append(Math.round(tempMin)+"°C");

        var windSpeed = data.wind.speed;
        windSpeed = windSpeed*3.6
        $('.windSpeed').append(windSpeed.toFixed(2) +'km/h');

    
    }).fail((err)=>{
        console.log(err.status);
        $('.currentTemp').append('N/A');
        $('.location').append('LOCATION: N/A');
        $('.tempMin').append('N/A');
        $('.tempMax').append('N/A');
        $('.windSpeed').append('N/A')
    })
       
}
