import { useState } from 'react';
import Button from "../Atoms/Button";

export default function SearchBar({
    btnAction,
    placeHolder
}) {
    
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();

        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <input 
                />
            </div>
            <div>
                <Button />
            </div>
        </div>
    )
}
