package knockout

import grails.converters.JSON

class StartController {

    def index() {
        return redirect(action: 'index1')
    }

    def index1() {
        return render(view:'index', model:[user: User.get(1)])
    }

    def index2() {
        return render(view:'index', model:[version: 2, user: User.get(1)])
    }

    def index3() {
        return render(view:'index', model:[version: 3, user: User.get(1)])
    }

    def saveUser() {
        return render(view: 'index', model: [msg: "saved", user:saveAndReturnUser()])
    }

    def saveUser2() {
        return render(template: '/tpl/inputForm2', model: [msg: "saved", user:saveAndReturnUser()])
    }

    def saveUser3() {
        return render(template: '/tpl/inputForm3', model: [msg: "saved", user:saveAndReturnUser()])
    }

    def saveUser4() {
        return render([msg: "saved", user:saveAndReturnUser()] as JSON)
    }

    private User saveAndReturnUser() {
        User user = User.get(1)
        user.properties = params
        user.save()
        return user
    }
}
