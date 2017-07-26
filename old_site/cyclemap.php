<!DOCTYPE html lang="en">

<html>
<head>
	<title>Steve Ruiz &raquo; Cycle Map Demo</title>
	<?php include 'header.php';?>
	<script type="text/javascript" src="js/presenter.js"></script>
</head>

<body>

	<div class="container">

		<div id="header" class="row justify-content-center">
			<div class="col-12 col-lg-10" class="home">
				
				<h5 id="project"><a href="/" class="glyphicon glyphicon glyphicon glyphicon-home home" aria-hidden="true"></a>Cycle Map Mobile</h5>
				<h1 id="title">Saved Locations</h1>
				<p id="summary" class="lead">Adding locations to your saved locations and retrieving them as start or end points.</p>

			    <div class="links">&nbsp;
			    	<a href="#" id="prevPage" alt="Previous Page" class="prev">&nbsp;</a>
			        <a href="#" id="nextPage" alt="Next Page" class="next link">&nbsp;</a> 
			    </div>
			</div>
		</div>

		<div class="row top-buffer justify-content-center demo">
			<div class="col-10 col-sm-5 col-md-5 col-lg-4 col-xl-4 main">
				<div id="leftPane">
					

					<img src="images/blankScreen.jpg" class="img-fluid blankImg">
					<div class="top-fixer">&nbsp;</div>
					<div class="left-fixer">&nbsp;</div>
					<video id="prototype" src="videos/1_0.mp4" class="img-fluid" autoplay="true" preload="auto" poster="images/blankScreen.jpg" type="video/mp4"/></video>

					&nbsp;
				</div>
			</div>

			<div id="rightPane" class="col-xs-12 col-sm-7 col-md-7 col-lg-6 col-xl-6">
				<div id="steps" class="col-12">
				</div>
			</div>

		</div>
	</div>  <!-- container -->
</body>
</html>