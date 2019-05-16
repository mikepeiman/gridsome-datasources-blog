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

const getComments = require("./getComments");
const url = "https://beta.todoist.com/API/v8/";
const token = "b4944a8b7cf87e9c658ee1fb640d0d298fd0596f";

module.exports = function(api) {
  api.loadSource(async store => {
    console.log("Datasource loading: TODOist");

    const ProjectsQL = store.addContentType({
      typeName: "TodoistProjects",
      route: "/todoist/projects/:name"
    });
    const TasksQL = store.addContentType({
      typeName: "TodoistTasks",
      route: "/todoist/tasks/:id"
    });
    const CommentsQL = store.addContentType({
      typeName: "TodoistTaskComments",
      route: "/todoist/comments/:id"
    });
    const LabelsQL = store.addContentType({
      typeName: "TodoistLabels",
      route: "/todoist/labels/:id"
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
        labels: {
          type: GraphQLString,
          resolve: task => task.labels
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
        posted: {
          type: GraphQLString,
          resolve: comment => comment.posted
        },
        content: {
          type: GraphQLString,
          resolve: comment => comment.content
        }
      })
    });

    ProjectsQL.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.name;
      }
    }));
    ProjectsQL.addSchemaField("parent_id", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: true,
      resolve(node) {
        return node.parent_id;
      }
    }));

    TasksQL.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.name;
      }
    }));
    TasksQL.addSchemaField("src", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.src;
      }
    }));
    TasksQL.addSchemaField("desc", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.desc;
      }
    }));
    TasksQL.addSchemaField("project_id", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.project_id;
      }
    }));
    TasksQL.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.path;
      }
    }));
    TasksQL.addSchemaField("labels", ({ graphql }) => ({
      type: graphql.GraphQLList(GraphQLInt),
      resolve(node) {
        return node.labels;
      }
    }));
    TasksQL.addSchemaField("comments", ({ graphql }) => ({
      type: graphql.GraphQLList(CommentType),
      resolve(node) {
        return node.comments;
      }
    }));

    CommentsQL.addSchemaField("taskId", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.taskId;
      }
    }));

    LabelsQL.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.name;
      }
    }));

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

          console.log(`number of tasks/notes: ${response.data.items.length}`);

          projects.forEach(project => {
            ProjectsQL.addNode({
              id: project.id,
              parent_id: project.parent_id,
              fields: {
                parent_id: project.parent_id,
                name: project.name
              }
            });
          });

          labels.forEach(label => {
            LabelsQL.addNode({
              id: label.id,
              title: label.name,
              name: label.name,
              fields: {
                id: label.id,
                name: label.name
              }
            });
          });

          for (let i = 0; i < 25; i++) {
            let task = tasks[i];
            let tasksArray = []
            tasksArray.push(task)

            let taskComments = getComments(url, task);
            taskComments.then(results => {
                // temp.push(results);
                console.log(`Inside taskComments = getComments() .then`);
                results.forEach(comment => {
                  task.comments = comment
                  CommentsQL.addNode({
                    id: comment.id,
                    task_id: task.id,
                    posted: comment.posted,
                    date: comment.posted,
                    content: comment.content,
                    fields: {
                      id: comment.id,
                      task_id: task.id,
                      posted: comment.posted,
                      date: comment.posted,
                      content: comment.content
                    }
                  });
                });
              })
              .catch(err => {
                console.log(`Error in taskComments ${err}`);
              });
          }
          tasksArray.forEach(task => {
            TasksQL.addNode({
              id: task.id,
              project_id: task.project_id,
              created: task.date_added,
              date: task.date_added,
              labels: task.labels,
              content: task.content,
              comments: task.comments,
              fields: {
                id: task.id,
                project_id: task.project_id,
                created: task.date_added,
                date: task.date_added,
                labels: task.labels,
                content: task.content,
                comments: task.comments
              }
            });
          })

            // let temp = [];
            // console.log(`Task snippet: ${task.content.slice(0, 50)}`);
            // console.log(
            //   `************************************* task labels: ********************** `
            // );
            // console.log(task.labels);

            // async function getThisComments() {
            //   task.comments = await taskComments;
            //   console.log(`inside async getThisComments()`);
            //   console.log(task.comments);
            //   // console.log(`####################### FULL TASK #######################`)
            //   // console.log(task)
            // }
            // getThisComments();

            // console.log(`after taskComments = getComments() .then`);
            // console.log(
            //   Promise.resolve(
            //     taskComments.then(result => {
            //       task.comments = result;
            //       return result;
            //     })
            //   ).then(x => {
            //     return x;
            //   })
            // );
            // console.log(`temp var:`);
            // console.log(temp);
          // }
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
