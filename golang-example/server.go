package main

import (
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"html/template"
	"log"
	"net/http"
	"os"
	"path"
)

type MongoClient struct {
	session *mgo.Session
}

type UserData struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Username string
	Password string
}

type TodoData struct {
	ID       bson.ObjectId `bson:"_id,omitempty"`
	Username string
	Content  string
	Date     string
}

var mongoClient *MongoClient
var mongoError error

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

func main() {

	fs := http.FileServer(http.Dir("dist"))
	http.Handle("/dist/", http.StripPrefix("/dist/", fs))

	http.HandleFunc("/", serveTemplate)

	http.HandleFunc("/todos/get_all", retrieveTodos)

	http.HandleFunc("/todos/save", saveTodos)

	log.Println("Listening...")
	http.ListenAndServe(":3000", nil)
}

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

func saveTodos(w http.ResponseWriter, r *http.Request) {

	requestBody := struct {
		Content string `json:content`
		Date    string `json:date`
	}{}

	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		panic(err.Error())
	}

	fmt.Printf("%+v", requestBody)

	if mongoClient, mongoError = NewMongoDbOps("127.0.0.1", "test"); mongoError != nil {
		panic(mongoError)
	}

	defer mongoClient.CloseConnection()

	// Collection Todos
	c := mongoClient.session.DB("test").C("todoData")

	// Insert Data
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

	responseBodyInBytes, err := json.Marshal(responseBody)
	if err != nil {
		panic(err.Error() + " Error in marshalling response")
	}
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Write(responseBodyInBytes)
}

func retrieveTodos(w http.ResponseWriter, r *http.Request) {

	if mongoClient, mongoError = NewMongoDbOps("127.0.0.1", "test"); mongoError != nil {
		panic(mongoError)
	}

	defer mongoClient.CloseConnection()

	// Collection Todos
	c := mongoClient.session.DB("test").C("todoData")

	// Insert Data
	var results []TodoData
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
