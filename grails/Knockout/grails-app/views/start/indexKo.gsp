<%@ page import="grails.converters.JSON" contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Knockout</title>
    <meta name="layout" content="main"/>
</head>
<body>

<g:render template="/tpl/userInfoKo" />
<div id="mainContent">
    <div id="formContainer">
        <g:render template="/tpl/inputForm${version ?: 1}"/>
    </div>
</div>

<a href="#" onclick="doCrazy()" >do crazy</a><br/>

<span data-bind="text: currentDate"></span>

<div data-bind="foreach: randomList" >
    <div>
        List item <span data-bind="text: $data" />
    </div>
</div>

<script>
    var viewModel = ko.mapping.fromJS(${[msg:'', user:user, randomList:[], currentDate:''] as JSON});
    ko.applyBindings(viewModel);

    function submitViaJquery() {
        $.ajax({
            dataType: "json",
            url: $('#userForm').attr('action') + '?' + $('#userForm').serialize()
        }).done(function(data) {
            ko.mapping.fromJS(data, viewModel);
        });
        return false;
    }

    function doCrazy() {
        viewModel.user.userName(viewModel.user.userName() + String.fromCharCode(Math.floor(Math.random()*10+40)));
    }
</script>

</body>
</html>