import { useState, useEffect } from 'react';
import { buildSeg, query, update, arrayToTree } from './utils/segTreeFunc.js';
import Controls from './components/Controls.jsx';
import Tree from 'react-d3-tree';

export default function App() {
  const [arr, setArr] = useState([1, 2, 3, 4]);
  const [segTree, setSegTree] = useState([]);

  useEffect(() => {
    const seg = Array(8).fill(0);
    buildSeg(arr, seg, 1, 0, arr.length - 1);
    setSegTree(seg);
  }, [arr]);

  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    setTreeData(arrayToTree(segTree, 1));
  }, [segTree]);

  const handleQuery = (l, r) => {
    if (l < 0 || l > r || l >= arr.length || r < 0 || r >= arr.length) {
      alert('非法輸入！');
      return;
    }
    const result = query(segTree, 1, l, r, 0, arr.length - 1);
    alert(`區間 [${l}, ${r}] 的總和為：${result}`);
  };

  const handleUpdate = (val, idx) => {
    if (idx < 0 || idx >= arr.length || val < -999 || val > 999) {
      alert('想玩啊？')
      return;
    }
    arr[idx] = val;
    update(segTree, val, 1, idx, 0, arr.length - 1);
    setSegTree([...segTree]);
  };

  return (
    <>
      <h1>線段樹視覺化</h1>
      {treeData && (
        <div style={{ width: '100vw', height: '70vh' }}>
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: window.innerWidth / 2, y: 50 }}
            zoomable={false}
            draggable={false}
            renderCustomNodeElement={({ nodeDatum }) => (
              <g>
                <circle r={30} fill="skyblue" stroke="black" strokeWidth={1.5} />
                <text x={0} y={5} textAnchor="middle" fontSize={16}>
                  {nodeDatum.name}
                </text>
              </g>
            )}
          />
        </div>
      )}
      <div>
      <div 
        style={{ 
          display: 'flex', 
          gap: '10px', 
          position: 'absolute', 
          top: '75%', 
          left: '50%',
          transform: "translate(-50%, -50%)",
          justifyContent: 'center',
          alignItems: 'center' 
        }}>
        {arr.map((value, index) => (
          <div
            key={index}
            style={{
              padding: '20px',
              border: '1px solid black',
              borderRadius: '5px',
              backgroundColor: '#000000',
            }}
          >
            {value}
          </div>
        ))}
        </div>
      </div>
      <Controls onQuery={handleQuery} onUpdate={handleUpdate} />
    </>
  );
}