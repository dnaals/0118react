import { useStore } from './store';
import { useEffect, useRef, useState } from 'react';
import './common.scss';
function App() {
  const elInput = useRef();
  const elSave = useRef();
  const { data, getData, status, postData, deleteData, putData } = useStore();

  const [dataID, setDataID] = useState();

  useEffect(() => { getData() }, []);
  // console.log(data);

  let btnfunc = function (value) {
    if (elSave.current == '저장' && elInput.current.value != '') {
      postData(value);
      elInput.current.value = '';
    } else if (elSave.current == '수정' && elInput.current.value != '') {
      putData(dataID, value)
      elSave.current = "저장";
      elInput.current.value = '';

    }
  }

  if (!status) return <>Loading...</>

  return (
    <div className="list">

      <article className='section01'>
        <input type="text" ref={elInput} />
        <button onClick={() => { btnfunc(elInput.current.value) }}>{elSave.current !== '수정' ? '저장' : '수정'}</button>
      </article>
      <article className='section02'>
        <h2>리스트</h2>
        <ul>
          {
            data.map((obj, k) => (
              <li key={obj.id}>

                <p>{k + 1}. {obj.name}</p>
                <div>
                  <button onClick={() => { deleteData(obj.id) }}>삭제</button>
                  {/* <button onClick={() => { setDataID(obj.id); elSave.current = "수정" }}>수정</button> */}
                </div>

              </li>

            ))
          }
        </ul>
      </article>
    </div>
  );
}
// request.post('/', { id: Date.now(), name: "송우민" })
//   .then(res => {
//     console.log(res.data)
//   })

// request.delete('/13')
//   .then(res => {
//     console.log(res.data)
//   })

// request.get('/')
//   .then(res => {
//     console.log(res.data)
//   })
export default App;
