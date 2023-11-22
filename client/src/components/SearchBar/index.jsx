import { useState } from 'react';
import Button from "../Atoms/Button";

// When implementing the prop "body" it needs to be an input element to 
// to able to use a useState on our search
// can reference the call of modal in AllCommunities page

export default function SearchBar({
    btnAction,
    bType,
    body

}) {
    return (
        <div className='flex justify-center mb-4 '>
            <div className="mr-1 " >
                {body}
            </div>
            <div>
                <Button  label="Search" action={btnAction} type={bType} />
            </div>
        </div>
    )
}
