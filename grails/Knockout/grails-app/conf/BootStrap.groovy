import knockout.User

class BootStrap {

    def store(Object o) {
        return o.save(failOnError: true)
    }

    def init = { servletContext ->
        store(new User(userName:"Paul", email: "foo@bar.com", status: ""))
    }

    def destroy = {
    }
}
