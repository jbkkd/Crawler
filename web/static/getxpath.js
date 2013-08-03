var quest_counter = 0;
var currentQuest = [];

//Vars for XPaths Generator:
var ListOfElements = [];
var indexOfStart = 0;
var indexOfEnd = 0;
var hoverXpath = "";
var SelectedList;  //List of tags of the selected element
var SelectedStart;
var SelectedEnd;

function GetXpathString(start, end, list){
    var tempXpath;
    tempXpath = "//";
    for(var i = start; i <= end; i++){
        tempXpath += list[i] + "/";
    }
    tempXpath = tempXpath.slice(0, tempXpath.length-1);


    return tempXpath;
}
function GenerateList(elm) {
    var tempXpath = "";
    ListOfElements = [];
    while (elm.id != "output_view") {
        tempXpath = GetXpathOfElement(elm);
        ListOfElements.unshift(tempXpath);
        elm = elm.parentNode;
    }
}
function GetXpathOfElement(elm){
    var xpathOfCurrentElement;

    xpathOfCurrentElement = elm.nodeName.toLowerCase();
    xpathOfCurrentElement = GetXpathWithAttribute(xpathOfCurrentElement, elm, "id");
    xpathOfCurrentElement = GetXpathWithAttribute(xpathOfCurrentElement, elm, "class");
    if (xpathOfCurrentElement.indexOf("[") >= 0)
    {
        xpathOfCurrentElement += "]";
    }
    return xpathOfCurrentElement;
}

function GetXpathWithAttribute(xpath, elm, attribute){
    if (elm.hasAttribute(attribute) && elm.attributes[attribute].value != "")
    {
        if (xpath.indexOf("[") == -1)
        {
            xpath += "[";
        }
        else
        {
            xpath += " and "
        }
        xpath += "@" + attribute + "='" + elm.attributes[attribute].value + "'";
    }
    return xpath;
}



