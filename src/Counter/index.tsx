import { useCallback, useEffect, useState } from "react";


function useDebounce<T>(value: T, delay = 500) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(id);
    }, [value, delay]);
    return debounced;
}

const Counter = () => {
    const [text, setText] = useState("");
    const debouncedText = useDebounce(text, 500);

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const onTextChange = (e) => {
        e.preventDefault();
        setText(e.target.value || '');
    };

    useEffect(() => {
        setLoading(true);

        const controller = new AbortController();
        const { signal } = controller;

        const fetchData = () => {
            fetch(`https://jsonplaceholder.typicode.com/users`, { signal })
                .then((data) => {
                    if (!data.ok) {
                        throw new Error('Error');
                    }
                    return data.json();
                }).then((data) => {
                    setResults(data);
                }).catch((e) => {
                    console.log(e);
                }).finally(() => {
                    setLoading(false);
                });
        }
        fetchData();
        return () => controller.abort();

    }, [debouncedText])


    return (
        <div>
            <h2>Search box</h2>
            <input type="text" value={text} onChange={(e) => onTextChange(e)} placeholder="Type a name, username, or email…" aria-label="Search users" />
            <h3>API Results: </h3>
            {loading && <p>Loading…</p>}
            <ul>
                {results.map((u: any) => (
                    <li key={u.id}>
                        <strong>{u.name}</strong> — @{u.username} — {u.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Counter;