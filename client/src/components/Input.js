import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import DeleteBtn from '../components/DeleteBtn';

const Section = styled.section`
  margin: 0 auto;
  width: 80%;
  border: 1px solid #333;
  padding: 10px 0 30px 0;
  border-radius: 5px;
  margin-bottom : 50px;
`;
const Input = () => {
    const [review, setReview] = useState({ title: '', content: '', id:0 })
  const [view, setView] = useState([])
  const [toggle, setToggle] = useState(true) // 무한 렌더링 방지

  useEffect(() => {
    axios.get('http://localhost:8000/api/get')
      .then((res) => {
        setView(res.data)
      })
  }, [toggle])

  const clickBtn = () => {
    axios.post('http://localhost:8000/api/insert', {
      title: review.title,
      content: review.content,
      id: review.id
    }).then(() => {
      alert('등록')
      setToggle(!toggle)
      document.querySelector('input').value = ''
      document.querySelector('textarea').value = ''
    })
  }

  const getValue = (e) => {
    const { name, value } = e.target
    setReview({
      ...review,
      [name]: value,
      id: Date.now()
    })
  }

  const delRender = () => {
    setToggle(!toggle)
  }

  return (
    <div>
      <h1>맛집을 공유해줘요!</h1>
      
      <Section>
        {view.map((el, i) =>
          <DeleteBtn key={i} title={el.title} content={el.content}
          id={el.id} delRender={delRender}
          />
        )}
      </Section>

      <div className='text-wrapper'>
        <input className='title' type='text'
          placeholder='제목'
          name='title'
          onChange={getValue}
          autocomplete="off"></input>

        <textarea className='content' type='text'
          placeholder='내용'
          name='content'
          onChange={getValue}></textarea>
      </div>

      <button className='input-button'
        onClick={clickBtn}
      >입력</button>
    </div>
  );
};

export default Input;