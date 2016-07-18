package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"html/template"
	"log"
	"net/http"
	"os"
	"path"
)

/**
* @Purpose : Struct used throughout this program for DB operations. Contains a field called session, which is of type *mgo.Session.
           Refer function Dial in /gopkg.in/mgo.v2/session.go
*/
type MongoClient struct {
	session *mgo.Session
}

/**
* @Params : (IP address of the cluster - string, Keyspace of the DB - string )
* @Return type: *MongoClient
* @Purpose : Used to initialize the struct fields of MongoClient.
 */
func NewMongoDbOps(clusterIp string, keyspace string) (*MongoClient, error) {
	mongoClient := &MongoClient{}

	session, err := mgo.Dial(clusterIp)
	if err != nil {
		panic(err)
	} else {
		mongoClient.session = session
	}

	mongoClient.session.SetMode(mgo.Monotonic, true)

	return mongoClient, nil
}

func (mongoClient *MongoClient) CloseConnection() {
	mongoClient.session.Close()
}

/**
* @Purpose : Struct to store userData in mongoDB
 */
type UserData struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Username string
	Password string
}

/**
* @Purpose : Struct to store todoData in mongoDB
 */
type TodoData struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Username string
	Content  string
	Date     string
}

//Creating an instance of the struct
var mongoClient *MongoClient
var mongoError error

func main() {

	router := mux.NewRouter()
	//Handle requesst to retrieve all todos
	router.HandleFunc("/todos", getTodos).Methods("GET")

	//Handle request to save todo
	router.HandleFunc("/todos", saveTodo).Methods("POST")

	//Handle requests from /static, first by stripping the request url of '/static', since go will look inside the '/static' directory by default
	//This implements FileSystem using the native file system restricted to a specific directory tree, in our case a directory called static. Go will serve static assets starting from this directory

	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("static/"))))

	log.Println("Listening...")
	http.ListenAndServe(":3000", router) //Starting the web server at port 3000
}

/**
* @Params : (http.ResponseWriter, *http.Request)
* @Return type: nil
* @Purpose : To return a page back to the client.
             An http.ResponseWriter value assembles the HTTP server's response; by writing to it, we send data to the HTTP client.
             An http.Request is a data structure that represents the client HTTP request. r.URL.Path is the path component of the request URL.
*/
func serveTemplate(w http.ResponseWriter, r *http.Request) {

	indexTemplate := path.Join("views", "index.html")
	exampleTemplate := path.Join("views", r.URL.Path)

	// Return a 404 if the template doesn't exist
	info, err := os.Stat(exampleTemplate)
	if err != nil {
		if os.IsNotExist(err) {
			http.NotFound(w, r)
			return
		}
	}

	// Return a 404 if the request is for a directory
	if info.IsDir() {
		http.NotFound(w, r)
		return
	}

	tmpl, err := template.ParseFiles(indexTemplate, exampleTemplate)

	if err != nil {
		// Log the detailed error
		log.Println(err.Error())
		// Return a generic "Internal Server Error" message
		http.Error(w, http.StatusText(500), 500)
		return
	}
	if err := tmpl.ExecuteTemplate(w, "index", nil); err != nil {
		log.Println(err.Error())
		http.Error(w, http.StatusText(500), 500)
	}
}

/**
* @Params : (http.ResponseWriter, *http.Request)
* @Return type: nil
* @Purpose : To accept todo data from request body and save it to MongoDB.
 */
func saveTodo(w http.ResponseWriter, r *http.Request) {

	requestBody := struct {
		Content string `json:content`
		Date    string `json:date`
	}{}

	//Parse the http request body and map it to the struct requestBody
	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		panic(err.Error())
	}

	//Prints the todo information from the http request body
	fmt.Printf("%+v", requestBody)

	//Initialize a new mongodb connection instance.
	if mongoClient, mongoError = NewMongoDbOps("127.0.0.1", "test"); mongoError != nil {
		panic(mongoError)
	}

	//A defer statement defers the execution of a function until the surrounding function returns.
	defer mongoClient.CloseConnection()

	// Collection 'todoData'
	c := mongoClient.session.DB("test").C("todoData")

	// Insert Data into the collection
	err := c.Insert(&TodoData{
		Username: "testuser",
		Content:  requestBody.Content,
		Date:     requestBody.Date,
	})

	if err != nil {
		panic(err)
	}
	type ResponseBody struct {
		Message string
	}

	responseBody := ResponseBody{
		Message: "Saved",
	}

	//Converts responseBody into bytes
	responseBodyInBytes, err := json.Marshal(responseBody)
	if err != nil {
		panic(err.Error() + " Error in marshalling response")
	}

	//Sends the response back to the client
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(responseBodyInBytes)
}

/**
* @Params : (http.ResponseWriter, *http.Request)
* @Return type: nil
* @Purpose : To retrieve todos and send back to client
 */
func getTodos(w http.ResponseWriter, r *http.Request) {

	if mongoClient, mongoError = NewMongoDbOps("127.0.0.1", "test"); mongoError != nil {
		panic(mongoError)
	}

	defer mongoClient.CloseConnection()

	// Collection todoData
	c := mongoClient.session.DB("test").C("todoData")

	//results array of type TodoData to store results of Mongo Query
	var results []TodoData

	// Mongo query to find all todos with username 'testuser', stores them in results array
	err := c.Find(bson.M{"username": "testuser"}).Sort("-timestamp").All(&results)

	if err != nil {
		panic(err)
	}

	responseBodyInBytes, err := json.Marshal(results)
	if err != nil {
		panic(err.Error() + " Error in marshalling response")
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(responseBodyInBytes)
}
