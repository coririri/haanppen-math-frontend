import './App.css';
import TextButton from './components/atoms/TextButton';

function App() {
  return (
    <div className="mx-2 my-2">
      <h1>H1</h1>
      <TextButton color="white" shape="square">
        중
      </TextButton>
      <TextButton color="gray">상세</TextButton>
    </div>
  );
}

export default App;
