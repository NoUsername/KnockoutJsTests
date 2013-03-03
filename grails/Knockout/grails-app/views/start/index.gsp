<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Knockout</title>
    <meta name="layout" content="main"/>
</head>
<body>

<g:render template="/tpl/userInfo" />
<div id="mainContent">
    <div id="formContainer">
        <g:render template="/tpl/inputForm${version ?: 1}"/>
    </div>
</div>

</body>
</html>