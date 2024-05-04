import viteLogo from '/favicon.svg';
import './App.css';

function App() {
  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={viteLogo} className="logo" alt="Antique Boutique logo" />
        </a>
      </div>
      <h1>Antique Boutique</h1>
      <div className="card">
        <button>Press me</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
