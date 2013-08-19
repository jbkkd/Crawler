/**
 * Created with PyCharm.
 * User: niros
 * Date: 14/08/13
 * Time: 15:24
 * To change this template use File | Settings | File Templates.
 */
function HighlightSelectedXpath(xpath) {
    RemoveHighLightClasses(true);
    var xpathResults = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    var result = xpathResults.iterateNext();
    var listOfResults = [];
    while (result) {
        listOfResults.push(result);
        result = xpathResults.iterateNext();
    }
    for (var i = 0; i < listOfResults.length; i++) {
        $(listOfResults[i]).addClass("selectedXpathHighLight");
    }
}
function RemoveHighLightClasses(removeSelectedHighlight, element) {
    if (removeSelectedHighlight) {
        $(".selectedXpathHighLight").removeClass("selectedXpathHighLight");
    }
    if (element) {
        $(element).removeClass("elmHover");
        if($(element).class == ""){
            $(element).removeAttr("class");
        }
    }
    else {
        $(".elmHover").removeClass("elmHover");
    }
}

function ApplyElementHoverHighlight(element) {
    $(element).addClass("elmHover");
}