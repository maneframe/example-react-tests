import React  from 'react';

function PINLock({onUnlock}) {
  const [failed, setFailed] = React.useState(false);
  const [code, setCode] = React.useState([]);

  const resetCode = () => {
    setCode([])
  }

  const checkCode = () => {
    if (code.join("") === '4321') {
      onUnlock()
    } else {
      setFailed(true)
      resetCode()
    }
  }

  const addToCode = (number) => {
    setFailed(false)
    setCode(code.concat([number]))
  }

  const numbers = [1, 2, 3, 4]
  return (
    <>
      {numbers.map((num) => {
        return <button key={num} onClick={() => addToCode(num)} className="number">
          {num}
        </button>
      })}
      <br/>
      {code.map(() => "*").join("")}
      <br/>
      <button onClick={checkCode} className="check">
        Check
      </button>
      <br/>
      {failed && <div>Try again!</div>}
    </>
  )
}

export default PINLock

