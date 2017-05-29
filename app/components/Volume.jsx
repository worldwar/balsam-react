import React from 'react';
import Chapter from './Chapter.jsx'
export default (props) =>
    <div>
        <div>第{props.volume.volume.seq + 1}卷:{props.volume.volume.title}</div>
        <ul>
            {props.volume.chapters.map((chapter, i) =>
            <Chapter key={chapter.id} chapter={chapter} />
            )}
        </ul>
    </div>