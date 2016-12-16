var mainController = (function(){
  var _obj = {};
  var _obj = {},
  	batteryLvl,
  	chargingStatus;

  function _init() {
    console.log('mainController init');
    batteryLvl = $('#batteryLvl');
    chargingStatus = $('#chargingStatus');

    getBatteryInfo();
  }

  function getBatteryInfo() {
    try {
	    navigator.getBattery().then(function(batt) {
	    	console.log(batt);
	    	setBatteryLvl(batt.level);
	    	setChargingStatus(batt.charging);

	    	batt.onlevelchange = function (evt) {
	    		var lvl = batt.level;
	    		setBatteryLvl(lvl);
	    	}

	    	batt.onchargingchange = function(evt) {
	    		var charging = batt.charging;
	    		setChargingStatus(charging);
	    	}

	    });
	} catch (e) {
		alert('can not read your battery');
		console.log('cant read your battery');
	}
  }

  function setBatteryLvl(lvl, callback) {
  	batteryLvl.html('Battery Level: '+ lvl);
  	if(callback && typeof(callback) === 'function') callback();
  }

  function setChargingStatus(status, callback) {
  	chargingStatus.html('Charging Status: '+status);
  	if(callback && typeof(callback) === 'function') callback();
  }

  _obj.init = _init;
  return _obj;

}());
 