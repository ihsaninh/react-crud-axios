import React, { Component, Fragment } from "react";
import axios from "axios";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: [],
      editable: false,
      student_id: null,
      nis: "",
      nama: "",
      email: "",
      jurusan: "",
			gender: "",
    };
  }

  componentDidMount() {
    this.getDataSiswa();
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleAddSiswa = () => {
    this.setState({ editable: false });
    axios
      .post("http://127.0.0.1:8000/api/v1/students", {
        nis: this.state.nis,
        nama: this.state.nama,
        email: this.state.email,
        jurusan: this.state.jurusan,
        gender: this.state.gender
      })
      .then(res => {
        this.getDataSiswa();
        this.setState({
          nis: "",
          nama: "",
          email: "",
          jurusan: "",
          gender: ""
        });
      })
      .catch(err => {
        alert("gagal menambah data");
      });
  };

  getSiswaById = id => {
    let student_id = id;
    this.setState({
      editable: true,
      student_id
    });
    axios
      .get(`http://127.0.0.1:8000/api/v1/students/${id}`)
      .then(res => {
        this.setState({
          nis: res.data.student.nis,
          nama: res.data.student.nama,
          email: res.data.student.email,
          jurusan: res.data.student.jurusan,
          gender: res.data.student.gender
        });
      })
      .catch(err => {
        alert("gagal menampilkan data siswa");
      });
  };

  getDataSiswa = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/students")
      .then(res => {
        this.setState({
          edit: true,
          students: res.data.students
        });
      })
      .catch(err => {
        alert("gagal menampilkan data siswa");
      });
  };

  handleDeleteSiswa = id => {
    axios
      .delete(`http://127.0.0.1:8000/api/v1/students/${id}`)
      .then(res => {
        this.getDataSiswa();
      })
      .catch(err => {
        alert("gagal menghapus data siswa");
      });
  };

  handleUpdateSiswa = () => {
    axios
      .put(`http://127.0.0.1:8000/api/v1/students/${this.state.student_id}`, {
        nis: this.state.nis,
        nama: this.state.nama,
        email: this.state.email,
        jurusan: this.state.jurusan,
        gender: this.state.gender
      })
      .then(res => {
        this.getDataSiswa();
        this.setState({
          editable: false,
          nis: "",
          nama: "",
          email: "",
          jurusan: "",
          gender: ""
        });
      })
      .catch(err => {
        alert("gagal mengubah data siswa");
      });
  };

  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-dark bg-primary navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="/">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                <a className="nav-item nav-link" href="/">
                  Home <span className="sr-only">(current)</span>
                </a>
                <a className="nav-item nav-link active" href="/">
                  Students
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <div className="title mb-5">
            <button
              type="button"
              data-toggle="modal"
              data-target="#addmodal"
              className="btn btn-primary float-right"
            >
              Tambah Data
            </button>
            <h2>Daftar Siswa SMKN 2 Bogor</h2>
          </div>
          <table className="table">
            <thead>
              <tr className="bg-primary text-white">
                <th scope="col">#</th>
                <th scope="col">NIS</th>
                <th scope="col">Nama</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
                <th scope="col">Jurusan</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {this.state.students.map((student, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{student.nis}</td>
                  <td>{student.nama}</td>
                  <td>{student.gender}</td>
                  <td>{student.email}</td>
                  <td>{student.jurusan}</td>
                  <td>
                    <button
                      className="badge badge-primary"
                      data-toggle="modal"
                      data-target="#addmodal"
                      onClick={() => this.getSiswaById(student.id)}
                    >
                      edit
                    </button>
                    <button
                      className="badge badge-danger"
                      onClick={() => this.handleDeleteSiswa(student.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          className="modal fade"
          id="addmodal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="addModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {this.state.editable === true
                    ? "Edit Data Siswa"
                    : "Tambah Data Siswa"}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="nis">NIS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nis"
                    aria-describedby="emailHelp"
                    placeholder="Enter NIS"
                    onChange={this.handleChange}
                    value={this.state.nis}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nama">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama"
                    placeholder="Enter name"
                    onChange={this.handleChange}
                    value={this.state.nama}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jurusan">Jurusan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="jurusan"
                    placeholder="Enter jurusan"
                    onChange={this.handleChange}
                    value={this.state.jurusan}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    id="gender"
                    placeholder="Enter gender"
                    onChange={this.handleChange}
                    value={this.state.gender}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={
                    this.state.editable === true
                      ? this.handleUpdateSiswa
                      : this.handleAddSiswa
                  }
                  data-dismiss="modal"
                >
                  {this.state.editable === true ? "Edit Data" : "Tambah Data"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default index;
