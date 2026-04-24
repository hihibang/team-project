import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
    return (
        <div className='Main'>
          <form>
            {/* <input placeholder='#name'/> */}
            <textarea placeholder='작성하고 싶은 메시지를 자유롭게 적어주세요'
                      rows="5"
                      cols="40"/>
            <button type='submit'>메시지 보내기</button>
          </form>
          <Link to="/">
                <button>🏠 홈으로</button>
            </Link>
        </div>
    );
}

