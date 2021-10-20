const Book = {
    data() {
      return {
            "books": [],
        }
    },
    computed: {
    //     prettyBirthday() {
    //       return dayjs(this.person.dob.date)
    //         .format('D MMM YYYY');
    //     }
    },
    methods: {
       
        fetchBookData() {
            fetch('/api/books/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.books = parsedJson
            })
            .catch( err => {
                console.error(err)
            })
        },
    
    },
    created() {
        this.fetchBookData();
    }
  }

  
Vue.createApp(Book).mount('#booksApp');

//how do i incorporate multiple javascripts like this? should I create multiple javascript files?

