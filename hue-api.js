window.hueApi = {
  getGroups: function (bridgeIp, user) {
    // var ip = "192.168.0.21";
    // var hueId = "yaDxzj9mbxP61EZWydzww20wpPXaIPKoLIVDfWsL";
    var url = "http://" + bridgeIp + "/api/" + user + "/groups";
    var retry = true;

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

  toggleGroupLights: function(bridgeIp, user, groupId, toggle, setBrightness) {
    let url = "http://" + bridgeIp + "/api/" + user + "/groups/" + groupId + "/action";

    let dataRequest = new XMLHttpRequest();

    let payload = { "on": toggle }
    if (setBrightness) {
      payload["bri"] = 130
    }

    return new Promise((resolve, reject) => {

      dataRequest.open("PUT", url, true);
      dataRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      dataRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(JSON.parse(dataRequest.responseText));
          } else {
            console.log("error getting Groups: " + this.status);
          }
        }
      };
      dataRequest.send(JSON.stringify(payload));
    });
  },
  changeGroupBrightness: function(bridgeIp, user, groupId, newBrightness) {
    var url = "http://" + bridgeIp + "/api/" + user + "/groups/" + groupId + "/action";
    var dataRequest = new XMLHttpRequest();

    return new Promise((resolve, reject) => {

      dataRequest.open("PUT", url, true);
      dataRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      dataRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(JSON.parse(dataRequest.responseText));
          } else {
            console.log("error getting Groups: " + this.status);
          }
        }
      };
      dataRequest.send(JSON.stringify( {"bri":newBrightness} ));
    });
  },
  updateGroupLightColor: function(bridgeIp, user, groupId, hue, sat) {
    var url = "http://" + bridgeIp + "/api/" + user + "/groups/" + groupId + "/action";
    var dataRequest = new XMLHttpRequest();

    return new Promise((resolve, reject) => {

      dataRequest.open("PUT", url, true);
      dataRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      dataRequest.onreadystatechange = function() {
        if (this.readyState === 4) {
          if (this.status === 200) {
            resolve(JSON.parse(dataRequest.responseText));
          } else {
            console.log("error getting Groups: " + this.status);
          }
        }
      };
      dataRequest.send(JSON.stringify( {"hue":hue, "sat":sat} ));
    });
  }
};
