<%@ page import="grails.converters.JSON" contentType="text/html;charset=UTF-8" %>
<html>
<head>
  <title>JsonBinding Example</title>
  <meta name="layout" content="main"/>
</head>
<body>
<div class="jsonExample">

<h1 data-bind="text: title"></h1>

<h2 data-bind="text: titleTopics"></h2>

<ul data-bind="foreach: topics">
    <li><div data-bind="text: $data" ></div></li>
</ul>

<form data-bind="submit:addTopic">
    <input type="text" value="" data-bind="value: itemToAdd" placeholder="add new list-item" />
</form>

<h2 data-bind="text: titleActions"></h2>
<p>
<a href="" onclick="postTopicList(); return false">post new list to server</a><br>
<a href="" onclick="getData('${createLink(action: 'produceError')}'); return false">fetch error message</a><br>
<a href="" onclick="getData('${createLink(action: 'massUpdate')}'); return false">updates lots of stuff</a><br>
<a href="" onclick="getData('${createLink(action: 'updateTitle')}'); return false">update titles only</a><br>
<a href="" onclick="getData('${createLink(action: 'defaults')}'); return false">back to basics</a><br>
</p>

<div class="msgBox errorMessage" data-bind="if: errorMessage" >
    <div data-bind="text: errorMessage "></div>
</div>
<div class="msgBox successMessage" data-bind="if: successMessage ">
    <div data-bind="text: successMessage"></div>
</div>

<script>
    'use strict';
    var viewModel = ko.mapping.fromJS(${data as JSON});
    // example of adding additional observables via code
    viewModel.itemToAdd = ko.observable("");
    viewModel.addTopic = function() {
        if (this.itemToAdd().trim() != "") {
            this.topics.push(this.itemToAdd());
            this.itemToAdd("");
        }
    };
    ko.applyBindings(viewModel);

    function postTopicList() {
        var topics = ko.toJS(viewModel.topics());
        console.log(topics);
        $.post("${createLink(action:'postTopicList')}", {topics:JSON.stringify(topics)}, function(data) {
            updateModel(data);
        }, "json");
    }

    function getData(url) {
        $.getJSON(url, function(data) {
            updateModel(data);
        });
    }

    function updateModel(data) {
        // example: automatically reset values on every update
        viewModel.successMessage(""); viewModel.errorMessage("");
        ko.mapping.fromJS(data, viewModel);
        // make it look fancy:
        $(".msgBox").show(); clearTimeout(lastTimeout); lastTimeout = setTimeout(function() {$(".msgBox").fadeOut();}, 3000);
    }
    var lastTimeout = -1;
</script>

</div>
</body>
</html>