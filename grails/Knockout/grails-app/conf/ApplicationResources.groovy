modules = {
    application {
        resource url:'js/application.js'
    }

    lessStyles {
        defaultBundle 'all_less_styles'
        resource url:'css/reset.css', bundle: 'all_less_styles'
        resource url:'less/main.less',attrs:[rel: "stylesheet/less", type:'css'], bundle: 'all_less_styles'
        resource url:'css/dummy.css', bundle: 'all_less_styles'
    }
}