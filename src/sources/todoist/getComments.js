const axios = require("axios");

const url = "https://beta.todoist.com/API/v8/";
const token = "b4944a8b7cf87e9c658ee1fb640d0d298fd0596f";

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
          // console.log(
          //   `inside of getComments() { comments.data.forEach: ${comment} }`
          // );
          // console.log(comment);
          // CommentsQL.addNode({
          //   id: comment.id,
          //   task_id: task.id,
          //   posted: comment.posted,
          //   date: comment.posted,
          //   content: comment.content,
          //   fields: {
          //     id: comment.id,
          //     task_id: task.id,
          //     posted: comment.posted,
          //     date: comment.posted,
          //     content: comment.content
          //   }
          // });
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

module.exports = getComments;