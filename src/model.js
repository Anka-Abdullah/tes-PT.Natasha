const { actionQuery } = require("./helper/helper");

module.exports = {
  get: (id) => {
    const mahasiswa =
      id !== undefined ? `where mahasiswa.idMahasiswa = ${id}` : "";
    return actionQuery(
      `select mahasiswa.idMahasiswa, mahasiswa.nama, mata_kuliah.mataKuliah, data_nilai.nilai from mahasiswa join mata_kuliah on mahasiswa.idMahasiswa = mata_kuliah.idMahasiswa join data_nilai on mata_kuliah.id = data_nilai.idMataKuliah ${mahasiswa}`
    );
  },
  getAverage: () => {
    return actionQuery(
      `select mahasiswa.nama, avg(data_nilai.nilai) as rata_rata from data_nilai left join mahasiswa on data_nilai.idMahasiswa = mahasiswa.idMahasiswa group by data_nilai.idMahasiswa`
    );
  },
  postNilai: (data) => {
    return actionQuery(`insert into data_nilai set ?`, data);
  },
  patchNilai: (idMahasiswa, idMataKuliah, data) => {
    return actionQuery(
      `update data_nilai set ? where idMataKuliah = ? and idMahasiswa = ?`,
      [data, idMataKuliah, idMahasiswa]
    );
  },
  deleteNilai: (idMahasiswa, idMataKuliah) => {
    return actionQuery(
      `delete from data_nilai where idMataKuliah = ? and idMahasiswa = ?`,
      [idMataKuliah, idMahasiswa]
    );
  },
  postMahasiswa: (data) => {
    return actionQuery(`insert into mahasiswa set ?`, data);
  },
};
