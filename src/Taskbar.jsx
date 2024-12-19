import { Link } from "react-router-dom";
import { getTopics } from "../api";
import { useEffect, useState } from "react";

function Taskbar() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics()
            .then((res) => {
                setTopics(res.data);
            })
            .catch((err) => console.error("Error fetching topics:", err));
    }, []);

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                {topics.map((topic) => (
                    <li className="taskBarElement" key={topic.slug}>
                        <Link to={`/articles/${topic.slug}`} className="navbar-link">
                            {topic.slug}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Taskbar;
