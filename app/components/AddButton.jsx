import React from 'react';
import { Link } from 'react-router-dom'
export default (props) =>
    <button>
        <Link to={"/add"}>
            添加
        </Link>
    </button>
