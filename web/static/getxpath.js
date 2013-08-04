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

//vars that maybe we should put in class:(anyway - its not the way to pass the information)
var indexOfSelectionStart, indexOfSelectionEnd;
var SelectedTextArea;


/**
 * Function that get the list of the elements and return string out of it,
 * the first element will be "start" and the last will be "end"(by index).
 */
function GetXpathString(start, end, list){
    var tempXpath;
    tempXpath = "//";
    for(var i = start; i <= end; i++){
        tempXpath += list[i] + "/";
    }
    tempXpath = tempXpath.slice(0, tempXpath.length-1);


    return tempXpath;
}


/**
 * Function that gets an element and start to scan all his parents up to "output_view".
 * the function changes the global var of ListOfElements - which is list of all the parents.
 */
function GenerateList(elm) {
    var tempXpath = "";
    ListOfElements = [];
    while (elm.id != "output_view") {
        tempXpath = GetXpathOfElement(elm);
        ListOfElements.unshift(tempXpath);
        elm = elm.parentNode;
    }
}

/**
 * Function that looks for all the attributes the element have, by useing GetXpathWithAttribute(),
 * it returns the correct xpath of a !!specific!! element.
 */
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


/**
 * Function that that the current xpath, new elm, and new attr,
 * and return new xpath with the correct pattern of !!specific!! attribute for the element.
 */
function GetXpathWithAttribute(xpath, elm, attribute){
    if (elm.hasAttribute(attribute) && elm.attributes[attribute].value != ""){
        if (xpath.indexOf("[") == -1){
            xpath += "[";
        }
        else{
            xpath += " and "
        }
        xpath += "@" + attribute + "='" + elm.attributes[attribute].value + "'";
    }
    return xpath;
}


/**
 * Function that  called when we have clicked on +/- button.
 * we have to change the blue outline and the text in textarea.
 */
function UpdateXpathTextAndClass(){
    var currentXpath = GetXpathString(SelectedStart, SelectedEnd, SelectedList);
    $('#text_' + currentQuest[quest_counter-1]).val(currentXpath);
    $(".selectedXpathHighLight").removeClass("selectedXpathHighLight");
    $("#output_view").xpath(currentXpath).addClass("selectedXpathHighLight");
    ChangeContentDropdown(currentXpath);
}


/**
 * Function that gets attr(can be text()/@class/@id/ or anything else.
 * and return the full xpath string for python to work with.
 */
function GetContent(attr){
    var currentXpath = GetXpathString(SelectedStart, SelectedEnd, SelectedList);
    return currentXpath + "/" + attr;
}


/**
 * Function that gets xpath string , and return list of attributes
 * of the last element in the string.
 */

// TODO: maybe i can send to the function the last element instand?
function GetAttributesOfLast(xpath){
    var indexOfLastSlash = xpath.lastIndexOf("/");
    var lastElm = xpath.slice(indexOfLastSlash, xpath.length - 1);
    return GetAttributes(lastElm);
}

/**
 * Function that gets element as a string , and return list of attributes it has.
 */
function GetAttributes(elm){
    var attrs = [];
    var i = 0;
    //this part return an array of arrays of [atts, value]:
//    while (elm.indexOf("@") != -1 && i < 5){
//        var attr = elm.slice(elm.indexOf("@"), elm.indexOf("="));
//        var attrContent = elm.slice(elm.indexOf("'") + 1, elm.indexOf("'",elm.indexOf("='") + 2));
//        attrs.push([attr, attrContent]);
//        elm = elm.replace(elm.slice(elm.indexOf("@"), elm.indexOf("'", elm.indexOf("='") + 2) + 1), "");
//    }
//    return attrs;
    while (elm.indexOf("@") != -1 && i < 5){
        var attr = elm.slice(elm.indexOf("@"), elm.indexOf("="));
        attrs.push(attr);
        elm = elm.replace(elm.slice(elm.indexOf("@"), elm.indexOf("'", elm.indexOf("='") + 2) + 1), "");
    }
    return attrs;
}

