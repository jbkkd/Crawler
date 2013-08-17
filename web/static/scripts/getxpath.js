var quest_counter = 0;
var currentQuest = [];
var DataToDB = {};
var pageType = "thread";


//Vars for XPaths Generator:
var ListOfElements = [];
var indexOfStart = 0;
var indexOfEnd = 0;
var hoverXpath = "";
var SelectedList;  //List of tags of the selected element
var SelectedStart;
var SelectedEnd;
var CurrentMouseTarget;

//vars that maybe we should put in class:(anyway - its not the way to pass the information)
var indexOfSelectionStart, indexOfSelectionEnd;
var SelectedTextArea;


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


/**
 * Function that called when we have clicked on +/- button.
 * we have to change the blue outline and the text in textarea.
 */
function UpdateAfterXPathChanged(){ //TODO: Idont think that function should looks/called like that
    var currentXpath = GetXpathString(SelectedStart, SelectedEnd, SelectedList);
    $('#text_' + currentQuest[quest_counter-1]).val(currentXpath + $("#content_" + currentQuest[quest_counter-1]).val());
    BindChangeContentDropdown(currentXpath);
    HighlightSelectedXpath(currentXpath);
}

function HelloWorld(h, w){
    return h + " " + w;
}


function InitializeDBData(DataToDB) {
    $.each(DataToDB, function (key) {
        DataToDB[key] = $("#text_" + key).val();
    });
    DataToDB["page_type"] = $("#page_type").val();
}

function CheckIfUserFinishedInput() {
    if (quest_counter == currentQuest.length - 1) {
        $("#output_DataToDB").append("<input type='button' id='button_save' value='Save!'>");
    }
}

function BuildXPathOperatorsDropdownList(selectedString) {
    var equalsIndex = selectedString.indexOf("=");
    var attribute = selectedString.slice(0, equalsIndex);
    var valueOfAttr = selectedString.slice(equalsIndex + 1, selectedString.length);
    var replacement = "(" + attribute + ", " + valueOfAttr + ")";
    var listOfFunction = ["Choose your operators", "starts-with", "ends-with", "contains"];
    $.each(listOfFunction, function (index, value) {
        $("#xpathOperators").append($('<option>', {
            value: value + replacement,
            text: value + replacement
        }));
    });
    $("#xpathOperators").show();
    $("#err").empty();
}
function WindowsScrollHandler() {
    var set1 = $(document).scrollTop();
    var p = $("#output_code").position();
    if ((set1 - p.top > 150) || (set1 - p.top < -700)) {
        $('#output_code').animate({top: set1 + "px"}, {duration: 500, queue: false});
    }
    var p2 = $("#output_DataToDB").position();
    if ((set1 - p2.top > 150) || (set1 - p2.top < -700)) {
        $('#output_DataToDB').animate({top: set1 + "px"}, {duration: 500, queue: false});
    }
}


$(document).ready(function(){
    // TODO: make a python(via AJAX) function to get site_link/page_link/page_number

    currentQuest = threadQuest;
    $("#page_type").change(function(){
        BindChangePageType.call(this);
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

    //Event handle for save button
    $('#output_DataToDB').on("click", "#button_save", function(){
        InitializeDBData(DataToDB);
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
    $(document).keypress(function(evt) {
        if(evt.which == 13 && quest_counter < currentQuest.length) {
            RemoveHighLightClasses(true);
            GenerateList(CurrentMouseTarget);
            DataToDB[currentQuest[quest_counter]] = GetXpathString(SelectedStart, SelectedEnd, ListOfElements);// TODO: Not sopose to be in the save event?

            $("#controls").remove();
            $("#output_DataToDB_list").append(currentQuest[quest_counter] + ":<textarea rows='1' cols='60' id='text_" + currentQuest[quest_counter] + "'/></textarea><br>" +
                "<div id='controls'><div id='err'></div><div id='buttons'>Start:<input id='plusStart' type='button' value='+' />" +
                "<input id='minusStart' type='button' value='-' /><br>EEnd:<input id='plusEnd' type='button' value='+' />" +
                "<input id='minusEnd' type='button' value='-'/><br></div>" +
                "<div id='changes'><select id='xpathOperators' style='display: none;'></select>" +
                "output:<select id='content_" + currentQuest[quest_counter] + "'></select></div></div>"); // TODO: Make this a class! and the lines above it. The class will be each textbox and it's controls and list of elemnts

            SelectedList = ListOfElements;
            SelectedStart = indexOfStart;
            SelectedEnd = indexOfEnd;
            var currentXpath = GetXpathString(SelectedStart, SelectedEnd, ListOfElements);
            BindChangeContentDropdown(currentXpath, currentQuest[quest_counter]);
            $('#text_' + currentQuest[quest_counter]).val(currentXpath + "/text()");
            HighlightSelectedXpath(currentXpath);
            CheckIfUserFinishedInput();
            quest_counter++;
            $("#quest").text(currentQuest[quest_counter]);
        }
    });
    BindPlusMinusButtons();
    $("#output_DataToDB").on("select", "textarea", function(){ //This does x and y
        BindSelectTextarea.call(this);
    });
    $("#output_DataToDB").on("change", "select#xpathOperators", function(){
        if(this.value != ""){
            SelectedTextArea.value = SelectedTextArea.value.slice(0, indexOfSelectionStart) + this.value + SelectedTextArea.value.slice(indexOfSelectionEnd, SelectedTextArea.value.length);
        }
    });

    $("#output_DataToDB").on("change", "select[id^=content]", function(){
        BindChangeAttributeOfLastElement.call(this);
    });


    //Event handler for hover:
    $('#output_view').mouseover(function (evt) {
        BindMouseHoverElement(evt);
    }).mouseout(function(evt){
            RemoveHighLightClasses(false, evt.target);
        });

    //Scrolling the .float_menus div to my view
    $(window).scroll(WindowsScrollHandler);
});
