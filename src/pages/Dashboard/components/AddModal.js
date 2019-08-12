import React, { Fragment } from 'react';

const AddModal = (props) => {
    return (
        <Fragment>
            <div class="modal fade" id={props.id} tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Tambah Data Siswa</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label for="nis">NIS</label>
                                <input type="text" class="form-control" id={props.nis} aria-describedby="emailHelp" placeholder="Enter NIS" onChange={props.handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="nama">Nama</label>
                                <input type="text" class="form-control" id={props.nama} placeholder="Enter name" onChange={props.handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id={props.email} placeholder="Enter email" onChange={props.handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="jurusan">Jurusan</label>
                                <input type="text" class="form-control" id={props.jurusan} placeholder="Enter jurusan" onChange={props.handleChange} />
                            </div>
                            <div class="form-group">
                                <label for="gender">Gender</label>
                                <input type="text" class="form-control" id={props.gender} placeholder="Enter gender" onChange={props.handleChange} />
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={props.handleAdd}>Tambah Data</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default AddModal;