function ChangeContentDropdown(currentXpath){
    $("#content").append($('<option>', {
        value: "/text()",
        text : "/text()"
    }));
    $.each(GetAttributesOfLast(currentXpath), function(index, value){
        $("#content").append($('<option>', {
            value: "/" + value,
            text : "/" + value
        }));
    });
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
    $(document).keypress(function(e) {
        if(e.which == 13 && quest_counter < currentQuest.length) {
            DataToDB[currentQuest[quest_counter]] = GetXpathString(SelectedStart, SelectedEnd, ListOfElements); //TODO: check if that works
            SelectedList = ListOfElements;
            SelectedStart = indexOfStart;
            SelectedEnd = indexOfEnd;
            var currentXpath = GetXpathString(SelectedStart, SelectedEnd, ListOfElements);

            $("#controls").remove();
            $("#output_DataToDB_list").append(currentQuest[quest_counter] + ":<textarea rows='1' cols='60' id='text_" + currentQuest[quest_counter] + "'/></textarea><br>" +
                "<div id='controls'><div id='err'></div><div id='buttons'>Start:<input id='plusStart' type='button' value='+' />" +
                "<input id='minusStart' type='button' value='-' /><br>EEnd:<input id='plusEnd' type='button' value='+' />" +
                "<input id='minusEnd' type='button' value='-'/><br></div>" +
                "<div id='changes'><select id='xpathFunctions' style='display: none;'></select>" +
                "output:<select id='content'></select></div></div>");

            ChangeContentDropdown(currentXpath);
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
        SelectedStart--;
        UpdateXpathTextAndClass();
    });

    $("#output_DataToDB").on("click", "#minusStart", function(){
        SelectedStart++;
        UpdateXpathTextAndClass();
    });

    $("#output_DataToDB").on("click", "#plusEnd", function(){
        SelectedEnd++;
        UpdateXpathTextAndClass();
    });

    $("#output_DataToDB").on("click", "#minusEnd", function(){
        SelectedEnd--;
        UpdateXpathTextAndClass();
    });

    $("#output_DataToDB").on("select", "textarea", function(){
        indexOfSelectionStart = this.selectionStart;
        indexOfSelectionEnd = this.selectionEnd;
        $("#xpathFunctions").empty();
        var temp = this.value.slice(this.selectionStart, this.selectionEnd);
        if(temp.indexOf("=") == -1 || temp[temp.length - 1] != "'" || temp[0] != "@"){
            $("#err").html("<font color=red>The selection isn't valid, Example:@id='post_id_'</font>")
        }else{
            var equalsIndex = temp.indexOf("=");
            var attribute = temp.slice(0, equalsIndex);
            var valueOfAttr = temp.slice(equalsIndex + 1, temp.length);
            var replacement = "(" + attribute + ", " + valueOfAttr + ")";
            var listOfFunction = ["starts-with", "ends-with", "contains"];
            $.each(listOfFunction, function(index, value){
                $("#xpathFunctions").append($('<option>', {
                    value: value + replacement,
                    text : value + replacement
                }));
            });
            $("#xpathFunctions").show();
            SelectedTextArea = this;
            $("#err").empty();
        }


    });
    $("#output_DataToDB").on("change", "#xpathFunctions", function(){
        SelectedTextArea.value = SelectedTextArea.value.slice(0, indexOfSelectionStart) + this.value + SelectedTextArea.value.slice(indexOfSelectionEnd, SelectedTextArea.value.length);
    });

    $("#output_DataToDB").on("change", "#content", function(){
        //SelectedTextArea.value = SelectedTextArea.value.slice(0, indexOfSelectionStart) + this.value + SelectedTextArea.value.slice(indexOfSelectionEnd, SelectedTextArea.value.length);
        alert("should be append somehow, and if changed again, append instand of the last one. noob");
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
            if($(evt.target).class == ""){
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
