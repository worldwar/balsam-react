import React from 'react';
import { Link } from 'react-router-dom'
export default (props) =>
    <li>
        <Link to={"/catalog/" + props.book.id}>
            {props.book.title} by {props.book.author}
        </Link>
    </li>
