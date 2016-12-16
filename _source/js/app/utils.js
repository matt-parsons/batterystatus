var currentLevel = 'intro_screen';


// LOAD JSON

function loadJson(_url, _callback)
{
   var data_file = _url;
   var http_request = new XMLHttpRequest();
   
   try{
      // Opera 8.0+, Firefox, Chrome, Safari
      http_request = new XMLHttpRequest();
   
   }catch (e){
      
      // Internet Explorer Browsers
      
      try{
      
         http_request = new ActiveXObject("Msxml2.XMLHTTP");
      
      }catch (e) {
      
         try{
      
            http_request = new ActiveXObject("Microsoft.XMLHTTP");
      
         }catch (e){
      
            // Something went wrong
            alert("!ERROR");
            return false;
         
         }
      }
   }
   
   http_request.onreadystatechange  = function(){
      
      if (http_request.readyState == 4  )
      {
        // Javascript function JSON.parse to parse JSON data
        window.lang_text = JSON.parse(http_request.responseText);
        console.log(lang_text);
        _callback();
      
      }
   }
   
   http_request.open("GET", data_file, true);
   http_request.send();

}


//timer stuff

    var timer_time = 0, timer_status = 0;
    var timer_var;
    String.prototype.toHHMMSS = function () {
        sec_numb    = parseInt(this, 10); // dont forget the second parm
        var hours   = Math.floor(sec_numb / 3600);
        var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
        var seconds = sec_numb - (hours * 3600) - (minutes * 60);
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
//      var time    = hours+ ":"+minutes+":"+seconds;
        var time    = minutes+":"+seconds;
        return time;
    }
    function start_timer() {
        timer_time = 0;
        timer_status = 1;
        setTimeout(function() {
            $('#timerWrapper').fadeIn();
            // document.getElementById("timer").style.display = "block";
            // document.getElementById("timer_message").style.display = "block";
        }, 1000);
        timer_var = setInterval(function(){update_timer()},1000);
    }
    function stop_timer() {
        timer_status = 0;
        clearInterval(timer_var);
        //$('#timerWrapper').hide();
    }
    function pause_timer() {
         timer_status = 0;
    }
    function resume_timer() {
        timer_status = 1;
    }
    function hide_timer() {
        $('#timerWrapper').fadeOut();
        // document.getElementById("timer").style.display = "none";
        // document.getElementById("timer_message").style.display = "none";
    }
    function show_timer() {
        $('#timerWrapper').fadeIn();
        // document.getElementById("timer").style.display = "block";
        // document.getElementById("timer_message").style.display = "block";
    }
    
    function update_timer()
    {
        if (timer_status > 0) {
        timer_time = timer_time + 1;
        document.getElementById("timer").innerHTML= timer_time.toString().toHHMMSS();
        }
    }

    function return_time() {
        return document.getElementById("timer").innerHTML;
    }

function __(name) {
    console.log('checking release_date: ',name);
    var log = 'lang: ' + name;
    if(typeof lang_text[name] != "string") {
        return name;
    } else {
        name = check_release_date_name(name);
        //log += " name: " + name + " Text: " + lang_text[name];
        //console.log(log);
        console.log('lang_text: ',lang_text[name]);
        return lang_text[name];
    }
}

function showCredits(){
    jQuery("#credits_block").slideDown(); 
/*  document.getElementById("credits_block").style.display = "inline";
    document.getElementById("credits_block").addEventListener("click", hideCredits, false);
    */
}

function hideCredits(){
    jQuery("#credits_block").slideUp();
    /*document.getElementById("credits_block").style.display = "none";
    document.getElementById("credits_block").removeEventListener("click", hideCredits);
    */
}
// IS MOBILE
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    iPad: function() {
        return navigator.userAgent.match(/iPad/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    KindleTablet: function() {
        return navigator.userAgent.match(/Kindle/i);
    },
    AndroidTablet: function() {
         return navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/Mobile/i) || navigator.userAgent.match(/SCH-I800/i) || isMobile.KindleTablet();    
    },
    any: function() {
        return (isMobile.Android() && !isMobile.AndroidTablet() || isMobile.BlackBerry() || isMobile.iOS() && !isMobile.iPad() || isMobile.Opera() || isMobile.Windows());
    },
    Table: function() {
        return (isMobile.iPad() || isMobile.AndroidTablet());
    },
    MobileOrTablet: function() {
        return isMobile.any() || isMobile.Table();
    }
};