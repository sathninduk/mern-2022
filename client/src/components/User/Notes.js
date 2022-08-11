import React, {useEffect, useState} from "react";
import Helmet from "react-helmet";
import Navbar from "../Layout/Navbar";
import {Link, Redirect} from "react-router-dom";
import Pagination from 'react-responsive-pagination';

import userData from "../../utils/userData";
import UserActions from "../../actions/UserActions";
import {Button} from "@mui/material";

const user = userData();
const pathname = window.location.pathname;
const page = parseInt(pathname.split('/').pop());

export default function Notes() {

    const [notes, setNotes] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(page);

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    if (errors.server) {
        console.log(errors.server);
    }

    function fetchData() {

        if (isNaN(page) === true) {
            document.location.href = '/notes/1';
        }

        UserActions.FetchNotes(page).then(res => {
            setLoading(false);
            setNotes(res.data);
        }).catch(e => {
            console.log(e);
            setErrors(e.response.data);
            setLoading(false);
        })

        UserActions.FetchNotesCount().then(res => {
            let requirePagesCount = Math.ceil(res.data / 6);
            setPageCount(requirePagesCount)
        }).catch(e => {
            setErrors(e.response.data);
            console.log(e);
        })

    }

    const deleteNote = id => {
        UserActions.DeleteNote(id).then(res => {
            console.log(res)
            window.location.reload();
            setLoading(true);
        }).catch(e => {
            console.log(e);
            setErrors(e.response.data);
            setLoading(false);
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (page !== currentPage) {
            document.location.href = '/notes/' + currentPage;
        }
    }, [currentPage])

    return (
        <div>
            {user.role === "user" || user.role === "admin" ?
                user.role === "user" ?
                    user.status === true ?
                        "" :
                        <Redirect to="/reset"/> :
                    <Redirect to="/users"/>
                : <Redirect to="/"/>}

            <Navbar/>
            <Helmet>
                <title>Notes</title>
            </Helmet>
            <div className={"form-container con-mid"} style={{marginTop: "56px"}}>
                <h3>Notes</h3>
                <Link to={'/create-note'}>
                    + Add note
                </Link>
                <br/>
                <div className={"container con-mid"}>
                    <div className={"row"}>
                        {notes.map(note =>
                            <div id={note._id} key={note._id} className={"col-xs note-card"}>
                                <h5>{note.title}</h5>
                                <p>{note.note}</p>
                                <a href={'/note/update/' + note._id}>Update</a>
                                <Button onClick={() => deleteNote(note._id)}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <br/>
                <div className={"pagination"}>
                    <Pagination
                        current={currentPage}
                        total={pageCount}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}