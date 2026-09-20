import Header from "./components/Header";
import goalsImage from "./assets/goals.jpg";

function App() {
  return (
    <main>
      <Header image={{ src: goalsImage, alt: "a list of goals" }}></Header>
    </main>
  );
}

export default App;
