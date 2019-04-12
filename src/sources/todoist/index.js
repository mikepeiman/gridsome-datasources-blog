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

function getTODOist(url, type, token) {
  console.log("Commencing todoist data source getTODOist()");
  return axios
    .get(`${url}${type}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      // Handle success.
      console.log("TODOist connected - Well done!");
      // console.log('TODOist projects', response.data);
      // response.data.forEach(item => {
      //   console.log(`TODOist project item: ${item}`)
      // });
      return response.data;
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred:", error);
    });
}

function getProjects(url, token) {
  console.log("Commencing todoist data source getProjects()");
  return axios
    .get(url, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      // Handle success.
      console.log("TODOist connected - Well done!");
      // console.log('TODOist projects', response.data);
      // response.data.forEach(item => {
      //   console.log(`TODOist project item: ${item}`)
      // });
      return response.data;
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred:", error);
    });
}

function getTasks(url, project) {
  console.log("Commencing todoist data source getTasks()");
  return axios
    .get(`${url}tasks?project_id=${project.id}`, { headers: { Authorization: `Bearer ${token}` } })
    .then(response => {
      // Handle success.
      console.log("TODOist project:tasks connected - Well done!");
      console.log(`TODOist tasks for project ${project.name}:`);
      console.log(response.data)
      // response.data.forEach(item => {
      //   console.log(`TODOist project item: ${item}`)
      // });
      return response.data;
    })
    .catch(error => {
      // Handle error.
      console.log("An error occurred:", error);
    });
}


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

    const TasksType = new GraphQLObjectType({
      name: "Tasks",
      description: "A Task within a project",
      fields: () => ({
        name: {
          type: GraphQLString,
          resolve: task => task.name
        },
        src: {
          type: GraphQLString,
          resolve: task => task.src
        },
        desc: {
          type: GraphQLString,
          resolve: task => task.desc
        },
        path: {
          type: GraphQLString,
          resolve: task => task.path
        }
      })
    });

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

    ProjectsType.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.name;
      }
    }));
    ProjectsType.addSchemaField("num", ({ graphql }) => ({
      type: graphql.GraphQLInt,
      allowNull: false,
      resolve(node) {
        return node.fields.num;
      }
    }));
    ProjectsType.addSchemaField("url", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.url;
      }
    }));
    ProjectsType.addSchemaField("projectImgSrc", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.projectImgSrc;
      }
    }));
    ProjectsType.addSchemaField("tasks", ({ graphql }) => ({
      type: graphql.GraphQLList(TaskType),
      resolve(node) {
        return node.fields.tasks;
      }
    }));
  });
};

getTODOist(
  url,
  "projects",
  token
).then(projects => {
  console.log("TODOist project item:");
  projects.forEach(project => {
    console.log(project)
    getTasks(url, project)
  })
  return projects
})
// .then(projects => {
//   console.log(`Inside of projects .then`)
//   console.log(projects)
//   projects.forEach(id => {
//     console.log(`this is ${id}`)
//   })
// })

// getTasks(
//   "https://beta.todoist.com/API/v8/tasks",
//   "b4944a8b7cf87e9c658ee1fb640d0d298fd0596f"
// ).then(tasks => {
//   console.log("TODOist task item:");
//   let tasksList = []
//   tasks.forEach(task => {
//     console.log(task)
//     tasksList.push(task)
//   })
//   console.log(tasks)
//   return tasks
// })

// getComments(
//   "https://beta.todoist.com/API/v8/tasks",
//   "b4944a8b7cf87e9c658ee1fb640d0d298fd0596f"
// ).then(comments => {
//   console.log("TODOist task item:");
//   let commentsList = []
//   comments.forEach(task => {
//     console.log(task)
//     commentsList.push(task)
//   })
//   console.log(comments)
//   return comments
// })
