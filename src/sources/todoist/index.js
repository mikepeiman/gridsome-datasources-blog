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
        task: {
          type: GraphQLString,
          resolve: comment => comment.task
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
        return node.fields.name;
      }
    }));
    ProjectsQL.addSchemaField("parent", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: true,
      resolve(node) {
        return node.fields.parent;
      }
    }));

    TasksQL.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.name;
      }
    }));
    TasksQL.addSchemaField("created", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.created;
      }
    }));
    TasksQL.addSchemaField("src", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.src;
      }
    }));
    TasksQL.addSchemaField("desc", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.desc;
      }
    }));
    TasksQL.addSchemaField("project", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.project;
      }
    }));
    TasksQL.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.path;
      }
    }));
    TasksQL.addSchemaField("labels", ({ graphql }) => ({
      type: graphql.GraphQLList(GraphQLInt), //GraphQLList(LabelType)
      resolve(node) {
        return node.fields.labels;
      }
    }));
    TasksQL.addSchemaField("comments", ({ graphql }) => ({
      type: graphql.GraphQLList(CommentType),
      resolve(node) {
        return node.fields.comments;
      }
    }));
    TasksQL.addSchemaField("test", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.test;
      }
    }));

    CommentsQL.addSchemaField("test", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.test;
      }
    }));
    CommentsQL.addSchemaField("task", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.fields.task;
      }
    }));

    LabelsQL.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.fields.name;
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
              console.log(
                // `inside of getComments() { comments.data.forEach: ${comment} }`
              );
              // console.log(comment);
              // console.log(task.id);
              commentsArray.push(comment);
            });
          } else {
            console.log(`no comments for task ${task.content.slice(0, 50)}`);
          }
          return commentsArray;
        })
        .catch(error => {
          // Handle error.
          console.log(
            "An error occurred in function getComments():",
            error.response
          );
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

          // console.log(`number of tasks/notes: ${response.data.items.length}`);
          projects.forEach(project => {
            // console.log(`Project name: ${project.name}`)
            ProjectsQL.addNode({
              id: project.id,
              parent: project.parent_id,
              fields: {
                parent: project.parent_id,
                name: project.name
              }
            });
          });

          labels.forEach(label => {
            // console.log(`labels: `)
            // console.log(label)
            LabelsQL.addNode({
              id: label.id,
              name: label.name,
              fields: {
                id: label.id,
                name: label.name
              }
            });
          });

          for (let i = 20; i < 45; i++) {
            let task = tasks[i];
            let temp = [];
            // console.log(`Task snippet: ${task.content.slice(0, 50)}`);
            let taskComments = getComments(url, task);

            taskComments
              .then(comments => {
                if (comments.length > 0) {
                  comments.forEach(comment => {
                    CommentsQL.addNode({
                      id: comment.id,
                      fields: {
                        id: comment.id,
                        task: task.id,
                        posted: comment.posted,
                        date: comment.posted,
                        content: comment.content
                      }
                    });
                  });
                } 
                TasksQL.addNode({
                  id: task.id,
                  fields: {
                    id: task.id,
                    project: task.project_id,
                    created: task.date_added,
                    date: task.date_added,
                    labels: task.labels,
                    content: task.content,
                    comments: comments,
                  }
                });
              })
              .catch(err => {
                console.log(`Error in taskComments ${err.response}`);
              });
          }
        });
    }
    getSync();
  });
};
