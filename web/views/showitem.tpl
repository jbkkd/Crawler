<!DOCTYPE HTML>
<head>
    <title>Show item</title>
    <script src="{{ get_url('static', filename='jquery-1.9.1.js') }}" type="text/javascript"></script>
    <link href="{{ get_url('static', filename='showitem.css') }}" rel="stylesheet" type="text/css" />
</head>
<body>
	<div id="container">
		<header>
			<h1>This is the header.</h1>
			<p class="description">Usually some sort of tagline or description is placed here.</p>
		</header>
		<div id="wrapper">
			<section id="content">
                <center><h2>Item Name</h2>
                <img width="200" height="200" src="none.gif"></center>
                <table border=0>
                    <tr>
                        <td valign="top">
                            <h3><u>What people around the internet saying</u></h3>
                            <div id="top_comments">
                                1.<b>Iphonehack.com:</b><i> "balblabab!"</i>[by: <b>3042[Y]</b>]<br>
                                2.<b>Microiphones.com:</b><i> "and more blablalblabab!"</i>[by: <b>75[Y]</b>]<br>
                                3.<b>Stackoverflow.com:</b><i> "and the finall balblalblalblab"</i>[by: <b>2346[Y]</b>]<br>
                                4.<b>Iphonehack.com:</b><i> "I used this iphone and its exploded on my face!"</i>[by: <b>853[Y]</b>]<br>
                                5.<b>Microiphones.com:</b><i> "battry is dead after 4 hours!"</i>[by: <b>44[Y]</b>]<br>
                                6.<b>Stackoverflow.com:</b><i> "price is too expensive"</i>[by: <b>5432[Y]</b>]<br>
                            </div>
                        </td>
                        <td valign="top">
                            <h3 ><u>What people thinks about...</u></h3>
                            <div id="ppl_thinks">
                                <b>Battry Life: </b>80% <small>(avg:75%)</small><br><small>"Works great for the first one year, but that all"</small><br><br>
                                <b>Screen Size: </b>55% <small>(avg:80%)</small><br><small>"Too small for me"</small><br><br>
                                <b>Screen Quality: </b>100% <small>(avg:60%)</small><br><small>"Best i have ever seen"</small><br><br>
                                <b>Touch Quality: </b>87% <small>(avg:87%)</small><br><small>"Its like most of the phones"</small><br><br>

                            </div><br>
                        </td>
                        <td valign="top" align="center">
                            <h3><u>You don't have IPhone 4?</u></h3>
                            <div id="adv">
                                <img src="showitem.tpl" width="150" height="150"/><br>
                                Buy IPhone 4 for 30% off! only on this website.
                            </div><br>
                        </td>
                    </tr>

                </table>
			</section>
		</div>
		<nav>
			<h2>Navigation Here</h2>
			<ul>
				<li><a href="">Navigation 1</a></li>
				<li><a href="">Navigation 2</a></li>
				<li><a href="">Navigation 3</a></li>
				<li><a href="">Navigation 4</a></li>
				<li><a href="">Navigation 5</a></li>
				<li><a href="">Navigation 6</a></li>
			</ul>
		</nav>
		<section id="extra">
			<h2>Extra Information about iphone 4</h2>
			<p>GSM model: UMTS/HSDPA/HSUPA (850, 900, 1900, 2100 MHz);
GSM/EDGE (850, 900, 1800, 1900 MHz)
CDMA model: CDMA EV-DO Rev. A (800, 1900 MHz)
802.11b/g/n Wi-Fi (802.11n 2.4GHz only)
Bluetooth 2.1 + EDR wireless technology</p>
            <div class="size column last">
									<p><b>Height:</b> 4.5 inches (115.2 mm)</p>
									<p><b>Width:</b> 2.31 inches (58.6 mm)</p>
									<p><b>Depth:</b> 0.37 inch (9.3 mm)</p>
									<p><b>Weight:</b> 4.8 ounces (137 grams)</p>
								</div>

		</section>
		<footer>
			<ul>
				<li><a href="">Navigation 1</a></li>
				<li><a href="">Navigation 2</a></li>
				<li><a href="">Navigation 3</a></li>
				<li><a href="">Navigation 4</a></li>
				<li><a href="">Navigation 5</a></li>
				<li><a href="">Navigation 6</a></li>
			</ul>
			<p>Footer stuff goes here. Copyright, disclaimers &ndash; stuff like that.</p>
		</footer>
	</div>
</body>
</html>