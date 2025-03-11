import {useState} from 'react';

function Example() {
  const [name, setName] = useState<string>('');

  return (
    <div>
      <p>You entered: {name}</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

export default Example;
