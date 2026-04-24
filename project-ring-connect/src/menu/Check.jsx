import React from 'react';
import { Link } from 'react-router-dom';

export default function Check() {
    return (
        <>
        <div>
          <h3>나에게 전달된 메시지</h3>
          <text id='text'>밤은 생각보다 짧고, 아침을 길다.</text>
        </div>
        <Link to="/">
            <button>🏠 홈으로</button>
          </Link>
        </>
    );
}

