<!DOCTYPE HTML>
<html>
<head>
    <title>Get XPath</title>
    <script src="{{ get_url('static', path='scripts/jquery-1.9.1.js') }}" type="text/javascript"></script>
    <script src="{{ get_url('static', path='scripts/jquery-ui-1.10.3.custom.js') }}" type="text/javascript"></script>
    <script src="{{ get_url('static', path='scripts/getxpath.js') }}" type="text/javascript"></script>
    <link href="{{ get_url('static', path='styles/getxpath.css') }}" rel="stylesheet" type="text/css" />
    <script src="{{ get_url('static', path='scripts/jquery.xpath.js') }}" type="text/javascript"></script>
    <script src="{{ get_url('static', path='scripts/getxpath_highlighting.js') }}" type="text/javascript"></script>
    <script src="{{ get_url('static', path='scripts/getxpath_binds.js') }}" type="text/javascript"></script>
    <script src="{{ get_url('static', path='scripts/getxpath_makexpath.js') }}" type="text/javascript"></script>
    <script src="{{ get_url('static', path='scripts/qunit-1.12.0.js') }}" type="text/javascript"></script>
    <link href="{{ get_url('static', path='styles/qunit-1.12.0.css') }}" rel="stylesheet" type="text/css" />


</head>
<body>
<div id="output_DataToDB" class="float_menus">
    <span style="text-decoration: underline;">Currently XPaths Data:</span><br>
    <select id="page_type">
        <option>thread</option>
        <option>forum</option>
    </select>
    <div id="output_DataToDB_list"></div>
</div>

<div id="output_code" class="float_menus" style="left: 910px">
    Hey, please select the:
    <i><div id="quest"></div></i>
    and press <b>ENTER</b>
    <br><br> <b>XPath:</b><br>
    <div id="selected_xpath"></div><hr>
    <div id="GetByURL"><input id="GetByURL_input"><br><button id="GetByURL_button">Get Page By URL</button> </div>
</div>

<div id="output_view" class="float_menus" style="left: 505px">

</div>

<iframe id="output_page" style="width:100%;"></iframe>
</body>
<div id="qunit"></div>
<div id="qunit-fixture"></div>
<script src="{{ get_url('static', path='scripts/getxpath_tests.js') }}" type="text/javascript"></script>
</html>