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

    TasksQL.addReference("labels", "TodoistLabels");
    // LabelsQL.addReference("TasksQL", "TodoistTasks");

    // const TaskType = new GraphQLObjectType({
    //   name: "Task",
    //   description: "A Task within a project",
    //   fields: () => ({
    //     id: {
    //       type: GraphQLString,
    //       resolve: task => task.id
    //     },
    //     name: {
    //       type: GraphQLString,
    //       resolve: task => task.name
    //     },
    //     created: {
    //       type: GraphQLString,
    //       resolve: task => task.created
    //     },
    //     comments: {
    //       type: GraphQLString,
    //       resolve: task => task.comments
    //     },
    //     labels: {
    //       type: GraphQLString,
    //       resolve: task => task.labels
    //     },
    //     project: {
    //       type: GraphQLString,
    //       resolve: task => task.project
    //     },
    //     content: {
    //       type: GraphQLString,
    //       resolve: task => task.content
    //     },
    //     path: {
    //       type: GraphQLString,
    //       resolve: task => task.path
    //     }
    //   })
    // });

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
        },
        path: {
          type: GraphQLString,
          resolve: label => label.path
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

    ProjectsQL.addSchemaField("title", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.title;
      }
    }));
    ProjectsQL.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.path;
      }
    }));
    ProjectsQL.addSchemaField("date", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.date;
      }
    }));
    ProjectsQL.addSchemaField("content", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.content;
      }
    }));
    ProjectsQL.addSchemaField("excerpt", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.excerpt;
      }
    }));
    ProjectsQL.addSchemaField("slug", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.slug;
      }
    }));
    ProjectsQL.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.name;
      }
    }));
    ProjectsQL.addSchemaField("parent", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: true,
      resolve(node) {
        return node.parent;
      }
    }));

    TasksQL.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.name;
      }
    }));
    TasksQL.addSchemaField("created", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.created;
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
    TasksQL.addSchemaField("project", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.project;
      }
    }));
    TasksQL.addSchemaField("title", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.title;
      }
    }));
    TasksQL.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.path;
      }
    }));
    TasksQL.addSchemaField("date", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.date;
      }
    }));
    TasksQL.addSchemaField("content", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.content;
      }
    }));
    TasksQL.addSchemaField("excerpt", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.excerpt;
      }
    }));
    TasksQL.addSchemaField("slug", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.slug;
      }
    }));
    TasksQL.addSchemaField("labels", ({ graphql }) => ({
      type: graphql.GraphQLList(LabelType),
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
    TasksQL.addSchemaField("test", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.test;
      }
    }));

    CommentsQL.addSchemaField("title", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.title;
      }
    }));
    CommentsQL.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.path;
      }
    }));
    CommentsQL.addSchemaField("date", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.date;
      }
    }));
    CommentsQL.addSchemaField("content", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.content;
      }
    }));
    CommentsQL.addSchemaField("excerpt", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.excerpt;
      }
    }));
    CommentsQL.addSchemaField("slug", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.slug;
      }
    }));
    CommentsQL.addSchemaField("task", ({ graphql }) => ({
      type: graphql.GraphQLString,
      allowNull: false,
      resolve(node) {
        return node.task;
      }
    }));

    LabelsQL.addSchemaField("name", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.name;
      }
    }));
    LabelsQL.addSchemaField("title", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.title;
      }
    }));
    LabelsQL.addSchemaField("path", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.path;
      }
    }));
    LabelsQL.addSchemaField("date", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.date;
      }
    }));
    LabelsQL.addSchemaField("content", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.content;
      }
    }));
    LabelsQL.addSchemaField("excerpt", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.excerpt;
      }
    }));
    LabelsQL.addSchemaField("slug", ({ graphql }) => ({
      type: graphql.GraphQLString,
      resolve(node) {
        return node.slug;
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
                `${comments.data.length} Comments for task ${task.content.slice(
                  0,
                  50
                )}`
              );
              console.log(
                `${task.labels.length} labels for task ${task.content.slice(
                  0,
                  50
                )}`
              );
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
              parent: project.parent_id,
              name: project.name
            });
          });

          labels.forEach(label => {
            // console.log(`labels: `)
            // console.log(label)
            LabelsQL.addNode({
              id: label.id,
              name: label.name,
              id: label.id,
              name: label.name,
              path: label.path
            });
          });

          for (let i = 150; i < 190; i++) {
            let task = tasks[i];
            let labelArray = [];
            labels.forEach(label => {
              // console.log(`label from labels: ${label}`)
              // console.log(label.id)

              task.labels.forEach(taskLabel => {
                if (label.id == taskLabel) {
                  // console.log(`Found a label match at ${label} and i: ${i} and task: ${task.id}`)
                  // console.log(label)
                  // console.log(`Task snippet: ${task.content.slice(0, 50)}`)
                  labelName = changeCase.lower(slugify(label.name));
                  label.path = `/todoist/labels/${label.name}`;
                  labelArray.push(label);
                } else {
                  // console.log(`no label match`)
                }
              });
              return labelArray;
            });
            // console.log(`Task snippet: ${task.content.slice(0, 50)}`);
            // console.log(`Task id: ${task.id} | task labels: ${task.labels}`);

            let taskComments = getComments(url, task);
            taskComments
              .then(comments => {
                if (comments.length > 0) {
                  comments.forEach(comment => {
                    CommentsQL.addNode({
                      id: comment.id,
                      id: comment.id,
                      task: task.id,
                      posted: comment.posted,
                      date: comment.posted,
                      content: comment.content
                    });
                  });
                }
                TasksQL.addNode({
                  id: task.id,
                  id: task.id,
                  project: task.project_id,
                  created: task.date_added,
                  date: task.date_added,
                  labels: labelArray, // task.labels,//store.createReference(task.labels),
                  content: task.content,
                  comments: comments
                });
              })
              .catch(err => {
                console.log(`Error in taskComments ${err.response}`);
              });
          }
        })
        .catch(err => {
          console.log(`Error in getSync ${err.response}`);
        });
    }
    getSync();
  });
};
