Knockout.js, baby!
<div class="message" data-bind="text: msg, visible: msg">
</div>
<form action="${createLink(action: 'saveUser6')}" name="userForm" id="userForm" onsubmit="return submitViaJquery()">

    <label for="userName">Name</label>
    <g:textField name="userName" data-bind="value: user.userName" />

    <label for="status">Status</label>
    <g:textField name="status" data-bind="value: user.status" />

    <label for="email">Email</label>
    <g:textField name="email" data-bind="value: user.email" />

    <label for="noMsg">No messagebox</label>
    <g:checkBox name="noMsg" />

    <g:submitButton name="save" />
</form>
