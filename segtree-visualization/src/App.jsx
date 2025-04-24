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
    const result = query(segTree, 1, l, r, 0, arr.length - 1);
    alert(`區間 [${l}, ${r}] 的總和為：${result}`);
  };

  const handleUpdate = (val, idx) => {
    update(segTree, val, 1, idx, 0, arr.length - 1);
    setSegTree([...segTree]);
  };

  return (
    <>
      <h1>線段樹視覺化</h1>
      {treeData && (
        <div style={{ width: '100vw', height: '80vh' }}>
          <Tree
            data={treeData}
            orientation="vertical"
            translate={{ x: window.innerWidth / 2, y: 60 }}
            renderCustomNodeElement={({ nodeDatum }) => (
              <g>
                <circle r={15} fill="skyblue" stroke="black" strokeWidth={1.5} />
                <text x={0} y={5} textAnchor="middle" fontSize={12}>
                  {nodeDatum.name}
                </text>
              </g>
            )}
          />
        </div>
      )}
      <Controls onQuery={handleQuery} onUpdate={handleUpdate} />
    </>
  );
}