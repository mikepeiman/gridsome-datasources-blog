const axios = require("axios");
var slugify = require("slugify");
var changeCase = require("change-case");
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  buildSchema,
  printSchema,
  GraphQLObjectType
} = require("graphql");

const url = "https://beta.todoist.com/API/v8/";
const token = "b4944a8b7cf87e9c658ee1fb640d0d298fd0596f";


function getComments(url, task) {
  // console.log("Commencing todoist data source getComments()");
  return axios
    .get(`${url}comments?task_id=${task.id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(comments => {
      // Handle success.
      let commentsArray = []
      if(comments.data.length != 0) {
        comments.data.forEach(comment => {
          console.log(`inside of comments.data.forEach: ${comment}`)
          commentsArray.push(comment)
        })
      }
      else {
        console.log(`no comments for task ${task.content.slice(0,50)}`)
      }
      return commentsArray
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred in function getComments():", error);
    });
}

function getSync() {
  return axios.post("https://todoist.com/API/v7/sync/",{
      token: token,
      sync_token: '*',
      resource_types: '["all"]',
  })
  .then(response => {
    let projects = response.data.projects
    let tasks = response.data.items
    let labels = response.data.labels
    console.log(labels)
    console.log(`number of tasks/notes: ${response.data.items.length}`)
    for (let i = 0; i < 25; i++) {
      let task = tasks[i];
      console.log(`task labels: `)
      console.log(task.labels)
      let taskComments = getComments(url, task);

    }

    // ***** START Check tasks object for relevant fields ********
    let count = [11,22,33,44,55,57,58,59,71,72,73,74,75,85,86,87,88,90,91,92,93,94,95]
    count.forEach(i => {
      let d = getComments(url, tasks[i])
      d.then((result) => {
        console.log(i, result)
      })
    })
  })
}


getSync()