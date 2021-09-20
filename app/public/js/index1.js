const app=Vue.createApp({
    data() {
        return{
            "person":{},
            "info":[
                {
                    "name": "",
                    "country":"",
                    "birthday":"",
                    "age":"",
                    "email":"",
                    "phone":"",
                    "image": ''
                    
                },
            ]
        }
    },

//formatting the Birthday: Computed 
    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY')
        }
      },
      
//formatting the : Methods functionize something and this should be done when things get too complex (more than one vertical screen of code)  
//need to refresh the data without refreshing the page
//took everything out of created and put everything into curly brackets in fetch user data methods

      methods:{
        fetchUserData(){
            fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then((responseJson) => {
        console.log(responseJson);   //for debugging
        this.person =responseJson.results[0];
    })
    .catch((err) => {
        console.error(err);
    })

        }
      },
//created is a function: an event hook that is called automatically when our vue application is created
created(){
    this.fetchUserData();
    }
})

// Vue.creteApp(app).mount('#offerApp')
