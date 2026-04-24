import React from 'react';
import { Link } from 'react-router-dom';

export default function MyPage() {
    return (
        <div>
            <h3>내가 쓴 글</h3>
            <ul style={{listStyle: 'none'}}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
          <Link to="/">
            <button>🏠 홈으로</button>
          </Link>
        </div>
    );
}

