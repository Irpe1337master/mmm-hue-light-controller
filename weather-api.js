window.hueWeatherApi = {
  getCurrentWeather: function (apiKey, lat, lon) {
    // var ip = "192.168.0.21";
    // var hueId = "yaDxzj9mbxP61EZWydzww20wpPXaIPKoLIVDfWsL";
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
    var dataRequest = new XMLHttpRequest();

    return new Promise((resolve, reject) => {

      dataRequest.open("GET", url, true);
      dataRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(JSON.parse(dataRequest.responseText));
          } else {
            console.log("error getting Groups: " + this.status);
          }
        }
      };
      dataRequest.send();
    });
  },
};
