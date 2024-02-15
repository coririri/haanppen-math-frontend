import ClassList from './components/atoms/ClassList';

function App() {
  return (
    <div className="m-4">
      <ClassList
        type="progress"
        text="개념원리 중3-1 ~p.187 (이차함수의 그래프)"
      />
      <ClassList type="homework" text="~p.187 까지" />
    </div>
  );
}

export default App;
