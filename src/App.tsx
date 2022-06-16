import React,{useState,useRef} from 'react';
import axios from 'axios';
import './App.css';
const Types = ['https://www.google.com/searchbyimage/upload']
function App() {
  const form = useRef<HTMLFormElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(null)
  const [files, setFiles] = useState<FileList>()
  const getUrl =(): string|void=>{
    if(files)
    return URL.createObjectURL(files&&files[0])
  }
  const onChange  = (event:any):void =>{
    const {target:{value,files}} = event
    setFiles(files)
    setValue(value)
  }
  const onSearch = (type:number):any =>{
    if(files){
      if(type===0){
        form.current&&(form.current.action = Types[type])
        if(input.current){
          input.current.files = files
        }
        form.current?.submit()
      }
    }
  }
  return (
    <div className="App">
      <form style={{display:'none'}} ref={form} target="_blank" method="post" encType="multipart/form-data">
        <input name="encoded_image" type="file" ref={input} />
      </form>
      <main className='App-main'>
        {value?
          <div className='App-main-content'>
            <div className='App-main-preview'>
              <img src={getUrl()||''} alt=""/>
              <input onChange={onChange} accept="image/*" type="file" className='App-main-upload' />
            </div>
              <div onClick={()=>onSearch(0)} className='App-main-content-button'>Google</div>        
          </div>
        :
        <>
          <div className="App-main-info">点击上传图片</div>
          <input onChange={onChange} accept="image/*" type="file" className='App-main-upload' />
        </>
        }
      </main>
    </div>
  );
}

export default App;
