package knockout

import grails.converters.JSON
import org.springframework.validation.FieldError

class StartController {

    def index() {
        int version = params.int("version", 1)
        return render(view:'index', model:[version: version, user: User.get(1)])
    }

    def saveUser() {
        return render(view: 'index', model: saveUserObject())
    }

    def saveUser2() {
        return render(template: '/tpl/inputForm2', model: saveUserObject())
    }

    def saveUser3() {
        return render(template: '/tpl/inputForm3', model: saveUserObject())
    }

    def saveUser4() {
        // small hack to show that our js actually does something
        params.userName = ((String)params.get("userName", "foo")).replace("foo", "bar")
        return render(saveUserObject() as JSON)
    }

    def saveUser5() {
        return render(saveUserObject() as JSON)
    }

    private Map saveUserObject() {
        User user = User.get(1)
        user.properties = params
        String msg = "saved"
        if (user.validate()) {
            user.save()
        } else {
            log.error("not saving, validation error")
            FieldError error = user.errors.allErrors[0]
            msg = "${error.field}: " + g.message(code:error.code)
        }
        return [msg: msg, user:user]
    }
}
