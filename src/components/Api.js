import axios from "axios";

export const getComments = async () => {
  return [
    // {
    //   id: "1",
    //   body: "First comment",
    //   username: "Jack",
    //   userId: "1",
    //   parentId: null,
    //   createdAt: "2021-08-16T23:00:33.010+02:00",
    // },
    // {
    //   id: "2",
    //   body: "Second comment",
    //   username: "John",
    //   userId: "2",
    //   parentId: null,
    //   createdAt: "2021-08-16T23:00:33.010+02:00",
    // },
    // {
    //   id: "3",
    //   body: "First comment first child",
    //   username: "John",
    //   userId: "2",
    //   parentId: "1",
    //   createdAt: "2021-08-16T23:00:33.010+02:00",
    // },
    // {
    //   id: "4",
    //   body: "Second comment second child",
    //   username: "John",
    //   userId: "2",
    //   parentId: "2",
    //   createdAt: "2021-08-16T23:00:33.010+02:00",
    // },
  ];
};
const addCommetrUrl = "http://localhost:4000/comment/add";
export const addComment = (text, parentId = null) => {
  axios
    .post(addCommetrUrl, {
      body: text,
    })
    .then((res) => console.log(res.data));
};

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    body: text,
    parentId,
    userId: "1",
    username: "eveline mbimbi",
    createdAt: new Date().toISOString(),
  };
};

export const updateComment = async (text) => {
  return { text };
};

export const deleteComment = async () => {
  return {};
};
