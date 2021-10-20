//put the form javascript here
//the javascript for the form
//need to change based on my own headings

 const SomeApp = {
     data() {
       return {
         "books": [],
         "selectedBook": null,
         "bookForm": {}
       }
     },
    computed: {},
     methods: {
         prettyData(d) {
             return dayjs(d)
             .format('D MMM YYYY')
         },
         prettyDollar(n) {
             const d = new Intl.NumberFormat("en-US").format(n);
             return "$ " + d;
         },
        //  selectedBook(s) {
        //      if (s == this.selectedBook) {
        //          return;
        //      }
        //      this.selectedBook = s;
        //      this.books = [];
        //      this.fetchBookData(this.selectedBook);
        //  },
         fetchBookData() {
             fetch('/api/books/')
             .then( response => response.json() )
             .then( (responseJson) => {
                //  console.log(responseJson);
                 this.books = responseJson;
             })
             .catch( (err) => {
                 console.error(err);
             })
         },
           
         postNewBook(evt) {

           console.log("Creating:", this.bookForm);
           // alert("Posting!");
  
           fetch('api/books/create.php', {
               method:'POST',
               body: JSON.stringify(this.bookForm),
               headers: {
                 "Content-Type": "application/json; charset=utf-8"
               }
             })
             .then( response => response.json() )
             .then( json => {
               console.log("Returned from post:", json);
               // TODO: test a result was returned!
               this.books = json;
              
               // reset the form
               this.bookForm = {};
             });
         },

         handleEditBooks(evt) {
          this.bookForm.id = this.selectedBook.id;
           
          console.log("Editing!", this.bookForm);
    
          fetch('api/books/update.php', {
              method:'POST',
              body: JSON.stringify(this.bookForm),
              headers: {
                "Content-Type": "application/json; charset=utf-8"
              }
            })
            .then( response => response.json() )
            .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.books = json;
              
              // reset the form
              this.handleResetEdit();
            });
            
        },
        postDeleteBooks(o) {  
          if ( !confirm("Are you sure you want to delete the offer from " + o.authorName + "?") ) {
              return;
          }
          console.log("Delete!", o);  

          fetch('api/books/delete.php', {
            method:'POST',
            body: JSON.stringify(o),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form
            this.handleResetEdit();
          });
      },
      handleEditBooks(books) {
        this.selectedBook = books;
        this.bookForm = Object.assign({}, this.selectedBook);
    },
    handleResetEdit() {
        this.selectedBook = null;
        this.bookForm = {};
    }

     },

     created() {
         this.fetchBookData();
     }
  
   }
   Vue.createApp(SomeApp).mount('#booksApp');
