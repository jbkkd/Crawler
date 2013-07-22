<!DOCTYPE HTML>
<html>
<head>
    <title>GetURLs</title>
    <script src="{{ get_url('static', filename='jquery-1.9.1.js') }}" type="text/javascript"></script>
    <link href="{{ get_url('static', filename='GetURLs.css') }}" rel="stylesheet" type="text/css" />
</head>
<body>
<div id="div_of_urls">
    <table cellspacing="0" id="table_of_urls">
        <tr>
            <th>Site URL</th>
            <th>Data added</th>
            <th>Action</th>
        </tr>

        %for i in list_urls:
        <tr>
            <td>{{i}}</td>
            <td>22222</td>
            <td><a href="#{{i}}" id="Edit{{i}}">Edit</a> / <a href="#{{i*i}}" id="Delete{{i}}">Delete</a></td>
        </tr>
        %end
    </table>
</div>
</body>
</html>