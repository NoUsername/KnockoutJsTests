package knockout

import grails.converters.JSON
import org.springframework.validation.FieldError

class StartController {

    def index() {
        int version = params.int("version", 1)
        String view = "index"
        if (version > 5) { // enable knockout.js
            view = "indexKo"
        }
        return render(view:view, model:[version: version, user: User.get(1)])
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
        improveUserInput("userName", "status", "email")
        return render(saveUserObject() as JSON)
    }

    def saveUser5() {
        return render(saveUserObject() as JSON)
    }

    def saveUser6() {
        improveUserInput("userName", "status", "email")
        Map model = saveUserObject()
        model.put("currentDate", new Date().toString())
        List randomList = []
        for (int i=0; i<10; i++) { randomList.add(Random.newInstance().nextInt(50)).toString() }
        model.put("randomList", randomList)
        if (params.containsKey("noMsg")) {
            model['msg'] = null;
        }
        return render(model as JSON)
    }

    private improveUserInput(String... paramNames) {
        paramNames.each { paramName ->
            params[paramName] = ((String)params.get(paramName, "foo")).replace("foo", "bar")
        }

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
