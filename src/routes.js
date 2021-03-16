const router = require("express").Router();
const {
  getData,
  nilaiRataRata,
  postDataMahasiswa,
  postDataNilai,
  updateNilai,
  hapusNilai,
} = require("./controller");

router.get("/", getData);
router.get("/rata-rata", nilaiRataRata);
router.post("/mahasiswa", postDataMahasiswa);
router.post("/nilai", postDataNilai);
router.patch("/nilai", updateNilai);
router.delete("/nilai", hapusNilai);

module.exports = router;
