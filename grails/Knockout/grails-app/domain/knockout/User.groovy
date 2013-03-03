package knockout

class User {

    String userName
    String email
    String status

    static constraints = {
        email(email: true)
        status(maxSize: 20)
    }
}
