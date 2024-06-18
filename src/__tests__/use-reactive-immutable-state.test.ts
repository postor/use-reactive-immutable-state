import { renderHook, act } from '@testing-library/react-hooks'
import { useReactiveImmutableState } from '../use-reactive-immutable-state'

test('should update state', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useReactiveImmutableState({
    title: 'todolist',
    todos: [
      {
        checked: true,
        text: 'task A'
      },
      {
        checked: false,
        text: 'task B'
      },
      {
        checked: false,
        text: 'task C'
      }
    ]
  }))

  // change title
  act(() => {
    result.current[0].title = 'hello!'
  })
  expect(result.current[0].title).toBe('hello!')

  // set task C checked
  act(() => {
    result.current[0].todos[2].checked = true
  })
  expect(result.current[0].todos[2].checked).toBe(true)


  // remove task B
  act(() => {
    result.current[0].todos = result.current[0].todos.filter((_, i) => i !== 1)
  })
  expect(result.current[0].todos[1].text).toBe('task C')


  // add task D
  act(() => {
    result.current[0].todos = [...result.current[0].todos, { text: 'task D', checked: false }]
  })
  expect(result.current[0].todos[2].text).toBe('task D')
})