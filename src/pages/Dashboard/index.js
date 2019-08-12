import React, { Component, Fragment } from 'react';
import axios from 'axios';

class index extends Component {
	constructor(props) {
		super(props);
		this.state = {
			students: [],
			editable: false,
			student_id: null,
			nis: '',
			nama: '',
			email: '',
			jurusan: '',
			gender: ''
		};
	}

	componentDidMount() {
		this.getDataSiswa();
	}

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	handleAddSiswa = () => {
		this.setState({ editable: false });
		axios.post('http://127.0.0.1:8000/api/v1/students', {
			nis: this.state.nis,
			nama: this.state.nama,
			email: this.state.email,
			jurusan: this.state.jurusan,
			gender: this.state.gender,
		})
			.then((res) => {
				this.getDataSiswa();
				this.setState({
					nis: '',
					nama: '',
					email: '',
					jurusan: '',
					gender: ''
				})
			})
			.catch((err) => {
				alert('gagal menambah data');
			});
	}

	getSiswaById = (id) => {
		let student_id = id
		this.setState({
			editable: true,
			student_id
		});
		axios.get(`http://127.0.0.1:8000/api/v1/students/${id}`)
			.then((res) => {
				this.setState({
					nis: res.data.student.nis,
					nama: res.data.student.nama,
					email: res.data.student.email,
					jurusan: res.data.student.jurusan,
					gender: res.data.student.gender
				})
			})
			.catch((err) => {
				alert('gagal menampilkan data siswa')
			})
	}

	getDataSiswa = () => {
		axios.get('http://127.0.0.1:8000/api/v1/students')
			.then((res) => {
				this.setState({
					edit: true,
					students: res.data.students
				})
			})
			.catch((err) => {
				alert('gagal menampilkan data siswa')
			})
	}

	handleDeleteSiswa = (id) => {
		axios.delete(`http://127.0.0.1:8000/api/v1/students/${id}`)
			.then((res) => {
				this.getDataSiswa();
			})
			.catch((err) => {
				alert('gagal menghapus data siswa')
			})
	}

	handleUpdateSiswa = () => {
		axios.put(`http://127.0.0.1:8000/api/v1/students/${this.state.student_id}`, {
			nis: this.state.nis,
			nama: this.state.nama,
			email: this.state.email,
			jurusan: this.state.jurusan,
			gender: this.state.gender
		})
			.then((res) => {
				this.getDataSiswa();
				this.setState({
					editable: false,
					nis: '',
					nama: '',
					email: '',
					jurusan: '',
					gender: '',
				});
			})
			.catch((err) => {
				alert('gagal mengubah data siswa')
			})
	}

	render() {
		return (
			<Fragment>
				<nav class="navbar navbar-dark bg-primary navbar-expand-lg">
					<div className="container">
						<a class="navbar-brand" href="#">Navbar</a>
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
							<span class="navbar-toggler-icon"></span>
						</button>
						<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
							<div class="navbar-nav">
								<a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
								<a class="nav-item nav-link" href="#">Students</a>
							</div>
						</div>
					</div>
				</nav>
				<div className="container mt-4">
					<div class="title mb-5">
						<button type="button" data-toggle="modal" data-target="#addmodal" class="btn btn-primary float-right">Tambah Data</button>
						<h2>Daftar Siswa SMKN 2 Bogor</h2>
					</div>
					<table class="table">
						<thead>
							<tr class="bg-primary text-white">
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
							{
								this.state.students.map((item, index) => (
									<tr>
										<th scope="row">{index + 1}</th>
										<td>{item.nis}</td>
										<td>{item.nama}</td>
										<td>{item.gender}</td>
										<td>{item.email}</td>
										<td>{item.jurusan}</td>
										<td>
											<button class="badge badge-primary" data-toggle="modal" data-target="#addmodal" onClick={() => this.getSiswaById(item.id)}>edit</button>
											<button class="badge badge-danger" onClick={() => this.handleDeleteSiswa(item.id)}>Hapus</button>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>

				{/* modal */}
				<div class="modal fade" id="addmodal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="exampleModalLabel">{(this.state.editable === true) ? "Edit Data Siswa" : "Tambah Data Siswa"}</h5>
								<button type="button" class="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body">
								<div class="form-group">
									<label for="nis">NIS</label>
									<input type="text" class="form-control" id="nis" aria-describedby="emailHelp" placeholder="Enter NIS" onChange={this.handleChange} value={this.state.nis} />
								</div>
								<div class="form-group">
									<label for="nama">Nama</label>
									<input type="text" class="form-control" id="nama" placeholder="Enter name" onChange={this.handleChange} value={this.state.nama} />
								</div>
								<div class="form-group">
									<label for="email">Email</label>
									<input type="email" class="form-control" id="email" placeholder="Enter email" onChange={this.handleChange} value={this.state.email} />
								</div>
								<div class="form-group">
									<label for="jurusan">Jurusan</label>
									<input type="text" class="form-control" id="jurusan" placeholder="Enter jurusan" onChange={this.handleChange} value={this.state.jurusan} />
								</div>
								<div class="form-group">
									<label for="gender">Gender</label>
									<input type="text" class="form-control" id="gender" placeholder="Enter gender" onChange={this.handleChange} value={this.state.gender} />
								</div>
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
								<button type="button" class="btn btn-primary" onClick={(this.state.editable === true) ? this.handleUpdateSiswa : this.handleAddSiswa} data-dismiss="modal">{(this.state.editable === true) ? "Edit Data" : "Tambah Data"}</button>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

export default index;