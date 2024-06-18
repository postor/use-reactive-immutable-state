# use-reactive-immutable-state

Simplify your React state management with automatic immutability and reactivity.  Effortlessly update complex data structures without worrying about performance or manual optimizations.



## usage

example: https://codesandbox.io/p/devbox/use-reactive-immutable-state-k256kf?file=%2Fsrc%2FApp.tsx

```
npm i use-reactive-immutable-state
```


```
import useReactiveImmutableState from "../lib/use-seemless-immu-state";
const btnStyle = { padding: '5px', background: '#eee', margin: '5px' }

export function App () {
  const [state, setState] = useReactiveImmutableState({
    title: "todolist",
    todos: [
      {
        checked: true,
        text: "task A",
      },
      {
        checked: false,
        text: "task B",
      },
      {
        checked: false,
        text: "task C",
      },
    ],
  });

  return (
    <>
      <div>
        <h2>{state.title}</h2>
        {state.todos.map((x, i) => (
          <div key={i}>
            <button style={btnStyle}
              onClick={() => {
                x.checked = !x.checked;
              }}
            >
              {x.checked ? "✓" : "×"}
            </button>
            <input value={x.text} onChange={e => x.text = e.target.value} />
            <button style={btnStyle}
              onClick={() => {
                state.todos = state.todos.filter((_, j) => j !== i)
              }}
            >
              {"🗑"}
            </button>
          </div>
        ))}
      </div>
      <button style={btnStyle} onClick={() => state.todos = [...state.todos, { checked: false, text: 'new item' }]}>add</button>
    </>
  );
}
```

**Notice**

use assignment instead of array methods like push/unshift/splice/sort.....

```
      {/* good */}
      <button style={btnStyle} onClick={() => state.todos = [...state.todos, { checked: false, text: 'new item' }]}>add</button>

      {/* bad */}
      <button style={btnStyle} onClick={() => state.todos.push({ checked: false, text: 'new item' })}>add</button>
```