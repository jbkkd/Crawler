<!DOCTYPE HTML>
<html>
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
                            <h3><u>Top 5 positive comments:</u></h3>
                            <div id="top_pos_comments">
                                1.<b>Iphonehack.com:</b><i> "balblabab!"</i><br>
                                2.<b>Microiphones.com:</b><i> "and more blablalblabab!"</i><br>
                                3.<b>Stackoverflow.com:</b><i> "and the finall balblalblalblab"</i><br>
                            </div><br>
                            <h3><u>Top 5 negative comments:</u></h3>
                            <div id="top_neg_comments">
                                1.<b>Iphonehack.com:</b><i> "I used this iphone and its exploded on my face!"</i><br>
                                2.<b>Microiphones.com:</b><i> "battry is dead after 4 hours!"</i><br>
                                3.<b>Stackoverflow.com:</b><i> "price is too expensive"</i><br>
                            </div>
                        </td>
                        <td valign="top">
                            <h3 ><u>What people thinks about...</u></h3>
                            <div id="ppl_thinks">
                                <b>Battry Life: </b>80% <small>(avg:75%)</small><br><small>"Works great for the first one year, but that all"</small><br><br>
                                <b>Screen Size: </b>55% <small>(avg:80%)</small><br><small>"Too small for me"</small><br><br>
                                <b>Screen Quality: </b>100% <small>(avg:60%)</small><br><small>"Best i have ever seen</small><br><br>
                                <b>Touch Quality: </b>87% <small>(avg:87%)</small><br><small>"Its like most of the phones</small><br><br>

                            </div><br>
                        </td>
                        <td valign="top" align="center">
                            <h3><u>You dont have IPhone 4?</u></h3>
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
			<h2>Extra Stuff Goes Here</h2>
			<p>Sometimes this would be called a <em>sidebar</em>, but it doesn't always have to be on the side to be called a <em>sidebar</em>. Sidebars can be on tops of things, below things, but they are usually beside things &ndash; hence it being a called a sidebar.</p>
			<p><small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</small></p>
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