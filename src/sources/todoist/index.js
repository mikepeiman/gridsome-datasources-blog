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


// code b77b4f155334fb8c53690d1f7bedf83e65ff9c5c

function getSync() {
  return axios.post("https://todoist.com/API/v7/sync/",{
      token: token,
      sync_token: '*',
      resource_types: '["all"]',
  })
  .then(response => {
    let projects = response.data.projects
    let tasks = response.data.items
    console.log(response.data.projects)
    console.log(`number of tasks/notes: ${response.data.items.length}`)
    /* DATA OF INTEREST
    
    projects {
      id
      name
      parent_id (if a child)
    }

    items {
      date_added
      id
      content
      has_more_notes (no, these are all false - comments must be drawn from V8)
      priority (int)
      is_deleted
    }

    completed {
      items
    }

    labels [{}]
    user {}
    filters [{}]

    sync_token ""

    */
  })
}

// getSync()

function getTODOist(url, type, token) {
  console.log("Commencing todoist data source getTODOist()");
  return axios
    .get(`${url}${type}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      // Handle success.
      console.log("TODOist connected - Well done!");
      return response.data;
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred in function getTODOist():", error.statusText);
    });
}

function getProject(url, projectId, token) {
  console.log("TODOist getProject() SINGULAR running");
  return axios
    .get(`${url}projects/${projectId}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      // Handle success.
      console.log('TODOist project: ', response.data);
      return response.data;
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred in function getProject():", error.statusText);
    });
}

function getTasks(url, project) {
  console.log("TODOist getTasks() running");
  return axios
    .get(`${url}tasks?project_id=${project.id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      // Handle success.
      // console.log("TODOist getTasks() running");
      console.log(`TODOist tasks for project ${project.name}:`);
      // console.log(response.data)
      // response.data.forEach(item => {
      //   console.log(`TODOist project item: ${item}`)
      // });
      return response.data;
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred in function getTasks():", error.statusText);
    });
}

function getComments(url, task) {
  console.log("Commencing todoist data source getComments()");
  return axios
    .get(`${url}comments?task_id=${task.id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(comments => {
      // Handle success.
      return comments.data;
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred in function getComments():", error.statusText);
    });
}

// getProject(url, "126474190", token).then(project => {
//   getTasks(url, project).then(tasks => {
//     tasks.forEach(task => {
//       // console.log('\n'+`Task for ${project.name} is: `)
//       // console.log(task.content.slice(0, 50))
//       // if(task.comment_count != 0) {
//         getComments(url, task).then(comments => {
//           console.log('*************************************************************************')
//           console.log(`********    TODOist getComments() call for task ${task.id}:  ************`)
//           console.log(`********    CONTENT:   ${task.content.slice(0,50)}:  ************`)
//           console.log('*************************************************************************')
//           comments.forEach(comment => {
//             console.log('\n'+`TODOist getComments() for task ${task.id}:`);
//             console.log(comment.posted + '\n')
//           })
//         })
//         .catch(err => {
//           console.log(`Error in getComments() function call: ${err.statusText}`)
//         })
//       // }
//     })
//   })
//   .catch(err => {
//     console.log(`Error in getTasks() function call: ${err.statusText}`)
//   })
// })


module.exports = function(api) {
  api.loadSource(async store => {
    console.log("Datasource loading: TODOist");

    const ProjectsType = store.addContentType({
      typeName: "TodoistProjects",
      route: "/todoist/:name"
    });
    const TasksType = store.addContentType({
      typeName: "TodoistTasks",
      route: "/todoist/:project/:id"
    });
    const CommentsType = store.addContentType({
      typeName: "TodoistTaskComments",
      route: "/todoist/:project/:task/:id"
    });
    const LabelsType = store.addContentType({
      typeName: "TodoistLabels",
      route: "/todoist/labels/:name"
    });

    const TaskType = new GraphQLObjectType({
      name: "Tasks",
      description: "A Task within a project",
      fields: () => ({
        id: {
          type: GraphQLString,
          resolve: task => task.id
        },
        name: {
          type: GraphQLString,
          resolve: task => task.name
        },
        created: {
          type: GraphQLString,
          resolve: task => task.created
        },
        comments: {
          type: GraphQLString,
          resolve: task => task.comments
        },
        project: {
          type: GraphQLString,
          resolve: task => task.project
        },
        content: {
          type: GraphQLString,
          resolve: task => task.content
        },
        path: {
          type: GraphQLString,
          resolve: task => task.path
        }
      })
    });

    
    ProjectsType.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.name;
      }
    }));
    ProjectsType.addSchemaField("parent_id", ({ graphql }) => ({
      type: graphql.GraphQLInt,
      allowNull: false,
      resolve(node) {
        return node.fields.parent_id;
      }
    }));

    TasksType.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.name;
      }
    }));
    TasksType.addSchemaField("src", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.src;
      }
    }));
    TasksType.addSchemaField("desc", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.desc;
      }
    }));
    TasksType.addSchemaField("project", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.project;
      }
    }));
    TasksType.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.path;
      }
    }));
    TasksType.addSchemaField("labels", ({ graphql }) => ({
      type: graphql.GraphQLList(LabelsType),
      resolve(node) {
        return node.fields.labels;
      }
    }));
    TasksType.addSchemaField("comments", ({ graphql }) => ({
      type: graphql.GraphQLList(CommentsType),
      resolve(node) {
        return node.fields.comments;
      }
    }));

  });
};

//********************************************************************** */

// getTODOist(
//   url,
//   "projects",
//   token
// ).then(projects => {
//   console.log("TODOist project item:");
//   console.log(`Number of projects: ${projects.length}`)
//   projects.forEach(project => {
//     console.log(project)
//     getTasks(url, project).then(tasks => {
//       tasks.forEach(task => {
//         console.log(`Task for ${project.name} is: `)
//         console.log(task)
//         getComments(url, task).then(comments => {
//           console.log(`Comment for task ${comment.id}`)
//           console.log(`Comment posted date ${comment.posted}`)
//         })
//         .catch(err => {
//           console.log(`Error in getComments: ${err}`)
//         })
//       })
//     })
//     .catch(err => {
//       console.log(`Error in getTasks: ${err}`)
//     })
//   })
//   return projects
// })
// .catch(err => {
//   console.log(`Error in getTODOist: ${err}`)
// })


