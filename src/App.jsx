import "./scss/style.scss";
import Main from "./layout/Main";
import Header from "./layout/Header";
import "./App.scss";
import PageRouter from "./routes/PageRouter";

function App() {
  return (
    <>
      <div className="containers">
        <Header />
        <Main>
          <PageRouter />
        </Main>
      </div>
    </>
  );
}

export default App;
