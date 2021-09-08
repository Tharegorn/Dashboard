import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { Button } from '@material-ui/core'
import jwt_decode from 'jwt-decode'
import { checkAdmin, check_jwt, deleteUser, promove } from '../../requests/user_requests'

function Admin() {
    const [res, setRed] = useState()
    const [div, setDiv] = useState();

    function update() {
        var token = localStorage.getItem("session_id");
        var user = jwt_decode(token)
        checkAdmin(user.name).then((resp) => {
            setDiv(resp.data.data.map((item) => (<tr><td key={item.id}>{item.id}</td><td>{item.name}</td><td>{item.added_at}</td><td><Button variant="contained" color="secondary" onClick={(e) => {
                e.preventDefault(); deleteUser(item.id).then(() => {
                    update()
                })
            }}>Delete</Button></td>{item.perm !== 1 ? <td><Button variant="contained" color="primary" onClick={(e) => {
                e.preventDefault(); promove(item.id, 1).then(() => {
                    update()
                })
            }}>Promove</Button></td> :
                <td><Button variant="contained" color="primary" onClick={(e) => {
                    e.preventDefault(); promove(item.id, 0).then(() => {
                        update()
                    })
                }}>Degage</Button></td>}</tr>)))
        }).catch((err) => {
            throw err;
        })
    }
    useEffect(() => {
        if (!localStorage.getItem("session_id")) {
            setRed(false)
        }
        else {
            var token = localStorage.getItem("session_id");
            var user = jwt_decode(token)
            switch (check_jwt(token)) {
                case "INVALID":
                    localStorage.removeItem("session_id");
                    setRed(false);
                    break;
                case "ERROR":
                    localStorage.removeItem("session_id");
                    setRed(false);
                    break;
                case "adm":
                    checkAdmin(user.name).then((resp) => {
                        setDiv(resp.data.data.map((item) => (<tr><td key={item.id}>{item.id}</td><td>{item.name}</td><td>{item.added_at}</td><td><Button variant="contained" color="secondary" onClick={(e) => {
                            e.preventDefault(); deleteUser(item.id).then(() => {
                                update()
                            })
                        }}>Delete</Button></td>{item.perm !== 1 ? <td><Button variant="contained" color="primary" onClick={(e) => {
                            e.preventDefault(); promove(item.id, 1).then(() => {
                                update()
                            })
                        }}>Promove</Button></td> :
                            <td><Button variant="contained" color="primary" onClick={(e) => {
                                e.preventDefault(); promove(item.id, 0).then(() => {
                                    update()
                                })
                            }}>Degage</Button></td>}</tr>)))
                    }).catch((err) => {
                        throw err;
                    })
                    setRed(true);
                    break;
                case "normal":
                    setRed(false);
                    break;
                default:
                    break;
            }
        }
    }, [])
    if (res === false)
        return (<Redirect to='/' />)
    return (<div>
        <table>
            <thead>
                <th>
                    Id
                </th><th>Name</th><th>Date</th>
            </thead>

            <tbody>
                {div}
            </tbody>
            <tfoot>

            </tfoot>
        </table>
    </div>)
}

export default Admin;