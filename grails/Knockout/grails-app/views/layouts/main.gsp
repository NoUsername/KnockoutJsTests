<!DOCTYPE html>
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"><!--<![endif]-->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><g:layoutTitle default="Grails"/></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <r:require module="jquery" />
    <r:require module="lessStyles"/>
    <g:javascript src="knockout-2.2.1.js" />
    <g:layoutHead/>
    <r:layoutResources/>
</head>

<body>

<div id="leftBar">
    <div>
        <h1>KnockoutDemo</h1>

        <br/>
        <ul>
            <li><g:link controller="start" action="index1">Version 1</g:link></li>
            <li><g:link controller="start" action="index2">Version 2</g:link></li>
            <li><g:link controller="start" action="index3">Version 3</g:link></li>
            <li><g:link controller="start" action="index4">Version 4</g:link></li>
        </ul>
    </div>
</div>

<div id="mainContainer" >
    <g:render template="/tpl/userInfo" />
    <div id="mainContent">
    <g:layoutBody/>
    </div>
</div>

    <div id="spinner" class="spinner" style="display:none;"><g:message code="spinner.alt" default="Loading&hellip;"/></div>
    <g:javascript library="application"/>
    <r:layoutResources/>
</body>
</html>
