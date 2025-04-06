import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    saveUser,
    listUsers,
    deleteUser
} from "../actions/userAction"; 

function UserManagementScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const userList = useSelector(state => state.userList);
    const { loading, users, error } = userList;

    const userSave = useSelector(state => state.userSave);
    const {
        loading: loadingSave,
        success: successSave,
        error: errorSave
    } = userSave;

    const userDelete = useSelector(state => state.userDelete);
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete
    } = userDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setModalVisible(false);
        }
        dispatch(listUsers());
        return () => {
            //
        };
    }, [successSave, successDelete]);

    const openModal = user => {
        setModalVisible(true);
        setId(user._id || "");
        setName(user.name || "");
        setEmail(user.email || "");
        setIsAdmin(user.isAdmin || false);
    };

    const submitHandler = e => {
        e.preventDefault();
        dispatch(
            saveUser({
                _id: id,
                name,
                email,
                isAdmin
            })
        );
    };

    const deleteHandler = user => {
        dispatch(deleteUser(user._id));
    };

    return (
        <div className="content content-margined">
            <div className="user-header">
                <h3>Users</h3>
            </div>
            {modalVisible && (
                <div className="form">
                    <form onSubmit={submitHandler}>
                        <ul className="form-container">
                            <li>
                                <h2>{id ? "Edit User" : "Create User"}</h2>
                            </li>
                            <li>
                                {loadingSave && <div>Loading...</div>}
                                {errorSave && <div>{errorSave}</div>}
                            </li>
                            <li>
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    name="name"
                                    id="name"
                                    onChange={e => setName(e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    name="email"
                                    id="email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </li>
                            <li>
                                <label htmlFor="isAdmin">Is Admin</label>
                                <input
                                    type="checkbox"
                                    checked={isAdmin}
                                    name="isAdmin"
                                    id="isAdmin"
                                    onChange={e => setIsAdmin(e.target.checked)}
                                />
                            </li>
                            <li>
                                <button
                                    type="submit"
                                    className="button primary"
                                >
                                    {id ? "Update" : "Create"}
                                </button>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setModalVisible(false)}
                                    className="button secondary"
                                >
                                    Back
                                </button>
                            </li>
                        </ul>
                    </form>
                </div>
            )}

            <div className="user-list">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? "Yes" : "No"}</td>
                                <td>
                                    <button
                                        className="product-button"
                                        onClick={() => openModal(user)}
                                    >
                                        Edit
                                    </button>
                                    {"  "}
                                    <button
                                        className="product-button secondary"
                                        onClick={() => deleteHandler(user)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserManagementScreen;