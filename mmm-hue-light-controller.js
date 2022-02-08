/* global Module */

/* Magic Mirror
 * Module: mmm-hue-light-controller
 *
 * By Irpe1337master
 * MIT Licensed.
 */

Module.register("mmm-hue-light-controller", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000,
		bridgeIp: '',
		user: '',
		weatherApiKey: '',
		lat: '',
		lon: '',
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;
		this.hueGroups = {};
		this.hueLights = {};
		this.activeView = "";


		//Flag for check if module is loaded
		this.loaded = false;

		this.errMsg = '';

		// Schedule update timer.
		this.getGroups();

		// 15min interval
		setInterval(function() {
			console.log("interval");
			self.setHueGroupLightColor();
			//self.updateDom();
		}, 900000);
	},

	/*
	 * getData
	 * function example return data and show it in the module wrapper
	 * get a URL request
	 *
	 */
	getGroups: function() {
		var self = this;

		if (this.config.bridgeIp === '' || this.config.user === '' || this.config.weatherApiKey === '' ) {
        this.errMsg = 'Please add your Hue bridge IP, user, and weather api key to the MagicMirror config.js file.';
        this.updateDom(this.config.animationSpeed);
    } else {
        this.sendSocketNotification('mmm-hue-light-controller', {
            bridgeIp: this.config.bridgeIp,
            user: this.config.user
        });

			hueApi.getGroups(this.config.bridgeIp, this.config.user)
				.then(
					res => {
						self.hueGroups = res;
						self.activeView = "groups";
						self.setHueGroupLightColor();
						this.updateDom();
					}
				);
    }
	},

	setHueGroupLightColor: function() {
		var self = this;

		if (Object.keys(self.hueGroups).length === 0) {
			console.log("Hue groups are empty!")
			return
		}

		hueWeatherApi.getCurrentWeather(this.config.weatherApiKey, this.config.lat, this.config.lon)
		.then(
			res => {
				let hue = 0;
				let sat = 0;

				console.log("weather is " + res.weather[0].main)

				if (res.weather[0].main == 'Clouds') {
					console.log("it is cloudy color")
					hue = 41483;
					sat = 78;
				} else if (res.weather[0].main == 'Snow') {
					console.log("it is Snow color")
					hue = 41483;
					sat = 78;
				} else {
					console.log("use default color")
					hue = 9214;
					sat = 57;
				}

				let currentUnixTime = new Date().getTime();
				currentUnixTime = currentUnixTime.toString().slice(0, -3);
				currentUnixTime = parseInt(currentUnixTime);

				// Default color when sun is down
				if (currentUnixTime > res.sys.sunrise && currentUnixTime > res.sys.sunset) {
					console.log("sun is down color");
					hue = 8024;
					sat = 143;
				}

				for (let groupId in self.hueGroups) {
					if (self.hueGroups[groupId].state.any_on == true) {
						hueApi.updateGroupLightColor(this.config.bridgeIp, this.config.user, groupId, hue, sat)
					}
				}
			}
		);
	},

	/* scheduleUpdate()
	 * Schedule next update.
	 *
	 * argument delay number - Milliseconds before next update.
	 *  If empty, this.config.updateInterval is used.
	 */
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},



	getDom: function() {
		var self = this;

		// create element wrapper for show into the module
		var wrapper = document.createElement("div");

		// show error message
		if (this.errMsg !== '') {
				wrapper.innerHTML = this.errMsg;
				return wrapper;
		}

		if (self.activeView == "groups") {
			var hbTemplate = Handlebars.templates['group-list'];
			console.log(self.hueGroups);
			var groups = {groups: self.hueGroups};
		  var hbHtml     = hbTemplate(groups);
		}

    wrapper.innerHTML = hbHtml;

		// bubble gum way to create click events. Use "data-action" to figure out what action to do
		wrapper.onclick = function(event) {

			if (event.target.dataset.action == 'toggleGroupLights') {
			    self.toggleGroupLights(event.target.dataset);
			}
			if (event.target.dataset.action == 'changeGroupBrightness') {
			    self.changeGroupBrightness(event.target.dataset, event.target.value);
			}
		}

		return wrapper;
	},

	toggleGroupLights: function(dataset) {
		let self = this;
		let toggleLight = dataset.islighton == "true" ? false : true;
		let setBrightness = this.hueGroups[dataset.groupid].action.bri < 20 ? true : false

		hueApi.toggleGroupLights(this.config.bridgeIp, this.config.user, dataset.groupid, toggleLight, setBrightness).then(
			res => {
				this.getGroups();
				self.setHueGroupLightColor();
			}
		);
	},

	changeGroupBrightness: function(dataset, changeBrightnessValue) {
		var self = this;

		changeBrightnessValue = Number(changeBrightnessValue)
		let currentBrightness = Number(dataset.brightness)
		let newBrightness = changeBrightnessValue < 0 ? currentBrightness - Math.abs(changeBrightnessValue) : currentBrightness + changeBrightnessValue;

		if (newBrightness < 0) {
			newBrightness = 0;
		}

		if (newBrightness > 257) {
			newBrightness = 257;
		}

		hueApi.changeGroupBrightness(this.config.bridgeIp, this.config.user, dataset.groupid, newBrightness).then(
			res => {
				self.hueGroups[dataset.groupid].action.bri = newBrightness;
				this.updateDom();
			}
		);
	},

	// compile handlebars ./templates -f templates.js --extension "hbs"

	getScripts: function() {
		return [
			"https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js",
			"hue-api.js",
			"weather-api.js",
			"templates.js",
		];
	},

	getStyles: function () {
		return [
			"mmm-hue-light-controller.css",
			"https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css",
		];
	},

	// Load translations files
	getTranslations: function() {
		//FIXME: This can be load a one file javascript definition
		return {
			en: "translations/en.json",
			es: "translations/es.json"
		};
	},

	processData: function(data) {
		var self = this;
		this.dataRequest = data;
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;

		// the data if load
		// send notification to helper
		this.sendSocketNotification("mmm-hue-light-controller-NOTIFICATION_TEST", data);
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "mmm-hue-light-controller-NOTIFICATION_TEST") {
			// set dataNotification
			this.dataNotification = payload;
			this.updateDom();
		}
	},
});
