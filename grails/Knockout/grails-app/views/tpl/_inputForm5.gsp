ajax submit with json response &amp; jQuery "magic"
<g:render template="/tpl/msg" model="${[showAlways:true]}" />
<form action="${createLink(action: 'saveUser5')}" name="userForm" id="userForm" onsubmit="return submitViaJquery()">

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
            dataType: "json",
            url: $('#userForm').attr('action') + '?' + $('#userForm').serialize()
        }).done(function(data) {
            // upadte form fields from json
            var target = $('#formContainer');
            var inputs = target.find("input");
            inputs.each(function() {
               var input = $(this);
               var name = input.attr('name');
               if (data.user.hasOwnProperty(name)) {
                   input.val(data.user[name]);
               }
            });
            if (data.hasOwnProperty("msg")) {
                $('div.message').html(data.msg);
            }
            var username = data.user.userName;
            // now update the top-bar
            $('span.userName').text(username);
                });
        return false;
    }
</script>
