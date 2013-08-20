
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
 * Function that gets an element and start to scan all his parents up to "output_textboxs".
 * the function changes the global var of ListOfElements - which is list of all the parents.
 */
function GenerateList(elm) {
    var tempXpath = "";
    ListOfElements = [];
    while (elm.id != "output_textboxs") {
        tempXpath = GetXpathOfElement(elm);
        ListOfElements.unshift(tempXpath);
        elm = elm.parentNode;
    }
}

/**
 * Function that looks for all the attributes the element have, by useing AddAttributesOfElementToXPath(),
 * it returns the correct xpath of a !!specific!! element.
 */
function GetXpathOfElement(elm){
    var xpathOfCurrentElement;
    xpathOfCurrentElement = elm.nodeName.toLowerCase();
    xpathOfCurrentElement = AddAttributesOfElementToXPath(xpathOfCurrentElement, elm, "id");
    xpathOfCurrentElement = AddAttributesOfElementToXPath(xpathOfCurrentElement, elm, "class");
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
function AddAttributesOfElementToXPath(xpath, elm, attribute){
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
 * Function that gets xpath string, and returns a list of attributes
 * of the last element in the string.
 */
function GetAttributesOfLastElementInXPath(xpath){
    var xpathResults = document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null);
    resultAttributes = xpathResults.iterateNext().attributes;
    tempkaze = [];
    for (var i = 0; i < resultAttributes.length; i++)
    {
        if (resultAttributes[i].value != "selectedXpathHighLight") {
            tempkaze.unshift(resultAttributes[i]);
        }
    }
    return tempkaze;
}