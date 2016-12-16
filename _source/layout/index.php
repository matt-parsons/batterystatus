<!DOCTYPE html>
<html prefix="og: http://ogp.me/ns#">
<head>
	<?php require_once('files/php/header_init.php'); ?>

	<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    
	<title>Unfold Boiler</title>

	<link href="files/css/main.css" rel="stylesheet" type="text/css" />

	<script src="files/js/main.min.js"></script>
 
    <!-- META DATA -->
    <meta name="description" content=""/>
    <meta name="keywords" content="disney"/>

	<!-- fb -->
	<meta property="fb:app_id" content=""/>
	<meta property="og:title" content="" />
	<meta property="og:description" content="" />
	<meta property="og:type" content="movie" />
	<meta property="og:url" content="" />
	<meta property="og:image" content="" />
	<meta property="og:site_name" content="" />
</head> 

<body class="<?php echo $device; ?> <?php echo $browser; ?>" >

<div id="batteryLvl"></div>
<div id="chargingStatus"></div>

<script type="text/javascript">
$(document).ready(function(){
	mainController.init();
});
</script>

</body>
</html>