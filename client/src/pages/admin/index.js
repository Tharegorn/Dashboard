import React, { useState, useEffect, useMemo } from "react";
import { Redirect } from "react-router-dom";
import { Page, Header, Search } from "../../components/admin/";
import jwt_decode from "jwt-decode";
import {
  checkAdmin,
  check_jwt,
  deleteUser,
  promove,
} from "../../requests/user_requests";
import { Button } from "@material-ui/core";
import AddUser from "../../components/AddUser";
import "./index.css";
import { Delete, PersonAdd, PersonAddDisabled } from "@material-ui/icons";

function Admin() {
  const [res, setRed] = useState();
  const [content, setContent] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" });

  const [visibility, setVisibility] = useState(false);

  const ITEMS_PER_PAGE = 10;
  const headers = [
    { name: "Id", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Date", field: "date", sortable: false },
    { name: "Promote/Demote", field: "prom", sortable: false },
    { name: "Remove", field: "remove", sortable: false },
  ];

  function update() {
    var token = localStorage.getItem("session_id");
    var user = jwt_decode(token);
    checkAdmin(user.name)
      .then((resp) => {
        setContent(resp.data.data);
        setTotalItems(resp.data.data.length);
      })
      .catch((err) => {
        throw err;
      });
  }
  useEffect(() => {
    if (!localStorage.getItem("session_id")) {
      setRed(false);
    } else {
      var token = localStorage.getItem("session_id");
      var user = jwt_decode(token);
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
          checkAdmin(user.name)
            .then((resp) => {
              setContent(resp.data.data);
              setTotalItems(resp.data.data.length);
            })
            .catch((err) => {
              throw err;
            });
          setRed(true);
          break;
        case "normal":
          setRed(false);
          break;
        default:
          break;
      }
    }
  }, []);
  const commentsData = useMemo(() => {
    let computedComments = content;
    if (search) {
      computedComments = computedComments.filter((comment) =>
        comment.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setTotalItems(computedComments.length);
    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedComments = computedComments.sort(
        (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
      );
    }
    return computedComments.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [content, currentPage, search, sorting]);
  if (res === false) return <Redirect to="/" />;
  return (
    <>
      {visibility ? <AddUser onClose={true}/> : <></>}

      <div>
        <div>
          <div>
            <div>
              <Button
                color="primary"
                variant="outlined"
                onClick={() => {setVisibility(!visibility)}}
              >
                Add User
              </Button>
              <Page
                total={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
                currentPage={currentPage}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </div>
            <div>
              <Search
                onSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <table class="container">
            <Header
              headers={headers}
              onSorting={(field, order) => setSorting({ field, order })}
            />
            <tbody>
              {commentsData.map((comment) => (
                <tr>
                  <th scope="row" key={comment.id}>
                    {comment.id}
                  </th>
                  <td>{comment.name}</td>
                  <td>{comment.added_at}</td>
                  <td>
                    {comment.perm === 1 ? (
                      <div
                        onClick={() => {
                          promove(comment.id, 0).then(() => {
                            update();
                          });
                        }}
                      >
                        <PersonAddDisabled />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          promove(comment.id, 1).then(() => {
                            update();
                          });
                        }}
                      >
                        <PersonAdd />
                      </div>
                    )}
                  </td>
                  <td>
                    <div
                      onClick={() => {
                        deleteUser(comment.id).then(() => {
                          update();
                        });
                      }}
                    >
                      <Delete />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Admin;
