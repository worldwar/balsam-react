import React from 'react';
import { Link } from 'react-router-dom'
export default (props) =>
    <li>
        <Link to={"/content/" + props.chapter.id}>
            {props.chapter.title}
        </Link>
    </li>
