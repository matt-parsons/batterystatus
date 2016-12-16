<?php
	// Detects device type so we can adjust the game accordingly (e.g. removing or reducing some animations for tablets)
	require_once('files/php/Mobile_Detect.php');
	
	$detect = new Mobile_Detect;
	$is_desktop = true;
	$device = 'desktop';
	$browser = '';
	$is_ios = false;
	$ios_vers = '7';

	//checking for IE9
	preg_match('/MSIE (.*?);/', $_SERVER['HTTP_USER_AGENT'], $matches);
	if(count($matches)<2){
	  preg_match('/Trident\/\d{1,2}.\d{1,2}; rv:([0-9]*)/', $_SERVER['HTTP_USER_AGENT'], $matches);
	}

	if (count($matches)>1){
	  //Then we're using IE
	  $version = $matches[1];
	  $browser = 'ie';

	  switch(true){
	    case ($version==9):
	      $browser = "ie9";
	      break;
	    case ($version<=8):
	      $browser = "ie9";
	      break;
	    case ($version==10):
	      $browser = "ie10";
	      break;
	    default:
	      //do nothing
	  }
	}
	
	if( $detect->isMobile() ) {
		$is_desktop = false;
		$device = 'mobile';
	}
	
	if( $detect->isTablet() ) {
		$is_desktop = false;
		$device = 'iPad';
	}
	
	$is_ios = $detect->isIphone();
	if(!$is_ios) {
		$is_ios = $detect->isIpad();
	}

	//if we're on ipad or iphone check safari version
	if($is_ios) {
		$ios_vers = substr($detect->version('Safari'), 0, 1);
		if($ios_vers < 7) {
			$ios_vers = "uns-device";
			$browser = 'ie9';
		}
	}

    // $json = file_get_contents("files/data/matchgame_text.json");
    // $site_data = json_decode(substr($json,3));
?>