import { useEffect, useState } from "react";
import $ from 'jquery';

export default function AutoCompleteDataList(props) {

    const [filteredAutoComplete, setFilteredAutoComplete] = useState([]);
    const [activeAutoCompleteIndex, setActiveAutoCompleteIndex] = useState(0);
    const [showAutoComplete, setShowAutoComplete] = useState(false);
    const [input, setInput] = useState("");

    const onChange = (e) => {
        const userInput = e.target.value;

        // Filter our AutoComplete that don't contain the user's input
        const unLinked = props.AutoCompleteData.filter(
            (AutoComplete) =>
                AutoComplete.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        setInput(e.target.value);
        setFilteredAutoComplete(unLinked);
        setActiveAutoCompleteIndex(0);
        setShowAutoComplete(true);
    };

    const onClick = (e) => {
        setFilteredAutoComplete([]);
        setInput(e.target.innerText);
        setActiveAutoCompleteIndex(0);
        setShowAutoComplete(false);
    };

    const onKeyDown = (e) => {
        debugger;
        // User pressed the enter key
        if (e.keyCode === 13) {
            setInput(filteredAutoComplete[activeAutoCompleteIndex]);
            setActiveAutoCompleteIndex(0);
            setShowAutoComplete(false);
        }
        // User pressed the up arrow
        else if (e.keyCode === 38) {
            if (activeAutoCompleteIndex === 0) {
                return;
            }

            setActiveAutoCompleteIndex(activeAutoCompleteIndex - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeAutoCompleteIndex - 1 === filteredAutoComplete.length) {
                return;
            }

            setActiveAutoCompleteIndex(activeAutoCompleteIndex + 1);
        }
    };

    useEffect(() => {
        if (activeAutoCompleteIndex === 0 || activeAutoCompleteIndex - 1 === filteredAutoComplete.length) {
            let el = document.querySelector('.AutoComplete-active');
            if (el != null) el.scrollIntoView(true);
        }
    }, [activeAutoCompleteIndex])

    const AutoCompleteListComponent = () => {
        return filteredAutoComplete.length ? (
            <ul class="AutoComplete">
                {filteredAutoComplete.map((AutoComplete, index) => {
                    let className;

                    // Flag the active AutoComplete with a class
                    if (index === activeAutoCompleteIndex) {
                        className = "AutoComplete-active";
                    }

                    return (
                        <li  id={'li' + index} className={className} key={AutoComplete} onClick={onClick}>
                            {AutoComplete}
                        </li>
                    );



                })}
            </ul>
        ) : (
            <div class="no-AutoComplete">
                <em>No Data Found</em>
            </div>
        );
    };

    return (
        <>
            <input
                type="text"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={input}
            />
            {showAutoComplete && input && <AutoCompleteListComponent />}
        </>
    );
};


