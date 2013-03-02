<g:render template="/tpl/msg" />
<g:formRemote url="[action: 'saveUser2']" update="formContainer" name="userForm" id="userForm" >

    <label for="userName">Name</label>
    <g:textField name="userName" value="${user?.userName}" />

    <label for="status">Status</label>
    <g:textField name="status" value="${user?.status}" />

    <label for="email">Email</label>
    <g:textField name="email" value="${user?.email}" />

    <g:submitButton name="save" />
</g:formRemote>