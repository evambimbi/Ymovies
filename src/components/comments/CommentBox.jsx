import Comments from "./Comments";

const App = () => {
  return (
    <div>
      {/* <h1>Hello monsterlessons</h1> */}
      <Comments
        commentsUrl="http://localhost:4500/comments"
        currentUserId="1"
      />
    </div>
  );
};

export default App;