$(document).ready(function(){
	var DataToDB = {};
	var pageType = "thread";

    // TODO: make a python(via AJAX) function to get site_link/page_link/page_number
	var threadQuest = [
		'site_link',
		'page_link',
		'htmlelement_that_wraps_a_post',
		'forum_name',
		'forum_version',
		'post_title',
		'post_data',
		'poster_username',
		'thread_title',
		'page_number'
	];

	var forumQuest = [
		'site_link',
		'thread_link',
		'htmlelement_that_wraps_a_thread',
		'thread_titles',
		'forum_name',
		'thread_replies',
		'thread_views',
		'thread_Starter',
		'thread_last_post_date',
		'page_number',
		'thread_ratings'
	];
   	//Init the type of the page:
    currentQuest = threadQuest;

    $("#page_type").change(function(){
        quest_counter = 0;
        pageType = $(this).val();
        if(pageType == "thread"){
            currentQuest = threadQuest;
        } else if (pageType == "forum"){
            currentQuest = forumQuest;
        }
        $("#output_DataToDB_list").empty();
        $("#update_DataToDB_button").remove();
        $("#quest").text(currentQuest[0]);
    });
	//Draggable by UI Jquery lib!
    $(".float_menus").draggable();

	//AJAX sending request to mainroute.py
    $.ajax({
        url: "/a",
        type: "POST",
        success: function(response){
            $('#output_view').html(response);
        }
    });

	//Init the output_code:
	$("#quest").text(currentQuest[quest_counter]);

    //Event handle for update_DataToDB button
    $('#output_DataToDB').on("click", "#update_DataToDB_button", function(){
        $.each(DataToDB, function(key){
            DataToDB[key] = $("#text_" + key).val();
        });
        DataToDB["page_type"] = $("#page_type").val();

        $.ajax({
            url: "/a",
            type: "POST",
            data: JSON.stringify(DataToDB),
            contentType: "application/json",
            success: function(data){
                alert(data);
            }
        });
    });

    //Event handle for GetByURL button
    $('#GetByURL').on("click", "#GetByURL_button", function(){
        $.ajax({
            url: "/a",
            type: "POST",
            data: JSON.stringify({"newURL": $("#GetByURL_input").val()}),
            contentType: "application/json",
            success: function(response) {
                $('#output_view').html(response);
            }
        });
    });

	//ENTER event handle
		$(document).keypress(function(e) { // TODO: this event isn't working with the new xpath yet
			if(e.which == 13 && quest_counter < currentQuest.length) {
				DataToDB[currentQuest[quest_counter]] = GetXpathString();
                SelectedList = ListOfElements;
                SelectedStart = indexOfStart;
                SelectedEnd = indexOfEnd;
                $("#controls").remove();
                $("#output_DataToDB_list").append(currentQuest[quest_counter] + ":<textarea rows='1' cols='60' id='text_" + currentQuest[quest_counter] + "'/></textarea><br>" +
                    "<div id='controls'>Start:<input id='plusStart' type='button' value='+' />" +
                    "<input id='minusStart' type='button' value='-' /><br><br>End:<input id='plusEnd' type='button' value='+' />" +
                    "<input id='minusEnd' type='button' value='-'/><br>");
                var currentXpath = GetXpathString(SelectedStart, SelectedEnd, ListOfElements);
                $('#text_' + currentQuest[quest_counter]).val(currentXpath);
                $(".selectedXpathHighLight").removeClass("selectedXpathHighLight");
                $("#output_view").xpath(currentXpath).addClass("selectedXpathHighLight");
                if(quest_counter == currentQuest.length - 1){
                    $("#output_DataToDB").append("<input type='button' id='update_DataToDB_button' value='Save!'>");
                }
				quest_counter++;
                $("#quest").text(currentQuest[quest_counter]);
			}
	});
    //All the events for the +/- for the xpath
    $("#output_DataToDB").on("click", "#plusStart", function(){
        var currentXpath;
        SelectedStart--;
        currentXpath = GetXpathString(SelectedStart, SelectedEnd, SelectedList);
        $('#text_' + currentQuest[quest_counter-1]).val(currentXpath);
        $(".selectedXpathHighLight").removeClass("selectedXpathHighLight");
        $("#output_view").xpath(currentXpath).addClass("selectedXpathHighLight");
    });

    $("#output_DataToDB").on("click", "#minusStart", function(){
        var currentXpath;
        SelectedStart++;
        currentXpath = GetXpathString(SelectedStart, SelectedEnd, SelectedList);
         $('#text_' + currentQuest[quest_counter-1]).val(currentXpath);
        $(".selectedXpathHighLight").removeClass("selectedXpathHighLight");
        $("#output_view").xpath(currentXpath).addClass("selectedXpathHighLight");
    });

    $("#output_DataToDB").on("click", "#plusEnd", function(){
        var currentXpath;
        SelectedEnd++;
        currentXpath = GetXpathString(SelectedStart, SelectedEnd, SelectedList);
         $('#text_' + currentQuest[quest_counter-1]).val(currentXpath);
        $(".selectedXpathHighLight").removeClass("selectedXpathHighLight");
        $("#output_view").xpath(currentXpath).addClass("selectedXpathHighLight");
    });

    $("#output_DataToDB").on("click", "#minusEnd", function(){
        var currentXpath;
        SelectedEnd--;
        currentXpath = GetXpathString(SelectedStart, SelectedEnd, SelectedList);
         $('#text_' + currentQuest[quest_counter-1]).val(currentXpath);
        $(".selectedXpathHighLight").removeClass("selectedXpathHighLight");
        $("#output_view").xpath(currentXpath).addClass("selectedXpathHighLight");
    });

    //Event handler for hover:
    $('#output_view').mouseover(function (evt) {
        GenerateList(evt.target);
        indexOfEnd = ListOfElements.length - 1;
        hoverXpath = GetXpathString(indexOfStart,indexOfEnd, ListOfElements);

            $(evt.target).addClass("elmHover");
            $('#selected_xpath').html(hoverXpath);

    }).mouseout(function(evt){
            $(evt.target).removeClass("elmHover");
            if(!$(evt.target).class){
                $(evt.target).removeAttr("class");
            }
        });


	//Scrolling the output_code div to my view
	$(window).scroll(function () {
        var set1 = $(document).scrollTop();
		var p = $("#output_code").position();
		if((set1 - p.top > 150)||(set1 - p.top < -700)){
			$('#output_code').animate({top:set1 + "px"},{duration:500,queue:false});
		}
        var p2 = $("#output_DataToDB").position();
        if((set1 - p2.top > 150)||(set1 - p2.top < -700)){
            $('#output_DataToDB').animate({top:set1 + "px"},{duration:500,queue:false});
        }
	});
});
