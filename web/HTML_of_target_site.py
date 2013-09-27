__author__ = 'niros'
# coding=utf-8


# stupid function
def site_stringy():
    file = open('MacRumors.html', 'r')
    output = file.read()
    file.close()
    return output