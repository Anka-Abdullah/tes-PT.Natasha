const { response } = require("./helper/response");
const {
  get,
  getAverage,
  postNilai,
  patchNilai,
  deleteNilai,
  postMahasiswa,
} = require("./model");

const importExcel = require("convert-excel-to-json");
const del = require("del");

module.exports = {
  getData: async (req, res) => {
    try {
      const { id } = req.query;

      if (req.query) {
        const result = await get(id);
        return response(res, 200, "success get data", result);
      } else {
        const result2 = await get();
        return response(res, 200, "success get data", result2);
      }
    } catch (error) {
      console.log(error);
      return response(res, 400, "get data failed", error);
    }
  },
  nilaiRataRata: async (_req, res) => {
    try {
      const result = await getAverage();
      return response(res, 200, "success get data", result);
    } catch (error) {
      console.log(error);
      return response(res, 400, "get data failed", error);
    }
  },
  postDataMahasiswa: async (req, res) => {
    try {
      let file = req.files.filename;
      let filename = file.file;
      await file.mv("./excel" + filename, (err) => {
        if (err) {
          res.send("gagal upload");
        } else {
          let result = importExcel({
            sourceFile: "./excel" + filename,
            header: { rows: 1 },
            columnToKey: { A: "nama", B: "alamat" },
          });
          const output = result.Sheet1;
          del(["excel/" + filename]).then((paths) => {
            console.log(`file ${filename} dihapus`);
          });
          for (i = 0; i < output.length; i++) {
            postMahasiswa(output[i]);
          }
          return response(res, 200, "success post data_nilai", output);
        }
      });
    } catch (error) {
      console.log(error);
      return response(res, 400, "gagal post data_nilai", error);
    }
  },
  postDataNilai: async (req, res) => {
    try {
      const { idMahasiswa, idMataKuliah, nilai, keterangan } = req.body;

      const data = { idMahasiswa, idMataKuliah, nilai, keterangan };
      const result = await postNilai(data);
      return response(res, 200, "success post data_nilai", result);
    } catch (error) {
      return response(res, 400, "post data failed", error);
    }
  },
  updateNilai: async (req, res) => {
    try {
      const { idMahasiswa, idMataKuliah, nilai, keterangan } = req.body;
      const data = { nilai, keterangan };
      const result = await patchNilai(idMahasiswa, idMataKuliah, data);
      return response(res, 200, "nilai berhasil diubah", result);
    } catch (error) {
      return response(res, 400, "nilai gagal diubah", error);
    }
  },
  hapusNilai: async (req, res) => {
    try {
      const { idMahasiswa, idMataKuliah } = req.query;
      const result = await deleteNilai(idMahasiswa, idMataKuliah);
      return response(res, 200, "nilai berhasil dihapus", result);
    } catch (error) {
      return response(res, 400, "nilai gagal diubah", error);
    }
  },
};
