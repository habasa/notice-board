import axios from 'axios';
import styled from 'styled-components';
import UpdateBtn from './UpdateBtn';

const RightArticle = styled.article`
    display : flex;
    flex-direction : row;
`;

const DeleteBtn = (props) => {
    // console.log("props", props);

    const delBtn = () => {
        if (window.confirm("리뷰 목록을 삭제하시겠습니까?")) {
            axios.delete('http://localhost:8000/api/delete', {
                data: {
                    id: props.id
                }
            }).then(res => {
                props.delRender()
                alert('삭제 성공')
            })
        }
    }

    return (
        <div className='view-review'>
            <article>
                <h2>{props.title}</h2>
                <div>{props.content}</div>
            </article>

            <RightArticle>
                <button className='delete-button'
                    onClick={delBtn}
                >삭제</button>

                <UpdateBtn />
            </RightArticle>
        </div>
    );
};

export default DeleteBtn;