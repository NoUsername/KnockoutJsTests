<g:render template="/tpl/msg" />
<form action="${createLink(action: 'saveUser3')}" name="userForm" id="userForm" onsubmit="return submitViaJquery()">

    <label for="userName">Name</label>
    <g:textField name="userName" value="${user?.userName}" />

    <label for="status">Status</label>
    <g:textField name="status" value="${user?.status}" />

    <label for="email">Email</label>
    <g:textField name="email" value="${user?.email}" />

    <g:submitButton name="save" />
</form>

<script>
    function submitViaJquery() {
        $.ajax({
            url: $('#userForm').attr('action') + '?' + $('#userForm').serialize()
        }).done(function(data) {
                    var target = $('#formContainer');
                    target.html(data);
                    var username = $('#userForm input[name=userName]').val();
                    // now update the top-bar
                    $('span.userName').text(username);
                });
        return false;
    }
</script>
