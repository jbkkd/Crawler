/**
 * Created with PyCharm.
 * User: niros
 * Date: 14/08/13
 * Time: 16:52
 * To change this template use File | Settings | File Templates.
 */
function BindSelectTextarea() {
    indexOfSelectionStart = this.selectionStart;
    indexOfSelectionEnd = this.selectionEnd;
    $("#xpathFunctions").empty();
    var selectedString = this.value.slice(this.selectionStart, this.selectionEnd);
    if (selectedString.indexOf("=") == -1 || selectedString[selectedString.length - 1] != "'" || selectedString[0] != "@") {
        $("#err").html("<span style='color: red;'>The selection isn't valid, Example:@id='post_id_'</span>")
    } else {
        BuildXPathOperatorsDropdownList(selectedString);
        SelectedTextArea = this;
    }
}


function BindChangeAttributeOfLastElement() { //TODO: Should i replace the .call(this) with string?
    var IDOfThis = this.id.slice(8, this.id.length);
    var n = $("#text_" + IDOfThis).val().lastIndexOf("/");
    var prevWord = $("#text_" + IDOfThis).val().slice(n, $("#text_" + IDOfThis).val().length);
    if (prevWord.indexOf("/@") == 0 || prevWord.indexOf("/text()") == 0) {
        $("#text_" + IDOfThis).val($("#text_" + IDOfThis).val().replace(prevWord, this.value));
    }
}

function BindChangeContentDropdown(currentXpath, textboxID){
    $("#content_" + textboxID).append($('<option>', {
            value: "",
            text : ""
        })).append($('<option>', {
            value: "/text()",
            text : "/text()"
        }));

    $.each(GetAttributesOfLastElementInXPath(currentXpath), function(index, value){
        $("#content_" + textboxID).append($('<option>', {
            value: "/@" + value.name,
            text : "/@" + value.name
        }));
    });
}

function BindMouseHoverElement(evt) {
    GenerateList(evt.target);
    CurrentMouseTarget = evt.target;
    indexOfEnd = ListOfElements.length - 1;
    hoverXpath = GetXpathString(indexOfStart, indexOfEnd, ListOfElements);

    ApplyElementHoverHighlight(evt.target);
    $('#selected_xpath').html(hoverXpath);
}

function BindChangePageType() {
    quest_counter = 0;
    pageType = $(this).val();
    if (pageType == "thread") {
        currentQuest = threadQuest;
    } else if (pageType == "forum") {
        currentQuest = forumQuest;
    }
    $("#output_DataToDB_list").empty();
    $("#update_DataToDB_button").remove();
    $("#quest").text(currentQuest[0]);
}
//All the events for the +/- for the xpath
function BindPlusMinusButtons() {
    $("#output_DataToDB").on("click", "#plusStart", function () {
        SelectedStart--;
        UpdateAfterXPathChanged();
    });

    $("#output_DataToDB").on("click", "#minusStart", function () {
        SelectedStart++;
        UpdateAfterXPathChanged();
    });

    $("#output_DataToDB").on("click", "#plusEnd", function () {
        SelectedEnd++;
        UpdateAfterXPathChanged();
    });

    $("#output_DataToDB").on("click", "#minusEnd", function () {
        SelectedEnd--;
        UpdateAfterXPathChanged();
    });
}