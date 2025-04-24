import { useState } from 'react'
export default function Controls({ onQuery, onUpdate }) {
    const [l, setL] = useState(0);
    const [r, setR] = useState(3);
    const [idx, setIdx] = useState(0);
    const [val, setVal] = useState(0);

    return (
      <>
        <>
          <span>查詢區間：</span>
          <input type="number" value={l} onChange={e => setL(e.target.value)} />
          <input type="number" value={r} onChange={e => setR(e.target.value)} />
          <button onClick={() => onQuery(Number(l), Number(r))}>查詢</button>
        </>
        <>
          <span>更新值：</span>
          <input type="number" value={idx} onChange={e => setIdx(e.target.value)} />
          <input type="number" value={val} onChange={e => setVal(e.target.value)} />
          <button onClick={() => onUpdate(Number(val), Number(idx))}>更新</button>
        </>
      </>
    );
  }