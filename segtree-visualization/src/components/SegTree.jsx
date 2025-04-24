import Tree from 'react-d3-tree';

const data = {
  name: "10",
  children: [
    { name: "5",
      children: [
        { name: "1" },
        { name: "2" }
      ],
    },
    { name: "15",
      children: [
        {name: "3" },
        { name: "4"}
      ],
    }
  ],
};

export default function TreeExample() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Tree 
      data={data}
      orientation="vertical"
      renderCustomNodeElement={renderNode} />
    </div>
  );
}

const renderNode = ({ nodeDatum, toggleNode }) => {
  return (
    <g>
      <circle
        r={15}
        fill={'orange'}
        stroke="black"
        strokeWidth={2}
        onClick={toggleNode}
      />
      <text
        fill="black"
        x={0}
        y={5}
        textAnchor="middle"
        fontSize="12"
      >
        {nodeDatum.name}
      </text>
    </g>
  );
};

