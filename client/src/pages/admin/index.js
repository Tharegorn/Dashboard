import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import {
  checkAdmin,
  check_jwt,
  deleteUser,
  promove,
} from "../../requests/user_requests";

function Admin() {
  const [res, setRed] = useState();
  const [div, setDiv] = useState();

  const ITEMS_PER_PAGE = 50;
  const headers = [
    { name: "Id", field: "id", sortable: false },
    { name: "Name", field: "name", sortable: true },
    { name: "Date", field: "date", sortable: false },
];

  function update() {
    var token = localStorage.getItem("session_id");
    var user = jwt_decode(token);
    checkAdmin(user.name)
      .then((resp) => {
        setDiv(
          resp.data.data.map((item) => (
            <tr>
              <td key={item.id}>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.added_at}</td>
              <td>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteUser(item.id).then(() => {
                      update();
                    });
                  }}
                >
                  Delete
                </Button>
              </td>
              {item.perm !== 1 ? (
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      promove(item.id, 1).then(() => {
                        update();
                      });
                    }}
                  >
                    Promove
                  </Button>
                </td>
              ) : (
                <td>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      promove(item.id, 0).then(() => {
                        update();
                      });
                    }}
                  >
                    Degage
                  </Button>
                </td>
              )}
            </tr>
          ))
        );
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
              setDiv(
                resp.data.data.map((item) => (
                  <tr>
                    <td key={item.id}>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.added_at}</td>
                    <td>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteUser(item.id).then(() => {
                            update();
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                    {item.perm !== 1 ? (
                      <td>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            promove(item.id, 1).then(() => {
                              update();
                            });
                          }}
                        >
                          Promove
                        </Button>
                      </td>
                    ) : (
                      <td>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={(e) => {
                            e.preventDefault();
                            promove(item.id, 0).then(() => {
                              update();
                            });
                          }}
                        >
                          Degage
                        </Button>
                      </td>
                    )}
                  </tr>
                ))
              );
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
  if (res === false) return <Redirect to="/" />;
  return (
    <>
      <>
        {/* <Header title="Building a data table in react" /> */}

        {/* <ExternalInfo page="datatable" /> */}

        <div className="row w-100">
          <div className="col mb-3 col-12 text-center">
            <div className="row">
              <div className="col-md-6">
                {/* <Pagination
                  total={totalItems}
                  itemsPerPage={ITEMS_PER_PAGE}
                  currentPage={currentPage}
                  onPageChange={(page) => setCurrentPage(page)}
                /> */}
              </div>
              <div className="col-md-6 d-flex flex-row-reverse">
                {/* <Search
                  onSearch={(value) => {
                    setSearch(value);
                    setCurrentPage(1);
                  }}
                /> */}
              </div>
            </div>

            <table className="table table-striped">
              {/* <TableHeader
                headers={headers}
                onSorting={(field, order) => setSorting({ field, order })}
              /> */}
              <tbody>
                {/* {commentsData.map((comment) => (
                  <tr>
                    <th scope="row" key={comment.id}>
                      {comment.id}
                    </th>
                    <td>{comment.name}</td>
                    <td>{comment.email}</td>
                    <td>{comment.body}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
        {/* {loader} */}
      </>
    </>

    // <div>
    //     <table>
    //         <thead>
    //             <th>
    //                 Id
    //             </th><th>Name</th><th>Date</th>
    //         </thead>

    //         <tbody>
    //             {div}
    //         </tbody>
    //         <tfoot>

    //         </tfoot>
    //     </table>
    // </div>
  );
}

export default Admin;
