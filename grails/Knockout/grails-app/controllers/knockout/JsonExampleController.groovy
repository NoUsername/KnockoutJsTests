package knockout

import grails.converters.JSON
import groovy.json.JsonSlurper

class JsonExampleController {

    private Map defaultData() {
        Map data = [:]
        data.title = "JsonTest"
        data.titleTopics = "Topics:"
        data.titleActions = "Actions:"
        data.topics = ["knockout.js", "cross platform mobile", "fourier transformation", "open device lab"]
        data.errorMessage = ""
        data.successMessage = ""
        return data
    }

    def index() {
        return [data: defaultData()]
    }

    def defaults() {
        return render(defaultData() as JSON)
    }

    def produceError() {
        Map data = [:]
        data.errorMessage = "An error occured!"
        return render(data as JSON)
    }

    def massUpdate() {
        Map data = [:]
        data.topics = (1..7).collect { "new topic $it ${System.nanoTime()%1000  }" }
        data.successMessage = "Updated!"
        return render(data as JSON)
    }

    def updateTitle() {
        return render([title: "New Page title ${System.nanoTime()%1000}", titleTopics: "Topics #${System.nanoTime()%1000}"] as JSON)
    }

    def postTopicList(String topics) {
        def topicList = new JsonSlurper().parseText(topics)
        List<String> filtered = topicList.collect { ((String)it).replace("foo", "bar") }
        return render([topics: filtered, successMessage: 'Received!'] as JSON)
    }

}
