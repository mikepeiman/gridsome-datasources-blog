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
      name: "Task",
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

    const LabelType = new GraphQLObjectType({
      name: "Label",
      fields: () => ({
        id: {
          type: GraphQLString,
          resolve: label => label.id
        },
        name: {
          type: GraphQLString,
          resolve: label => label.name
        }
      })
    });

    const CommentType = new GraphQLObjectType({
      name: "Comment",
      fields: () => ({
        id: {
          type: GraphQLString,
          resolve: comment => comment.id
        },
        task_id: {
          type: GraphQLString,
          resolve: comment => comment.task_id
        },
        content: {
          type: GraphQLString,
          resolve: comment => comment.content
        },
        date_added: {
          type: GraphQLString,
          resolve: comment => comment.date_added
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
    TasksType.addSchemaField("project_id", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.project_id;
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
      type: graphql.GraphQLList(LabelType),
      resolve(node) {
        return node.fields.labels;
      }
    }));
    TasksType.addSchemaField("comments", ({ graphql }) => ({
      type: graphql.GraphQLList(CommentType),
      resolve(node) {
        return node.fields.comments;
      }
    }));

    CommentsType.addSchemaField("task_id", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.task_id;
      }
    }));
    function getComments(url, task) {
      // console.log("Commencing todoist data source getComments()");
      return axios
        .get(`${url}comments?task_id=${task.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(comments => {
          // Handle success.
          let commentsArray = [];
          if (comments.data.length != 0) {
            comments.data.forEach(comment => {
              console.log(`inside of comments.data.forEach: ${comment}`);
              CommentsType.addNode({
                fields: {
                  id: comment.id,
                  task_id: comment.task_id,
                  date: comment.posted,
                  content: comment.content
                }
              });
              commentsArray.push(comment);
            });
          } else {
            console.log(`no comments for task ${task.content.slice(0, 50)}`);
          }
          return commentsArray;
        })
        .catch(error => {
          // Handle error.
          console.log("An error occurred in function getComments():", error);
        });
    }

    function getSync() {
      return axios
        .post("https://todoist.com/API/v7/sync/", {
          token: token,
          sync_token: "*",
          resource_types: '["all"]'
        })
        .then(response => {
          let projects = response.data.projects;
          let tasks = response.data.items;
          let labels = response.data.labels;
          // console.log(response.data.projects)
          console.log(`number of tasks/notes: ${response.data.items.length}`);

          projects.forEach(project => {
            // console.log(`Project name: ${project.name}`)
            ProjectsType.addNode({
              id: project.id,
              fields: {
                parent_id: project.parent_id,
                name: project.name
              }
            });
          });

          for (let i = 0; i < 25; i++) {
            let task = tasks[i]
            console.log(`Task snippet: ${task.content.slice(0,50)}`)
            
            let taskComments = getComments(url, task);
            taskComments.then(result => {
              task.comments = result;
              console.log(result)
              return task.comments;
            });
            TasksType.addNode({
              fields: {
                id: task.id,
                project_id: task.project_id,
                content: task.content,
                created: task.date_added,
                labels: task.labels,
                comments: task.comments
              }
            });
          }
          // tasks.forEach(task => {
          //   // console.log(`Task snippet: ${task.content.slice(0,50)}`)

          //   let taskComments = getComments(url, task)
          //   taskComments.then((result) => {
          //     task.comments = result
          //     return task.comments
          //   })
          //   TasksType.addNode({
          //     fields: {
          //       id: task.id,
          //       project_id: task.project_id,
          //       content: task.content,
          //       created: task.date_added,
          //       labels: task.labels,
          //       comments: task.comments
          //     }
          //   })
          // })

          labels.forEach(label => {
            LabelsType.addNode({
              fields: {
                id: label.id,
                name: label.name
              }
            });
          });
        });
    }
    getSync();
  });
};

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
